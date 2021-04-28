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
  sellerProductsPageNo,
  sellerProductsPageSize,
  activeProduct,
  sellersPageNo,
  sellersPageSize,
  sellersPageCount,
  sellersCount,
  sellersSinglePageItemsCount,
  sellersLoading,
  loadingSellersFilters,
  sellersFilters,
} from '../../../selectors/SellerFinder';

import {
  fetchInventory,
  fetchProductSellers,
  fetchSellerProducts,
  fetchSellers,
  ProductSellersPayload,
  SellersPayload,
  SellersProductsPayload,
  deleteSellerTrackGroup,
  updateSellerTrackerGroup,
  postCreateSellerTrackGroup,
  handleDeleteSeller,
  setMenuItem,
  getAllSellerTrackGroups,
  moveMerchantToSellerTrackGroup,
  setActiveProductSellerStatus,
  setSellersSinglePageItemsCount,
  fetchSellerFilters,
} from '../../../actions/SellerFinder';

import { SEARCH_STATUS } from '../../../constants/SellerFinder';
import { formatPercent, showNAIfZeroOrNull } from '../../../utils/format';
import PageLoader from '../../../components/PageLoader';
import { Merchant } from '../../../interfaces/Seller';
import ExportResultAs from '../../../components/ExportResultAs';
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../constants/Suppliers';
import { info, success } from '../../../utils/notifications';
import { download } from '../../../utils/file';

interface Props {
  sellers: any[];
  loadingSellers: boolean;
  fetchSellers: (payload: SellersPayload) => void;
  error: any;
  ws: WebSocket;
  inventorySocket: WebSocket;
  sellersSocket: WebSocket;
  exportMerchantsSocket: WebSocket;
  fetchInventory: (data: any) => void;
  fetchSellerProducts: (payload: SellersProductsPayload) => void;
  fetchProductSellers: (payload: ProductSellersPayload) => void;
  productsPageNo: number;
  productsPageSize: number;
  activeProduct: any;
  setActiveProductStatus: (data: any) => void;
  handleDeleteSeller: (merchantID: number) => void;
  sellerTrackGroups: any;
  getAllSellerTrackGroups: () => void;
  postCreateSellerTrackGroup: (name: string) => void;
  activeGroupID: number;
  setMenuItem: (id: number) => void;
  deleteSellerTrackGroup: (groupID: number) => void;
  updateSellerTrackerGroup: (group: any) => void;
  moveMerchantToSellerTrackGroup: (merchantID: number, groupID: number) => void;
  reconnectExportSocket: () => void;
  sellersPageNo: number;
  sellersPageSize: number;
  sellersCount: number;
  sellersPageCount: number;
  sellersSinglePageItemsCount: number;
  setSellersSinglePageItemsCount: (count: number) => void;
  sellersLoading: boolean;
  loadingFilters: boolean;
  sellerFilters: any;
  fetchSellerFilters: (query: string) => void;
}

interface SearchResponse {
  job_id: string;
  status: string;
  message: string;
  parent_asin: boolean;
  merchants_count: number;
}

interface ExportResponse {
  message: string;
  progress: number;
  status: string;
  type: string;
  csv_path: string;
  excel_path: string;
}
const SellerFinderTable = (props: Props) => {
  const {
    ws,
    fetchSellers,
    sellers,
    loadingSellers,
    inventorySocket,
    fetchInventory,
    fetchSellerProducts,
    productsPageNo,
    productsPageSize,
    activeProduct,
    sellersSocket,
    setActiveProductStatus,
    fetchProductSellers,
    sellerTrackGroups,
    getAllSellerTrackGroups,
    activeGroupID,
    exportMerchantsSocket,
    reconnectExportSocket,
    sellersPageNo,
    sellersPageSize,
    sellersCount,
    sellersPageCount,
    sellersSinglePageItemsCount,
    setSellersSinglePageItemsCount,
    sellersLoading,
    loadingFilters,
    sellerFilters,
    fetchSellerFilters,
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
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [editError, setEditError] = useState(false);
  const [exportResult, setExportResult] = useState(false);
  const [searching, setSearching] = useState(false);
  const [refreshing, setRefreshing] = useState('');
  const [exportFormat, setExportFormat] = useState('csv');
  const [viewFilterDialog, setViewFilterDialog] = useState(false);
  const [activeColumnFilter, setActiveColumnFilter] = useState('');
  // const [activeColumn, setActiveColumn] = useState({
  //   label: 'Seller Information',
  //   dataKey: 'seller_information',
  //   type: 'string',
  //   sortable: false,
  //   show: true,
  //   className: ``,
  //   filter: true,
  //   filterSign: '',
  //   filterType: 'list',
  //   filterDataKey: 'search',
  //   filterLabel: 'Seller Information',
  // });

  const expandRow = (row: any) => {
    setExpandedRow(expandedRow ? null : row.id);
    setActiveMerchant(row);
  };

  const fetchAmazonSellers = (payload: SellersPayload, resetKey = '') => {
    const {
      pageSize = sellersPageSize,
      pageNo = sellersPageNo,
      enableLoader,
      sort,
      sortDirection,
    } = payload;

    let reqPayload: SellersPayload = {
      pageSize,
      pageNo,
      enableLoader,
      sort,
      sortDirection,
    };
    let filterQuery = getSavedFilters(resetKey);
    if (payload.query && payload.query.length && !filterQuery.includes(payload.query)) {
      filterQuery = `${filterQuery}&${payload.query}`;
    }
    if (filterQuery) {
      reqPayload = { ...reqPayload, query: filterQuery };
    }

    fetchSellers(reqPayload);
    setViewFilterDialog(false);
  };

  const fetchFilters = async (filterDataKey: string) => {
    const query = `column_value=${filterDataKey}&column_type=${
      filterDataKey === 'search' ? filterDataKey : 'slider'
    }`;
    fetchSellerFilters(query);
    setActiveColumnFilter(filterDataKey);
  };

  const getFilterValue = (dataKey: string): any => {
    const localFilters = localStorage.getItem(`seller-finder:${dataKey}`);
    let parsed: any;
    if (localFilters) {
      parsed = JSON.parse(localFilters);
      if (dataKey === 'search') {
        parsed = parsed.value.length ? parsed : undefined;
      } else {
        parsed = Object.keys(parsed.value).length ? parsed : undefined;
      }
    }
    return parsed ? parsed : undefined;
  };

  const parseFilters = (filter: any): string => {
    const { dataKey, value } = filter;
    let query = '';
    if (value) {
      if (dataKey === 'search') {
        query = `searches=${value}`;
      } else {
        query = `${dataKey}_min=${value.min}&${dataKey}_max=${value.max}`;
      }
    }

    setViewFilterDialog(false);
    return query;
  };

  const applyFilters = (data: any) => {
    let filter = data;
    let query = '';
    if (data.dataKey !== 'search') {
      filter = Object.keys(data.value).length ? data : undefined;
      if (filter) {
        query = parseFilters(filter);
      }
    } else {
      query = parseFilters(filter);
    }
    fetchAmazonSellers({ query });
    setViewFilterDialog(false);
  };

  const getSavedFilters = (resetKey = '') => {
    let query = '';
    columns.forEach((c: any) => {
      if (resetKey !== c.dataKey) {
        const saved: any = getFilterValue(c.dataKey);
        if (saved && !!saved.value) {
          const parsed = parseFilters(saved);
          query = !parsed.includes('undefined') ? `${query}&${parseFilters(saved)}&` : query;
        }
      }
    });
    return query;
  };

  useEffect(() => {
    if (ws.OPEN && !ws.CONNECTING) {
      ws.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        if (data.job_id) {
          setSearchMessage(data.message);
        }
        if (searchText) {
          setSearching(data.status === SEARCH_STATUS.PENDING);
        }

        if (data.status === SEARCH_STATUS.DONE) {
          success(`${data.merchants_count || 1} Sellers Found!`);
          setRefreshing('');
          fetchAmazonSellers({ enableLoader: false });
        }
      };
    }
  });
  const fetchProducts = (payload: any) => {
    fetchSellerProducts({
      enableLoader: false,
      merchantId: `${activeMerchant.id}`,
      ...payload,
    });
  };
  useEffect(() => {
    if (inventorySocket.OPEN && !inventorySocket.CONNECTING) {
      inventorySocket.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        fetchInventory({ ...data, merchant_id: activeMerchant.merchant_id });
        if (data.status === SEARCH_STATUS.DONE) {
          fetchProducts({ pageNo: productsPageNo, pageSize: productsPageSize });
        }
      };
    }
  });
  useEffect(() => {
    if (activeProduct && sellersSocket.OPEN && !sellersSocket.CONNECTING) {
      sellersSocket.send(
        JSON.stringify({
          parent_asin: true,
          merchant_id: activeMerchant.id,
          asins: activeProduct.asin,
        })
      );
      success('Searching for ' + activeProduct.asin);
    }
  }, [activeProduct]);

  useEffect(() => {
    if (sellersSocket.OPEN && !sellersSocket.CONNECTING) {
      sellersSocket.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        setActiveProductStatus({ ...data, asin: activeProduct.asin });
        setSearching(data.status === SEARCH_STATUS.PENDING);

        if (data.status === SEARCH_STATUS.DONE && data.parent_asin) {
          fetchProductSellers({
            asin: activeProduct.asin,
            enableLoader: true,
            merchantId: activeMerchant.id,
          });
        }
        if (data.status === SEARCH_STATUS.DONE) {
          fetchAmazonSellers({ enableLoader: false });
        }
        success(`${data.merchants_count || 1} Sellers Found!`);
      };
    }
  }, [activeProduct]);

  useEffect(() => {
    if (exportMerchantsSocket.OPEN && !exportMerchantsSocket.CONNECTING) {
      exportMerchantsSocket.onmessage = (res: any) => {
        const data: ExportResponse = JSON.parse(res.data);
        if (data.status === SEARCH_STATUS.PENDING) {
          info(`Export Progress (${data.progress})`);
        }
        if (data.status === SEARCH_STATUS.SUCCESS && !!data.excel_path) {
          success('File Exported Successfully!');
          const fileUrl = exportFormat === 'csv' ? data.csv_path : data.excel_path;
          const name = `merchant-export-${Date.now()}.${exportFormat}`;
          download(fileUrl, name).then(() => {
            reconnectExportSocket();
          });
        }
      };
    }
  });

  const exportMerchants = () => {
    if (exportMerchantsSocket.OPEN && !exportMerchantsSocket.CONNECTING) {
      exportMerchantsSocket.send(JSON.stringify({ start_report: true }));
      info('Check Notifications for Export Progress.');
    }
  };

  const search = (value: string) => {
    const data = value.trim();
    if (data) {
      setSearchText(data);
      setSearching(true);
      if (data.length === 10) {
        sellersSocket.send(JSON.stringify({ asins: data }));
      } else {
        ws.send(JSON.stringify({ merchant_ids: data }));
      }
      success('Searching for ' + data);
    }
  };

  const refreshSeller = (data: string) => {
    ws.send(JSON.stringify({ merchant_ids: data }));
    setRefreshing(data);
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
        alt={'expand icon'}
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
        <span onClick={() => refreshSeller(row.merchant_id)}>
          <Icon name="refresh" color="grey" loading={refreshing === row.merchant_id} />
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
          handleRefresh={() => refreshSeller(row.merchant_id)}
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
      filter: true,
      filterSign: '',
      filterType: 'list',
      filterDataKey: 'search',
      filterLabel: 'Seller Information',
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
      filter: true,
      filterSign: '',
      filterType: 'range',
      filterDataKey: 'count_30_days',
      filterLabel: 'Review \nL30D',
      render: renderReviewL30D,
    },
    {
      label: `Review \nL90D`,
      dataKey: 'count_90_days',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      filter: true,
      filterSign: '',
      filterType: 'range',
      filterDataKey: 'count_90_days',
      filterLabel: 'Review \nL90D',
      render: renderReviewL90D,
    },
    {
      label: `Review \nL365D`,
      dataKey: 'count_356_days',
      type: 'string',
      sortable: true,
      show: true,
      className: `review`,
      filter: true,
      filterSign: '',
      filterType: 'range',
      filterDataKey: 'count_12_month',
      filterLabel: 'Review \nL365D',
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
        <SellerSearch
          onSearch={value => search(value)}
          message={searchMessage}
          loading={searching}
        />
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

        <span className="export-icon" onClick={() => setExportResult(true)}>
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
            return (
              <SellerDetails
                details={data}
                onCheckInventory={onCheckInventory}
                onPagination={payload => fetchProducts(payload)}
              />
            );
          }}
          name={'seller-finder'}
          loading={sellersLoading}
          singlePageItemsCount={sellersSinglePageItemsCount}
          currentPage={sellersPageNo}
          count={sellersCount}
          pageCount={sellersPageCount}
          setPage={(page: number) => {
            if (page !== sellersPageNo) {
              fetchAmazonSellers({
                pageNo: page,
                pageSize: sellersPageSize,
                enableLoader: false,
              });
            }
          }}
          setSinglePageItemsCount={(pageSize: number) => {
            fetchAmazonSellers({
              pageNo: 1,
              pageSize,
              enableLoader: false,
            });
            setSellersSinglePageItemsCount(pageSize);
          }}
          onSort={(sortDirection, sort) => {
            fetchAmazonSellers({
              pageNo: 1,
              pageSize: sellersPageSize,
              enableLoader: false,
              sort,
              sortDirection,
            });
          }}
          toggleColumnCheckbox={() => setViewFilterDialog(!viewFilterDialog)}
          activeColumnFilters={activeColumnFilter}
          columnFilterBox={viewFilterDialog}
          toggleColumnFilters={fetchFilters}
          loadingFilters={loadingFilters}
          filterValues={sellerFilters}
          applyColumnFilters={applyFilters}
          cancelColumnFilters={() => setViewFilterDialog(false)}
          resetColumnFilters={resetKey => {
            fetchAmazonSellers({ enableLoader: false }, resetKey);
            setViewFilterDialog(false);
          }}
        />
      )}
      <ExportResultAs
        open={exportResult}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        format={'csv'}
        onFormatChange={setExportFormat}
        onClose={() => setExportResult(false)}
        onExport={() => {
          console.log('Format', exportFormat);
          setExportResult(false);
          exportMerchants();
        }}
      />
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  sellers: sellers(state),
  loadingSellers: loadingSellers(state),
  error: failed(state),
  sellerTrackGroups: selectSellerTrackGroups(state),
  activeGroupID: selectActiveMenuGroupID(state),
  productsPageNo: sellerProductsPageNo(state),
  productsPageSize: sellerProductsPageSize(state),
  activeProduct: activeProduct(state),
  sellersPageNo: sellersPageNo(state),
  sellersPageSize: sellersPageSize(state),
  sellersPageCount: sellersPageCount(state),
  sellersCount: sellersCount(state),
  sellersSinglePageItemsCount: sellersSinglePageItemsCount(state),
  sellersLoading: sellersLoading(state),
  loadingFilters: loadingSellersFilters(state),
  sellerFilters: sellersFilters(state),
});

const mapDispatchToProps = {
  fetchSellers: (payload: SellersPayload) => fetchSellers(payload),
  fetchInventory: (data: any) => fetchInventory(data),
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
  fetchProductSellers: (payload: ProductSellersPayload) => fetchProductSellers(payload),
  setActiveProductStatus: (data: any) => setActiveProductSellerStatus(data),
  handleDeleteSeller: (merchantID: number) => handleDeleteSeller(merchantID),
  getAllSellerTrackGroups: () => getAllSellerTrackGroups(),
  postCreateSellerTrackGroup: (name: string) => postCreateSellerTrackGroup(name),
  setMenuItem: (groupID: number) => setMenuItem(groupID),
  deleteSellerTrackGroup: (groupID: number) => deleteSellerTrackGroup(groupID),
  updateSellerTrackerGroup: (group: any) => updateSellerTrackerGroup(group),
  moveMerchantToSellerTrackGroup: (merchantID: number, groupID: number) =>
    moveMerchantToSellerTrackGroup(merchantID, groupID),
  setSellersSinglePageItemsCount: (count: number) => setSellersSinglePageItemsCount(count),
  fetchSellerFilters: (query: string) => fetchSellerFilters(query),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerFinderTable);
