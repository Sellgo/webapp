import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import StackChart from '../../../../../components/Chart/StackChart';
import PieChart from '../../../../../components/Chart/PieChart';
import ScatterChart from '../../../../../components/Chart/ScatterChart';
import { Loader, Form } from 'semantic-ui-react';
import { Product } from '../../../../../interfaces/Product';
import { Supplier } from '../../../../../interfaces/Supplier';
import { fetchSupplierDetails } from '../../../../../actions/Suppliers';
import { findFilterProducts } from '../../../../../constants/Suppliers';

interface SupplierChartsProps {
  supplierID: any;
  supplierDetails: Supplier;
  products: Product[];
  filterRanges: any;
  fetchSupplierDetails: (supplierID: any) => void;
}
class SupplierCharts extends Component<SupplierChartsProps> {
  state = { showChart: 'chart0' };

  componentDidMount() {
    const { supplierID, fetchSupplierDetails } = this.props;
    fetchSupplierDetails(supplierID);
  }

  renderProfit = (props: any) => {
    const { monthly_data, sales_monthly, profit_monthly } = props;
    const data = [
      {
        type: 'scatter',
        regression: true,
        regressionSettings: {
          type: 'linear',
          color: 'red',
        },
        color: '#CAE1F3',
        negativeColor: '#F3D2CA',
        name: 'SKUs',
        data: monthly_data,
      },
    ];
    const chartOptions = {
      title: 'Profit vs Unit Sold/mo',
      data: data,
    };
    return <ScatterChart options={chartOptions} />;
  };

  renderHit = (props: any) => {
    const { supplier } = props;
    const rate = parseFloat(supplier.rate);
    const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
    const miss = 100 - supplier.p2l_ratio;
    const data = [
      {
        name: 'Profitable SKUs',
        y: rate,
        sliced: true,
        selected: true,
        color: '#FBC4C4',
      },
      {
        name: 'Hit Non-Profitable SKUs',
        y: p2l_ratio,
        color: '#CAE1F3',
      },
      {
        name: 'Miss',
        y: miss,
        color: '#ECEBEB',
      },
    ];
    const chartOptions = {
      title: 'Hit/Miss vs Profitable SKUs',
      name: 'SKUs',
      data: data,
    };
    return <PieChart options={chartOptions} />;
  };

  renderRevenue = (props: any) => {
    const { profit, product_cost, fees, productSKUs } = props;
    const data = [
      { color: '#CAE1F3', name: 'Profit($)', data: profit },
      { color: '#F3D2CA', name: 'Amz fee($)', data: fees },
      { color: '#F3E9CA', name: 'COGS($)', data: product_cost },
    ];
    const chartOptions = {
      title: 'Revenue Breakdown Comparison',
      productSKUs: productSKUs,
      data: data,
    };
    return <StackChart options={chartOptions} />;
  };

  renderPOFP = (props: any) => {
    const { profit, roi, productSKUs } = props;
    const data = [
      {
        color: '#CAE1F3',
        negativeColor: '#F3D2CA',
        name: 'Profit($)',
        data: profit,
      },
    ];
    const chartOptions = {
      title: 'Point of First Profit (POFP)',
      productSKUs: productSKUs,
      data: data,
    };
    return <StackChart options={chartOptions} />;
  };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });

  renderCharts = () => {
    const { supplierDetails, products, filterRanges, supplierID } = this.props;
    const filteredProducts = findFilterProducts(products, filterRanges);

    const showProducts = [...filteredProducts].sort(
      (a, b) => parseFloat(b['profit']) - parseFloat(a['profit'])
    );
    let productSKUs = [];
    let profit = [];
    profit = showProducts.map(e => parseFloat(e['profit']));
    productSKUs = showProducts.map(e => e['title']);
    switch (this.state.showChart) {
      case 'chart0':
        return supplierDetails && supplierDetails.rate ? (
          <this.renderHit supplier={supplierDetails} />
        ) : null;

      case 'chart1':
        let monthly_data = [];
        let profit_monthly = [];
        let sales_monthly = [];
        monthly_data = showProducts.map(e => {
          return {
            name: e['title'],
            x: parseFloat(e['sales_monthly']),
            y: parseFloat(e['profit_monthly']),
          };
        });
        profit_monthly = showProducts.map(e => parseFloat(e['profit_monthly']));
        sales_monthly = showProducts.map(e => parseFloat(e['sales_monthly']));

        return productSKUs.length &&
          profit.length &&
          profit_monthly.length &&
          sales_monthly.length ? (
          <this.renderProfit
            productSKUs={productSKUs}
            profit_monthly={profit_monthly}
            sales_monthly={sales_monthly}
            monthly_data={monthly_data}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      case 'chart3':
        let product_cost = [];
        let fees = [];
        product_cost = showProducts.map(e => parseFloat(e['product_cost']));
        fees = showProducts.map(e => parseFloat(e['fees']));

        return productSKUs.length && profit.length && product_cost.length && fees.length ? (
          <this.renderRevenue
            productSKUs={productSKUs}
            product_cost={product_cost}
            fees={fees}
            profit={profit}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      case 'chart4':
        let roi = [];
        roi = showProducts.map(e => {
          return { name: parseFloat(e['roi']), y: parseFloat(e['profit']) };
        });
        return productSKUs.length && roi.length ? (
          <this.renderPOFP productSKUs={productSKUs} roi={roi} profit={profit} />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      default:
        return null;
    }
  };

  render() {
    const { products, filterRanges } = this.props;
    if ((products.length === 1 && products[0] === undefined) || filterRanges === undefined) {
      return (
        <Loader
          hidden={products.length === 1 && products[0] === undefined ? false : true}
          active={true}
          inline="centered"
          size="massive"
        >
          Loading
        </Loader>
      );
    }
    return (
      <React.Fragment>
        <this.renderCharts />
        <br />
        <Form>
          <Form.Group inline={true}>
            <label />
            <Form.Radio
              label="Hit/Miss vs Profitable SKUs"
              value="chart0"
              checked={this.state.showChart === 'chart0'}
              onChange={(e, { value }) => this.handleSwitchChart(e, value)}
            />
            <Form.Radio
              label="Profit vs Unit Sold"
              value="chart1"
              checked={this.state.showChart === 'chart1'}
              onChange={(e, { value }) => this.handleSwitchChart(e, value)}
            />
            <Form.Radio
              label="Revenue Breakdown"
              value="chart3"
              checked={this.state.showChart === 'chart3'}
              onChange={(e, { value }) => this.handleSwitchChart(e, value)}
            />
            <Form.Radio
              label="Point of First Profit (POFP)"
              value="chart4"
              checked={this.state.showChart === 'chart4'}
              onChange={(e, { value }) => this.handleSwitchChart(e, value)}
            />
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  products: get(state, 'supplier.products'),
  filterRanges: get(state, 'supplier.filterRanges'),
});

const mapDispatchToProps = {
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierCharts);
