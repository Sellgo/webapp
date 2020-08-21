import React from 'react';
import { Segment, Loader, Checkbox, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import { ProductTrackerDetails, ProductsPaginated } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import { GenericTable, Column } from '../../../components/Table';
import get from 'lodash/get';
import ProductDescription from './TrackerProductDescription';
import { formatNumber, formatCurrency, showNAIfZeroOrNull } from '../../../utils/format';
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
} from '../../../actions/ProductTracker';

import {
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../actions/Products';
import { columnFilter } from '../../../constants/Tracker';
import SelectItemsCount from '../../../components/Table/SelectItemsCount';
import ProductTrackerFilterSection from '../ProductTrackerFilterSection';
import _ from 'lodash';
import { isSubscriptionFree } from '../../../utils/subscriptions';

interface TrackerProps {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  subscriptionType: string;
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
}
class ProductTrackerTable extends React.Component<TrackerProps> {
  state = {
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
  };
  componentDidMount() {
    const { retrieveTrackGroup } = this.props;
    retrieveTrackGroup();
    this.setState({ columns: this.columns });
  }

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

  handleClick = () => {
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
            onClick={() => this.toggleExpandRow(row.id)}
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
    return <p className="stat">{row.avg_amazon_inventory ? 'Yes' : 'No'}</p>;
  };
  renderIcons = (row: ProductTrackerDetails) => {
    const { trackGroups, handleMoveGroup } = this.props;
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
      />
    );
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
      label: 'Avg\nPrice',
      dataKey: 'avg_price',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgPrice,
      className: 'pt-price',
    },
    {
      label: 'Avg\nProfit',
      dataKey: 'avg_profit',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgProfit,
    },
    {
      label: 'Avg\nMargin',
      dataKey: 'avg_margin',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgMargin,
    },
    {
      label: 'Avg Daily\nUnit Sold',
      dataKey: 'avg_daily_sales',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderAvgUnitSold,
    },
    {
      label: 'Avg Daily\nRevenue',
      dataKey: 'avg_daily_revenue',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderDailyRevenue,
    },
    {
      label: 'Avg\nROI',
      dataKey: 'avg_roi',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderAvgROI,
    },
    {
      label: 'Avg Daily\nRank',
      dataKey: 'avg_rank',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgRank,
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
    },
    {
      label: 'Reviews',
      dataKey: 'customer_reviews',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderCustomerReviews,
    },
    {
      label: 'Rating',
      dataKey: 'rating',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderRating,
    },
    {
      label: 'Avg\nInventory',
      dataKey: 'avg_inventory',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgInventory,
    },
    {
      label: 'Is Amazon\nSelling',
      dataKey: 'is_amazon_selling',
      type: 'boolean',
      show: true,
      sortable: true,
      render: this.renderIsAmazonSelling,
    },
    {
      label: 'Avg Amazon\nInventory',
      dataKey: 'avg_amazon_inventory',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgAmazonInventory,
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
    this.setState({ columnFilterData: data });
  };
  reorderColumns = (columns: Column[]) => {
    this.setState({ columns });
  };
  render() {
    const {
      isLoadingTrackerProducts,
      productTrackerResult,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      trackGroups,
      handleMenu,
      setPageNumber,
      productTrackerPageNo,
      subscriptionType,
      scrollTopSelector,
      stickyChartSelector,
      currentActiveColumn,
    } = this.props;
    const { ColumnFilterBox } = this.state;
    const showTableLock = isSubscriptionFree(subscriptionType);

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

          {!showTableLock && (
            <SelectItemsCount
              setCurrentPage={setPageNumber}
              totalCount={filteredProducts.length}
              singlePageItemsCount={singlePageItemsCount}
              currentPage={productTrackerPageNo}
              setSinglePageItemsCount={setSinglePageItemsCount}
            />
          )}
        </div>
        <ProductTrackerFilterSection />
        {!isLoadingTrackerProducts && productTrackerResult ? (
          <GenericTable
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
            setPageNumber={setPageNumber}
            name={'trackerTable'}
            columnFilterData={this.state.columnFilterData}
            handleColumnChange={this.handleColumnChange}
            count={productTrackerResult}
            productTrackerPageNo={this.props.productTrackerPageNo}
            toggleColumnCheckbox={this.handleClick}
            showFilter={true}
            showTableLock={showTableLock}
            handleColumnDrop={this.handleColumnDrop}
            reorderColumns={this.reorderColumns}
            columnDnD={true}
            middleScroll={true}
            rowExpander={this.renderDV}
            defaultSort={this.state.defaultSort}
            onSort={defaultSort => this.setState({ defaultSort })}
          />
        ) : (
          <Segment className="product-tracker-loader">
            <Loader active={true} inline="centered" size="massive">
              Loading
            </Loader>
          </Segment>
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
    singlePageItemsCount: get(state, 'productTracker.singlePageItemsCount'),
    trackGroups: get(state, 'productTracker.trackerGroup'),
    subscriptionType: get(state, 'subscription.subscriptionType'),
    scrollTopSelector: get(state, 'supplier.setScrollTop'),
    stickyChartSelector: get(state, 'supplier.setStickyChart'),
    currentActiveColumn: get(state, 'supplier.activeColumn'),
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
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerTable);
