import * as React from 'react';
import { Grid, Segment, Modal, Icon } from 'semantic-ui-react';
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
} from '../../../actions/Suppliers';
import { supplierProductsSelector } from '../../../selectors/Supplier';
import './index.scss';
import { dismiss, info } from '../../../utils/notifications';

interface SupplierProps {
  supplierDetails: any;
  isLoadingSupplierProducts: boolean;
  products: any;
  match: { params: { supplierID: '' } };
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
  fetchSupplierDetails: (supplierID: any) => void;
  resetSupplier: () => void;
  fetchSupplierProducts: (supplierID: any) => void;
  resetSupplierProducts: typeof resetSupplierProducts;
  supplierProgress: (supplierID: any) => void;
  progress: any;
}

export class Supplier extends React.Component<SupplierProps> {
  componentDidMount() {
    const { fetchSupplierDetails, fetchSupplierProducts, match, supplierProgress } = this.props;
    fetchSupplierDetails(match.params.supplierID);
    fetchSupplierProducts(match.params.supplierID);
    supplierProgress(match.params.supplierID);
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

  render() {
    const { isLoadingSupplierProducts, supplierDetails } = this.props;

    return (
      <>
        <PageHeader
          title={`Profit Finder of ${supplierDetails.name || 'Supplier'}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Profit Finder', to: '/synthesis' },
            { content: supplierDetails.name || 'Supplier' },
          ]}
          callToAction={<QuotaMeter />}
        />

        <Segment basic={true} className="setting">
          <Grid>
            <Grid.Row className="right-column">
              {!isLoadingSupplierProducts && (
                <SupplierDetails supplierID={this.props.match.params.supplierID} />
              )}
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
  progress: get(state, 'supplier.quota'),
});

const mapDispatchToProps = {
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
  resetSupplier: () => resetSupplier(),
  fetchSupplierProducts: (supplierID: any) => fetchSupplierProducts(supplierID),
  resetSupplierProducts: () => resetSupplierProducts(),
  supplierProgress: () => supplierProgress(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
