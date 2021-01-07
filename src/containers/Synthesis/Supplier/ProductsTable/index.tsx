import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import './index.scss';
import { Product } from '../../../../interfaces/Product';
import get from 'lodash/get';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
  searchSupplierProducts,
  updateProfitFinderProducts,
  setSupplierPageNumber,
  triggerDataBuster,
  fetchSupplierProducts,
  setProductsLoadingDataBuster,
  pollDataBuster,
  fetchProfitFinderFilters,
} from '../../../../actions/Suppliers';
import { GenericTable, Column } from '../../../../components/Table';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  showNAIfZeroOrNull,
} from '../../../../utils/format';
import { tableKeys } from '../../../../constants';
import ProfitFinderFilterSection from '../../ProfitFinderFilterSection';
import ProductCheckBox from './productCheckBox';
import { columnFilter } from '../../../../constants/Products';
import _ from 'lodash';

import {
  supplierDetailsSelector,
  profitFinderPageNumber,
  profitFinderPageSize,
  profitFinderPageCount,
  profitFinderPageLoading,
  profitFinderFilters,
  loadingProfitFinderFilters,
  profitFinderSort,
  profitFinderSortDirection,
} from '../../../../selectors/Supplier';
import { Supplier } from '../../../../interfaces/Supplier';
import { PRODUCT_ID_TYPES } from '../../../../constants/UploadSupplier';
import { formatCompletedDate } from '../../../../utils/date';
import { returnWithRenderMethod } from '../../../../utils/tableColumn';
import PageLoader from '../../../../components/PageLoader';
import { ProfitFinderFilters } from '../../../../interfaces/Filters';

interface ProductsTableProps {
  currentActiveColumn: string;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterData: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  pageNumber: number;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    type?: string,
    supplierID?: any
  ) => void;
  openProductDetailModal: (product?: Product) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setPageNumber: (pageNumber: number) => void;
  searchProducts: (value: string, filterData: any) => void;
  updateProfitFinderProducts: (data: any) => void;
  supplierDetails: Supplier;
  productsLoadingDataBuster: number[];
  bustData: (synthesisFileID: number, productIDs: number[]) => void;
  fetchSupplierProducts: (payload: ProfitFinderFilters) => Promise<Product[] | undefined>;
  totalPages: number;
  setProductsLoadingDataBuster: typeof setProductsLoadingDataBuster;
  pollDataBuster: () => void;
  loading: boolean;
  fetchProfitFinderFilters: (payload: any) => void;
  filters: any[];
  loadingFilters: boolean;
  sort: string;
  sortDirection: string;
}

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

interface ProductsTableState {
  checkedRows: CheckedRowDictionary;
  searchValue: string;
  filteredRanges: any;
  columnFilterData: any;
  ColumnFilterBox: boolean;
  columns: Column[];
  updateTracking: boolean;
  activeColumnFilters: {
    column_type: string;
    column_value: string;
  };
  activeColumn: Column;
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedRows: {},
    searchValue: '',
    filteredRanges: [],
    columnFilterData: columnFilter,
    ColumnFilterBox: false,
    columns: [],
    updateTracking: false,
    activeColumnFilters: {
      column_type: 'slider',
      column_value: 'price',
    },
    activeColumn: {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      filter: true,
      filterSign: '$',
      show: true,
    },
  };

  updateCheckedRows = (checkedRows: CheckedRowDictionary) => {
    this.setState({ checkedRows });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    const { checkedRows } = this.state;
    const newCheckedRows = {
      ...checkedRows,
      [itemId]: isChecked,
    };

    this.setState({ checkedRows: newCheckedRows });
  };

  renderCheckBox = (row: Product) => {
    const { checkedRows } = this.state;
    let checked = false;
    if (checkedRows[row.id] !== undefined) {
      checked = checkedRows[row.id];
    }
    return <ProductCheckBox item={row} checked={checked} onClick={this.handleItemSelect} />;
  };
  renderProductInfo = (row: Product) => <ProductDescription item={row} />;

  renderASIN = (row: Product) => <p className="stat">{showNAIfZeroOrNull(row.asin, row.asin)}</p>;

  renderUPC = (row: Product) => <p className="stat">{showNAIfZeroOrNull(row.upc, row.upc)}</p>;

  renderPrice = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.price, formatCurrency(row.price))}</p>
  );

  renderCost = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.product_cost ? row.product_cost : row.default_cost,
        formatCurrency(row.product_cost ? row.product_cost : row.default_cost)
      )}
    </p>
  );

  renderProfit = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_profit, formatCurrency(row.multipack_profit))}
    </p>
  );
  renderMargin = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_margin, formatPercent(row.multipack_margin))}
    </p>
  );
  renderFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.fees, formatCurrency(row.fees))}</p>
  );
  renderMonthlyRevenue = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.monthly_revenue, '$' + formatNumber(row.monthly_revenue))}
    </p>
  );
  renderRoi = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.multipack_roi, formatPercent(row.multipack_roi))}
    </p>
  );
  renderRank = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.rank, '#' + formatNumber(row.rank))}</p>
  );
  renderMonthlySalesEst = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.sales_monthly, formatNumber(row.sales_monthly))}</p>
  );
  renderCategory = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.amazon_category_name, row.amazon_category_name)}</p>
  );
  renderMultipackQuantity = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.multipack_quantity, row.multipack_quantity)}</p>
  );
  renderSizeTiers = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.size_tier, row.size_tier)}</p>
  );
  renderLastRun = (row: Product) => (
    <p className="stat">{formatCompletedDate(new Date(row.last_syn))}</p>
  );
  renderFbaFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.fba_fee, formatCurrency(row.fba_fee))}</p>
  );
  renderReferralFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.referral_fee, formatCurrency(row.referral_fee))}</p>
  );
  renderVariableClosingFee = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.variable_closing_fee, formatCurrency(row.variable_closing_fee))}
    </p>
  );
  renderNumFbaNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.num_fba_new_offers, formatNumber(row.num_fba_new_offers))}
    </p>
  );
  renderNumFbmNewOffers = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.num_fbm_new_offers, formatNumber(row.num_fbm_new_offers))}
    </p>
  );
  renderLowNewFbaPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.low_new_fba_price, formatCurrency(row.low_new_fba_price))}
    </p>
  );
  renderLowNewFbmPrice = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.low_new_fbm_price, formatCurrency(row.low_new_fbm_price))}
    </p>
  );
  renderReviews = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? showNAIfZeroOrNull(row.customer_reviews, formatNumber(row.customer_reviews))
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );
  renderRating = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? showNAIfZeroOrNull(row.rating, row.rating)
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );
  renderIsAmazon = (row: Product) => (
    <p className="stat">
      {row.data_buster_status === 'completed'
        ? row.is_amazon_selling === null
          ? '-'
          : row.is_amazon_selling
          ? 'Yes'
          : 'No'
        : this.renderDataBusterIcon(row.product_id, row.data_buster_status)}
    </p>
  );

  renderDataBusterIcon = (productId: number, dataBusterStatus: string) => {
    const { productsLoadingDataBuster, bustData, supplierDetails } = this.props;

    if (productsLoadingDataBuster.includes(productId) || dataBusterStatus === 'processing') {
      return <Icon loading name="refresh" color="blue" />;
    } else if (dataBusterStatus === 'failed') {
      return (
        <Popup
          content="Unable to find on Amazon."
          position="top center"
          size="tiny"
          trigger={
            <Icon
              name="x"
              color="red"
              style={{ cursor: 'pointer' }}
              onClick={() => bustData(supplierDetails.synthesis_file_id, [productId])}
            />
          }
        />
      );
    } else if (!dataBusterStatus) {
      return (
        <Icon
          name="info circle"
          color="blue"
          style={{ cursor: 'pointer' }}
          onClick={() => bustData(supplierDetails.synthesis_file_id, [productId])}
        />
      );
    }
  };

  renderDetailButtons = (row: Product) => {
    const { updateProductTrackingStatus, supplierID } = this.props;
    const { updateTracking } = this.state;
    return (
      <DetailButtons
        disabled={!row.product_id}
        score={row.sellgo_score}
        isTracking={row.tracking_status === 'active'}
        onTrack={async () => {
          if (!updateTracking) {
            await this.setState({ updateTracking: true });
            if (row.tracking_status !== null) {
              await updateProductTrackingStatus(
                row.tracking_status === 'active' ? 'inactive' : 'active',
                undefined,
                row.product_track_id,
                undefined,
                'supplier',
                supplierID
              );
              await this.setState({ updateTracking: false });
            } else {
              await updateProductTrackingStatus(
                'active',
                row.product_id,
                undefined,
                undefined,
                'supplier',
                supplierID
              );
              await this.setState({ updateTracking: false });
            }
          }
        }}
      />
    );
  };

  renderSyncButtons = () => {
    return (
      <div>
        <Icon name="sync alternate" style={{ color: '#98aec9' }} />
      </div>
    );
  };

  handleColumnChange = (e: any, data: any) => {
    e.stopPropagation();
    setTimeout(() => {
      this.setState({ ColumnFilterBox: true });
    }, 10);
    const checkedData = this.state.columnFilterData;
    if (data.label === 'Select All') {
      checkedData.forEach((element: any) => {
        if (element.key !== 'Product Information' || element.key !== '') {
          element.value = data.checked;
        }
      });
    } else {
      checkedData[checkedData.findIndex((element: any) => element.key === data.label)].value =
        data.checked;
      const ckArray: boolean[] = [];
      _.each(checkedData, (ckData: any) => {
        if (ckData.key !== '' && ckData.key !== 'Select All') {
          ckArray.push(ckData.value);
        }
      });
      checkedData[
        checkedData.findIndex((element: any) => element.key === 'Select All')
      ].value = ckArray.every((val: boolean) => {
        return val;
      });
    }
    localStorage.setItem('profitFinderColumnFilterState', JSON.stringify([...checkedData]));
    this.setState({ columnFilterData: [...checkedData] });
  };
  searchFilteredProduct = (value: string) => {
    const {
      searchProducts,
      setSinglePageItemsCount,
      singlePageItemsCount,
      filterData,
    } = this.props;
    this.setState({
      searchValue: value,
    });
    searchProducts(value, filterData);
    setSinglePageItemsCount(singlePageItemsCount);
  };

  columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: this.renderCheckBox,
    },
    {
      label: 'Product Information',
      dataKey: 'title',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderProductInfo,
    },
    {
      label: 'ASIN',
      dataKey: 'asin',
      type: 'string',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderASIN,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Price',
      filterDataKey: 'price',
      filterSign: '$',
      render: this.renderPrice,
    },
    {
      label: 'Cost',
      dataKey: 'product_cost',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      render: this.renderCost,
    },
    {
      label: 'Total\nFees',
      dataKey: 'fees',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Total Fees',
      filterDataKey: 'fees',
      filterSign: '$',
      render: this.renderFee,
    },
    {
      label: 'Profit',
      dataKey: 'multipack_profit',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Profit',
      filterDataKey: 'profit',
      filterSign: '$',
      render: this.renderProfit,
    },
    {
      label: 'Margin',
      dataKey: 'multipack_margin',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Margin',
      filterDataKey: 'margin',
      filterSign: '$',
      render: this.renderMargin,
    },
    {
      label: 'ROI',
      dataKey: 'multipack_roi',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Roi',
      filterDataKey: 'roi',
      filterSign: '$',
      render: this.renderRoi,
    },
    {
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Rank',
      filterDataKey: 'rank',
      filterType: 'slider',
      filterSign: '',
      render: this.renderRank,
    },
    {
      label: 'Monthly \nSales Est',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      className: 'md-column',
      filter: true,
      filterLabel: 'Monthly Sales Est',
      filterDataKey: 'sales_monthly',
      filterSign: '$',
      render: this.renderMonthlySalesEst,
    },
    {
      label: 'Monthly\nRevenue',
      dataKey: 'monthly_revenue',
      type: 'number',
      sortable: true,
      show: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Monthly Revenue',
      filterDataKey: 'monthly_revenue',
      filterSign: '$',
      render: this.renderMonthlyRevenue,
    },
    {
      label: 'FBA Fee',
      dataKey: 'fba_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'FBA Fee',
      filterDataKey: 'fba_fee',
      filterSign: '$',
      render: this.renderFbaFee,
    },
    {
      label: 'Referral\nFee',
      dataKey: 'referral_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Referral Fee',
      filterDataKey: 'referral_fee',
      filterSign: '$',
      render: this.renderReferralFee,
    },
    {
      label: 'Variable\nClosing Fee',
      dataKey: 'variable_closing_fee',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      filter: true,
      filterLabel: 'Variable Closing Fee',
      filterDataKey: 'variable_closing_fee',
      filterSign: '$',
      render: this.renderVariableClosingFee,
    },
    {
      label: 'Is Amazon\nSelling',
      dataKey: 'is_amazon_selling',
      type: 'boolean',
      show: true,
      sortable: true,
      filter: true,
      filterLabel: 'Is Amazon Selling',
      filterDataKey: 'is_amazon_selling',
      filterType: 'list',
      render: this.renderIsAmazon,
    },
    {
      label: 'Reviews',
      dataKey: 'customer_reviews',
      type: 'number',
      show: true,
      sortable: true,
      filter: true,
      filterLabel: 'Reviews',
      filterDataKey: 'customer_reviews',
      filterSign: '',
      render: this.renderReviews,
    },
    {
      label: 'Rating',
      dataKey: 'rating',
      type: 'number',
      show: true,
      sortable: true,
      filter: true,
      filterLabel: 'Rating',
      filterDataKey: 'rating',
      filterType: 'list',
      render: this.renderRating,
    },
    {
      label: 'Num New\nFBA Offers',
      dataKey: 'num_fba_new_offers',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      filter: true,
      filterLabel: 'Num New FBA Offers',
      filterDataKey: 'num_fba_new_offers',
      filterSign: '',
      render: this.renderNumFbaNewOffers,
    },
    {
      label: 'Num New\nFBM Offers',
      dataKey: 'num_fbm_new_offers',
      type: 'number',
      show: true,
      sortable: true,
      className: 'md-column',
      filter: true,
      filterLabel: 'Num New FBM Offers',
      filterDataKey: 'num_fbm_new_offers',
      filterSign: '',
      render: this.renderNumFbmNewOffers,
    },
    {
      label: 'Low New\nFBA Price',
      dataKey: 'low_new_fba_price',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Low New FBA Offers',
      filterDataKey: 'low_new_fba_price',
      filterSign: '',
      render: this.renderLowNewFbaPrice,
    },
    {
      label: 'Low New\nFBM Price',
      dataKey: 'low_new_fbm_price',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      filter: true,
      filterLabel: 'Low New FBM Offers',
      filterDataKey: 'low_new_fbm_price',
      filterSign: '',
      render: this.renderLowNewFbmPrice,
    },
    {
      label: 'Multipack\nQty',
      dataKey: 'multipack_quantity',
      type: 'number',
      show: true,
      sortable: true,
      className: 'sm-column',
      render: this.renderMultipackQuantity,
    },
    {
      label: 'Category',
      dataKey: 'amazon_category_name',
      type: 'string',
      sortable: true,
      show: true,
      filter: true,
      filterLabel: 'Category',
      filterDataKey: 'amazon_category_name',
      filterSign: '',
      filterType: 'list',
      className: 'lg-column',
      render: this.renderCategory,
    },
    {
      label: 'Size Tier',
      dataKey: 'size_tier',
      type: 'string',
      show: true,
      sortable: true,
      className: 'xl-column',
      render: this.renderSizeTiers,
    },
    {
      label: 'UPC',
      dataKey: 'upc',
      type: 'string',
      show: true,
      sortable: true,
      className: 'md-column',
      render: this.renderUPC,
    },
    {
      label: 'Last Run',
      dataKey: 'last_run',
      type: 'string',
      show: true,
      sortable: true,
      className: 'xl-column',
      render: this.renderLastRun,
    },
    {
      label: 'Tracking',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: false,
      render: this.renderDetailButtons,
    },
    {
      label: '',
      icon: 'ellipsis horizontal ellipsis-ic',
      dataKey: 'ellipsis horizontal',
      show: true,
      // render: this.renderSyncButtons,
      popUp: true,
    },
  ];

  handleClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };

  handleColumnDrop = (e: any, data: any) => {
    localStorage.setItem('profitFinderColumnFilterState', JSON.stringify(data));
    this.setState({ columnFilterData: data });
  };
  reorderColumns = (columns: Column[]) => {
    const columnsWithRender = returnWithRenderMethod(this.columns, columns);
    localStorage.setItem('profitFinderColumnState', JSON.stringify(columns));

    const currentColumnState = JSON.parse(localStorage.getItem('profitFinderColumnState') || '[]');
    if (currentColumnState.length >= 1) {
      this.setState({ columns: columnsWithRender });
    }
  };

  // detect primary ID based on products
  detectAndUpdateProductId = () => {
    const { filteredProducts } = this.props;

    if (filteredProducts && filteredProducts.length > 0) {
      const actualPid = PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN').filter(
        pidType => filteredProducts[0][pidType.toLowerCase() as keyof Product]
      )[0];
      const columnUpcIdx = this.state.columns.findIndex(
        (element: any) => element.dataKey === 'upc'
      );
      const filterUpcIdx = this.state.columnFilterData.findIndex(
        (element: any) => element.dataKey === 'upc'
      );

      if (actualPid) {
        // update columns & filter if non-asin product id is not the default UPC
        if (actualPid !== 'UPC') {
          const newColumns = _.cloneDeep(this.state.columns);
          newColumns[columnUpcIdx] = {
            ...newColumns[columnUpcIdx],
            label: actualPid,
            dataKey: actualPid.toLowerCase(),
            render: (row: Product) => (
              <p className="stat">
                {showNAIfZeroOrNull(
                  row[actualPid.toLowerCase() as keyof Product],
                  row[actualPid.toLowerCase() as keyof Product]
                )}
              </p>
            ),
          };
          const newColumnFilterData = _.cloneDeep(this.state.columnFilterData);
          newColumnFilterData[filterUpcIdx] = {
            ...newColumnFilterData[filterUpcIdx],
            key: actualPid,
            dataKey: actualPid.toLowerCase(),
          };
          this.setState({
            columnFilterData: newColumnFilterData,
            columns: newColumns,
          });
        }
      } else {
        // no other non-asin product ids => products are asin-based
        // remove default UPC column & filter
        const newColumns = _.cloneDeep(this.state.columns);
        newColumns.splice(columnUpcIdx, 1);
        const newColumnFilterData = _.cloneDeep(this.state.columnFilterData);
        newColumnFilterData.splice(filterUpcIdx, 1);
        this.setState({
          columnFilterData: newColumnFilterData,
          columns: newColumns,
        });
      }
    }
  };
  async componentDidMount() {
    const { singlePageItemsCount } = this.props;

    const currentFilterOrder = JSON.parse(
      localStorage.getItem('profitFinderColumnFilterState') || '[]'
    );
    const currentColumnState = JSON.parse(localStorage.getItem('profitFinderColumnState') || '[]');

    if (currentFilterOrder.length >= 1) {
      this.setState({ columnFilterData: currentFilterOrder });
    }

    if (currentColumnState.length >= 1) {
      const columnsWithRender = returnWithRenderMethod(this.columns, currentColumnState);
      this.setState({ columns: columnsWithRender });
    } else {
      this.setState({ columns: this.columns });
    }
    await this.fetchSupplierProducts({ pageNo: 1, per_page: singlePageItemsCount });
  }

  componentDidUpdate(prevProps: ProductsTableProps) {
    if (prevProps.isLoadingSupplierProducts !== this.props.isLoadingSupplierProducts) {
      this.detectAndUpdateProductId();
    }
  }
  getActiveColumn = () => !!this.state.activeColumn && this.state.activeColumn.dataKey;

  getFilterValue = (dataKey: string, filterType: string): any => {
    const localFilters = localStorage.getItem(`products:${dataKey}`);
    let parsed: any;
    if (localFilters) {
      parsed = JSON.parse(localFilters);
      if (filterType === 'list') {
        parsed = parsed.value.length ? parsed : undefined;
      } else {
        parsed = Object.keys(parsed.value).length ? parsed : undefined;
      }
    }
    return parsed ? parsed : undefined;
  };

  getFilters = () => {
    const { pageNumber: page, singlePageItemsCount: per_page, sort, sortDirection } = this.props;
    return { page, per_page, sort, sortDirection };
  };

  getListFilters = (): (string | undefined)[] => {
    const { columns } = this.state;
    return columns.filter((c: Column) => c.filterType === 'list').map((c: Column) => c.dataKey);
  };

  parseFilters = (filter: any): { query: string; params: any } => {
    const { dataKey, value, filterType } = filter;
    let query = '';
    let params = {};
    if (value) {
      if (filterType === 'list') {
        params = { [dataKey]: value };
      } else {
        query = `${dataKey}_min=${value.min}&${dataKey}_max=${value.max}`;
      }
    }
    this.setState({ ColumnFilterBox: false });
    return { query, params };
  };

  getSavedFilters = (resetKey = ''): { queryString: string; queryParams: any } => {
    let queryString = '';
    let queryParams: any = {};
    this.columns.forEach((c: any) => {
      if (resetKey !== c.filterDataKey && c.filterDataKey) {
        const saved: any = this.getFilterValue(c.filterDataKey, c.filterType);

        if (saved && !!saved.value) {
          const { query, params } = this.parseFilters(saved);
          if (params) {
            queryParams = { ...queryParams, ...params };
          }
          if (query) {
            queryString = `&${queryString}&${query}`;
          }
          // queryString = !query.includes('undefined')
          //   ? `${query}&${this.parseFilters(saved).query}&`
          //   : query;
        }
      }
    });
    queryString = queryString.replace('&&', '&');
    return { queryString, queryParams };
  };

  fetchSupplierProducts = async (filter: any = {}, resetKey?: string) => {
    let payload: any = this.getFilters();
    if (filter) payload = { ...payload, ...filter };
    const { queryParams, queryString } = this.getSavedFilters(resetKey);
    let query = queryString;
    if (filter.query && filter.query.length && !query.includes(filter.query)) {
      query = `${query}&${filter.query}`;
    }
    if (query) {
      payload = { ...payload, query };
    }
    if (queryParams) {
      payload = { ...payload, params: queryParams };
    }
    const {
      fetchSupplierProducts,
      supplierID,
      setProductsLoadingDataBuster,
      pollDataBuster,
    } = this.props;
    const products = await fetchSupplierProducts({
      ...payload,
      supplierID,
      pagination: true,
    });
    if (products) {
      setProductsLoadingDataBuster(
        products.filter(p => p.data_buster_status === 'processing').map(p => p.product_id)
      );
    }
    pollDataBuster();
  };

  setActiveColumnFilters = (data: any, column_type: any) => {
    const { fetchProfitFinderFilters, supplierID } = this.props;
    const query = `column_value=${data}&column_type=${column_type}`;

    fetchProfitFinderFilters({ supplierID, query });
    this.setState({ activeColumnFilters: data });
  };

  applyFilters = async (data: any) => {
    let filter = data;
    let query = '';
    let params = {};
    if (data.filterType !== 'list') {
      filter = Object.keys(data.value).length ? data : undefined;
      if (filter) {
        query = this.parseFilters(filter).query;
      }
    } else {
      params = this.parseFilters(filter).params;
    }
    await this.fetchSupplierProducts({ query, params });
    this.setState({ ColumnFilterBox: false });
  };

  onSort = async (order: string, dataKey: string) => {
    const { currentActiveColumn } = this.props;
    let sortDirection = order === 'descending' ? 'desc' : 'asc';
    console.log('ACTIVE Col', dataKey, order);
    if (currentActiveColumn !== dataKey && order === 'descending') {
      sortDirection = 'asc';
    }
    await this.fetchSupplierProducts({
      sort: dataKey,
      sortDirection,
    });
  };

  render() {
    const {
      isLoadingSupplierProducts,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      updateProfitFinderProducts,
      pageNumber,
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
      totalPages,
      loading,
      filters,
      loadingFilters,
    } = this.props;
    const {
      searchValue,
      checkedRows,
      ColumnFilterBox,
      columns,
      columnFilterData,
      activeColumnFilters,
    } = this.state;
    return (
      <div
        className={`products-table ${isLoadingSupplierProducts && 'loading'} ${loading &&
          'disabled'}`}
      >
        {isLoadingSupplierProducts ? (
          <PageLoader pageLoading={true} />
        ) : (
          <>
            <GenericTable
              currentActiveColumn={currentActiveColumn}
              stickyChartSelector={stickyChartSelector}
              scrollTopSelector={scrollTopSelector}
              tableKey={tableKeys.PRODUCTS}
              columns={columns}
              data={filteredProducts}
              searchFilterValue={searchValue}
              showProductFinderSearch={true}
              searchFilteredProduct={this.searchFilteredProduct}
              toggleColumnFilters={this.setActiveColumnFilters}
              activeColumnFilters={activeColumnFilters}
              loadingFilters={loadingFilters}
              filterValues={filters}
              updateProfitFinderProducts={updateProfitFinderProducts}
              singlePageItemsCount={singlePageItemsCount}
              setSinglePageItemsCount={async per_page => {
                await this.fetchSupplierProducts({ page: pageNumber, per_page });
                setSinglePageItemsCount(per_page);
              }}
              currentPage={pageNumber}
              pageCount={totalPages}
              setPage={async page => {
                if (page !== pageNumber) {
                  await this.fetchSupplierProducts({ page, per_page: singlePageItemsCount });
                }
              }}
              name={'products'}
              showFilter={true}
              columnFilterBox={ColumnFilterBox}
              checkedRows={checkedRows}
              updateCheckedRows={this.updateCheckedRows}
              handleColumnChange={this.handleColumnChange}
              toggleColumnCheckbox={this.handleClick}
              columnFilterData={columnFilterData}
              middleScroll={true}
              renderFilterSectionComponent={() => <ProfitFinderFilterSection />}
              handleColumnDrop={this.handleColumnDrop}
              reorderColumns={this.reorderColumns}
              columnDnD={true}
              leftFixedColumns={2}
              rightFixedColumns={2}
              loading={loading}
              cancelColumnFilters={() => this.setState({ ColumnFilterBox: false })}
              onSort={(setSortDirection, dataKey) => {
                this.onSort(setSortDirection, dataKey ? dataKey : '');
              }}
              resetColumnFilters={(resetKey: string) => {
                this.fetchSupplierProducts(this.getFilters(), resetKey).then(() => {
                  this.setState({ ColumnFilterBox: false });
                });
              }}
              applyColumnFilters={this.applyFilters}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: get(state, 'supplier.products'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  productTrackerGroup: get(state, 'supplier.productTrackerGroup'),
  singlePageItemsCount: profitFinderPageSize(state),
  filterData: get(state, 'supplier.filterData'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  pageNumber: profitFinderPageNumber(state),
  currentActiveColumn: get(state, 'supplier.activeColumn'),
  supplierDetails: supplierDetailsSelector(state),
  productsLoadingDataBuster: get(state, 'supplier.productsLoadingDataBuster'),
  totalPages: profitFinderPageCount(state),
  loading: profitFinderPageLoading(state),
  filters: profitFinderFilters(state),
  loadingFilters: loadingProfitFinderFilters(state),
  sort: profitFinderSort(state),
  sortDirection: profitFinderSortDirection(state),
});

const mapDispatchToProps = {
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any
  ) =>
    updateProductTrackingStatus(
      status,
      productID,
      productTrackerID,
      productTrackerGroupID,
      name,
      supplierID
    ),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  searchProducts: (value: string, productData: any) => searchSupplierProducts(value, productData),
  updateProfitFinderProducts: (data: any) => updateProfitFinderProducts(data),
  bustData: (synthesisFileID: number, productIDs: number[]) =>
    triggerDataBuster(synthesisFileID, productIDs),
  fetchSupplierProducts: (payload: ProfitFinderFilters) => fetchSupplierProducts(payload),
  setProductsLoadingDataBuster,
  pollDataBuster,
  fetchProfitFinderFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
