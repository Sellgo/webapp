import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import {
  fetchSupplierProductDetailChartRank,
  fetchSupplierProductDetailChartPrice,
  fetchSupplierProductDetailChartKPI,
} from '../../../../../../actions/Products';
import SplineChart from '../../../../../../components/Chart/SplineChart';
import LineChart from '../../../../../../components/Chart/LineChart';
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
    const { popup_rank_container, popup_price_container } = props;
    const data = [
      {
        type: 'line',
        name: 'Price($)',
        color: '#CAE1F3',
        data: popup_price_container,
      },
      {
        type: 'line',
        name: 'Rank',
        color: '#F3E9CA',
        data: popup_rank_container,
      },
    ];
    const chartOptions = {
      title: 'Product Statistics',
      data: data,
    };
    return <LineChart options={chartOptions} />;
  };

  renderROI = (props: any) => {
    const { product_timeline, product_profit, product_roi } = props;
    const data = [
      {
        name: 'Total Profit($)',
        type: 'spline',
        yAxis: 1,
        data: product_profit,
      },
      {
        name: 'ROI(%)',
        type: 'spline',
        data: product_roi,
      },
    ];
    const chartOptions = {
      title: 'Profit vs ROI',
      product_timeline: product_timeline,
      data: data,
    };
    return <SplineChart options={chartOptions} />;
  };

  handleProductChartChange = (e: any, showProductChart: any) => this.setState({ showProductChart });

  renderProductCharts = () => {
    const { productDetailRank, productDetailPrice, productDetailKPI } = this.props;
    switch (this.state.showProductChart) {
      case 'chart0':
        const popup_rank_container = [];
        const popup_price_container = [];

        for (let i = 0; i < productDetailRank.length; i++) {
          popup_rank_container.push([
            new Date(productDetailRank[i].cdate).getTime(),
            Number(productDetailRank[i].rank),
          ]);
        }
        for (let i = 0; i < productDetailPrice.length; i++) {
          popup_price_container.push([
            new Date(productDetailPrice[i].cdate).getTime(),
            Number(productDetailPrice[i].price),
          ]);
        }
        return popup_price_container.length === 0 && popup_rank_container.length === 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : (
          <this.renderProductStatistics
            popup_price_container={popup_price_container}
            popup_rank_container={popup_rank_container}
          />
        );

      case 'chart1':
        const product_timeline = [];
        const product_profit = [];
        const product_roi = [];

        for (let i = 0; i < productDetailKPI.length; i++) {
          product_timeline.push(new Date(productDetailKPI[i].cdate).toDateString());
          product_profit.push(parseFloat(productDetailKPI[i].profit));
          product_roi.push(parseFloat(productDetailKPI[i].roi));
        }
        return product_timeline.length && product_profit.length && product_roi.length ? (
          <this.renderROI
            product_timeline={product_timeline}
            product_profit={product_profit}
            product_roi={product_roi}
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
