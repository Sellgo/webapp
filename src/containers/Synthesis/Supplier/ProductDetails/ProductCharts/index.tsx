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
import SplineChart from '../../../../../components/Chart/SplineChart';
import StepLineChart from '../../../../../components/Chart/StepLineChart';
import { Loader, Form, Divider, Grid } from 'semantic-ui-react';
import { DEFAULT_PERIOD_VALUE } from '../../../../../constants/Tracker';
import {
  isFetchingRankSelector,
  isFetchingPriceSelector,
  isFetchingInventorySelector,
  isFetchingRatingSelector,
  isFetchingReviewSelector,
} from '../../../../../selectors/Products';
import './index.scss';

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
  state = { showProductChart: 'chart0' };
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
      DEFAULT_PERIOD_VALUE;
    fetchProductDetailChartRank(product.product_id, period);
    fetchProductDetailChartPrice(product.product_id, period);
    fetchProductDetailChartInventory(product.product_id, period);
    fetchProductDetailChartRating(product.product_id, period);
    fetchProductDetailChartReview(product.product_id, period);
  }

  //200416 RP: add Price - begin
  renderProductPrice = (props: any) => {
    const { popupPriceContainer } = props;
    const data = [
      {
        type: 'line',
        name: 'Price($)',
        color: '#779ADE',
        data: popupPriceContainer,
      },
    ];
    const chartOptions = {
      title: 'Price',
      data: data,
    };
    return <StepLineChart options={chartOptions} />;
  };

  renderProductRating = (props: any) => {
    const { popupRatingContainer } = props;
    const data = [
      {
        type: 'line',
        name: 'Rating',
        color: '#F3A9CA',
        data: popupRatingContainer,
      },
    ];
    const chartOptions = {
      title: 'Rating',
      data: data,
    };
    return <StepLineChart options={chartOptions} />;
  };

  renderProductReview = (props: any) => {
    const { popupReviewContainer } = props;
    const data = [
      {
        type: 'line',
        name: 'Review Count',
        color: '#0E9FE8',
        data: popupReviewContainer,
      },
    ];
    const chartOptions = {
      title: 'Review',
      data: data,
    };
    return <StepLineChart options={chartOptions} />;
  };

  renderRankVsInventory = (props: any) => {
    const { productTimeline, popupRankContainer, popupInventoryContainer } = props;
    const data = [
      {
        yAxis: 0,
        type: 'line',
        name: 'Rank',
        color: '#FD8373',
        data: popupRankContainer,
      },
      {
        yAxis: 1,
        type: 'column',
        name: 'Inventory',
        color: '#4AD991',
        data: popupInventoryContainer,
      },
    ];
    const chartOptions = {
      title: 'Rank vs Inventory',
      productTimeline: productTimeline,
      data: data,
    };
    return <SplineChart options={chartOptions} />;
  };

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
    switch (this.state.showProductChart) {
      case 'chart0': {
        const productTimeline = [];
        const popupRankContainer = [];
        const popupInventoryContainer = [];

        for (let i = 0; i < productDetailRank.length; i++) {
          productTimeline.push(new Date(productDetailRank[i].cdate).getTime());
          popupRankContainer.push([
            new Date(productDetailRank[i].cdate).getTime(),
            Number(productDetailRank[i].rank),
          ]);
        }

        for (let i = 0; i < productDetailInventory.length; i++) {
          popupInventoryContainer.push([
            new Date(productDetailInventory[i].cdate).getTime(),
            Number(productDetailInventory[i].inventory),
          ]);
        }

        return isFetchingRank && isFetchingInventory ? (
          <this.renderLoader />
        ) : (productTimeline.length && popupRankContainer.length) ||
          popupInventoryContainer.length ? (
          <this.renderRankVsInventory
            productTimeline={productTimeline}
            popupRankContainer={popupRankContainer}
            popupInventoryContainer={popupInventoryContainer}
          />
        ) : (
          <this.renderNoDataMessage />
        );
      }

      case 'chart1': {
        const popupPriceContainer = [];

        for (let i = 0; i < productDetailPrice.length; i++) {
          popupPriceContainer.push([
            new Date(productDetailPrice[i].cdate).getTime(),
            Number(productDetailPrice[i].price),
          ]);
        }

        return isFetchingPrice ? (
          <this.renderLoader />
        ) : popupPriceContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductPrice popupPriceContainer={popupPriceContainer} />
        );
      }

      case 'chart2': {
        const popupRatingContainer = [];

        for (let i = 0; i < productDetailRating.length; i++) {
          popupRatingContainer.push([
            new Date(productDetailRating[i].cdate).getTime(),
            Number(productDetailRating[i].rating),
          ]);
        }

        return isFetchingRating ? (
          <this.renderLoader />
        ) : popupRatingContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductRating popupRatingContainer={popupRatingContainer} />
        );
      }

      case 'chart3': {
        const popupReviewContainer = [];

        for (let i = 0; i < productDetailReview.length; i++) {
          popupReviewContainer.push([
            new Date(productDetailReview[i].cdate).getTime(),
            Number(productDetailReview[i].review_count),
          ]);
        }

        return isFetchingReview ? (
          <this.renderLoader />
        ) : popupReviewContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductReview popupReviewContainer={popupReviewContainer} />
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
