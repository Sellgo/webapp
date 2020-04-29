import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import StackChart from '../../../../../components/Chart/StackChart';
import PieChart from '../../../../../components/Chart/PieChart';
import { Loader, Form, Modal, Header, Grid } from 'semantic-ui-react';
import { Product } from '../../../../../interfaces/Product';
import { Supplier } from '../../../../../interfaces/Supplier';
import { fetchSupplierDetails } from '../../../../../actions/Suppliers';
import {
  openSupplierProductDetailModal,
  closeSupplierProductDetailModal,
} from '../../../../../actions/Modals';
import ProductDetails from '../../ProductDetails';
import './index.scss';

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

  renderHit = (props: any) => {
    const { supplier } = props;
    const rate = parseFloat(supplier.rate);
    const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
    const miss = 100 - supplier.p2l_ratio;
    const data = [
      {
        name: 'Profitable SKUs',
        y: rate,
        sliced: false,
        selected: false,
        color: '#CAE1F3',
      },
      {
        name: 'Hit Non-Profitable SKUs',
        y: p2l_ratio,
        selected: false,
        sliced: false,
        color: '#FBC4C4',
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
    const { roi, profit, product_cost, fees, productSKUs, onBubbleDetails, ...otherProps } = props;
    const data = [
      { color: '#CAE1F3', negativeColor: '#FD8373', name: 'Profit($)', data: profit },
      { color: '#F3D2CA', name: 'Amz fee($)', data: fees },
      { color: '#F3E9CA', name: 'COGS($)', data: product_cost },
      { name: 'ROI(%)', data: roi },
    ];
    const chartOptions = {
      title: 'Revenue Breakdown Comparison',
      productSKUs: productSKUs,
      data: data,
      ...otherProps,
    };
    return <StackChart options={chartOptions} onBubbleDetails={onBubbleDetails} />;
  };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });

  renderCharts = () => {
    const { supplierDetails, singlePageItemsCount, filteredProducts } = this.props;

    const sortProducts = filteredProducts;
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
        const product_cost = showProducts.map(e => parseFloat(e.product_cost));
        const fees = showProducts.map(e => parseFloat(e.fees));
        const amazon_urls = showProducts.map(e => e.amazon_url);
        const roi = showProducts.map(e => parseFloat(e.roi));
        const upcs = showProducts.map(e => e.upc);
        const asins = showProducts.map(e => e.asin);
        const image_urls = showProducts.map(e => e.image_url);
        const margins = showProducts.map(e => e.margin);

        return productSKUs.length &&
          profit.length &&
          product_cost.length &&
          fees.length &&
          amazon_urls.length &&
          roi.length &&
          upcs.length &&
          asins.length &&
          margins.length &&
          image_urls.length ? (
          <this.renderRevenue
            productSKUs={productSKUs}
            product_cost={product_cost}
            fees={fees}
            profit={profit}
            roi={roi}
            amazon_urls={amazon_urls}
            upcs={upcs}
            asins={asins}
            image_urls={image_urls}
            margins={margins}
            onBubbleDetails={(id: number) => {
              window.open('https://www.amazon.com/dp/' + showProducts[id].asin, '_blank');
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
        <Grid centered className="chart-end-content">
          <Header as="h4">Select your favorite chart</Header>
          <Form className="chart-end-form">
            <Form.Group>
              <Form.Radio
                label="Hit/Miss vs Profitable SKUs"
                value="chart0"
                checked={this.state.showChart === 'chart0'}
                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
              />
              <Form.Radio
                label="Revenue Breakdown"
                value="chart1"
                checked={this.state.showChart === 'chart1'}
                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
              />
            </Form.Group>
          </Form>
        </Grid>
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
