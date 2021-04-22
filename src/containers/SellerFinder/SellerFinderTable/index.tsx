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
import {
  activeProduct,
  failed,
  loadingSellers,
  sellerProductsPageNo,
  sellerProductsPageSize,
  sellers,
} from '../../../selectors/SellerFinder';
import {
  fetchInventory,
  fetchProductSellers,
  fetchSellerProducts,
  fetchSellers,
  ProductSellersPayload,
  SellersPayload,
  SellersProductsPayload,
  setActiveProductSellerStatus,
} from '../../../actions/SellerFinder';
import { connect } from 'react-redux';
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
  sellersSocket: WebSocket;
  fetchInventory: (data: any) => void;
  fetchSellerProducts: (payload: SellersProductsPayload) => void;
  fetchProductSellers: (payload: ProductSellersPayload) => void;
  productsPageNo: number;
  productsPageSize: number;
  activeProduct: any;
  setActiveProductStatus: (data: any) => void;
}

interface SearchResponse {
  job_id: string;
  status: string;
  message: string;
}
const SellerFinderTable = ({
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
}: Props) => {
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

  const expandRow = (row: any) => {
    setExpandedRow(expandedRow ? null : row.id);
    setActiveMerchant(row);
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
    }
  }, [activeProduct]);

  useEffect(() => {
    if (sellersSocket.OPEN && !sellersSocket.CONNECTING) {
      sellersSocket.onmessage = (res: any) => {
        const data: SearchResponse = JSON.parse(res.data);
        setActiveProductStatus({ ...data, asin: activeProduct.asin });
        if (data.status === SEARCH_STATUS.DONE) {
          fetchProductSellers({
            asin: activeProduct.asin,
            enableLoader: true,
            merchantId: activeMerchant.id,
          });
        }
      };
    }
  }, [activeProduct]);
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
  }, []);
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
        />
      )}
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  sellers: sellers(state),
  loadingSellers: loadingSellers(state),
  error: failed(state),
  productsPageNo: sellerProductsPageNo(state),
  productsPageSize: sellerProductsPageSize(state),
  activeProduct: activeProduct(state),
});

const mapDispatchToProps = {
  fetchSellers: (payload: SellersPayload) => fetchSellers(payload),
  fetchInventory: (data: any) => fetchInventory(data),
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
  fetchProductSellers: (payload: ProductSellersPayload) => fetchProductSellers(payload),
  setActiveProductStatus: (data: any) => setActiveProductSellerStatus(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerFinderTable);
