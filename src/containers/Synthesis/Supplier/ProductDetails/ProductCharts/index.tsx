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
import { Loader, Form, Divider } from 'semantic-ui-react';
import './index.scss';
//import StackChart from '../../../../../components/Chart/StackChart';

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

        return popupRankContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupInventoryContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupPriceContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupRatingContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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

        return popupReviewContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
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
