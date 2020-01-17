import React from 'react';
import { Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.scss';
import { ProductTrackerDetails, ProductsPaginated } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import { PaginatedTable, Column } from '../../../components/Table';
// import AddProduct from './AddProduct';
import get from 'lodash/get';
import ProductDescription from './TrackerProductDescription';
import { formatNumber } from '../../../utils/format';
import { tableKeys } from '../../../constants';
import { Checkbox, Icon } from 'semantic-ui-react';
import OtherSort from './OtherSort';
import ProductCharts from '../../Synthesis/Supplier/ProductDetails/ProductCharts';
import {
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../actions/Products';
import {
  fetchSupplierProductTrackerDetails,
  setTrackerSinglePageItemsCount,
} from '../../../actions/ProductTracker';
interface TrackerProps {
  productTrackerResult: ProductsPaginated[];
  productDetailRating: any;
  filteredProducts: ProductsPaginated[];
  productDetailReview: any;
  isLoadingTrackerProducts: boolean;
  filterRanges: any;
  singlePageItemsCount: number;
  productTracker: () => void;
  fetchProductDetailChartRating: (productID: any) => void;
  fetchProductDetailChartReview: (productID: any) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
}
class ProductTrackerTable extends React.Component<TrackerProps> {
  componentDidMount() {
    const {
      filteredProducts,
      productTracker,
      fetchProductDetailChartRating,
      fetchProductDetailChartReview,
    } = this.props;
    productTracker();
    // filteredProducts && filteredProducts.length >0 && filteredProducts.map((data, index) => {
    //   fetchProductDetailChartRating(data.product_id);
    //   fetchProductDetailChartReview(data.product_id);
    // })
  }

  state = {
    expandedRows: null,
  };
  renderCheckbox = (row: ProductTrackerDetails) => {
    return <Checkbox />;
  };
  renderProductInfo = (row: ProductTrackerDetails) => {
    return <ProductDescription item={row} />;
  };
  renderAvgProfit = (row: ProductTrackerDetails) => <p className="stat">${row.avg_profit}</p>;
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
          <Icon className="caret down" onClick={() => toggleExpandRow(row.id)} />
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
  renderIcons = (row: ProductTrackerDetails) => {
    return <OtherSort />;
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
      sortable: false,
      show: true,
      render: this.renderProductInfo,
    },

    {
      label: 'KPI',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Avg Price',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgPrice,
    },
    {
      label: 'Avg Profit',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgProfit,
    },
    {
      label: 'Avg Margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgMargin,
    },

    {
      label: 'Avg Daily Unit Sold',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgUnitSold,
    },

    {
      label: 'Avg Daily Revenue',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderDailyRevenue,
    },
    {
      label: 'Avg ROI',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgROI,
    },
    {
      label: 'Avg Daily Rank',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderAvgRank,
    },
    {
      label: 'Reviews',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Rating',
      type: 'number',
      show: true,
      sortable: true,
      //render: this.renderDetailButtons,
    },
    {
      label: 'Dimensions',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      icon: 'ellipsis horizontal',
      show: true,
      render: this.renderIcons,
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
    } = this.props;
    if (isLoadingTrackerProducts || productTrackerResult === null) {
      return (
        <Segment>
          <Loader active={true} inline="centered" size="massive">
            Loading
          </Loader>
        </Segment>
      );
    }

    return (
      <div className="tracker-table">
        <div className="tracker-menu">
          <TrackerMenu />
        </div>
        {/* <AddProduct /> */}
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
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoadingTrackerProducts: get(state, 'productTracker.isLoadingTrackerProducts'),
  productTrackerResult: get(state, 'productTracker.trackerDetails'),
  productDetailRating: get(state, 'product.detailRating'),
  productDetailReview: get(state, 'product.detailReview'),
  filteredProducts: get(state, 'productTracker.filteredProducts'),
  filterRanges: get(state, 'productTracker.filterRanges'),
  singlePageItemsCount: get(state, 'productTracker.singlePageItemsCount'),
});

const mapDispatchToProps = {
  productTracker: () => fetchSupplierProductTrackerDetails(),
  fetchProductDetailChartRating: (productID: any) =>
    fetchSupplierProductDetailChartRating(productID),
  fetchProductDetailChartReview: (productID: any) =>
    fetchSupplierProductDetailChartReview(productID),
  setSinglePageItemsCount: (itemsCount: number) => setTrackerSinglePageItemsCount(itemsCount),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTrackerTable);
