import React from 'react';
import { Button, Checkbox, Icon, Input, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import { ProductTrackerDetails, ProductsPaginated } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import { GenericTable, Column } from '../../../components/Table';
import get from 'lodash/get';
import ProductDescription from './TrackerProductDescription';
import {
  formatNumber,
  formatCurrency,
  showNAIfZeroOrNull,
  truncateString,
} from '../../../utils/format';
import { tableKeys } from '../../../constants';
import OtherSort from './OtherSort';
import ProductCharts from '../../Synthesis/Supplier/ProductDetails/ProductCharts';
import { updateProductTrackingStatus } from '../../../actions/Suppliers';
import {
  retrieveProductTrackGroup,
  postCreateProductTrackGroup,
  setTrackerSinglePageItemsCount,
  setProductTrackerPageNumber,
  patchProductTrackGroup,
  deleteProductTrackGroup,
  setProductDetails,
  updateProductCost,
  filterTrackedProducts,
  fetchAllSupplierProductTrackerDetails,
  isTrackerFilterLoading,
} from '../../../actions/ProductTracker';

import {
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../actions/Products';
import {
  columnFilter,
  filterKeys,
  getProductTrackerCheckBoxData,
  trackerDataKeysMapping,
} from '../../../constants/Tracker';
import _ from 'lodash';
import {
  isFetchingInventorySelector,
  isFetchingPriceSelector,
  isFetchingRankSelector,
  isFetchingRatingSelector,
  isFetchingReviewSelector,
  isFetchingSellerInventorySelector,
} from '../../../selectors/Products';
import { returnWithRenderMethod } from '../../../utils/tableColumn';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import { PRODUCT_ID_TYPES } from '../../../constants/UploadSupplier';
import { NewFilterModel } from '../../../interfaces/Filters';
import FilterSection from '../FilterSection';

interface TrackerProps {
  loadingTrackerFilter: boolean;
  isFetchingRank: boolean;
  isFetchingPrice: boolean;
  isFetchingInventory: boolean;
  isFetchingRating: boolean;
  isFetchingReview: boolean;
  isFetchingSellerInventory: boolean;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  productTrackerResult: ProductsPaginated[];
  productDetailRating: any;
  filteredProducts: any;
  productDetailReview: any;
  isLoadingTrackerProducts: boolean;
  singlePageItemsCount: number;
  trackGroups: any;
  handleMenu: any;
  periodValue: any;
  handleMoveGroup: any;
  handleUntrack: any;
  currentActiveColumn: string;
  postCreateProductTrackGroup: (name: any) => void;
  updateProductTrackGroup: (updatedGroup: any) => void;
  deleteProductTrackGroup: (deletedGroup: any) => void;
  fetchProductDetailChartRating: (productID: any) => void;
  fetchProductDetailChartReview: (productID: any) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setPageNumber: (pageNo: number) => void;
  retrieveTrackGroup: () => void;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    type?: string
  ) => void;
  productTrackerPageNo: number;
  costDetails: any;
  setProductEditDetails: (payload: any) => void;
  updateCost: (payload: any) => void;
  filterProducts: (filterData: NewFilterModel[], groupId: any) => void;
  activeGroupId: any;
  filterRanges: any;
  fetchAllTrackedProductDetails: (periodValue: any) => void;
  isTrackerFilterLoading: (data: boolean) => void;
}

interface TrackerState {
  expandedRows: any;
  ColumnFilterBox: boolean;
  name: string;
  confirm: boolean;
  open: boolean;
  error: boolean;
  editGroup: boolean;
  deleteGroup: boolean;
  columnFilterData: any;
  groupError: boolean;
  activeRow: any;
  columns: any;
  defaultSort: string;
  scrollView: boolean;
  editCost: boolean;
  product_cost: any;
  activeColumnFilters: any;
  activeColumnFilterValue: any;
  localFilterData: any;
}

class ProductTrackerTable extends React.Component<TrackerProps> {
  state: TrackerState = {
    expandedRows: null,
    ColumnFilterBox: false,
    name: '',
    confirm: false,
    open: false,
    error: false,
    editGroup: false,
    deleteGroup: false,
    columnFilterData: columnFilter,
    groupError: false,
    activeRow: null,
    columns: [],
    defaultSort: '',
    scrollView: false,
    editCost: false,
    product_cost: 0,
    activeColumnFilters: {},
    activeColumnFilterValue: {},
    localFilterData: [],
  };

  componentDidMount() {
    const { retrieveTrackGroup } = this.props;
    retrieveTrackGroup();

    const currentFilterOrder = JSON.parse(
      localStorage.getItem('productTrackerColumnFilterState') || '[]'
    );
    const currentColumnState = JSON.parse(
      localStorage.getItem('productTrackerColumnState') || '[]'
    );

    if (currentFilterOrder.length >= 1) {
      this.setState({ columnFilterData: currentFilterOrder });
    }

    if (currentColumnState.length >= 1) {
      const columnsWithRender = returnWithRenderMethod(this.columns, currentColumnState);
      this.setState({ columns: columnsWithRender });
    } else {
      this.setState({ columns: this.columns });
    }

    const productTrackerFilterState = JSON.parse(
      localStorage.getItem('productTrackerFilterState') || '[]'
    );
    if (productTrackerFilterState.length >= 1) {
      this.setState({ localFilterData: productTrackerFilterState });
    } else {
      this.resetFilters();
    }
  }

  componentDidUpdate(prevProps: TrackerProps) {
    const { filterProducts, activeGroupId, filterRanges } = this.props;
    const productTrackerFilterState = JSON.parse(
      localStorage.getItem('productTrackerFilterState') || '[]'
    );
    if (
      prevProps.filterRanges !== filterRanges &&
      !_.isEmpty(filterRanges) &&
      productTrackerFilterState.length >= 1
    ) {
      filterProducts(productTrackerFilterState, activeGroupId);
      localStorage.setItem('productTrackerFilterStateActive', 'true');
    }
  }

  fetchProducts = (value: any) => {
    const { filterProducts, activeGroupId } = this.props;
    const { localFilterData } = this.state;
    const { fetchAllTrackedProductDetails, isTrackerFilterLoading } = this.props;
    isTrackerFilterLoading(true);
    fetchAllTrackedProductDetails(value);
    filterProducts(localFilterData, activeGroupId);
    localStorage.setItem('trackerPeriod', JSON.stringify(value));
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { trackGroups } = this.props;
    if (nextProps && nextProps.trackGroups !== trackGroups) {
      this.setState({ open: false });
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { name } = this.state;
    const { postCreateProductTrackGroup } = this.props;
    if (name === '') {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      postCreateProductTrackGroup(name);
    }
  };
  handleChange = (e: any) => {
    this.setState({ name: e.target.value, error: false });
  };

  handleConfirmMessage = (row: any) => {
    this.setState({
      confirm: true,
      activeRow: row,
    });
  };
  handleCancel = () => {
    this.setState({
      confirm: false,
    });
  };
  handleUntrackSubmit = (productTrackGroupId: any, id: any) => {
    this.setState({
      confirm: false,
    });
    this.props.handleUntrack(productTrackGroupId, id);
  };

  handleAddGroup = () => {
    this.setState({
      open: true,
      name: '',
    });
  };
  handleAddGroupCancel = () => {
    this.setState({
      open: false,
      error: false,
      name: '',
    });
  };
  handleAddGroupSubmit = () => {
    const { name } = this.state;
    const { postCreateProductTrackGroup } = this.props;
    postCreateProductTrackGroup(name);
  };
  handleAddGroupNameChange = (e: any) => {
    this.setState({ name: e.target.value });
  };

  handleEditGroup = () => {
    this.setState({
      editGroup: true,
    });
  };
  handleEditGroupCancel = () => {
    this.setState({
      editGroup: false,
    });
  };
  handleEditGroupSubmit = (group: any) => {
    this.props.updateProductTrackGroup(group);
    this.setState({
      editGroup: false,
    });
  };

  handleDeleteGroup = () => {
    this.setState({
      deleteGroup: true,
    });
  };
  handleDeleteGroupCancel = () => {
    this.setState({
      deleteGroup: false,
    });
  };
  handleDeleteGroupSubmit = (group: any) => {
    this.props.deleteProductTrackGroup(group);
    this.setState({
      deleteGroup: false,
    });
  };

  handleFilterBoxClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
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
        if (
          ckData.key !== 'Product Information' &&
          ckData.key !== '' &&
          ckData.key !== 'Select All'
        ) {
          ckArray.push(ckData.value);
        }
      });
      checkedData[
        checkedData.findIndex((element: any) => element.key === 'Select All')
      ].value = ckArray.every((val: boolean) => {
        return val;
      });
    }
    localStorage.setItem('productTrackerColumnFilterState', JSON.stringify([...checkedData]));
    this.setState({ columnFilterData: [...checkedData] });
  };
  renderCheckbox = () => {
    return <Checkbox />;
  };

  toggleExpandRow = (id: number) => {
    if (this.state.expandedRows === null) {
      this.setState({
        expandedRows: id,
      });
    } else if (this.state.expandedRows === id) {
      this.setState({
        expandedRows: null,
      });
    } else {
      this.setState({
        expandedRows: id,
      });
    }
  };

  renderDV = (row: ProductTrackerDetails) => {
    const iconCaretClass = this.state.expandedRows === row.id ? 'caret up' : 'caret down';
    return (
      <div className="dv-arrow">
        <span className="caret-icon" style={{ cursor: 'pointer' }}>
          <Icon
            className={iconCaretClass}
            onClick={() => {
              this.toggleExpandRow(row.id);
              this.setState({ scrollView: !this.state.scrollView });
            }}
            size="tiny"
          />
        </span>
      </div>
    );
  };
  renderProductInfo = (row: ProductTrackerDetails) => {
    return <ProductDescription item={row} renderDV={this.renderDV} />;
  };
  renderAvgProfit = (row: ProductTrackerDetails) => (
    <p className="stat">
      {showNAIfZeroOrNull(
        row.avg_profit && row.avg_profit !== '0.00',
        formatCurrency(row.avg_profit)
      )}
    </p>
  );
  renderAvgPrice = (row: ProductTrackerDetails) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.avg_price && row.avg_price !== '0.00', `$${row.avg_price}`)}
    </p>
  );
  renderAvgMargin = (row: ProductTrackerDetails) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.avg_margin && row.avg_margin !== '0.00', `${row.avg_margin}%`)}
    </p>
  );
  renderAvgUnitSold = (row: ProductTrackerDetails) => {
    return (
      <>
        <p className="stat">
          {showNAIfZeroOrNull(
            row.avg_daily_sales && row.avg_daily_sales !== '0.00',
            formatNumber(row.avg_daily_sales)
          )}
        </p>
      </>
    );
  };
  renderDailyRevenue = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(
          row.avg_daily_revenue && row.avg_daily_revenue !== '0.00',
          `$${row.avg_daily_revenue}`
        )}
      </p>
    );
  };
  renderAvgROI = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(row.avg_roi && row.avg_roi !== '0.00', `${row.avg_roi}%`)}
      </p>
    );
  };

  renderAvgRank = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(row.avg_rank && row.avg_rank !== 0, '#' + formatNumber(row.avg_rank))}
      </p>
    );
  };

  renderCustomerReviews = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(
          row.customer_reviews && row.customer_reviews !== 0,
          row.customer_reviews
        )}
      </p>
    );
  };
  renderRating = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">{showNAIfZeroOrNull(row.rating && row.rating !== '0.0', row.rating)}</p>
    );
  };
  renderDimensions = (row: ProductTrackerDetails) => {
    return <p className="stat">{showNAIfZeroOrNull(row.dimension, row.dimension)}</p>;
  };
  renderWeight = (row: ProductTrackerDetails) => {
    return <p className="stat">{showNAIfZeroOrNull(row.weight, `${row.weight} lbs`)}</p>;
  };
  renderAvgInventory = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(row.avg_inventory && row.avg_inventory !== 0, `${row.avg_inventory}`)}
      </p>
    );
  };
  renderAvgAmazonInventory = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {showNAIfZeroOrNull(
          row.avg_amazon_inventory && row.avg_amazon_inventory !== 0,
          `${row.avg_amazon_inventory}`
        )}
      </p>
    );
  };
  renderIsAmazonSelling = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {row.is_amazon_selling === null ? '-' : row.is_amazon_selling ? 'Yes' : 'No'}
      </p>
    );
  };
  renderIcons = (row: ProductTrackerDetails) => {
    const { trackGroups, handleMoveGroup, setProductEditDetails } = this.props;
    return (
      <OtherSort
        row={row}
        activeRow={this.state.activeRow}
        group={trackGroups}
        handleUntrack={this.handleUntrackSubmit}
        handleCancel={this.handleCancel}
        handleConfirmMessage={this.handleConfirmMessage}
        confirm={this.state.confirm}
        handleMoveGroup={handleMoveGroup}
        handleEdit={data => console.log(data)}
        onEditCost={() => {
          this.setState({ editCost: true });
          setProductEditDetails(row);
        }}
      />
    );
  };
  renderSource = (row: ProductTrackerDetails) => {
    return <p>{truncateString(row.source, 53)}</p>;
  };

  columns: Column[] = [
    {
      label: 'Product Information',
      dataKey: 'title',
      sortable: true,
      type: 'string',
      show: true,
      render: this.renderProductInfo,
      className: 'pt-product-info',
    },
    {
      label: 'Source',
      dataKey: 'source',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderSource,
      className: 'pt-source',
    },
    {
      label: 'Avg\nPrice',
      dataKey: 'avg_price',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgPrice,
      ...trackerDataKeysMapping.avg_price,
      className: 'pt-price',
    },
    {
      label: 'Avg\nProfit',
      dataKey: 'avg_profit',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgProfit,
      ...trackerDataKeysMapping.avg_profit,
    },
    {
      label: 'Avg\nMargin',
      dataKey: 'avg_margin',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgMargin,
      ...trackerDataKeysMapping.avg_margin,
    },
    {
      label: 'Avg Daily\nUnit Sold',
      dataKey: 'avg_daily_sales',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgUnitSold,
      ...trackerDataKeysMapping.avg_daily_sales,
    },
    {
      label: 'Avg Daily\nRevenue',
      dataKey: 'avg_daily_revenue',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderDailyRevenue,
      ...trackerDataKeysMapping.avg_daily_revenue,
    },
    {
      label: 'Avg\nROI',
      dataKey: 'avg_roi',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderAvgROI,
      ...trackerDataKeysMapping.avg_roi,
    },
    {
      label: 'Avg Daily\nRank',
      dataKey: 'avg_rank',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgRank,
      ...trackerDataKeysMapping.avg_rank,
    },
    {
      label: 'Dimensions',
      dataKey: 'dimension',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderDimensions,
    },
    {
      label: 'Weight',
      dataKey: 'weight',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderWeight,
      ...trackerDataKeysMapping.weight,
    },
    {
      label: 'Reviews',
      dataKey: 'customer_reviews',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderCustomerReviews,
      ...trackerDataKeysMapping.customer_reviews,
    },
    {
      label: 'Rating',
      dataKey: 'rating',
      type: 'string',
      show: true,
      sortable: true,
      ...trackerDataKeysMapping.rating,
      render: this.renderRating,
    },
    {
      label: 'Avg\nInventory',
      dataKey: 'avg_inventory',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgInventory,
      ...trackerDataKeysMapping.avg_inventory,
    },
    {
      label: 'Is Amazon\nSelling',
      dataKey: 'is_amazon_selling',
      type: 'boolean',
      show: true,
      sortable: true,
      ...trackerDataKeysMapping.is_amazon_selling,
      render: this.renderIsAmazonSelling,
    },
    {
      label: 'Avg Amazon\nInventory',
      dataKey: 'avg_amazon_inventory',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgAmazonInventory,
      ...trackerDataKeysMapping.avg_amazon_inventory,
      className: 'pt-avg_amazon_inventory',
    },
    {
      icon: 'ellipsis horizontal',
      dataKey: 'ellipsis horizontal',
      show: true,
      render: this.renderIcons,
      popUp: true,
      className: 'pt-actions',
    },
  ];

  handleColumnDrop = (e: any, data: any) => {
    localStorage.setItem('productTrackerColumnFilterState', JSON.stringify(data));
    this.setState({ columnFilterData: data });
  };

  reorderColumns = (columns: Column[]) => {
    const columnsWithRender = returnWithRenderMethod(this.columns, columns);
    localStorage.setItem('productTrackerColumnState', JSON.stringify(columns));

    const currentColumnState = JSON.parse(
      localStorage.getItem('productTrackerColumnState') || '[]'
    );
    if (currentColumnState.length >= 1) {
      this.setState({ columns: columnsWithRender });
    }
  };

  onEditProductCost = (payload: any) => {
    const { updateCost, periodValue } = this.props;
    updateCost({ ...payload, period: periodValue });
    this.setState({ editCost: false });
  };

  setActiveColumnFilters = (data: any, type: any) => {
    this.setState({
      activeColumnFilterValue: this.getFilterValues(data, type),
    });
    this.setState({ activeColumnFilters: data });
  };

  getFilterValues = (data: any, type: any) => {
    if (type === 'range') {
      return this.props.filterRanges[data];
    } else if (type === 'checkbox') {
      const checkboxData = getProductTrackerCheckBoxData(data);
      const filterCheckboxes = _.map(checkboxData, data => {
        const obj: any = {};
        obj.value = data;
        return obj;
      });
      return filterCheckboxes;
    }
  };

  syncPresetAndRange = (data: any) => {
    if (filterKeys.includes(data.dataKey)) {
      const { localFilterData } = this.state;
      const { filterRanges } = this.props;
      const localFilters = _.cloneDeep(localFilterData);
      const result = localFilters.filter(
        (filter: any) => filter.type === 'range' && filter.dataKey === data.dataKey
      );
      const filter: any =
        result.length >= 1
          ? result[0]
          : {
              dataKey: data.dataKey,
              label: trackerDataKeysMapping[data.dataKey].filterLabel,
              type: 'range',
              isActive: true,
              value: _.cloneDeep(filterRanges[data.dataKey]),
              range: _.cloneDeep(filterRanges[data.dataKey]),
              dateModified: Date.now(),
            };
      switch (data.operation) {
        case '≤':
          filter.value.min = filterRanges[data.dataKey].min;
          filter.value.max =
            Number(data.value) < filterRanges[data.dataKey].min
              ? filterRanges[data.dataKey].min
              : Number(data.value) > filterRanges[data.dataKey].max
              ? filterRanges[data.dataKey].max
              : Number(data.value);
          filter.range = filter.value;
          localStorage.setItem(`trackerTable:${data.dataKey}`, JSON.stringify(filter));
          return filter;
        case '≥':
          filter.value.min =
            Number(data.value) < filterRanges[data.dataKey].min
              ? filterRanges[data.dataKey].min
              : Number(data.value) > filterRanges[data.dataKey].max
              ? filterRanges[data.dataKey].max
              : Number(data.value);
          filter.value.max = filterRanges[data.dataKey].max;
          filter.range = filter.value;
          localStorage.setItem(`trackerTable:${data.dataKey}`, JSON.stringify(filter));
          return filter;
        case '=':
          filter.value.min =
            Number(filter.value) < filterRanges[data.dataKey].min
              ? filterRanges[data.dataKey].min
              : Number(data.value) > filterRanges[data.dataKey].max
              ? filterRanges[data.dataKey].max
              : Number(data.value);
          filter.value.max =
            Number(data.value) < filterRanges[data.dataKey].min
              ? filterRanges[data.dataKey].min
              : Number(data.value) > filterRanges[data.dataKey].max
              ? filterRanges[data.dataKey].max
              : Number(data.value);
          filter.range = filter.value;
          localStorage.setItem(`trackerTable:${data.dataKey}`, JSON.stringify(filter));
          return filter;
        default:
          return null;
      }
    }
  };

  resetSingleFilter = (dataKey: any, type?: string) => {
    const { filterProducts, activeGroupId } = this.props;
    const localFilterData = JSON.parse(localStorage.getItem('productTrackerFilterState') || '[]');
    const filterActive = JSON.parse(
      localStorage.getItem('productTrackerFilterStateActive') || 'false'
    );
    const localFilters = _.cloneDeep(localFilterData);
    const result = localFilters.filter((filter: any) => filter.dataKey !== dataKey);

    //profitability preset disable when profit slider change
    if (dataKey === 'avg_profit' && type === 'range') {
      const probabilityIndex = result.findIndex(
        (filter: any) => filter.type === 'profitability-preset'
      );
      if (probabilityIndex !== -1) {
        result.splice(probabilityIndex, 1);
      }
    }

    if (type === 'preset' || type === 'range') {
      localStorage.removeItem(`trackerTable:${dataKey}`);
    }

    if (filterActive) {
      this.setState({ localFilterData: result });
      filterProducts(result, activeGroupId);
    }

    localStorage.setItem('productTrackerFilterState', JSON.stringify(result));
    this.setState({ ColumnFilterBox: false });
  };

  syncFilterSlider = (filter: any) => {
    for (const trackerKey of filterKeys) {
      if (filter.dataKey === trackerKey) {
        localStorage.setItem(`trackerTable:${filter.dataKey}`, JSON.stringify(filter));
      }
    }
  };
  toggleActiveFilter = (isActive: any) => {
    const { filterProducts, activeGroupId } = this.props;
    if (isActive) {
      const productTrackerFilter = JSON.parse(
        localStorage.getItem('productTrackerFilterState') || '[]'
      );
      const rangeFilters = productTrackerFilter.filter((filter: any) => filter.type === 'range');
      if (rangeFilters.length >= 1) {
        for (const rangeFilter of rangeFilters) {
          this.syncFilterSlider(rangeFilter);
        }
      }
      this.setState({ localFilterData: productTrackerFilter });
      filterProducts(productTrackerFilter, activeGroupId);
      localStorage.setItem('productTrackerFilterStateActive', 'true');
    } else {
      for (const trackerKey of filterKeys) {
        localStorage.removeItem(`trackerTable:${trackerKey}`);
      }
      this.setState({ localFilterData: [] });
      filterProducts([], activeGroupId);
      localStorage.setItem('productTrackerFilterStateActive', 'false');
    }
  };

  setProfitability = (data: any) => {
    const { filterProducts, filterRanges, activeGroupId } = this.props;
    const localFilters: any = JSON.parse(localStorage.getItem('productTrackerFilterState') || '[]');
    const index = localFilters.findIndex((filter: any) => filter.type === 'profitability-preset');
    const hasProfit =
      localFilters.findIndex((filter: any) => filter.dataKey === 'avg_profit') !== -1;

    if (index !== -1) {
      if (data !== '') {
        if (hasProfit) {
          localFilters.map((filter: any) => {
            if (filter.type === 'range' && filter.dataKey === 'avg_profit') {
              if (data.value === 'Profitable') {
                filter.range.min = 0.01;
                filter.range.max = filterRanges.avg_profit.max;
                filter.value.min = 0.01;
                filter.value.max = filterRanges.avg_profit.max;
                filter.isNegative = false;
              } else if (data.value === 'Non-Profitable Products') {
                filter.range.min = filterRanges.avg_profit.min;
                filter.range.max = 0;
                filter.value.min = filterRanges.avg_profit.min;
                filter.value.max = 0;
                filter.isNegative = false;
              } else {
                filter.range = filterRanges.avg_profit;
                filter.value = filter.range;
                filter.isNegative = false;
              }
              localStorage.setItem(`trackerTable:avg_profit`, JSON.stringify(filter));
            }
            if (filter.type === 'profitability-preset' && data.value !== '') {
              filter.value = data.value;
              filter.dateModified = Date.now();
            }
            return filter;
          });
          this.setState({ localFilterData: localFilters });
          filterProducts(localFilters, activeGroupId);
          localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
          localStorage.setItem('productTrackerFilterStateActive', 'true');
        } else {
          const newFilter: any = {
            label: 'Profit',
            dataKey: 'avg_profit',
            isActive: true,
            type: 'range',
            value: {
              min: 0,
              max: 0,
            },
            range: {
              min: 0,
              max: 0,
            },
            isNegative: false,
            defaultValues: filterRanges.avg_profit,
          };
          if (data.value === 'Profitable') {
            newFilter.range.min = 0.01;
            newFilter.range.max = filterRanges.avg_profit.max;
            newFilter.value.min = 0.01;
            newFilter.value.max = filterRanges.avg_profit.max;
          } else if (data.value === 'Non-Profitable Products') {
            newFilter.range.min = filterRanges.avg_profit.min;
            newFilter.range.max = 0;
            newFilter.value.min = filterRanges.avg_profit.min;
            newFilter.value.max = 0;
          } else {
            newFilter.range = filterRanges.avg_profit;
            newFilter.value = newFilter.range;
          }
          localFilters.push(newFilter);
          this.setState({ localFilterData: localFilters });
          filterProducts(localFilters, activeGroupId);
          localStorage.setItem(`trackerTable:avg_profit`, JSON.stringify(newFilter));
          localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
          localStorage.setItem('productTrackerFilterStateActive', 'true');
        }
      } else {
        this.resetProfitablePreset();
      }
    } else {
      if (hasProfit) {
        localFilters.map((filter: any) => {
          if (filter.type === 'range' && filter.dataKey === 'avg_profit') {
            if (data.value === 'Profitable') {
              filter.range.min = 0.01;
              filter.range.max = filterRanges.avg_profit.max;
              filter.value.min = 0.01;
              filter.value.max = filterRanges.avg_profit.max;
              filter.isNegative = false;
            } else if (data.value === 'Non-Profitable Products') {
              filter.range.min = filterRanges.avg_profit.min;
              filter.range.max = 0;
              filter.value.min = filterRanges.avg_profit.min;
              filter.value.max = 0;
              filter.isNegative = false;
            } else {
              filter.range = filterRanges.avg_profit;
              filter.isNegative = false;
            }
            localStorage.setItem(`trackerTable:avg_profit`, JSON.stringify(filter));
          }
          return filter;
        });
        const probabilityData: NewFilterModel = { ...data };
        localFilters.push(probabilityData);
        this.setState({ localFilterData: localFilters });
        filterProducts(localFilters, activeGroupId);
        localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
        localStorage.setItem('productTrackerFilterStateActive', 'true');
      } else {
        const newFilter: any = {
          label: 'Profit',
          dataKey: 'avg_profit',
          isActive: true,
          type: 'range',
          isNegative: false,
          value: {
            min: 0,
            max: 0,
          },
          range: {
            min: 0,
            max: 0,
          },
          defaultValues: filterRanges.avg_profit,
        };
        const probabilityData: NewFilterModel = { ...data };
        if (data.value === 'Profitable') {
          newFilter.range.min = 0.01;
          newFilter.range.max = filterRanges.avg_profit.max;
          newFilter.value.min = 0.01;
          newFilter.value.max = filterRanges.avg_profit.max;
        } else if (data.value === 'Non-Profitable Products') {
          newFilter.range.min = filterRanges.avg_profit.min;
          newFilter.range.max = 0;
          newFilter.value.min = filterRanges.avg_profit.min;
          newFilter.value.max = 0;
        } else {
          newFilter.range = filterRanges.avg_profit;
          newFilter.value = newFilter.range;
        }
        localFilters.push(newFilter);
        localFilters.push(probabilityData);
        this.setState({ localFilterData: localFilters });
        filterProducts(localFilters, activeGroupId);
        localStorage.setItem(`trackerTable:avg_profit`, JSON.stringify(newFilter));
        localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
        localStorage.setItem('productTrackerFilterStateActive', 'true');
      }
    }
  };

  resetProfitablePreset = () => {
    const { localFilterData } = this.state;
    const { filterProducts, activeGroupId } = this.props;
    const localFilters: any = _.cloneDeep(localFilterData);
    const index = localFilters.findIndex((filter: any) => filter.type === 'profitability-preset');
    const profitRangeIndex = localFilters.findIndex(
      (filter: any) => filter.type === 'range' && filter.dataKey === 'avg_profit'
    );
    if (index !== -1) {
      localFilters.splice(index, 1);
    }
    if (profitRangeIndex !== -1) {
      localFilters.splice(profitRangeIndex, 1);
    }
    this.setState({ localFilterData: localFilters });
    filterProducts(localFilters, activeGroupId);
    localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
    localStorage.removeItem(`products:avg_profit`);
    localStorage.setItem('productTrackerFilterStateActive', 'true');
  };

  resetFilters = () => {
    localStorage.removeItem('productTrackerFilterState');
    localStorage.removeItem('productTrackerFilterStateActive');
    for (const trackerKey of filterKeys) {
      localStorage.removeItem(`trackerTable:${trackerKey}`);
    }
  };

  removeSlidersFiltersWithPreset = (presets: any) => {
    for (const filter of presets) {
      for (const trackerKey of filterKeys) {
        if (filter.dataKey === trackerKey) {
          localStorage.removeItem(`trackerTable:${trackerKey}`);
        }
      }
    }
  };

  resetPreset = () => {
    const { localFilterData } = this.state;
    const { filterProducts, activeGroupId } = this.props;
    const localFilters = _.cloneDeep(localFilterData);
    const removedPresets = localFilters.filter((filter: any) => filter.type === 'preset');
    if (removedPresets.length >= 1) {
      this.removeSlidersFiltersWithPreset(removedPresets);
      for (const preset of removedPresets) {
        const rangeIndex = localFilters.findIndex(
          (filter: any) => filter.type === 'range' && filter.dataKey === preset.dataKey
        );
        if (rangeIndex !== -1) {
          localFilters.splice(rangeIndex, 1);
        }
      }
    }
    const results = localFilters.filter((filter: any) => filter.type !== 'preset');
    this.setState({ localFilterData: results });
    filterProducts(results, activeGroupId);
    localStorage.setItem('productTrackerFilterState', JSON.stringify(results));
    localStorage.setItem('productTrackerFilterStateActive', 'true');
  };

  saveFilter = (data: any) => {
    const { filterProducts, activeGroupId } = this.props;
    const localFilterData = JSON.parse(localStorage.getItem('productTrackerFilterState') || '[]');
    const localFilters = _.cloneDeep(localFilterData);

    /*
      Edit saved filter
    */
    const isSaved =
      localFilters.findIndex(
        (filter: any) => filter.dataKey === data.dataKey && filter.type === data.type
      ) !== -1;
    if (isSaved) {
      const updatedFilterData = _.map(localFilters, filter => {
        if (filter.dataKey === data.dataKey && filter.type === data.type) {
          if (data.type === 'range') {
            filter.range = data.value;
            filter.value = data.value;
          } else if (data.type === 'checkbox') {
            filter.value = data.value;
          } else if (data.type === 'preset') {
            filter.operation = data.operation;
            filter.value = data.value;
          }
          filter.isActive = data.isActive;
          filter.dateModified = Date.now();
        }
        return filter;
      });

      //profitability preset disable when profit slider change
      if (data.dataKey === 'avg_profit') {
        const probabilityIndex = updatedFilterData.findIndex(
          (filter: any) => filter.type === 'profitability-preset'
        );
        if (probabilityIndex !== -1) {
          updatedFilterData.splice(probabilityIndex, 1);
        }
      }
      /*
        Preset and Range sync logic
      */
      if (data.type === 'range') {
        /*
          apply range filter and remove existing preset filter with same datakey
        */
        const index = updatedFilterData.findIndex(
          (filter: any) => filter.type === 'preset' && filter.dataKey === data.dataKey
        );
        if (index !== -1) {
          updatedFilterData.splice(index, 1);
        }
      } else if (data.type === 'preset') {
        /*
          apply preset filter and remove existing range filter with same datakey
        */
        if (data.defaultOperation !== null) {
          const NewRangeFilter = this.syncPresetAndRange(data);
          if (NewRangeFilter !== undefined) {
            localFilters.map((filter: any) => {
              if (filter.type === 'range' && filter.dataKey === data.dataKey) {
                filter.range = NewRangeFilter.value;
                filter.dateModified = NewRangeFilter.dateModified;
              }
              return filter;
            });
          }
        }
      }

      this.setState({ localFilterData: updatedFilterData });
      filterProducts(updatedFilterData, activeGroupId);
      localStorage.setItem('productTrackerFilterState', JSON.stringify(updatedFilterData));
      localStorage.setItem('productTrackerFilterStateActive', 'true');
    } else {
      /*
        New added filter
      */
      const newFilter: NewFilterModel = { ...data };
      if (data.type === 'range') {
        newFilter.range = data.value;

        /*
          apply range filter and remove existing preset with same datakey
        */
        const index = localFilters.findIndex(
          (filter: any) => filter.type === 'preset' && filter.dataKey === data.dataKey
        );
        if (index !== -1) {
          localFilters.splice(index, 1);
        }
      } else if (data.type === 'checkbox') {
        newFilter.value = data.value;
      } else if (data.type === 'preset') {
        /*
          apply preset filter and creatte range filter or sync range filter
        */
        const isRangeFilterExist =
          localFilters.findIndex(
            (filter: any) => filter.type === 'range' && filter.dataKey === data.dataKey
          ) !== -1;

        if (data.defaultOperation !== null) {
          const NewRangeFilter = this.syncPresetAndRange(data);
          if (NewRangeFilter !== undefined) {
            if (isRangeFilterExist) {
              localFilters.map((filter: any) => {
                if (filter.type === 'range' && filter.dataKey === data.dataKey) {
                  filter.range = NewRangeFilter.value;
                  filter.dateModified = NewRangeFilter.dateModified;
                }
                return filter;
              });
            } else {
              localFilters.push(NewRangeFilter);
            }
          }
        }
      }
      localFilters.push(newFilter);
      this.setState({ localFilterData: localFilters });
      filterProducts(localFilters, activeGroupId);
      localStorage.setItem('productTrackerFilterState', JSON.stringify(localFilters));
      localStorage.setItem('productTrackerFilterStateActive', 'true');
    }
  };

  applyActiveFilter = (data: any) => {
    this.saveFilter(data);
    this.setState({ ColumnFilterBox: false });
  };
  render() {
    const productTrackerFilterState = JSON.parse(
      localStorage.getItem('productTrackerFilterState') || '[]'
    );
    const {
      loadingTrackerFilter,
      isFetchingRank,
      isFetchingPrice,
      isFetchingInventory,
      isFetchingRating,
      isFetchingReview,
      isFetchingSellerInventory,
      isLoadingTrackerProducts,
      productTrackerResult,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      trackGroups,
      handleMenu,
      setPageNumber,
      productTrackerPageNo,
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
      costDetails,
      periodValue,
      filterRanges,
    } = this.props;
    const {
      ColumnFilterBox,
      editCost,
      product_cost,
      activeColumnFilters,
      activeColumnFilterValue,
      localFilterData,
    } = this.state;

    return (
      <div className="tracker-table">
        <div className="tracker-menu">
          <TrackerMenu
            groups={trackGroups}
            handleMenu={handleMenu}
            open={this.state.open}
            deleteGroup={this.state.deleteGroup}
            editGroup={this.state.editGroup}
            error={this.state.error}
            groupError={this.state.groupError}
            items={productTrackerResult}
            handleAddGroup={this.handleAddGroup}
            handleAddGroupSubmit={this.handleAddGroupSubmit}
            handleAddGroupCancel={this.handleAddGroupCancel}
            handleAddGroupNameChange={this.handleAddGroupNameChange}
            handleDeleteGroup={this.handleDeleteGroup}
            handleDeleteGroupCancel={this.handleDeleteGroupCancel}
            handleDeleteGroupSubmit={this.handleDeleteGroupSubmit}
            handleEditGroup={this.handleEditGroup}
            handleEditGroupCancel={this.handleEditGroupCancel}
            handleEditGroupSubmit={this.handleEditGroupSubmit}
          />
        </div>
        <FilterSection
          periodValue={periodValue}
          localFilterData={localFilterData}
          applyPresetFilter={this.saveFilter}
          resetPreset={this.resetPreset}
          resetSingleFilter={this.resetSingleFilter}
          setProfitability={this.setProfitability}
          filteredRanges={filterRanges}
          setPeriod={this.fetchProducts}
        />
        <GenericTable
          loading={
            isLoadingTrackerProducts ||
            isFetchingRank ||
            isFetchingPrice ||
            isFetchingInventory ||
            isFetchingRating ||
            isFetchingReview ||
            isFetchingSellerInventory ||
            loadingTrackerFilter
          }
          currentActiveColumn={currentActiveColumn}
          stickyChartSelector={stickyChartSelector}
          scrollTopSelector={scrollTopSelector}
          columnFilterBox={ColumnFilterBox}
          tableKey={tableKeys.PRODUCTS}
          data={filteredProducts}
          columns={this.state.columns}
          setPage={setPageNumber}
          currentPage={productTrackerPageNo}
          expandedRows={this.state.expandedRows}
          extendedInfo={(product: any) => <ProductCharts product={product} />}
          singlePageItemsCount={singlePageItemsCount}
          setSinglePageItemsCount={setSinglePageItemsCount}
          setPageNumber={setPageNumber}
          name={'trackerTable'}
          columnFilterData={this.state.columnFilterData}
          handleColumnChange={this.handleColumnChange}
          count={productTrackerResult}
          productTrackerPageNo={this.props.productTrackerPageNo}
          showFilter={true}
          handleColumnDrop={this.handleColumnDrop}
          reorderColumns={this.reorderColumns}
          columnDnD={true}
          middleScroll={true}
          rowExpander={this.renderDV}
          defaultSort={this.state.defaultSort}
          onSort={defaultSort => this.setState({ defaultSort })}
          scrollToView={this.state.scrollView}
          activeColumnFilters={activeColumnFilters}
          toggleColumnFilters={this.setActiveColumnFilters}
          toggleColumnCheckbox={this.handleFilterBoxClick}
          filterValues={activeColumnFilterValue}
          resetColumnFilters={this.resetSingleFilter}
          cancelColumnFilters={() => {
            this.setState({ ColumnFilterBox: false });
          }}
          applyColumnFilters={this.applyActiveFilter}
          filtersData={productTrackerFilterState}
          toggleActiveFilter={this.toggleActiveFilter}
          resetSingleFilter={this.resetSingleFilter}
          leftFixedColumns={1}
          rightFixedColumns={1}
        />

        {editCost && (
          <Modal
            open={editCost}
            className="edit-cost-modal"
            content={
              <div className="edit-cost-container">
                <div className="product-description-details">
                  <div className="product-details-image">
                    <img src={costDetails.image_url} alt={'product image'} />
                  </div>
                  <div>
                    <div>
                      <h3 className="product-title">{costDetails.title}</h3>
                    </div>
                    <div className="details">
                      <div>
                        <img
                          className="flag-img"
                          src={COUNTRY_IMAGE}
                          alt="product_img"
                          style={{ width: 40 }}
                        />
                      </div>
                      <div className="asin-details">
                        <p className="asin-text">{costDetails.asin}</p>
                        <p className="asin-sub-text">
                          {PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN')
                            .filter(pidType => pidType.toLowerCase() in costDetails)
                            .map(pidType => costDetails[pidType.toLowerCase()])[0] || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edit-cost-fields">
                  <div className="cost-labels">
                    <div>
                      <h5 className="cost-input-label">{'Current cost of Good Sold'}</h5>
                    </div>
                    <div>
                      <h5 className="cost-input-value">{'New cost of Good Sold'}</h5>
                    </div>
                  </div>
                  <div className="cost-values">
                    <div className="cost-value">
                      <p>${costDetails.product_cost}</p>
                    </div>
                    <div className="cost-input">
                      <Input
                        focus
                        onChange={(evt: any) =>
                          this.setState({ product_cost: parseFloat(evt.target.value) })
                        }
                        icon="dollar sign"
                        iconPosition="left"
                      />
                    </div>
                    <div className="action-buttons">
                      <Button
                        content="Cancel"
                        basic
                        color="red"
                        onClick={() => this.setState({ editCost: false })}
                      />
                      <Button
                        content="Save"
                        primary
                        disabled={product_cost > (parseFloat(costDetails.avg_price) / 100) * 150}
                        onClick={() =>
                          this.onEditProductCost({ ...costDetails, product_cost: product_cost })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoadingTrackerProducts: get(state, 'productTracker.isLoadingTrackerProducts'),
    productTrackerResult: get(state, 'productTracker.trackerDetails'),
    productDetailRating: get(state, 'product.detailRating'),
    productDetailReview: get(state, 'product.detailReview'),
    filteredProducts: get(state, 'productTracker.filteredProducts'),
    filterRanges: get(state, 'productTracker.filterRanges'),
    singlePageItemsCount: get(state, 'productTracker.singlePageItemsCount'),
    trackGroups: get(state, 'productTracker.trackerGroup'),
    scrollTopSelector: get(state, 'supplier.setScrollTop'),
    stickyChartSelector: get(state, 'supplier.setStickyChart'),
    currentActiveColumn: get(state, 'supplier.activeColumn'),
    isFetchingRank: isFetchingRankSelector(state),
    isFetchingPrice: isFetchingPriceSelector(state),
    isFetchingInventory: isFetchingInventorySelector(state),
    isFetchingRating: isFetchingRatingSelector(state),
    isFetchingReview: isFetchingReviewSelector(state),
    isFetchingSellerInventory: isFetchingSellerInventorySelector(state),
    loadingTrackerFilter: get(state, 'productTracker.loadingTrackerFilter'),
    costDetails: get(state, 'productTracker.costDetails'),
  };
};

const mapDispatchToProps = {
  fetchProductDetailChartRating: (productID: any) =>
    fetchSupplierProductDetailChartRating(productID),
  fetchProductDetailChartReview: (productID: any) =>
    fetchSupplierProductDetailChartReview(productID),
  setSinglePageItemsCount: (itemsCount: number) => setTrackerSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setProductTrackerPageNumber(pageNumber),
  postCreateProductTrackGroup: (name: string) => postCreateProductTrackGroup(name),
  updateProductTrackGroup: (group: any) => patchProductTrackGroup(group),
  deleteProductTrackGroup: (groupId: any) => deleteProductTrackGroup(groupId),
  retrieveTrackGroup: () => retrieveProductTrackGroup(),
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    type?: string
  ) =>
    updateProductTrackingStatus(status, productID, productTrackerID, productTrackerGroupID, type),
  setProductEditDetails: (payload: any) => setProductDetails(payload),
  updateCost: (payload: any) => updateProductCost(payload),
  filterProducts: (filterData: NewFilterModel[], groupId: any) =>
    filterTrackedProducts(filterData, groupId),
  fetchAllTrackedProductDetails: (periodValue: any) =>
    fetchAllSupplierProductTrackerDetails(periodValue),
  isTrackerFilterLoading: (data: boolean) => isTrackerFilterLoading(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerTable);
