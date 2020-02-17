import * as React from 'react';
import { Grid, Segment, Modal, Loader } from 'semantic-ui-react';
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
import SupplierFilters from './SupplierFilters';
import { supplierProductsSelector } from '../../../selectors/Supplier';
import './index.scss';

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
  }

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
            <Grid.Row>
              <Grid.Column width={4} className="left-column" floated="left">
                {isLoadingSupplierProducts ? (
                  <Segment>
                    <Loader active={true} inline="centered" size="massive">
                      Loading
                    </Loader>
                  </Segment>
                ) : (
                  <div className="Supplier_Filters">
                    <SupplierFilters />
                  </div>
                )}
              </Grid.Column>

              <Grid.Column width={9} className="right-column" floated="right">
                {isLoadingSupplierProducts ? (
                  <Segment>
                    <Loader active={true} inline="centered" size="massive">
                      Loading
                    </Loader>
                  </Segment>
                ) : (
                  <SupplierDetails supplierID={this.props.match.params.supplierID} />
                )}
              </Grid.Column>
              <Grid.Column width={3} className="right-column" floated="right">
                <div className="radio-toggle-wrap">
                  {/* <Radio toggle label="Shadow Tracking" /> */}
                </div>
              </Grid.Column>
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
  supplierProgress: (supplierID: any) => supplierProgress(supplierID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supplier);
