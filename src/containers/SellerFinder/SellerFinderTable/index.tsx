import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { Column, GenericTable } from '../../../components/Table';
import './index.scss';

import PLUS_ICON from '../../../assets/images/plus-square-regular (1).svg';
import MINUS_ICON from '../../../assets/images/minus-square-regular.svg';

import OtherSort from './OtherSort';
import SellerGroups from '../SellerGroups';
import SellerSearch from '../SellerSearch';
import SellerDetails from '../SellerDetails';

import {
  failed,
  loadingSellers,
  sellers,
  selectActiveMenuGroupID,
  selectSellerTrackGroups,
} from '../../../selectors/SellerFinder';

import {
  fetchInventory,
  fetchSellerProducts,
  fetchSellers,
  SellersPayload,
  SellersProductsPayload,
  deleteSellerTrackGroup,
  updateSellerTrackerGroup,
  postCreateSellerTrackGroup,
  handleDeleteSeller,
  setMenuItem,
  getAllSellerTrackGroups,
  moveMerchantToSellerTrackGroup,
} from '../../../actions/SellerFinder';

import { SEARCH_STATUS } from '../../../constants/SellerFinder';
import { formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import PageLoader from '../../../components/PageLoader';
import { Merchant } from '../../../interfaces/Seller';

interface Props {
  sellers: any[];
  loadingSellers: boolean;
  fetchSellers: (payload: SellersPayload) => void;
  error: any;
  ws: WebSocket;
  inventorySocket: WebSocket;
  fetchInventory: (data: any) => void;
  fetchSellerProducts: (payload: SellersProductsPayload) => void;
  handleDeleteSeller: (merchantID: number) => void;
  sellerTrackGroups: any;
  getAllSellerTrackGroups: () => void;
  postCreateSellerTrackGroup: (name: string) => void;
  activeGroupID: number;
  setMenuItem: (id: number) => void;
  deleteSellerTrackGroup: (groupID: number) => void;
  updateSellerTrackerGroup: (group: any) => void;
  moveMerchantToSellerTrackGroup: (merchantID: number, groupID: number) => void;
}

interface SearchResponse {
  job_id: string;
  status: string;
  message: string;
}
const SellerFinderTable: React.FC<Props> = props => {
  const {
    ws,
    fetchSellers,
    sellers,
    loadingSellers,
    inventorySocket,
    fetchInventory,
    fetchSellerProducts,
    sellerTrackGroups,
    getAllSellerTrackGroups,
    activeGroupID,
  } = props;

  const [expandedRow, setExpandedRow] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [activeMerchant, setActiveMerchant] = useState<Merchant>({
    address: undefined,
    asins: '',
    brands: '',
    business_name: undefined,
    city: undefined,
    count_12_month: undefined,
    count_30_days: undefined,
    count_90_days: undefined,
    count_lifetime: undefined,
    country: undefined,
    feedback: '',
    id: 0,
    inventory_count: '',
    inventory_link: '',
    launched: undefined,
    marketplace_id: undefined,
    merchant_group: undefined,
    merchant_id: undefined,
    merchant_name: undefined,
    negative_12_month: undefined,
    negative_30_days: undefined,
    negative_90_days: undefined,
    negative_lifetime: undefined,
    neutral_12_month: undefined,
    neutral_30_days: undefined,
    neutral_90_days: undefined,
    neutral_lifetime: undefined,
    positive_12_month: undefined,
    positive_30_days: undefined,
    positive_90_days: undefined,
    positive_lifetime: undefined,
    review_ratings: undefined,
    scrapy_job_id: 0,
    seller: 0,
    seller_rating: undefined,
    state: undefined,
    status: '',
    track_status: '',
    udate: '',
  });

  /* Delet seller confirmation box */
  const [confirmMessage, setConfirmMessage] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<any>(null);

  /* States for groups */
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [editError, setEditError] = useState(false);

  const expandRow = (row: any) => {
    setExpandedRow(expandedRow ? null : row.id);
  };

  useEffect(() => {
    if (ws.OPEN && !ws.CONNECTING) {
      ws.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        if (data.job_id) {
          setSearchMessage(data.message);
        }
        console.log(data);
        if (data.status === SEARCH_STATUS.DONE) {
          fetchSellers({ enableLoader: false });
        }
      };
    }
  });

  useEffect(() => {
    if (inventorySocket.OPEN && !inventorySocket.CONNECTING) {
      inventorySocket.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        console.log('inventory response', {
          data,
          enable: data.status === SEARCH_STATUS.PENDING,
        });
        fetchInventory({ ...data, merchant_id: activeMerchant.merchant_id });
        if (data.status === SEARCH_STATUS.DONE) {
          fetchSellerProducts({
            enableLoader: false,
            merchantId: `${activeMerchant.id}`,
          });
        }
      };
    }
  });

  const search = (value: string) => {
    if (value.trim()) {
      ws.send(JSON.stringify({ merchant_ids: value.trim() }));
    }
  };

  const onCheckInventory = (data: any) => {
    setActiveMerchant(data.merchant);
    if (inventorySocket.OPEN && !inventorySocket.CONNECTING) {
      inventorySocket.send(data.payload);
    }
  };

  useEffect(() => {
    fetchSellers({ enableLoader: true });
    getAllSellerTrackGroups();
  }, []);

  /* Open the confirmation message box */
  const handleConfirmMessage = (row: any) => {
    setConfirmMessage(true);
    setActiveRow(row);
  };

  /* Cancel the confirmation message box */
  const handleCancel = () => {
    setConfirmMessage(false);
  };

  /* Handle Untrack  or Delete Seller*/
  const handleUntrack = (merchantID: number) => {
    const { handleDeleteSeller } = props;
    setConfirmMessage(false);
    handleDeleteSeller(merchantID);
  };

  /* Move Group */
  const handleMoveGroup = (merchantID: number, groupID: number) => {
    // Moving merchant with ID ${merchantID} to group ${group}

    const { moveMerchantToSellerTrackGroup } = props;
    moveMerchantToSellerTrackGroup(merchantID, groupID);
  };

  /* handle menu change */
  const handleMenu = (groupID: number) => {
    const { setMenuItem } = props;
    setMenuItem(groupID);
  };

  /* Additon of groups */
  const handleAddGroup = () => {
    setOpen(true);
    setName('');
  };

  /* Cancel adding a new group */
  const handleAddGroupCancel = () => {
    setOpen(false);
    setError(false);
    setName('');
  };

  /* Submit group additon */
  const handleAddGroupSubmit = () => {
    const { postCreateSellerTrackGroup } = props;
    if (!_.isEmpty(name.trim())) {
      postCreateSellerTrackGroup(name);
      setOpen(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  /* When group name is changed */
  const handleAddGroupNameChange = (e: any) => {
    setName(e.target.value);
  };

  /* Edit groups */
  const handleEditGroup = () => {
    setEditGroup(true);
  };

  /* When edit group is cancelled */
  const handleEditGroupCancel = () => {
    setEditGroup(false);
  };

  /* When edit group is submitted */
  const handleEditGroupSubmit = (group: any) => {
    const { updateSellerTrackerGroup } = props;

    if (!_.isEmpty(group.name.trim())) {
      updateSellerTrackerGroup(group);
      setEditGroup(false);
      setEditError(false);
    } else {
      setEditError(true);
    }
  };

  /* Delete groups */
  const handleDeleteGroup = () => {
    setDeleteGroup(true);
  };

  /* Delete group is cancelled */
  const handleDeleteGroupCancel = () => {
    setDeleteGroup(false);
  };

  /* Delete group is submitted */
  const handleDeleteGroupSubmit = (groupID: any) => {
    const { deleteSellerTrackGroup } = props;
    deleteSellerTrackGroup(groupID);
    setDeleteGroup(false);
  };

  /* Keep tracking merchants when group is deleted */
  const handleKeepTracking = (group: any) => {
    const { updateSellerTrackerGroup } = props;
    updateSellerTrackerGroup(group);
    setDeleteGroup(false);
  };

  const renderSellerInformation = (row: any) => (
    <p className="sf-seller-details">
      <img
        src={expandedRow === row.id ? MINUS_ICON : PLUS_ICON}
        style={{
          position: 'absolute',
          left: '70px',
          cursor: 'pointer',
        }}
        onClick={() => expandRow(row)}
      />
      <span className="name">{row.merchant_name}</span>
      <span className="seller-id">
        {row.merchant_id} <Icon name={'copy outline'} />
      </span>
    </p>
  );

  const renderInventory = (row: any) => (
    <p className="inventory-details">
      {showNAIfZeroOrNull(row.inventory_count, row.inventory_count)}
    </p>
  );

  const renderRatingL365D = (row: any) => (
    <p>
      <Rating
        placeholderRating={parseInt(row.seller_rating) || 0}
        emptySymbol={<Icon name="star outline" color={'grey'} />}
        fullSymbol={<Icon name="star" color={'grey'} />}
        placeholderSymbol={<Icon name="star" color={'grey'} />}
        readonly
      />
    </p>
  );

  const renderRatingL365DPercentage = (row: any) => (
    <p>{row.review_rating ? formatPercent(row.review_rating) : '-'}</p>
  );

  const renderTotalRating = () => <p>{'-'}</p>;

  const renderFBA = () => <p>{'-'}</p>;

  const renderFBM = () => <p>{'-'}</p>;

  const renderReviewL30D = (row: any) => (
    <p>{showNAIfZeroOrNull(row.count_30_days, row.count_30_days)}</p>
  );

  const renderReviewL90D = (row: any) => (
    <p>{showNAIfZeroOrNull(row.count_90_days, row.count_90_days)}</p>
  );

  const renderReviewL365D = (row: any) => (
    <p>{showNAIfZeroOrNull(row.count_356_days, row.count_356_days)}</p>
  );

  const renderReviewLifeTime = (row: any) => (
    <p>{showNAIfZeroOrNull(row.count_lifetime, row.count_lifetime)}</p>
  );

  const renderProductReview = () => <p>{'-'}</p>;

  const renderProcessedOn = () => <p>{'-'}</p>;

  const renderActions = (row: any) => {
    const { sellerTrackGroups } = props;

    const filterTrackedGroups = sellerTrackGroups.filter(
      (group: any) => group.id !== row.merchant_group || row.merchant_group === null
    );
    return (
      <div className="sf-actions">
        <span>
          <Icon name="refresh" color="grey" />
        </span>
        <OtherSort
          row={row}
          activeRow={activeRow}
          handleUntrack={handleUntrack}
          group={filterTrackedGroups}
          confirm={confirmMessage}
          handleConfirmMessage={handleConfirmMessage}
          handleCancel={handleCancel}
          handleMoveGroup={handleMoveGroup}
        />
      </div>
    );
  };

  const columns: Column[] = [
    {
      label: 'Seller Information',
      dataKey: 'seller_information',
      type: 'string',
      sortable: false,
      show: true,
      className: ``,
      render: renderSellerInformation,
    },
    {
      label: 'Inventory',
      dataKey: 'inventory_count',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderInventory,
    },
    {
      label: `Rating \nL365D`,
      dataKey: 'seller_rating',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderRatingL365D,
    },
    {
      label: `Rating% \nL365D`,
      dataKey: 'review_rating',
      type: 'string',
      sortable: true,
      show: true,
      className: `seller_rating`,
      render: renderRatingL365DPercentage,
    },
    {
      label: `Total \nRating`,
      dataKey: 'total_rating',
      type: 'string',
      sortable: true,
      show: true,
      className: `seller_rating`,
      render: renderTotalRating,
    },
    {
      label: `FBA`,
      dataKey: 'fba',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderFBA,
    },
    {
      label: `FBM`,
      dataKey: 'fbm',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderFBM,
    },
    {
      label: `Review \nL30D`,
      dataKey: 'count_30_days',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL30D,
    },
    {
      label: `Review \nL90D`,
      dataKey: 'count_90_days',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL90D,
    },
    {
      label: `Review \nL365D`,
      dataKey: 'count_356_days',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewL365D,
    },
    {
      label: `Review \nLifetime`,
      dataKey: 'count_lifetime',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderReviewLifeTime,
    },
    {
      label: `Product \nReview #`,
      dataKey: 'product_review',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      render: renderProductReview,
    },
    {
      label: `Processed on`,
      dataKey: 'processed',
      type: 'string',
      sortable: true,
      show: true,
      className: ``,
      render: renderProcessedOn,
    },
    {
      dataKey: 'actions',
      type: 'string',
      show: true,
      className: ``,
      render: renderActions,
    },
  ];

  const filteredProductsByGroups =
    activeGroupID === null || activeGroupID === -1
      ? sellers
      : sellers.filter((seller: any) => {
          return seller.merchant_group === activeGroupID;
        });

  return (
    <div className="seller-finder-table">
      <div className="search-input-container">
        <SellerSearch onSearch={value => search(value)} message={searchMessage} />
      </div>
      <div className="seller-menu">
        <SellerGroups
          groups={sellerTrackGroups}
          handleMenu={handleMenu}
          open={open}
          deleteGroup={deleteGroup}
          editGroup={editGroup}
          error={error}
          items={sellers}
          /* Addition of groups */
          handleAddGroup={handleAddGroup}
          handleAddGroupSubmit={handleAddGroupSubmit}
          handleAddGroupCancel={handleAddGroupCancel}
          handleAddGroupNameChange={handleAddGroupNameChange}
          /* Deletetion of groups */
          handleDeleteGroup={handleDeleteGroup}
          handleDeleteGroupCancel={handleDeleteGroupCancel}
          handleDeleteGroupSubmit={handleDeleteGroupSubmit}
          /* Editing groups */
          handleEditGroup={handleEditGroup}
          handleEditGroupCancel={handleEditGroupCancel}
          handleEditGroupSubmit={handleEditGroupSubmit}
          editError={editError}
          /* Need to pass filtered Products by group */
          filteredProducts={filteredProductsByGroups}
          handleMoveGroup={handleMoveGroup}
          handleKeepTracking={handleKeepTracking}
        />

        <span>
          <Icon name="download" /> {'Export'}
        </span>
      </div>
      {loadingSellers ? (
        <PageLoader pageLoading={true} />
      ) : (
        <GenericTable
          currentActiveColumn={''}
          stickyChartSelector={false}
          scrollTopSelector={false}
          expandedRows={expandedRow}
          data={filteredProductsByGroups}
          columns={columns}
          extendedInfo={(data: any) => {
            return <SellerDetails details={data} onCheckInventory={onCheckInventory} />;
          }}
          name={'seller-finder'}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  sellers: sellers(state),
  loadingSellers: loadingSellers(state),
  error: failed(state),
  sellerTrackGroups: selectSellerTrackGroups(state),
  activeGroupID: selectActiveMenuGroupID(state),
});

const mapDispatchToProps = {
  fetchSellers: (payload: SellersPayload) => fetchSellers(payload),
  fetchInventory: (data: any) => fetchInventory(data),
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
  handleDeleteSeller: (merchantID: number) => handleDeleteSeller(merchantID),
  getAllSellerTrackGroups: () => getAllSellerTrackGroups(),
  postCreateSellerTrackGroup: (name: string) => postCreateSellerTrackGroup(name),
  setMenuItem: (groupID: number) => setMenuItem(groupID),
  deleteSellerTrackGroup: (groupID: number) => deleteSellerTrackGroup(groupID),
  updateSellerTrackerGroup: (group: any) => updateSellerTrackerGroup(group),
  moveMerchantToSellerTrackGroup: (merchantID: number, groupID: number) =>
    moveMerchantToSellerTrackGroup(merchantID, groupID),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerFinderTable);
