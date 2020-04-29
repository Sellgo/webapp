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
import StepLineChart from '../../../../../components/Chart/StepLineChart';
import { Loader, Form, Divider } from 'semantic-ui-react';
import './index.scss';

interface ProductChartsProps {
  product: any;
  productDetailRank: any;
  productDetailPrice: any;
  productDetailInventory: any;
  productDetailRating: any;
  productDetailReview: any;
  productDetailKPI: any;
  fetchProductDetailChartRank: (productID: any) => void;
  fetchProductDetailChartPrice: (productID: any) => void;
  fetchProductDetailChartInventory: (productID: any) => void;
  fetchProductDetailChartRating: (productID: any) => void;
  fetchProductDetailChartReview: (productID: any) => void;
  fetchProductDetailChartKPI: (supplierID: any, productID: any) => void;
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
    fetchProductDetailChartRank(product.product_id);
    fetchProductDetailChartPrice(product.product_id);
    fetchProductDetailChartInventory(product.product_id);
    fetchProductDetailChartRating(product.product_id);
    fetchProductDetailChartReview(product.product_id);
    fetchProductDetailChartKPI(
      product.supplierID ? product.supplierID : product.supplier_id,
      product.product_id
    );
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

  renderPriceVsRating = (props: any) => {
    const { productTimeline, popupPriceContainer, popupRatingContainer } = props;
    const data = [
      {
        yAxis: 0,
        type: 'line',
        name: 'Price',
        color: '#FD8373',
        data: popupPriceContainer,
      },
      {
        yAxis: 1,
        type: 'line',
        name: 'Rating',
        color: '#4AD991',
        data: popupRatingContainer,
      },
    ];
    const chartOptions = {
      title: 'Price vs Rating',
      productTimeline: productTimeline,
      data: data,
    };
    return <SplineChart options={chartOptions} />;
  };

  handleProductChartChange = (e: any, showProductChart: any) => this.setState({ showProductChart });

  renderProductCharts = () => {
    const {
      productDetailRank,
      productDetailPrice,
      productDetailInventory,
      productDetailRating,
      productDetailReview,
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

        return (productTimeline.length && popupRankContainer.length) ||
          popupInventoryContainer.length ? (
          <this.renderRankVsInventory
            productTimeline={productTimeline}
            popupRankContainer={popupRankContainer}
            popupInventoryContainer={popupInventoryContainer}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupPriceContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupRatingContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupReviewContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : (
          <this.renderProductReview popupReviewContainer={popupReviewContainer} />
        );
      }

      case 'chart4': {
        const productTimeline = [];
        const popupPriceContainer = [];
        const popupRatingContainer = [];

        for (let i = 0; i < productDetailPrice.length; i++) {
          productTimeline.push(new Date(productDetailPrice[i].cdate).getTime());
          popupPriceContainer.push([
            new Date(productDetailPrice[i].cdate).getTime(),
            Number(productDetailPrice[i].price),
          ]);
        }

        for (let i = 0; i < productDetailRating.length; i++) {
          popupRatingContainer.push([
            new Date(productDetailRating[i].cdate).getTime(),
            Number(productDetailRating[i].rating),
          ]);
        }

        return (productTimeline.length && popupPriceContainer.length) ||
          popupRatingContainer.length ? (
          <this.renderPriceVsRating
            productTimeline={productTimeline}
            popupPriceContainer={popupPriceContainer}
            popupRatingContainer={popupRatingContainer}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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
        <Form>
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
  productDetailKPI: get(state, 'product.detailKPI'),
});

const mapDispatchToProps = {
  fetchProductDetailChartRank: (productID: any) => fetchSupplierProductDetailChartRank(productID),
  fetchProductDetailChartPrice: (productID: any) => fetchSupplierProductDetailChartPrice(productID),
  fetchProductDetailChartInventory: (productID: any) =>
    fetchSupplierProductDetailChartInventory(productID),
  fetchProductDetailChartRating: (productID: any) =>
    fetchSupplierProductDetailChartRating(productID),
  fetchProductDetailChartReview: (productID: any) =>
    fetchSupplierProductDetailChartReview(productID),
  fetchProductDetailChartKPI: (supplierID: any, productID: any) =>
    fetchSupplierProductDetailChartKPI(supplierID, productID),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCharts);
