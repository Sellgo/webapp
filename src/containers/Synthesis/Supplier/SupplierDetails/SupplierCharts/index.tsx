import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import StackChart from '../../../../../components/Chart/StackChart';
import PieChart from '../../../../../components/Chart/PieChart';
import ScatterChart from '../../../../../components/Chart/ScatterChart';
import { Loader, Form, Modal, Header } from 'semantic-ui-react';
import { Product } from '../../../../../interfaces/Product';
import { Supplier } from '../../../../../interfaces/Supplier';
import { fetchSupplierDetails } from '../../../../../actions/Suppliers';
import {
  openSupplierProductDetailModal,
  closeSupplierProductDetailModal,
} from '../../../../../actions/Modals';
import ProductDetails from '../../ProductDetails';
import './index.scss';
//import { rootCertificates } from 'tls';

interface SupplierChartsProps {
  supplierID: any;
  supplierDetails: Supplier;
  filteredProducts: Product[];
  singlePageItemsCount: number;
  fetchSupplierDetails: (supplierID: any) => void;
  openProductDetailModal: (product?: Product) => void;
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
}
class SupplierCharts extends Component<SupplierChartsProps> {
  state = { showChart: 'chart0' };

  componentDidMount() {
    const { supplierID, fetchSupplierDetails } = this.props;
    fetchSupplierDetails(supplierID);
  }

  renderProfit = (props: any) => {
    const { monthly_data, onBubbleDetails } = props;
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
    return <ScatterChart options={chartOptions} onBubbleDetails={onBubbleDetails} />;
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
        //RWP: swap the color begin
        //color: '#FBC4C4',
        color: '#CAE1F3',
        //RWP: swap the color end
      },
      {
        name: 'Hit Non-Profitable SKUs',
        y: p2l_ratio,
        //RWP: swap the color begin
        selected: true,
        sliced: true,
        //color: '#CAE1F3',
        color: '#FBC4C4',
        //RWP: swap the color end
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
    const {
      asin,
      upc,
      price,
      amazon_category_name,
      roi,
      profit,
      product_cost,
      fees,
      productSKUs,
      onBubbleDetails,
    } = props;
    const data = [
      { color: '#CAE1F3', name: 'Profit($)', data: profit },
      { color: '#F3D2CA', name: 'Amz fee($)', data: fees },
      { color: '#F3E9CA', name: 'COGS($)', data: product_cost },
      { name: 'ROI(%)', data: roi },
      { name: 'Category', data: amazon_category_name },
      { name: 'Price($)', data: price },
      { name: 'ASIN', data: asin },
      { name: 'UPC', data: upc },
    ];
    const chartOptions = {
      title: 'Revenue Breakdown Comparison',
      productSKUs: productSKUs,
      data: data,
    };
    return <StackChart options={chartOptions} onBubbleDetails={onBubbleDetails} />;
  };

  renderPOFP = (props: any) => {
    const { profit, productSKUs, onBubbleDetails } = props;
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
    return <StackChart options={chartOptions} onBubbleDetails={onBubbleDetails} />;
  };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });

  renderCharts = () => {
    const {
      supplierDetails,
      singlePageItemsCount,
      openProductDetailModal,
      supplierID,
      filteredProducts,
    } = this.props;

    const sortProducts = [...filteredProducts].sort(
      (a, b) => parseFloat(b.profit) - parseFloat(a.profit)
    );
    const showProducts = sortProducts.slice(0, singlePageItemsCount);
    let productSKUs = [];
    let profit = [];
    profit = showProducts.map(e => parseFloat(e.profit));
    productSKUs = showProducts.map(e => e.title);
    switch (this.state.showChart) {
      case 'chart0':
        return supplierDetails && supplierDetails.rate ? (
          <this.renderHit supplier={supplierDetails} />
        ) : null;

      case 'chart1': {
        let monthly_data = [];
        let profit_monthly = [];
        let sales_monthly = [];
        monthly_data = showProducts.map(e => {
          return {
            name: e.title,
            x: parseFloat(e.sales_monthly),
            y: parseFloat(e.profit_monthly),
          };
        });
        profit_monthly = showProducts.map(e => parseFloat(e.profit_monthly));
        sales_monthly = showProducts.map(e => parseFloat(e.sales_monthly));

        return productSKUs.length &&
          profit.length &&
          profit_monthly.length &&
          sales_monthly.length ? (
          <this.renderProfit
            productSKUs={productSKUs}
            profit_monthly={profit_monthly}
            sales_monthly={sales_monthly}
            monthly_data={monthly_data}
            onBubbleDetails={(id: number) => {
              openProductDetailModal({ ...showProducts[id], ...{ supplierID: supplierID } });
            }}
          />
        ) : (
          <Loader
            active={productSKUs.length ? true : false}
            inline="centered"
            className="popup-loader"
            size="massive"
          >
            Loading
          </Loader>
        );
      }
      case 'chart3': {
        let product_cost = [];
        let fees = [];
        let roi = [];
        let amazon_category_name = [];
        let price = [];
        let asin = [];
        let upc = [];

        product_cost = showProducts.map(e => parseFloat(e.product_cost));
        fees = showProducts.map(e => parseFloat(e.fees));
        roi = showProducts.map(e => parseFloat(e.roi));
        amazon_category_name = showProducts.map(e => parseFloat(e.amazon_category_name));
        price = showProducts.map(e => parseFloat(e.price));
        asin = showProducts.map(e => parseFloat(e.asin));
        upc = showProducts.map(e => parseFloat(e.upc));

        return productSKUs.length &&
          profit.length &&
          product_cost.length &&
          fees.length &&
          roi.length &&
          amazon_category_name.length &&
          price.length &&
          asin.length &&
          upc.length ? (
          <this.renderRevenue
            productSKUs={productSKUs}
            product_cost={product_cost}
            fees={fees}
            profit={profit}
            roi={roi}
            price={price}
            amazon_category_name={amazon_category_name}
            asin={asin}
            upc={upc}
            onBubbleDetails={(id: number) => {
              openProductDetailModal({ ...showProducts[id], ...{ supplierID: supplierID } });
            }}
          />
        ) : (
          <Loader
            active={productSKUs.length ? true : false}
            inline="centered"
            className="popup-loader"
            size="massive"
          >
            Loading
          </Loader>
        );
      }
      case 'chart4': {
        let roi = [];
        roi = showProducts.map(e => {
          return { name: parseFloat(e.roi), y: parseFloat(e.profit) };
        });
        return productSKUs.length && roi.length ? (
          <this.renderPOFP
            productSKUs={productSKUs}
            roi={roi}
            profit={profit}
            onBubbleDetails={(id: number) => {
              openProductDetailModal({ ...showProducts[id], ...{ supplierID: supplierID } });
            }}
          />
        ) : (
          <Loader
            active={productSKUs.length ? true : false}
            inline="centered"
            className="popup-loader"
            size="massive"
          >
            Loading
          </Loader>
        );
      }
      default:
        return null;
    }
  };

  render() {
    const { filteredProducts, supplierDetails } = this.props;
    if (filteredProducts.length === 0 && supplierDetails === null) {
      return null;
    }
    return (
      <div className="supplier-charts">
        <this.renderCharts />
        <div className="chart-end-content">
          <Header as="h4"> Select your favorite chart</Header>
          <Form>
            <Form.Group inline={true}>
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
              {/*  <Form.Radio
                label="Point of First Profit (POFP)"
                value="chart4"
                checked={this.state.showChart === 'chart4'}
                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
              /> */}
            </Form.Group>
          </Form>
        </div>
        <Modal
          size={'large'}
          open={this.props.productDetailsModalOpen}
          onClose={this.props.closeProductDetailModal}
          closeIcon={true}
        >
          <Modal.Content>
            <ProductDetails />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  productDetailsModalOpen: get(state, 'modals.supplierProductDetail.open', false),
});

const mapDispatchToProps = {
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCharts);
