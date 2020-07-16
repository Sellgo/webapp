import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  fetchSupplierProductDetailChartRank,
  fetchSupplierProductDetailChartPrice,
  fetchSupplierProductDetailChartInventory,
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
  fetchSupplierProductDetailChartSellerInventory,
} from '../../../../../actions/Products';
import { Loader, Form, Divider, Grid } from 'semantic-ui-react';
import { DEFAULT_PERIOD } from '../../../../../constants/Tracker';
import {
  isFetchingRankSelector,
  isFetchingPriceSelector,
  isFetchingInventorySelector,
  isFetchingRatingSelector,
  isFetchingReviewSelector,
  isFetchingSellerInventorySelector,
} from '../../../../../selectors/Products';
import './index.scss';
import ProductPriceChart from './ProductPriceChart';
import ProductRatingChart from './ProductRatingChart';
import ProductReviewChart from './ProductReviewChart';
import InventoryInsightsChart from './InventoryInsightsChart';
import { MILLISECONDS_IN_A_DAY, MILLISECONDS_IN_A_MINUTE } from '../../../../../utils/date';

interface ProductChartsProps {
  product: any;
  productDetailRank: any;
  productDetailPrice: any;
  productDetailInventory: any;
  productDetailRating: any;
  productDetailReview: any;
  productDetailSellerInventory: any;
  fetchProductDetailChartRank: (productID: any, period?: number) => void;
  fetchProductDetailChartPrice: (productID: any, period?: number) => void;
  fetchProductDetailChartInventory: (productID: any, period?: number) => void;
  fetchProductDetailChartRating: (productID: any, period?: number) => void;
  fetchProductDetailChartReview: (productID: any, period?: number) => void;
  fetchProductDetailChartSellerInventory: (productID: any, period?: number) => void;
  isFetchingRank: boolean;
  isFetchingPrice: boolean;
  isFetchingInventory: boolean;
  isFetchingRating: boolean;
  isFetchingReview: boolean;
  isFetchingSellerInventory: boolean;
}
class ProductCharts extends Component<ProductChartsProps> {
  state = { showProductChart: 'chart0', period: DEFAULT_PERIOD };
  componentDidMount() {
    const {
      product,
      fetchProductDetailChartRank,
      fetchProductDetailChartPrice,
      fetchProductDetailChartInventory,
      fetchProductDetailChartRating,
      fetchProductDetailChartReview,
      fetchProductDetailChartSellerInventory,
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
    fetchProductDetailChartSellerInventory(product.product_id, period);
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

  /**
   * Formats an array of product details data into regularly-intervalled time series data for ingestion by Highcharts.
   * Intervals are dynamically adjusted depending on the period.
   * @param {string} type the attribute name for the product's detail value.
   * @param {[any]} data array of product details - objects with attributes 'cdate' and specified by the 'type' param.
   * @param {number} period the range of the product details data.
   * @param {number?} xMin a timestamp (in milliseconds) where any data point before this timestamp is filtered out.
   * @param {number?} xMax a timestamp (in milliseconds) where any data point after this timestamp is filtered out.
   * @returns {[[number, number]?]} an array of length-2 arrays, where the first element is the timestamp
   * in milliseconds and the second element is the value of the product detail.
   */
  formatProductDetail(type: string, data: [any], period: number, xMin?: number, xMax?: number) {
    const tempData: [number, number][] = [];
    const formattedData: [number, number][] = [];

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].cdate);
      date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60); // adjust to local TZ
      const time = date.getTime();
      if ((!xMin || time >= xMin) && (!xMax || time <= xMax)) {
        tempData.push([time, Number(data[i][type])]);
      }
    }

    // adjust for 1D
    if (tempData.length === 1) {
      const point = tempData.pop();
      if (point) {
        const end: any = new Date(point[0]);
        end.setHours(23, 59, 59, 999);
        const start: any = new Date(point[0]);
        start.setHours(0, 0, 0, 0);
        tempData.push([start.getTime(), point[1]]);
        tempData.push([end.getTime(), point[1]]);
      }
    }

    // dynamically adjust frequencies based on period
    let minutes: number;
    switch (period) {
      case 1:
        minutes = 5;
        break;
      case 7:
        minutes = 60;
        break;
      case 30:
        minutes = 240;
        break;
      case 90:
        minutes = 720;
        break;
      case 365:
        minutes = 1440;
        break;
      default:
        minutes = 60;
    }
    const timeInterval = minutes * MILLISECONDS_IN_A_MINUTE;

    // create data points at regular intervals, forward-filled.
    for (let i = 1; i < tempData.length; i++) {
      const currentPoint = tempData[i - 1];
      const nextPoint = tempData[i];
      let tempPoint = currentPoint && currentPoint.slice();

      // forward-fill
      if (tempPoint && nextPoint) {
        while (tempPoint[0] < nextPoint[0]) {
          formattedData.push([tempPoint[0], tempPoint[1]]);
          tempPoint = [tempPoint[0] + timeInterval, tempPoint[1]];
        }
      }
    }

    return formattedData;
  }

  formatSellerInventories(data: any) {
    const formattedData: any = {};
    data.forEach((item: any) => {
      const dataPoint = [new Date(item.cdate).getTime(), Number(item.inventory)];
      if (item.merchant_id in formattedData) {
        formattedData[item.merchant_id].data.push(dataPoint);
      } else {
        formattedData[item.merchant_id] = {
          name: item.merchant_name,
          data: [dataPoint],
        };
      }
    });
    return formattedData;
  }

  /** Returns the start and end (today) of the period in milliseconds.
   * @param {number} period - number of days between start and end (today).
   * @returns {[number, number]} an array containing start and end in milliseconds.
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
      productDetailSellerInventory,
    } = this.props;
    const { period } = this.state;
    let [xMin, xMax]: [number?, number?] = [undefined, undefined];
    if (period !== 1) {
      [xMin, xMax] = this.getPeriodStartAndEnd(period);
    }

    switch (this.state.showProductChart) {
      case 'chart0': {
        const formattedRanks = this.formatProductDetail(
          'rank',
          productDetailRank,
          period,
          xMin,
          xMax
        );
        const formattedSellerInventories: any = this.formatSellerInventories(
          productDetailSellerInventory
        );
        const formattedProductInventories = this.formatProductDetail(
          'inventory',
          productDetailInventory,
          period,
          xMin,
          xMax
        );
        return (
          <InventoryInsightsChart
            productRanks={formattedRanks}
            productInventories={formattedProductInventories}
            sellerInventories={formattedSellerInventories}
            period={period}
            xMax={xMax}
            xMin={xMin}
          />
        );
      }

      case 'chart1': {
        const formattedPrices = this.formatProductDetail(
          'price',
          productDetailPrice,
          period,
          xMin,
          xMax
        );
        return (
          <ProductPriceChart
            productPrices={formattedPrices}
            period={period}
            xMax={xMax}
            xMin={xMin}
          />
        );
      }

      case 'chart2': {
        const formattedRatings = this.formatProductDetail(
          'rating',
          productDetailRating,
          period,
          xMin,
          xMax
        );
        return (
          <ProductRatingChart
            productRatings={formattedRatings}
            period={period}
            xMax={xMax}
            xMin={xMin}
          />
        );
      }

      case 'chart3': {
        const formattedReviews = this.formatProductDetail(
          'review_count',
          productDetailReview,
          period,
          xMin,
          xMax
        );
        return (
          <ProductReviewChart
            productReviews={formattedReviews}
            period={period}
            xMax={xMax}
            xMin={xMin}
          />
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
      productDetailSellerInventory,
      isFetchingRank,
      isFetchingPrice,
      isFetchingInventory,
      isFetchingRating,
      isFetchingReview,
      isFetchingSellerInventory,
    } = this.props;
    if (
      !productDetailReview ||
      !productDetailRating ||
      !productDetailRank ||
      !productDetailPrice ||
      !productDetailInventory ||
      !productDetailSellerInventory
    ) {
      return this.renderNoDataMessage();
    }
    return (
      <div className="product-detail-charts">
        <Divider />
        {!isFetchingRank &&
        !isFetchingPrice &&
        !isFetchingInventory &&
        !isFetchingRating &&
        !isFetchingReview &&
        !isFetchingSellerInventory
          ? this.renderProductCharts()
          : this.renderLoader()}
        <Form className="chart-end-form">
          <Form.Group inline={true}>
            <label />
            <Form.Radio
              label="Market Share"
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
  productDetailSellerInventory: get(state, 'product.detailSellerInventory'),
  isFetchingRank: isFetchingRankSelector(state),
  isFetchingPrice: isFetchingPriceSelector(state),
  isFetchingInventory: isFetchingInventorySelector(state),
  isFetchingRating: isFetchingRatingSelector(state),
  isFetchingReview: isFetchingReviewSelector(state),
  isFetchingSellerInventory: isFetchingSellerInventorySelector(state),
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
  fetchProductDetailChartSellerInventory: (productID: any, period?: number) =>
    fetchSupplierProductDetailChartSellerInventory(productID, period),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCharts);
