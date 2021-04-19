import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { Column, GenericTable } from '../../../components/Table';
import './index.scss';
import PLUS_ICON from '../../../assets/images/plus-square-regular (1).svg';
import MINUS_ICON from '../../../assets/images/minus-square-regular.svg';

import { Icon } from 'semantic-ui-react';
import OtherSort from './OtherSort';
import SellerGroups from '../SellerGroups';
import SellerSearch from '../SellerSearch';
import SellerDetails from '../SellerDetails';
import { failed, loadingSellers, sellers } from '../../../selectors/SellerFinder';
import { fetchSellers } from '../../../actions/SellerFinder';
import { connect } from 'react-redux';
import { SEARCH_STATUS } from '../../../constants/SellerFinder';
import { formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import PageLoader from '../../../components/PageLoader';
interface Props {
  sellers: any[];
  loadingSellers: boolean;
  fetchSellers: () => void;
  error: any;
  ws: WebSocket;
}

interface SearchResponse {
  job_id: string;
  status: string;
  message: string;
}
const SellerFinderTable = ({ ws, fetchSellers, sellers, loadingSellers }: Props) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
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
          fetchSellers();
        }
      };
    }
  });
  const search = (value: string) => {
    if (value.trim()) {
      ws.send(JSON.stringify({ merchant_ids: value.trim() }));
    }
  };
  useEffect(() => {
    fetchSellers();
  }, []);
  // const mockData = [
  //   {
  //     id: 123,
  //     seller_name: 'Kikkoman',
  //     inventory: '67',
  //     rating: 4.5,
  //     rating_per: '98% Positive',
  //     total_rating: '655',
  //     fba: 'Yes',
  //     fbm: 'Yes',
  //     review_l30d: '321',
  //     review_l90d: '876',
  //     l365d: '3686',
  //     review_life_time: '5686',
  //     product_review: '2100',
  //     found_by: 'Seller Id',
  //     processed: '7/21/2020: 1:45 PM',
  //   },
  //   {
  //     id: 1234,
  //     seller_name: 'Kikkoman',
  //     inventory: '67',
  //     rating: 4.5,
  //     rating_per: '98% Positive',
  //     total_rating: '655',
  //     fba: 'Yes',
  //     fbm: 'Yes',
  //     review_l30d: '321',
  //     review_l90d: '876',
  //     l365d: '3686',
  //     review_life_time: '5686',
  //     product_review: '2100',
  //     found_by: 'Seller Id',
  //     processed: '7/21/2020: 1:45 PM',
  //   },
  // ];
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
  const renderActions = (row: any) => (
    <div className="sf-actions">
      <span>
        <Icon name="refresh" color="grey" />
      </span>
      <OtherSort
        row={row}
        activeRow={row}
        handleUntrack={() => console.log('clicked')}
        group={[]}
        confirm={false}
        handleConfirmMessage={() => console.log('clicked')}
        handleCancel={() => console.log('clicked')}
        handleMoveGroup={() => console.log('clicked')}
      />
    </div>
  );

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

  return (
    <div className="seller-finder-table">
      <div className="search-input-container">
        <SellerSearch onSearch={value => search(value)} message={searchMessage} />
      </div>
      <div className="seller-menu">
        <SellerGroups
          groups={[]}
          handleMenu={() => console.log('something')}
          open={false}
          deleteGroup={false}
          editGroup={false}
          error={false}
          groupError={false}
          items={[]}
          handleAddGroup={() => console.log('something')}
          handleAddGroupSubmit={() => console.log('something')}
          handleAddGroupCancel={() => console.log('something')}
          handleAddGroupNameChange={() => console.log('something')}
          handleDeleteGroup={() => console.log('something')}
          handleDeleteGroupCancel={() => console.log('something')}
          handleDeleteGroupSubmit={() => console.log('something')}
          handleEditGroup={() => console.log('something')}
          handleEditGroupCancel={() => console.log('something')}
          handleEditGroupSubmit={() => console.log('something')}
          editError={false}
          filteredProducts={() => console.log('something')}
          handleMoveGroup={() => console.log('something')}
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
          data={sellers}
          columns={columns}
          extendedInfo={(data: any) => <SellerDetails details={data} />}
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
});

const mapDispatchToProps = {
  fetchSellers: () => fetchSellers(),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerFinderTable);
