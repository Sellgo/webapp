import React from 'react';
import { Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import { ProductTrackerDetails, ProductsPaginated } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import { PaginatedTable, Column } from '../../../components/Table';
import get from 'lodash/get';
import ProductDescription from './TrackerProductDescription';
import { formatNumber, formatCurrency } from '../../../utils/format';
import { tableKeys } from '../../../constants';
import { Checkbox, Icon } from 'semantic-ui-react';
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

interface TrackerProps {
  productTrackerResult: ProductsPaginated[];
  productDetailRating: any;
  filteredProducts: any;
  productDetailReview: any;
  isLoadingTrackerProducts: boolean;
  filterRanges: any;
  singlePageItemsCount: number;
  trackGroups: any;
  handleMenu: any;
  periodValue: any;
  handleMoveGroup: any;
  handleUntrack: any;
  postCreateProductTrackGroup: (name: any) => void;
  updateProductTrackGroup: (updatedGroup: any) => void;
  deleteProductTrackGroup: (deletedGroup: any) => void;
  fetchProductDetailChartRating: (productID: any) => void;
  fetchProductDetailChartReview: (productID: any) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  setPageNumber: (pageNo: any) => void;
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
  };
  componentDidMount() {
    const { retrieveTrackGroup } = this.props;
    retrieveTrackGroup();
  }

  componentWillReceiveProps(nextProps: any) {
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

  handleAddGroup = (e: any) => {
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

  handleEditGroup = (e: any, name: string) => {
    this.setState({
      editGroup: true,
    });
  };
  handleEditGroupCancel = (e: any) => {
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

  handleDeleteGroup = (e: any) => {
    this.setState({
      deleteGroup: true,
    });
  };
  handleDeleteGroupCancel = (e: any) => {
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

  handleClick = (e: any) => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };

  handleColumnChange = (e: any, data: any) => {
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
    }
    this.setState({ columnFilterData: [...checkedData] });
  };

  renderCheckbox = (row: ProductTrackerDetails) => {
    return <Checkbox />;
  };
  renderProductInfo = (row: ProductTrackerDetails) => {
    return <ProductDescription item={row} />;
  };
  renderAvgProfit = (row: ProductTrackerDetails) => (
    <p className="stat">{row.avg_profit !== '0.00' ? formatCurrency(row.avg_profit) : 'N.A.'}</p>
  );
  renderAvgPrice = (row: ProductTrackerDetails) => (
    <p className="stat">{row.avg_price !== '0.00' ? `$${row.avg_price}` : 'N.A.'}</p>
  );
  renderAvgMargin = (row: ProductTrackerDetails) => {
    const toggleExpandRow = (id: number) => {
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
    return (
      <div className="avg-margin">
        <p className="stat">{row.avg_margin !== '0.00' ? `${row.avg_margin}%` : 'N.A.'}</p>
        <span className="caret-icon">
          <Icon className="caret down" onClick={() => toggleExpandRow(row.product_id)} />
        </span>
      </div>
    );
  };
  renderAvgUnitSold = (row: ProductTrackerDetails) => {
    return (
      <>
        <p className="stat">
          {row.avg_daily_sales !== '0.00' ? formatNumber(row.avg_daily_sales) : 'N.A.'}
        </p>
      </>
    );
  };
  renderDailyRevenue = (row: ProductTrackerDetails) => {
    return (
      <p className="stat">
        {row.avg_daily_revenue !== '0.00' ? `$${row.avg_daily_revenue}` : 'N.A.'}
      </p>
    );
  };
  renderAvgROI = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.avg_roi !== '0.00' ? `${row.avg_roi}%` : 'N.A.'}</p>;
  };
  renderAvgRank = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.avg_rank !== 0 ? row.avg_rank : 'N.A.'}</p>;
  };
  renderDimensions = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.dimension !== null ? row.dimension : 'N.A.'}</p>;
  };
  renderWeight = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.weight !== null ? row.weight : 'N.A.'}</p>;
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
      dataKey: 'PRODUCT INFORMATION',
      show: true,
      render: this.renderProductInfo,
    },
    {
      label: 'Avg Price',
      dataKey: 'avg_price',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgPrice,
    },
    {
      label: 'Avg Profit',
      dataKey: 'avg_profit',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgProfit,
    },
    {
      label: 'Avg Margin',
      dataKey: 'avg_margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgMargin,
    },
    {
      label: 'Avg Daily Unit Sold',
      dataKey: 'avg_daily_sales',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgUnitSold,
    },
    {
      label: 'Avg Daily Revenue',
      type: 'number',
      dataKey: 'avg_daily_revenue',
      show: true,
      sortable: true,
      render: this.renderDailyRevenue,
    },
    {
      label: 'Avg ROI',
      dataKey: 'avg_roi',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgROI,
    },
    {
      label: 'Avg Daily Rank',
      dataKey: 'avg_rank',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgRank,
    },
    {
      label: 'Dimensions',
      dataKey: 'dimension',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderDimensions,
    },
    {
      label: 'Weight',
      dataKey: 'weight',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderWeight,
    },
    {
      icon: 'ellipsis horizontal',
      dataKey: 'ellipsis horizontal',
      show: true,
      render: this.renderIcons,
      click: this.handleClick,
      popUp: true,
    },
  ];

  render() {
    const {
      isLoadingTrackerProducts,
      productTrackerResult,
      filteredProducts,
      filterRanges,
      singlePageItemsCount,
      setSinglePageItemsCount,
      trackGroups,
      handleMenu,
      setPageNumber,
    } = this.props;
    if (isLoadingTrackerProducts || productTrackerResult === null) {
      return (
        <Segment className="product-tracker-loader">
          <Loader active={true} inline="centered" size="massive">
            Loading
          </Loader>
        </Segment>
      );
    }

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
        {productTrackerResult && (
          <PaginatedTable
            key={`${JSON.stringify(filterRanges)}-${singlePageItemsCount}`}
            tableKey={tableKeys.PRODUCTS}
            data={filteredProducts}
            columns={this.columns}
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
  };
};

const mapDispatchToProps = {
  fetchProductDetailChartRating: (productID: any) =>
    fetchSupplierProductDetailChartRating(productID),
  fetchProductDetailChartReview: (productID: any) =>
    fetchSupplierProductDetailChartReview(productID),
  setSinglePageItemsCount: (itemsCount: number) => setTrackerSinglePageItemsCount(itemsCount),
  setPageNumber: (itemsCount: number) => setProductTrackerPageNumber(itemsCount),
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTrackerTable);
