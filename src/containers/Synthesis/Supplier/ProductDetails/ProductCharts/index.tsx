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
import LineChart from '../../../../../components/Chart/LineChart';
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
  fetchProductDetailChartKPI: (productID: any) => void;
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
    fetchProductDetailChartKPI(product.product_id);
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
        color: '#CAE1F3',
        data: popupPriceContainer,
      },
      {
        type: 'line',
        name: 'Rank',
        color: '#F3E9CA',
        data: popupRankContainer,
      },
      {
        type: 'line',
        name: 'Inventory',
        color: '#A3E9CA',
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
    return <LineChart options={chartOptions} />;
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

  handleProductChartChange = (e: any, showProductChart: any) => this.setState({ showProductChart });

  renderProductCharts = () => {
    const {
      productDetailRank,
      productDetailPrice,
      productDetailInventory,
      productDetailRating,
      productDetailReview,
      productDetailKPI,
    } = this.props;
    switch (this.state.showProductChart) {
      case 'chart0':
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

        return popupPriceContainer.length === 0 &&
          popupRankContainer.length === 0 &&
          popupInventoryContainer.length === 0 &&
          popupRatingContainer.length === 0 &&
          popupReviewContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : (
          <this.renderProductStatistics
            popupPriceContainer={popupPriceContainer}
            popupRankContainer={popupRankContainer}
            popupInventoryContainer={popupInventoryContainer}
            popupRatingContainer={popupRatingContainer}
            popupReviewContainer={popupReviewContainer}
          />
        );

      case 'chart1':
        const productTimeline = [];
        const productProfit = [];
        const productROI = [];

        for (let i = 0; i < productDetailKPI.length; i++) {
          productTimeline.push(new Date(productDetailKPI[i].cdate).toDateString());
          productProfit.push([
            new Date(productDetailKPI[i].cdate).toDateString(),
            parseFloat(productDetailKPI[i].profit),
          ]);
          productROI.push([
            new Date(productDetailKPI[i].cdate).toDateString(),
            parseFloat(productDetailKPI[i].roi),
          ]);
        }
        return productTimeline.length && productProfit.length && productROI.length ? (
          <this.renderROI
            productTimeline={productTimeline}
            productProfit={productProfit}
            productROI={productROI}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      default:
        return <div></div>;
    }
  };

  render() {
    const { productDetailRank, productDetailPrice, productDetailKPI } = this.props;
    if (!productDetailKPI || !productDetailRank || !productDetailPrice) return <div></div>;
    return (
      <div className="productDetailCharts">
        <Divider />
        {this.renderProductCharts()}
        <Form>
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
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  product: get(state, 'modals.supplierProductDetail.meta'),
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
  fetchProductDetailChartKPI: (productID: any) => fetchSupplierProductDetailChartKPI(productID),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCharts);
