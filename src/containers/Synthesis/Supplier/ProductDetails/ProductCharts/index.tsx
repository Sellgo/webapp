import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  fetchSupplierProductDetailChartRank,
  fetchSupplierProductDetailChartPrice,
  fetchSupplierProductDetailChartKPI,
  fetchSupplierProductDetailChartInventory,
  fetchSupplierProductDetailChartRating,
  fetchSupplierProductDetailChartReview,
} from '../../../../../actions/Products';
import SplineChart from '../../../../../components/Chart/SplineChart';
//import LineChart from '../../../../../components/Chart/LineChart';
//200416 RP: add StepLineChart - begin
import StepLineChart from '../../../../../components/Chart/StepLineChart';
//200416 RP: add StepLineChart - end
//200416 RP: add StackChartPTR - begin
import StackChartPTR from '../../../../../components/Chart/StackChartPTR';
//200416 RP: add StackChartPTR - end
import { Loader, Form, Divider, Grid } from 'semantic-ui-react';
import './index.scss';
import { DEFAULT_PERIOD_VALUE } from '../../../../../constants/Tracker';
import {
  isFetchingRankSelector,
  isFetchingPriceSelector,
  isFetchingInventorySelector,
  isFetchingRatingSelector,
  isFetchingReviewSelector,
  isFetchingKPISelector,
} from '../../../../../selectors/Products';
//import StackChart from '../../../../../components/Chart/StackChart';

interface ProductChartsProps {
  product: any;
  productDetailRank: any;
  productDetailPrice: any;
  productDetailInventory: any;
  productDetailRating: any;
  productDetailReview: any;
  productDetailKPI: any;
  fetchProductDetailChartRank: (productID: any, period?: number) => void;
  fetchProductDetailChartPrice: (productID: any, period?: number) => void;
  fetchProductDetailChartInventory: (productID: any, period?: number) => void;
  fetchProductDetailChartRating: (productID: any, period?: number) => void;
  fetchProductDetailChartReview: (productID: any, period?: number) => void;
  fetchProductDetailChartKPI: (supplierID: any, productID: any, period?: number) => void;
  isFetchingRank: boolean;
  isFetchingPrice: boolean;
  isFetchingInventory: boolean;
  isFetchingRating: boolean;
  isFetchingReview: boolean;
  isFetchingKPI: boolean;
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
      fetchProductDetailChartKPI,
    } = this.props;
    const period =
      (localStorage.trackerFilter && JSON.parse(localStorage.trackerFilter).period) ||
      DEFAULT_PERIOD_VALUE;
    fetchProductDetailChartRank(product.product_id, period);
    fetchProductDetailChartPrice(product.product_id, period);
    fetchProductDetailChartInventory(product.product_id, period);
    fetchProductDetailChartRating(product.product_id, period);
    fetchProductDetailChartReview(product.product_id, period);
    fetchProductDetailChartKPI(
      product.supplierID ? product.supplierID : product.supplier_id,
      product.product_id,
      period
    );
  }

  renderProductStatistics = (props: any) => {
    const {
      popupRankContainer,
      popupPriceContainer,
      popupInventoryContainer,
      popupRatingContainer,
      popupReviewContainer,
    } = props;
    const data = [
      {
        type: 'line',
        name: 'Price($)',
        color: '#779ADE',
        data: popupPriceContainer,
      },
      {
        type: 'line',
        name: 'Rank',
        color: '#FD8373',
        data: popupRankContainer,
      },
      {
        type: 'line',
        name: 'Inventory',
        color: '#4AD991',
        data: popupInventoryContainer,
      },
      {
        type: 'line',
        name: 'Rating',
        color: '#F3A9CA',
        data: popupRatingContainer,
      },
      {
        type: 'line',
        name: 'Review Count',
        color: '#0E9FE8',
        data: popupReviewContainer,
      },
    ];
    const chartOptions = {
      title: 'Product Statistics',
      data: data,
    };
    return <StepLineChart options={chartOptions} />;
  };

  //200416 RP: add Rank - begin
  renderProductRank = (props: any) => {
    const { popupRankContainer } = props;
    const data = [
      {
        type: 'line',
        name: 'Rank',
        color: '#FD8373',
        data: popupRankContainer,
      },
    ];
    const chartOptions = {
      title: 'Rank',
      data: data,
    };
    return <StepLineChart options={chartOptions} />;
  };
  //200416 RP: add Rank - end

  //200416 RP: add Inventory - begin
  renderProductInventory = (props: any) => {
    const { popupInventoryContainer } = props;
    const data = [
      {
        type: 'column',
        name: 'Inventory',
        color: '#4AD991',
        data: popupInventoryContainer,
      },
    ];
    const chartOptions = {
      title: 'Inventory',
      data: data,
    };
    return <StackChartPTR options={chartOptions} />;
  };
  //200416 RP: add Inventory - end

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
  //200416 RP: add Price - end

  //200416 RP: add Rating - begin
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
  //200416 RP: add Rating - end

  //200416 RP: add Review - begin
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
  //200416 RP: add Review - end

  renderROI = (props: any) => {
    const { productTimeline, productProfit, productROI } = props;
    const data = [
      {
        name: 'Total Profit($)',
        type: 'spline',
        yAxis: 1,
        data: productProfit,
      },
      {
        name: 'ROI(%)',
        type: 'spline',
        data: productROI,
      },
    ];
    const chartOptions = {
      title: 'Profit vs ROI',
      productTimeline: productTimeline,
      data: data,
    };
    return <SplineChart options={chartOptions} />;
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
    return <Grid centered>We're still processing your data! Please come back after a day. </Grid>;
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
      productDetailKPI,
      isFetchingRank,
      isFetchingPrice,
      isFetchingInventory,
      isFetchingRating,
      isFetchingReview,
      isFetchingKPI,
    } = this.props;
    switch (this.state.showProductChart) {
      case 'chart0': {
        const popupRankContainer = [];
        const popupPriceContainer = [];
        const popupInventoryContainer = [];
        const popupRatingContainer = [];
        const popupReviewContainer = [];

        for (let i = 0; i < productDetailRank.length; i++) {
          popupRankContainer.push([
            new Date(productDetailRank[i].cdate).getTime(),
            Number(productDetailRank[i].rank),
          ]);
        }
        for (let i = 0; i < productDetailPrice.length; i++) {
          popupPriceContainer.push([
            new Date(productDetailPrice[i].cdate).getTime(),
            Number(productDetailPrice[i].price),
          ]);
        }
        for (let i = 0; i < productDetailInventory.length; i++) {
          popupInventoryContainer.push([
            new Date(productDetailInventory[i].cdate).getTime(),
            Number(productDetailInventory[i].inventory),
          ]);
        }
        for (let i = 0; i < productDetailRating.length; i++) {
          popupRatingContainer.push([
            new Date(productDetailRating[i].cdate).getTime(),
            Number(productDetailRating[i].rating),
          ]);
        }
        for (let i = 0; i < productDetailReview.length; i++) {
          popupReviewContainer.push([
            new Date(productDetailReview[i].cdate).getTime(),
            Number(productDetailReview[i].review_count),
          ]);
        }

        return isFetchingRank &&
          isFetchingPrice &&
          isFetchingInventory &&
          isFetchingRating &&
          isFetchingReview &&
          isFetchingKPI ? (
          <this.renderLoader />
        ) : popupPriceContainer.length === 0 &&
          popupRankContainer.length === 0 &&
          popupInventoryContainer.length === 0 &&
          popupRatingContainer.length === 0 &&
          popupReviewContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductStatistics
            popupPriceContainer={popupPriceContainer}
            popupRankContainer={popupRankContainer}
            popupInventoryContainer={popupInventoryContainer}
            popupRatingContainer={popupRatingContainer}
            popupReviewContainer={popupReviewContainer}
          />
        );
      }
      case 'chart1': {
        const productTimeline = [];
        const productProfit = [];
        const productROI = [];

        for (let i = 0; i < productDetailKPI.length; i++) {
          productTimeline.push(new Date(productDetailKPI[i].cdate).getTime());
          productProfit.push([
            new Date(productDetailKPI[i].cdate).getTime(),
            parseFloat(productDetailKPI[i].profit),
          ]);
          productROI.push([
            new Date(productDetailKPI[i].cdate).getTime(),
            parseFloat(productDetailKPI[i].roi),
          ]);
        }
        return isFetchingKPI ? (
          <this.renderLoader />
        ) : productTimeline.length && productProfit.length && productROI.length ? (
          <this.renderROI
            productTimeline={productTimeline}
            productProfit={productProfit}
            productROI={productROI}
          />
        ) : (
          <this.renderNoDataMessage />
        );
      }

      //200416 RP: add Rank - begin
      case 'chart2': {
        const popupRankContainer = [];

        for (let i = 0; i < productDetailRank.length; i++) {
          popupRankContainer.push([
            new Date(productDetailRank[i].cdate).getTime(),
            Number(productDetailRank[i].rank),
          ]);
        }

        return isFetchingRank ? (
          <this.renderLoader />
        ) : popupRankContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductRank popupRankContainer={popupRankContainer} />
        );
      }
      //200416 RP: add Rank - end

      //200416 RP: add Inventory - begin
      case 'chart3': {
        const popupInventoryContainer = [];

        for (let i = 0; i < productDetailInventory.length; i++) {
          popupInventoryContainer.push([
            new Date(productDetailInventory[i].cdate).getTime(),
            Number(productDetailInventory[i].inventory),
          ]);
        }

        return isFetchingInventory ? (
          <this.renderLoader />
        ) : popupInventoryContainer.length === 0 ? (
          <this.renderNoDataMessage />
        ) : (
          <this.renderProductInventory popupInventoryContainer={popupInventoryContainer} />
        );
      }
      //200416 RP: add Inventory - end

      //200416 RP: add Price - begin
      case 'chart4': {
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
      //200416 RP: add Price - end

      //200416 RP: add Rating - begin
      case 'chart5': {
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
      //200416 RP: add Rating - end

      //200416 RP: add Review - begin
      case 'chart6': {
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
      //200416 RP: add Review - end

      case 'chart7': {
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

        return isFetchingInventory && isFetchingRank ? (
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

      default:
        return <div />;
    }
  };

  render() {
    const {
      productDetailRank,
      productDetailInventory,
      productDetailPrice,
      productDetailKPI,
    } = this.props;
    if (!productDetailKPI || !productDetailRank || !productDetailPrice || !productDetailInventory) {
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
              label="Statistics"
              value="chart0"
              checked={this.state.showProductChart === 'chart0'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Profit vs ROI"
              value="chart1"
              checked={this.state.showProductChart === 'chart1'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Rank"
              value="chart2"
              checked={this.state.showProductChart === 'chart2'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Inventory"
              value="chart3"
              checked={this.state.showProductChart === 'chart3'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Price"
              value="chart4"
              checked={this.state.showProductChart === 'chart4'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Rating"
              value="chart5"
              checked={this.state.showProductChart === 'chart5'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Review"
              value="chart6"
              checked={this.state.showProductChart === 'chart6'}
              onChange={(e, { value }) => this.handleProductChartChange(e, value)}
            />
            <Form.Radio
              label="Rank vs Inventory"
              value="chart7"
              checked={this.state.showProductChart === 'chart7'}
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
  productDetailKPI: get(state, 'product.detailKPI'),
  isFetchingRank: isFetchingRankSelector(state),
  isFetchingPrice: isFetchingPriceSelector(state),
  isFetchingInventory: isFetchingInventorySelector(state),
  isFetchingRating: isFetchingRatingSelector(state),
  isFetchingReview: isFetchingReviewSelector(state),
  isFetchingKPI: isFetchingKPISelector(state),
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
  fetchProductDetailChartKPI: (supplierID: any, productID: any, period?: number) =>
    fetchSupplierProductDetailChartKPI(supplierID, productID, period),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCharts);
