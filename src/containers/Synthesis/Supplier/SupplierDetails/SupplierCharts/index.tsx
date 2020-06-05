import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Loader, Form, Modal, Header, Grid, Icon } from 'semantic-ui-react';
import { Product } from '../../../../../interfaces/Product';
import { Supplier } from '../../../../../interfaces/Supplier';
import {
  openSupplierProductDetailModal,
  closeSupplierProductDetailModal,
} from '../../../../../actions/Modals';
import ProductDetails from '../../ProductDetails';
import './index.scss';
import SupplierHitChart from '../../../../../components/Chart/SupplierHitChart';
import RevenueChart from './RevenueChart';
import { setSupplierPageNumber } from '../../../../../actions/Suppliers';
import { supplierPageNumberSelector } from '../../../../../selectors/Supplier';

interface SupplierChartsProps {
  supplierDetails: Supplier;
  filteredProducts: Product[];
  singlePageItemsCount: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  openProductDetailModal: (product?: Product) => void;
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
}
class SupplierCharts extends Component<SupplierChartsProps> {
  state = { showChart: 'chart0' };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });
  handleLeftArrowClick = () => {
    const { pageNumber, setPageNumber } = this.props;
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  handleRightArrowClick = () => {
    const { pageNumber, setPageNumber, filteredProducts, singlePageItemsCount } = this.props;
    const maxPageNumber = Math.ceil(filteredProducts.length / singlePageItemsCount);
    if (pageNumber < maxPageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  renderCharts = () => {
    const { supplierDetails, singlePageItemsCount, filteredProducts, pageNumber } = this.props;

    const showProducts = filteredProducts.slice(
      (pageNumber - 1) * singlePageItemsCount,
      pageNumber * singlePageItemsCount
    );

    switch (this.state.showChart) {
      case 'chart0':
        return supplierDetails && supplierDetails.rate ? (
          <SupplierHitChart supplier={supplierDetails} />
        ) : null;

      case 'chart1': {
        return showProducts.length ? (
          <RevenueChart products={showProducts} />
        ) : (
          this.renderLoader(showProducts)
        );
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
        <Grid className="supplier-charts__chart-grid">
          <div className="chart-grid__left-column">
            <Icon
              className="chart-grid__left-arrow"
              name="angle left"
              size="big"
              onClick={this.handleLeftArrowClick}
            />
          </div>
          <div className="chart-grid__middle-column">
            {/* IMPORTANT: these inner divs & styles are required to handle chart resizing on window resize */}

            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <div style={{ position: 'absolute', width: '100%' }}>
                <this.renderCharts />
              </div>
            </div>
          </div>
          <div className="chart-grid__right-column">
            <Icon
              className="chart-grid__right-arrow"
              name="angle right"
              size="big"
              onClick={this.handleRightArrowClick}
            />
          </div>
        </Grid>
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
  pageNumber: supplierPageNumberSelector(state),
});

const mapDispatchToProps = {
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCharts);
