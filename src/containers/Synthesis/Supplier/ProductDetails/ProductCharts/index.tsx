import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  fetchSupplierProductDetailChartRank,
  fetchSupplierProductDetailChartPrice,
  fetchSupplierProductDetailChartKPI,
} from '../../../../../actions/Products';
import SplineChart from '../../../../../components/Chart/SplineChart';
import LineChart from '../../../../../components/Chart/LineChart';
import { Loader, Form, Divider } from 'semantic-ui-react';

interface ProductChartsProps {
  product: any;
  productDetailRank: any;
  productDetailPrice: any;
  productDetailKPI: any;
  fetchProductDetailChartRank: (productID: any) => void;
  fetchProductDetailChartPrice: (productID: any) => void;
  fetchProductDetailChartKPI: (productID: any) => void;
}
class ProductCharts extends Component<ProductChartsProps> {
  state = { showProductChart: 'chart0' };
  componentDidMount() {
    const {
      product,
      fetchProductDetailChartRank,
      fetchProductDetailChartPrice,
      fetchProductDetailChartKPI,
    } = this.props;
    fetchProductDetailChartRank(product.product_id);
    fetchProductDetailChartPrice(product.product_id);
    fetchProductDetailChartKPI(product.product_id);
  }

  renderProductStatistics = (props: any) => {
    const { popupRankContainer, popupPriceContainer } = props;
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
    const { productDetailRank, productDetailPrice, productDetailKPI } = this.props;
    switch (this.state.showProductChart) {
      case 'chart0':
        const popupRankContainer = [];
        const popupPriceContainer = [];

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
        return popupPriceContainer.length === 0 && popupRankContainer.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : (
          <this.renderProductStatistics
            popupPriceContainer={popupPriceContainer}
            popupRankContainer={popupRankContainer}
          />
        );

      case 'chart1':
        const productTimeline = [];
        const productProfit = [];
        const productROI = [];

        for (let i = 0; i < productDetailKPI.length; i++) {
          productTimeline.push(new Date(productDetailKPI[i].cdate).toDateString());
          productProfit.push(parseFloat(productDetailKPI[i].profit));
          productROI.push(parseFloat(productDetailKPI[i].roi));
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
      <React.Fragment>
        <Divider />
        <this.renderProductCharts />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  product: get(state, 'modals.supplierProductDetail.meta'),
  productDetailRank: get(state, 'product.detailRank'),
  productDetailPrice: get(state, 'product.detailPrice'),
  productDetailKPI: get(state, 'product.detailKPI'),
});

const mapDispatchToProps = {
  fetchProductDetailChartRank: (productID: any) => fetchSupplierProductDetailChartRank(productID),
  fetchProductDetailChartPrice: (productID: any) => fetchSupplierProductDetailChartPrice(productID),
  fetchProductDetailChartKPI: (productID: any) => fetchSupplierProductDetailChartKPI(productID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCharts);
