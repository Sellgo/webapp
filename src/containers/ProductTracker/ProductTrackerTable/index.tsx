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
} from '../../../actions/ProductTracker';

import {
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../actions/Products';
import {
  setTrackerSinglePageItemsCount,
  setProductTrackerPageNumber,
} from '../../../actions/ProductTracker';
interface TrackerProps {
  productTrackerResult: ProductsPaginated[];
  productDetailRating: any;
  filteredProducts: ProductsPaginated[];
  productDetailReview: any;
  isLoadingTrackerProducts: boolean;
  filterRanges: any;
  singlePageItemsCount: number;
  trackGroup: any;
  handleMenu: any;
  productTrackID: any;
  periodValue: any;
  postCreateProductTrackGroup: (name: any) => void;
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
}
class ProductTrackerTable extends React.Component<TrackerProps> {
  state = {
    expandedRows: null,
    ColumnFilterBox: false,
    name: '',
    confirm: false,
    open: false,
  };
  componentDidMount() {
    const { retrieveTrackGroup } = this.props;
    retrieveTrackGroup();
  }

  componentWillReceiveProps(nextProps: any) {
    const { trackGroup } = this.props;
    if (nextProps && nextProps.trackGroup !== trackGroup) {
      this.setState({
        open: false,
      });
    }
  }
  handleSubmit = () => {
    const { name } = this.state;
    const { postCreateProductTrackGroup } = this.props;
    postCreateProductTrackGroup(name);
  };
  handleChange = (e: any) => {
    this.setState({ name: e.target.value });
  };

  handleConfirmMessage = () => {
    this.setState({
      confirm: true,
    });
  };
  handleCancel = () => {
    this.setState({
      confirm: false,
    });
  };

  handleUntrack = (id: any, trackId: any) => {
    const { updateProductTrackingStatus, productTrackID } = this.props;
    updateProductTrackingStatus('inactive', undefined, productTrackID, trackId, 'tracker');
    this.setState({
      confirm: false,
    });
  };

  handleAddGroup = (e: any) => {
    this.setState({
      open: true,
    });
  };
  handleCreateCancel = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = (e: any) => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
  };
  handleMoveGroup = (groupId: any) => {
    const { updateProductTrackingStatus } = this.props;
    updateProductTrackingStatus('active', undefined, groupId, undefined, 'tracker');
  };

  renderCheckbox = (row: ProductTrackerDetails) => {
    return <Checkbox />;
  };
  renderProductInfo = (row: ProductTrackerDetails) => {
    return <ProductDescription item={row} />;
  };
  renderAvgProfit = (row: ProductTrackerDetails) => (
    <p className="stat">{formatCurrency(row.avg_profit)}</p>
  );
  renderAvgPrice = (row: ProductTrackerDetails) => <p className="stat">${row.avg_price}</p>;
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
        <p className="stat">{row.avg_margin}%</p>
        <span className="caret-icon">
          <Icon className="caret down" onClick={() => toggleExpandRow(row.product_id)} />
        </span>
      </div>
    );
  };
  renderAvgUnitSold = (row: ProductTrackerDetails) => {
    return (
      <>
        <p className="stat">{formatNumber(row.avg_daily_sales)}</p>
      </>
    );
  };
  renderDailyRevenue = (row: ProductTrackerDetails) => {
    return <p className="stat">${row.avg_daily_revenue}</p>;
  };
  renderAvgROI = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.avg_roi} %</p>;
  };
  renderAvgRank = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.avg_rank}</p>;
  };
  renderDimensions = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.dimension}</p>;
  };
  renderWeight = (row: ProductTrackerDetails) => {
    return <p className="stat">{row.weight}</p>;
  };
  renderIcons = (row: ProductTrackerDetails) => {
    const { trackGroup } = this.props;
    return (
      <OtherSort
        row={row}
        group={trackGroup}
        handleUntrack={(id: any, trackId: any) => this.handleUntrack(id, trackId)}
        handleCancel={this.handleCancel}
        handleConfirmMessage={this.handleConfirmMessage}
        confirm={this.state.confirm}
        handleMoveGroup={(id: any) => this.handleMoveGroup(id)}
      />
    );
  };

  columns: Column[] = [
    // {
    //   check: true,
    //   sortable: false,
    //   show: true,
    //   render: this.renderCheckbox,
    // },

    {
      label: 'PRODUCT INFORMATION',
      show: true,
      render: this.renderProductInfo,
    },

    // {
    //   label: 'KPI',
    //   type: 'number',
    //   show: true,
    // },
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
    // {
    //   label: 'Reviews',
    //   type: 'number',
    //   show: true,
    //   sortable: true,
    //   // render: this.renderDetailButtons,
    // },
    // {
    //   label: 'Rating',
    //   type: 'number',
    //   show: true,
    //   sortable: true,
    //   //render: this.renderDetailButtons,
    // },
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
      trackGroup,
      handleMenu,
      productTrackID,
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
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            group={trackGroup}
            handleMenu={handleMenu}
            open={this.state.open}
            productTrackID={productTrackID}
            handleAddGroup={this.handleAddGroup}
            handleCreateCancel={this.handleCreateCancel}
          />
        </div>
        {/* <AddProduct /> */}
        {/* {ColumnFilterBox && <ColumnFilterCard />} */}
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
    trackGroup: get(state, 'productTracker.trackerGroup'),
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
