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
import { useWindowSize } from '../../../../../hooks/useWindowSize';
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

function ChartContainerHeightProvider({ children }: any) {
  const windowSize = useWindowSize();

  const chartContainerHeight =
    windowSize.width && windowSize.width >= 2560
      ? 500
      : windowSize.width && windowSize.width >= 1920
      ? 367
      : windowSize.width && windowSize.width >= 1368
      ? 252
      : 367;

  return children(chartContainerHeight);
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
        <ChartContainerHeightProvider>
          {(chartContainerHeight: number) => (
            <Grid className="supplier-charts__chart-grid">
              <Grid.Column width={1} verticalAlign="middle" textAlign="center">
                <Icon
                  className="chart-grid__left-arrow"
                  name="angle left"
                  size="big"
                  onClick={this.handleLeftArrowClick}
                />
              </Grid.Column>
              <Grid.Column width={14}>
                {/* IMPORTANT: these styles are required to display chart properly when window resizes */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: `${chartContainerHeight}px`,
                  }}
                >
                  <div style={{ position: 'absolute', width: '100%' }}>
                    <this.renderCharts />
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={1} verticalAlign="middle" textAlign="center">
                <Icon
                  className="chart-grid__right-arrow"
                  name="angle right"
                  size="big"
                  onClick={this.handleRightArrowClick}
                />
              </Grid.Column>
            </Grid>
          )}
        </ChartContainerHeightProvider>
        <div className="chart-end-content">
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
  pageNumber: supplierPageNumberSelector(state),
});

const mapDispatchToProps = {
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCharts);
