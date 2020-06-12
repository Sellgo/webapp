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
import RankVsInventoryChart from './RankVsInventoryChart';
import SellerInventoryChart from './SellerInventoryChart';

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
  state = { showProductChart: 'chart0' };
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

  formatProductDetail(type: string, data: any) {
    return data.map((item: any) => [new Date(item.cdate).getTime(), Number(item[type])]);
  }

  formatSellerInventories(data: any) {
    const formattedData: any = {};
    data.forEach((item: any) => {
      const dataPoint = [new Date(item.cdate).getTime(), Number(item.inventory)];
      if (item.merchant_name in formattedData) {
        formattedData[item.merchant_name].push(dataPoint);
      } else {
        formattedData[item.merchant_name] = [dataPoint];
      }
    });
    return formattedData;
  }

  renderProductCharts = () => {
    const {
      productDetailRank,
      productDetailPrice,
      productDetailInventory,
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

    switch (this.state.showProductChart) {
      case 'chart0': {
        const formattedRanks = this.formatProductDetail('rank', productDetailRank);
        const formattedInventories = this.formatProductDetail('inventory', productDetailInventory);
        return isFetchingRank && isFetchingInventory ? (
          this.renderLoader()
        ) : formattedRanks.length || formattedInventories.length ? (
          <RankVsInventoryChart
            productRanks={formattedRanks}
            productInventories={formattedInventories}
          />
        ) : (
          this.renderNoDataMessage()
        );
      }

      case 'chart1': {
        const formattedPrices = this.formatProductDetail('price', productDetailPrice);
        return isFetchingPrice ? (
          this.renderLoader()
        ) : formattedPrices.length ? (
          <ProductPriceChart productPrices={formattedPrices} />
        ) : (
          this.renderNoDataMessage()
        );
      }

      case 'chart2': {
        const formattedRatings = this.formatProductDetail('rating', productDetailRating);
        return isFetchingRating ? (
          this.renderLoader()
        ) : formattedRatings.length ? (
          <ProductRatingChart productRatings={formattedRatings} />
        ) : (
          this.renderNoDataMessage()
        );
      }

      case 'chart3': {
        const formattedReviews = this.formatProductDetail('review_count', productDetailReview);
        return isFetchingReview ? (
          this.renderLoader()
        ) : formattedReviews.length ? (
          <ProductReviewChart productReviews={formattedReviews} />
        ) : (
          this.renderNoDataMessage()
        );
      }

      case 'chart4': {
        const formattedSellerInventories: any = this.formatSellerInventories(
          productDetailSellerInventory
        );
        return isFetchingSellerInventory ? (
          this.renderLoader()
        ) : formattedSellerInventories ? (
          <SellerInventoryChart sellerInventories={formattedSellerInventories} />
        ) : (
          this.renderNoDataMessage()
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
            <Form.Radio
              label="Seller Inventory"
              value="chart4"
              checked={this.state.showProductChart === 'chart4'}
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
