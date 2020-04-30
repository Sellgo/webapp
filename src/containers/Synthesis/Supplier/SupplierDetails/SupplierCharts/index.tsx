import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
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
import renderHitChart from './renderHitChart';
import renderRevenueChart from './renderRevenueChart';

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

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });

  renderCharts = () => {
    const { supplierDetails, singlePageItemsCount, filteredProducts } = this.props;

    const showProducts = filteredProducts.slice(0, singlePageItemsCount);

    switch (this.state.showChart) {
      case 'chart0':
        return supplierDetails && supplierDetails.rate ? renderHitChart(supplierDetails) : null;

      case 'chart1': {
        return showProducts.length
          ? renderRevenueChart(showProducts)
          : this.renderLoader(showProducts);
      }
      default:
        return null;
    }
  };

  renderLoader(products: Product[]) {
    return (
      <Loader
        active={products.length ? true : false}
        inline="centered"
        className="popup-loader"
        size="massive"
      >
        Loading
      </Loader>
    );
  }

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
