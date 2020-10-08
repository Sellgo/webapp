import * as React from 'react';
import { Grid, Segment, Modal, Icon, Popup } from 'semantic-ui-react';
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
  reloadSuppliers: () => void;
  suppliers: SupplierInterface[];
}
export class Supplier extends React.Component<SupplierProps, any> {
  constructor(props: SupplierProps) {
    super(props);
    this.state = {
      openRecentFiles: false,
    };
  }

  async componentDidMount() {
    const { match, reloadSuppliers } = this.props;

    reloadSuppliers();
    await this.initialData(match.params.supplierID);
  }

  initialData = async (supplierID: any) => {
    const {
      fetchSupplierDetails,
      fetchSupplierProducts,
      supplierProgress,
      setProductsLoadingDataBuster,
      pollDataBuster,
    } = this.props;

    supplierProgress(supplierID);

    const results = await Promise.all([
      fetchSupplierDetails(supplierID),
      fetchSupplierProducts(supplierID),
    ]);

    const fetchedProducts: Product[] | undefined = results[1];
    if (fetchedProducts) {
      setProductsLoadingDataBuster(
        fetchedProducts.filter(p => p.data_buster_status === 'processing').map(p => p.product_id)
      );
    }
    pollDataBuster();
  };

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

  selectSupplier = async (supplierId: any) => {
    this.setState({ openRecentFiles: false });
    await this.initialData(supplierId);
  };

  render() {
    const {
      isLoadingSupplierProducts,
      supplierDetails,
      stickyChartSelector,
      suppliers,
    } = this.props;
    const searchName =
      supplierDetails && supplierDetails.search ? ` ${supplierDetails.search}` : '';

    const renderSupplierPopup = () => (
      <Popup
        trigger={
          <p
            className="search-title"
            onClick={() => this.setState({ openRecentFiles: !this.state.openRecentFiles })}
          >
            {' '}
            {`${searchName} `} <Icon name="angle down" />
          </p>
        }
        on="click"
        basic={true}
        onClose={() => this.setState({ openRecentFiles: false })}
        open={this.state.openRecentFiles}
        content={
          <div className="recent-files">
            <div className="recent-files-header">
              <p>{'Recent Files'}</p>
            </div>
            <div className="recent-files-container">
              {suppliers &&
                suppliers[0] !== undefined &&
                suppliers.map((s: SupplierInterface) => (
                  <p
                    className="supplier-text"
                    key={`supplier-${s.id}`}
                    onClick={() => this.selectSupplier(s.supplier_id)}
                  >
                    {s.search}
                  </p>
                ))}
            </div>
          </div>
        }
        position="top center"
      />
    );
    return (
      <>
        <SubscriptionMessage />
        <PageHeader
          title={`Profit Finder of ${supplierDetails.search || 'Search'}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: `Profit Finder` },
            { content: renderSupplierPopup() || 'Search' },
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
  reloadSuppliers: () => fetchSuppliers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
