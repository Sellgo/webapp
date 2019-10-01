import * as React from 'react';
import { Divider, Grid, Segment, Modal, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import ProductsTable from './ProductsTable';
import get from 'lodash/get';
import ProductDetails from './ProductDetails';
import { closeSupplierProductDetailModal } from '../../../actions/Modals';
import SupplierDetails from './SupplierDetails';
import {
  resetSupplier,
  fetchSupplierProducts,
  resetSupplierProducts,
} from '../../../actions/Suppliers';
import SupplierFilters from './SupplierFilters';
import { supplierProductsSelector } from '../../../selectors/Supplier';

interface SupplierProps {
  products: any;
  match: { params: { supplierID: '' } };
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
  resetSupplier: () => void;
  fetchSupplierProducts: (supplierID: any) => void;
  resetSupplierProducts: typeof resetSupplierProducts;
}

export class Supplier extends React.Component<SupplierProps> {
  componentDidMount() {
    const { fetchSupplierProducts, match } = this.props;
    fetchSupplierProducts(match.params.supplierID);
  }
  componentWillUnmount() {
    const { resetSupplier, resetSupplierProducts } = this.props;
    resetSupplierProducts();
    resetSupplier();
  }

  DisplaySupplierFilters = () => {
    const { products } = this.props;
    if (products.length === 1 && products[0] === undefined) {
      return (
        <Segment>
          <Loader
            hidden={products.length === 1 && products[0] === undefined ? false : true}
            active={true}
            inline="centered"
            size="massive"
          >
            Loading
          </Loader>
        </Segment>
      );
    }
    return <SupplierFilters />;
  };

  ProductDetailModal = () => {
    return (
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
    );
  };

  render() {
    return (
      <>
        <PageHeader
          title={'Synthesis'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Profit Syn', to: '/synthesis' },
            { content: 'Supplier Name' },
          ]}
        />

        <Segment basic={true} className="setting">
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={4}>
                <this.DisplaySupplierFilters />
              </Grid.Column>
              <Grid.Column floated="right" width={12}>
                <SupplierDetails supplierID={this.props.match.params.supplierID} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <ProductsTable supplierID={this.props.match.params.supplierID} />
          <this.ProductDetailModal />
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  products: supplierProductsSelector(state),
  productDetailsModalOpen: get(state, 'modals.supplierProductDetail.open', false),
});
const mapDispatchToProps = {
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  resetSupplier: () => resetSupplier(),
  fetchSupplierProducts: (supplierID: any) => fetchSupplierProducts(supplierID),
  resetSupplierProducts: () => resetSupplierProducts(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supplier);
