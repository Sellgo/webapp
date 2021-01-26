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
  removeProductTrackGroup,
  fetchOOS90,
} from '../../../actions/ProductTracker';

import {
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../actions/Products';
import { columnFilter } from '../../../constants/Tracker';
import ProductTrackerFilterSection from '../ProductTrackerFilterSection';
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
import { getOOS90, loadingOOS90 } from '../../../selectors/ProductTracker';

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
  removeProductTrackGroup: (payload: any) => void;
  fetchOOS90: (payload: any) => void;
  loadingOOS90: boolean;
  OOS90: any;
}
class ProductTrackerTable extends React.Component<TrackerProps> {
  state = {
    expandedRows: null,
    ColumnFilterBox: false,
    name: '',
    confirm: false,
    open: false,
    error: false,
    editError: false,
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
    isValidCostValue: false,
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
    if (!_.isEmpty(name.trim())) {
      postCreateProductTrackGroup(name);
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
    }
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
    if (!_.isEmpty(group.name.trim())) {
      this.props.updateProductTrackGroup(group);
      this.setState({
        editGroup: false,
        editError: false,
      });
    } else {
      this.setState({ editError: true });
    }
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

  renderOOS = (row: ProductTrackerDetails) => {
    const { fetchOOS90, loadingOOS90, OOS90 } = this.props;
    return (
      <p className="stat">
        <span>{isNaN(parseFloat(row.amazon_oos_90)) ? '-' : `${row.amazon_oos_90}%`}</span>
        <span>
          <Icon
            loading={loadingOOS90 && OOS90.id === row.id}
            disabled={loadingOOS90 && OOS90.id !== row.id}
            name="refresh"
            color="grey"
            onClick={() => {
              if (!loadingOOS90) {
                fetchOOS90(row);
              }
            }}
          />
        </span>
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
    return <p>{truncateString(row.source, 25)}</p>;
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
      label: 'Out Of\nStock %',
      dataKey: 'amazon_oos_90',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderOOS,
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

  updateCostValue = (value: any) => {
    if (isNaN(value) || parseFloat(value) < 0) {
      this.setState({ isValidCostValue: false });
    } else {
      this.setState({ isValidCostValue: true });
      this.setState({ product_cost: parseFloat(value) });
    }
  };

  handleKeepTracking = (groupID: any) => {
    this.props.removeProductTrackGroup(groupID);
    this.setState({
      deleteGroup: false,
    });
  };

  render() {
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
    } = this.props;
    const { ColumnFilterBox, editCost, product_cost } = this.state;

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
            handleDeleteGroupCancel={this.handleKeepTracking}
            handleDeleteGroupSubmit={this.handleDeleteGroupSubmit}
            handleEditGroup={this.handleEditGroup}
            handleEditGroupCancel={this.handleEditGroupCancel}
            handleEditGroupSubmit={this.handleEditGroupSubmit}
            editError={this.state.editError}
            filteredProducts={filteredProducts}
          />
        </div>
        <ProductTrackerFilterSection />
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
          toggleColumnCheckbox={this.handleClick}
          showFilter={true}
          handleColumnDrop={this.handleColumnDrop}
          reorderColumns={this.reorderColumns}
          columnDnD={true}
          middleScroll={true}
          rowExpander={this.renderDV}
          defaultSort={this.state.defaultSort}
          onSort={defaultSort => this.setState({ defaultSort })}
          scrollToView={this.state.scrollView}
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
                        onChange={(evt: any, data: any) => {
                          this.updateCostValue(data.value);
                        }}
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
                        disabled={
                          product_cost > (parseFloat(costDetails.avg_price) / 100) * 150 ||
                          !this.state.isValidCostValue
                        }
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
    loadingOOS90: loadingOOS90(state),
    OOS90: getOOS90(state),
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
  removeProductTrackGroup: (payload: any) => removeProductTrackGroup(payload),
  fetchOOS90,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerTable);
