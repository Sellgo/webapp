import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Loader, Form, Modal, Grid, Icon } from 'semantic-ui-react';
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
import ProfitFinderChart from '../../../../../components/Chart/ProfitFinderChart';
import { setSupplierPageNumber, setStickyChart } from '../../../../../actions/Suppliers';
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
  setStickyChart: (value: boolean) => void;
  isStickyChartActive: boolean;
  setStickyChartActive: Function;
}

function ChartContainerHeightProvider({ children }: any) {
  const windowSize = useWindowSize();
  // 18px less than the chartHeight specified in src/components/Chart/ProfitFinderChart.tsx
  const chartContainerHeight =
    windowSize.width && windowSize.width >= 2560
      ? 465
      : windowSize.width && windowSize.width >= 1920
      ? 345
      : windowSize.width && windowSize.width >= 1368
      ? 242
      : 345;

  return children(chartContainerHeight);
}

class SupplierCharts extends Component<SupplierChartsProps> {
  state = { showChart: 'chart0' };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });
  handleLeftArrowClick = (minPageNumber: number) => {
    const { pageNumber, setPageNumber } = this.props;
    if (pageNumber > minPageNumber) {
      setPageNumber(pageNumber - minPageNumber);
    }
  };
  handleRightArrowClick = (maxPageNumber: number) => {
    const { pageNumber, setPageNumber } = this.props;
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
          <ProfitFinderChart
            render={(props: any) => <SupplierHitChart {...props} />}
            supplier={supplierDetails}
          />
        ) : null;

      case 'chart1': {
        return showProducts.length ? (
          <ProfitFinderChart
            render={(props: any) => <RevenueChart {...props} />}
            products={showProducts}
          />
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
    const {
      filteredProducts,
      supplierDetails,
      isStickyChartActive,
      setStickyChartActive,
      singlePageItemsCount,
      pageNumber,
      setStickyChart,
    } = this.props;
    if (filteredProducts.length === 0 && supplierDetails === null) {
      return null;
    }
    const minPageNumber = 1;
    const maxPageNumber = Math.ceil(filteredProducts.length / singlePageItemsCount);

    return (
      <div className="supplier-charts">
        <Grid className="supplier-charts__chart-grid">
          <div className="chart-grid__left-column">
            {pageNumber !== minPageNumber && this.state.showChart === 'chart1' && (
              <Icon
                className="chart-grid__left-arrow"
                name="angle left"
                size="big"
                onClick={() => this.handleLeftArrowClick(minPageNumber)}
              />
            )}
          </div>
          <ChartContainerHeightProvider>
            {(chartContainerHeight: number) => (
              <div className="chart-grid__middle-column">
                {/* IMPORTANT: these inner divs & styles are required to handle chart resizing on window resize */}
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
              </div>
            )}
          </ChartContainerHeightProvider>
          <div className="chart-grid__right-column">
            {pageNumber !== maxPageNumber && this.state.showChart === 'chart1' && (
              <Icon
                className="chart-grid__right-arrow"
                name="angle right"
                size="big"
                onClick={() => this.handleRightArrowClick(maxPageNumber)}
              />
            )}
          </div>
        </Grid>
        <div className="chart-end-content">
          <Form className="chart-end-form">
            <Form.Group>
              <Form.Radio
                label="Hit/Miss vs Profitable ASINs"
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
          <Icon
            name="snowflake outline"
            className={`${isStickyChartActive ? 'active' : ''}`}
            onClick={() => {
              setStickyChartActive(!isStickyChartActive);
              setStickyChart(!isStickyChartActive);
            }}
          />
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
  setStickyChart: (value: boolean) => setStickyChart(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCharts);
