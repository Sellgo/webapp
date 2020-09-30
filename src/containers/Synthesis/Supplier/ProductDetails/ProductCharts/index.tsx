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
import BetaLabel from '../../../../../components/BetaLabel';
import _ from 'lodash';

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
  isLoadingTrackerProducts: boolean;
}
class ProductCharts extends Component<ProductChartsProps> {
  state = {
    showProductChart: 'chart0',
    period: DEFAULT_PERIOD,
  };
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

  componentDidUpdate(prevProps: any, prevState: any) {
    const period =
      (localStorage.trackerFilter && JSON.parse(localStorage.trackerFilter).period) ||
      DEFAULT_PERIOD;
    if (prevState.period !== period) {
      this.setState({ period: period });
    }
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
   * Formats an array of daily data (list of dicts) into smaller-intervalled data for ingestion by Highcharts.
   * Intervals are dynamically adjusted depending on the period.
   * @param {string} type the attribute name for the value in the dictionary.
   * @param {{ [key: string]: any; cdate: any; inventory: any }[]} data array of product details.
   * objects with attributes 'cdate' and specified by the 'type' param.
   * @param {number} intervalMilliseconds the range of the product details data.
   * @param {number?} xMin a timestamp (in milliseconds) where any data point before this timestamp is filtered out.
   * @param {number?} xMax a timestamp (in milliseconds) where any data point after this timestamp is filtered out.
   * @returns {[number, number | null][]} an array of length-2 arrays, where the first element is the timestamp
   * in milliseconds and the second element is the value of the product detail (null if no value).
   */
  formatTimeSeries(
    type: string,
    data: { [key: string]: any; cdate: any; inventory: any }[],
    intervalMilliseconds: number,
    xMin?: number,
    xMax?: number
  ) {
    const tempData: [number, number | null][] = [];
    const formattedData: [number, number | null][] = [];

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].cdate);
      date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60); // adjust to local TZ
      const time = date.getTime();
      if ((!xMin || time >= xMin) && (!xMax || time <= xMax)) {
        tempData.push([time, Number(data[i][type])]);
        tempData.push([time + MILLISECONDS_IN_A_DAY, Number(data[i][type])]);
      }
    }

    // create data points at regular intervals, forward-filled.
    for (let i = 1; i < tempData.length; i += 2) {
      const currentPoint = tempData[i - 1];
      const nextPoint = tempData[i];
      let tempPoint = _.clone(currentPoint);
      if (tempPoint && nextPoint) {
        while (tempPoint[0] < nextPoint[0]) {
          formattedData.push([tempPoint[0], tempPoint[1]]);
          tempPoint = [tempPoint[0] + intervalMilliseconds, tempPoint[1]];
        }
      }
    }

    return formattedData;
  }

  /** Formats an array of seller inventories daily data with @see formatTimeSeries */
  formatSellerInventories(
    type: string,
    data: any,
    intervalMilliseconds: number,
    xMin?: number,
    xMax?: number
  ) {
    const tempData: {
      [merchantId: string]: {
        name: string;
        data: { cdate: any; inventory: any }[];
      };
    } = {};
    const formattedData: {
      [merchantId: string]: {
        name: string;
        data: [number, number | null][];
      };
    } = {};

    data.forEach((item: any) => {
      const dataPoint: { cdate: any; inventory: any } = {
        cdate: item.cdate,
        inventory: item.inventory,
      };
      if (item.merchant_id in tempData) {
        tempData[item.merchant_id].data.push(dataPoint);
      } else {
        tempData[item.merchant_id] = {
          name: item.merchant_name,
          data: [dataPoint],
        };
      }
    });

    for (const merchantId in tempData) {
      const newData = this.formatTimeSeries(
        type,
        tempData[merchantId].data,
        intervalMilliseconds,
        xMin,
        xMax
      );
      const newDict = { ...tempData[merchantId], data: newData };
      formattedData[merchantId] = newDict;
    }

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

  /** Convert period (in days) to the interval (in milliseconds) to be used in the time series charts. */
  convertPeriodToIntervalMs = (period: number) => {
    let minutes = 60;
    if (period === 1) minutes = 5;
    else if (period === 7) minutes = 60;
    else if (period === 30) minutes = 240;
    else if (period === 90) minutes = 720;
    else if (period === 365) minutes = 1440;
    return minutes * MILLISECONDS_IN_A_MINUTE;
  };

  renderProductCharts = () => {
    const {
      productDetailRank,
      productDetailPrice,
      productDetailInventory,
      productDetailRating,
      productDetailReview,
      productDetailSellerInventory,
      product,
    } = this.props;
    const { period } = this.state;
    let [xMin, xMax]: [number?, number?] = [undefined, undefined];
    if (period !== 1) {
      [xMin, xMax] = this.getPeriodStartAndEnd(period);
    }
    const intervalMs = this.convertPeriodToIntervalMs(period);

    switch (this.state.showProductChart) {
      case 'chart0': {
        const formattedRanks = this.formatTimeSeries(
          'rank',
          productDetailRank,
          intervalMs,
          xMin,
          xMax
        );
        const formattedSellerInventories: any = this.formatSellerInventories(
          'inventory',
          productDetailSellerInventory,
          intervalMs,
          xMin,
          xMax
        );
        const formattedProductInventories = this.formatTimeSeries(
          'inventory',
          productDetailInventory,
          intervalMs,
          xMin,
          xMax
        );
        return (
          <InventoryInsightsChart
            productRanks={formattedRanks}
            productCategory={product.amazon_category_name}
            productInventories={formattedProductInventories}
            sellerInventories={formattedSellerInventories}
            period={period}
            xMax={xMax}
            xMin={xMin}
          />
        );
      }

      case 'chart1': {
        const formattedPrices = this.formatTimeSeries(
          'price',
          productDetailPrice,
          intervalMs,
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
        const formattedRatings = this.formatTimeSeries(
          'rating',
          productDetailRating,
          intervalMs,
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
        const formattedReviews = this.formatTimeSeries(
          'review_count',
          productDetailReview,
          intervalMs,
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
      isFetchingRank,
      isFetchingPrice,
      isFetchingInventory,
      isFetchingRating,
      isFetchingReview,
      isFetchingSellerInventory,
      isLoadingTrackerProducts,
    } = this.props;
    return (
      <div className="product-detail-charts">
        <Divider />
        {!isFetchingRank &&
        !isFetchingPrice &&
        !isFetchingInventory &&
        !isFetchingRating &&
        !isFetchingReview &&
        !isFetchingSellerInventory &&
        !isLoadingTrackerProducts
          ? this.renderProductCharts()
          : this.renderLoader()}
        <Form className="chart-end-form">
          <Form.Group inline={true}>
            <label />
            <Form.Radio
              label={
                <label>
                  Inventory Insights
                  <BetaLabel />
                </label>
              }
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
  isLoadingTrackerProducts: get(state, 'productTracker.isLoadingTrackerProducts'),
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
