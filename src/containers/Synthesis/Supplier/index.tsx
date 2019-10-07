import * as React from 'react';
import { Divider, Grid, Segment, Modal, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
//import ProductsTable from './ProductsTableOrig';
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
} from '../../../actions/Suppliers';
import SupplierFilters from './SupplierFilters';
import { supplierProductsSelector } from '../../../selectors/Supplier';
import CallToAction from './CallToAction';
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
}

export class Supplier extends React.Component<SupplierProps> {
  componentDidMount() {
    const { fetchSupplierDetails, fetchSupplierProducts, match } = this.props;
    fetchSupplierDetails(match.params.supplierID);
    fetchSupplierProducts(match.params.supplierID);
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
          title={`Profit Synthesis of ${supplierDetails.name || 'Supplier'}`}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Profit Syn', to: '/synthesis' },
            { content: supplierDetails.name || 'Supplier' },
          ]}
          //callToAction={<CallToAction />}
        />

        <Segment basic={true} className="setting">
          <Grid>
            <Grid.Row>
              <Grid.Column className="leftColumn" floated="left">
                {isLoadingSupplierProducts ? (
                  <Segment>
                    <Loader active={true} inline="centered" size="massive">
                      Loading
                    </Loader>
                  </Segment>
                ) : (
                  <SupplierFilters />
                )}
              </Grid.Column>

              <Grid.Column className="rightColumn" floated="right">
                <SupplierDetails supplierID={this.props.match.params.supplierID} />
                <ProductsTable supplierID={this.props.match.params.supplierID} />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />

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
});

const mapDispatchToProps = {
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  fetchSupplierDetails: (supplierID: any) => fetchSupplierDetails(supplierID),
  resetSupplier: () => resetSupplier(),
  fetchSupplierProducts: (supplierID: any) => fetchSupplierProducts(supplierID),
  resetSupplierProducts: () => resetSupplierProducts(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supplier);
