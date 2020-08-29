import * as React from 'react';
import { Grid, Segment, Modal, Icon, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import QuotaMeter from '../../../components/QuotaMeter';
import ProductsTable from './ProductsTable';
import get from 'lodash/get';
import ProductDetails from './ProductDetails';
import { closeSupplierProductDetailModal } from '../../../actions/Modals';
import SupplierDetails from './SupplierDetails';
import {
  fetchSupplierDetails,
  resetSupplier,
  fetchSupplierProducts,
  resetSupplierProducts,
  supplierProgress,
  setProductsLoadingDataBuster,
  pollDataBuster,
  fetchSuppliers,
} from '../../../actions/Suppliers';
import { supplierProductsSelector, suppliersSelector } from '../../../selectors/Supplier';
import './index.scss';
import { dismiss, info } from '../../../utils/notifications';
import SubscriptionMessage from '../../../components/FreeTrialMessageDisplay';
import { Product } from '../../../interfaces/Product';
import { Supplier as SupplierInterface } from '../../../interfaces/Supplier';

interface SupplierProps {
  stickyChartSelector: boolean;
  supplierDetails: any;
  fetchSuppliers: () => void;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  match: { params: { supplierID: '' } };
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
  fetchSupplierDetails: (supplierID: any) => Promise<SupplierInterface | undefined>;
  resetSupplier: () => void;
  fetchSupplierProducts: (supplierID: any) => Promise<Product[] | undefined>;
  resetSupplierProducts: typeof resetSupplierProducts;
  supplierProgress: (supplierID: any) => void;
  progress: any;
  setProductsLoadingDataBuster: typeof setProductsLoadingDataBuster;
  pollDataBuster: () => void;
  suppliers: any[];
  history: any;
}
export class Supplier extends React.Component<SupplierProps> {
  async componentDidMount() {
    const {
      fetchSupplierDetails,
      fetchSupplierProducts,
      match,
      supplierProgress,
      setProductsLoadingDataBuster,
      pollDataBuster,
      fetchSuppliers,
    } = this.props;

    fetchSuppliers();
    supplierProgress(match.params.supplierID);

    const results = await Promise.all([
      fetchSupplierDetails(match.params.supplierID),
      fetchSupplierProducts(match.params.supplierID),
    ]);

    const fetchedProducts: Product[] | undefined = results[1];
    if (fetchedProducts) {
      setProductsLoadingDataBuster(
        fetchedProducts.filter(p => p.data_buster_status === 'processing').map(p => p.product_id)
      );
    }
    pollDataBuster();
  }

  componentWillUnmount() {
    const { resetSupplier, resetSupplierProducts } = this.props;
    resetSupplierProducts();
    resetSupplier();
    dismiss('supplierLoading');
  }

  componentDidUpdate() {
    if (this.props.supplierDetails && this.props.supplierDetails.item_total_count) {
      const loadTime = this.getLoadingTime(this.props.supplierDetails.item_total_count);
      if (this.props.isLoadingSupplierProducts) {
        info(() => this.handleSupplierLoading(loadTime), {
          toastId: 'supplierLoading',
          className: 'ui message warning notification',
          autoClose: false,
          pauseOnHover: false,
          closeOnClick: false,
          draggable: false,
        });
      }
    }

    if (!this.props.isLoadingSupplierProducts) {
      dismiss('supplierLoading');
    }
  }

  getLoadingTime = (count: number) => {
    const loadingTime = Math.ceil(count / 2000 / 5) * 5;
    return loadingTime;
  };

  handleSupplierLoading = (loadTime: number) => {
    return (
      <div className="notif-content">
        <p className="header">Processing SKUs</p>
        <p className="label">
          <Icon className="clock" />
          {loadTime}s Estimated Processing time
        </p>
      </div>
    );
  };

  selectSupplier = (supplier: any) => {
    const { history, fetchSupplierDetails, fetchSupplierProducts } = this.props;
    history.push(`/synthesis/${supplier.supplier_id}`);
    fetchSupplierProducts(supplier.supplier_id);
    fetchSupplierDetails(supplier.supplier_id);
  };

  renderSupplierDropdown = () => {
    const { supplierDetails, suppliers = [] } = this.props;
    return (
      <Dropdown
        text={`Profit Finder - ${supplierDetails.search}`}
        floating
        labeled
        button
        icon={'angle down'}
        className="recent-suppliers-text"
        scrolling
      >
        <Dropdown.Menu>
          {suppliers.map((supplier: any, index: any) => (
            <Dropdown.Item
              key={`recent-sup-${index}`}
              className="recent-suppliers-text"
              onClick={() => this.selectSupplier(supplier)}
            >
              {supplier && supplier.search}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  render() {
    const { isLoadingSupplierProducts, supplierDetails, stickyChartSelector } = this.props;
    return (
      <>
        <SubscriptionMessage />
        <PageHeader
          title={`Profit Finder of ${supplierDetails.search || 'Search'}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Search Management', to: '/synthesis' },
            {
              content: `Profit Finder: ${supplierDetails.search} ` || 'Search',
              as: () => this.renderSupplierDropdown(),
            },
          ]}
          callToAction={<QuotaMeter />}
        />

        <Segment basic={true} className="setting">
          <Grid className={`product-chart ${stickyChartSelector ? 'sticky-chart-active' : ''}`}>
            <Grid.Row className="right-column">
              {!isLoadingSupplierProducts && <SupplierDetails />}
            </Grid.Row>
          </Grid>
          <ProductsTable supplierID={this.props.match.params.supplierID} />

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
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  supplierDetails: get(state, 'supplier.details'),
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: supplierProductsSelector(state),
  productDetailsModalOpen: get(state, 'modals.supplierProductDetail.open', false),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  progress: get(state, 'supplier.quota'),
  suppliers: suppliersSelector(state),
});

const mapDispatchToProps = {
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
  resetSupplier: () => resetSupplier(),
  fetchSupplierProducts: (supplierID: any) => fetchSupplierProducts(supplierID),
  resetSupplierProducts: () => resetSupplierProducts(),
  supplierProgress: () => supplierProgress(),
  setProductsLoadingDataBuster,
  pollDataBuster,
  fetchSuppliers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
