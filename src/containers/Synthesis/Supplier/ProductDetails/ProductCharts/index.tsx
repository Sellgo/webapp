import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  fetchSupplierProductDetailChartRank,
  fetchSupplierProductDetailChartPrice,
  fetchSupplierProductDetailChartInventory,
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../../../actions/Products';
import { Loader, Form, Divider, Grid } from 'semantic-ui-react';
import { DEFAULT_PERIOD } from '../../../../../constants/Tracker';
import {
  isFetchingRankSelector,
  isFetchingPriceSelector,
  isFetchingInventorySelector,
  isFetchingRatingSelector,
  isFetchingReviewSelector,
} from '../../../../../selectors/Products';
import './index.scss';
import ProductPriceChart from './ProductPriceChart';
import ProductRatingChart from './ProductRatingChart';
import ProductReviewChart from './ProductReviewChart';
import RankVsInventoryChart from './RankVsInventoryChart';
import { MILLISECONDS_IN_A_DAY } from '../../../../../utils/date';

interface ProductChartsProps {
  product: any;
  productDetailRank: any;
  productDetailPrice: any;
  productDetailInventory: any;
  productDetailRating: any;
  productDetailReview: any;
  fetchProductDetailChartRank: (productID: any, period?: number) => void;
  fetchProductDetailChartPrice: (productID: any, period?: number) => void;
  fetchProductDetailChartInventory: (productID: any, period?: number) => void;
  fetchProductDetailChartRating: (productID: any, period?: number) => void;
  fetchProductDetailChartReview: (productID: any, period?: number) => void;
  isFetchingRank: boolean;
  isFetchingPrice: boolean;
  isFetchingInventory: boolean;
  isFetchingRating: boolean;
  isFetchingReview: boolean;
}
class ProductCharts extends Component<ProductChartsProps> {
  state = { showProductChart: 'chart0', period: 1 };
  componentDidMount() {
    const {
      product,
      fetchProductDetailChartRank,
      fetchProductDetailChartPrice,
      fetchProductDetailChartInventory,
      fetchProductDetailChartRating,
      fetchProductDetailChartReview,
    } = this.props;
    const period =
      (localStorage.trackerFilter && JSON.parse(localStorage.trackerFilter).period) ||
      DEFAULT_PERIOD;
    this.setState({ period: period });
    fetchProductDetailChartRank(product.product_id, period);
    fetchProductDetailChartPrice(product.product_id, period);
    fetchProductDetailChartInventory(product.product_id, period);
    fetchProductDetailChartRating(product.product_id, period);
    fetchProductDetailChartReview(product.product_id, period);
  }

  renderNoDataMessage = () => {
    return <Grid centered>No data yet! Please come back after a day. </Grid>;
  };

  renderLoader = () => {
    return (
      <Loader active={true} inline="centered" className="popup-loader" size="massive">
        Loading
      </Loader>
    );
  };

  handleProductChartChange = (e: any, showProductChart: any) => this.setState({ showProductChart });

  formatProductDetail(type: string, data: any) {
    const formattedData: any[] = [];

    for (let i = 0; i < data.length; i++) {
      formattedData.push([new Date(data[i].cdate).getTime(), Number(data[i][type])]);
    }

    return formattedData;
  }

  /** Returns the start and end (today) of the period in milliseconds.
   * @param {number} period - number of days between start and end (today).
   */
  getPeriodStartAndEnd = (period: number) => {
    const end: any = new Date();
    end.setHours(23, 59, 59, 999);
    const start: any = new Date(end.getTime() - MILLISECONDS_IN_A_DAY * (period - 1));
    start.setHours(0, 0, 0, 0);
    return [start.getTime(), end.getTime()];
  };

  renderProductCharts = () => {
    const {
      productDetailRank,
      productDetailPrice,
      productDetailInventory,
      productDetailRating,
      productDetailReview,
      isFetchingRank,
      isFetchingPrice,
      isFetchingInventory,
      isFetchingRating,
      isFetchingReview,
    } = this.props;
    const { period } = this.state;
    let [xMin, xMax] = [null, null];
    if (period !== 1) {
      [xMin, xMax] = this.getPeriodStartAndEnd(period);
    }

    switch (this.state.showProductChart) {
      case 'chart0': {
        const formattedRanks = this.formatProductDetail('rank', productDetailRank);
        const formattedInventories = this.formatProductDetail('inventory', productDetailInventory);
        return isFetchingRank && isFetchingInventory ? (
          this.renderLoader()
        ) : (
          <RankVsInventoryChart
            productRanks={formattedRanks}
            productInventories={formattedInventories}
            xMax={xMax}
            xMin={xMin}
          />
        );
      }

      case 'chart1': {
        const formattedPrices = this.formatProductDetail('price', productDetailPrice);
        return isFetchingPrice ? (
          this.renderLoader()
        ) : (
          <ProductPriceChart productPrices={formattedPrices} xMax={xMax} xMin={xMin} />
        );
      }

      case 'chart2': {
        const formattedRatings = this.formatProductDetail('rating', productDetailRating);
        return isFetchingRating ? (
          this.renderLoader()
        ) : (
          <ProductRatingChart productRatings={formattedRatings} xMax={xMax} xMin={xMin} />
        );
      }

      case 'chart3': {
        const formattedReviews = this.formatProductDetail('review_count', productDetailReview);
        return isFetchingReview ? (
          this.renderLoader()
        ) : (
          <ProductReviewChart productReviews={formattedReviews} xMax={xMax} xMin={xMin} />
        );
      }

      default:
        return <div />;
    }
  };

  render() {
    const {
      productDetailRank,
      productDetailInventory,
      productDetailPrice,
      productDetailRating,
      productDetailReview,
    } = this.props;
    if (
      !productDetailReview ||
      !productDetailRating ||
      !productDetailRank ||
      !productDetailPrice ||
      !productDetailInventory
    ) {
      return <div />;
    }
    return (
      <div className="product-detail-charts">
        <Divider />
        {this.renderProductCharts()}
        <Form className="chart-end-form">
          <Form.Group inline={true}>
            <label />
            <Form.Radio
              label="Rank vs Inventory"
              value="chart0"
              checked={this.state.showProductChart === 'chart0'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Price"
              value="chart1"
              checked={this.state.showProductChart === 'chart1'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Rating"
              value="chart2"
              checked={this.state.showProductChart === 'chart2'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Review"
              value="chart3"
              checked={this.state.showProductChart === 'chart3'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  productDetailRank: get(state, 'product.detailRank'),
  productDetailPrice: get(state, 'product.detailPrice'),
  productDetailInventory: get(state, 'product.detailInventory'),
  productDetailRating: get(state, 'product.detailRating'),
  productDetailReview: get(state, 'product.detailReview'),
  isFetchingRank: isFetchingRankSelector(state),
  isFetchingPrice: isFetchingPriceSelector(state),
  isFetchingInventory: isFetchingInventorySelector(state),
  isFetchingRating: isFetchingRatingSelector(state),
  isFetchingReview: isFetchingReviewSelector(state),
});

const mapDispatchToProps = {
  fetchProductDetailChartRank: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartRank(productID, period),
  fetchProductDetailChartPrice: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartPrice(productID, period),
  fetchProductDetailChartInventory: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartInventory(productID, period),
  fetchProductDetailChartRating: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartRating(productID, period),
  fetchProductDetailChartReview: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartReview(productID, period),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCharts);
