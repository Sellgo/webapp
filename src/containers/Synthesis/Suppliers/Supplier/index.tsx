import * as React from 'react';
import { Divider, Grid, Segment, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './SupplierDetails.css';
import 'react-rangeslider/lib/index.css';
import 'react-input-range/lib/css/index.css';
import '../suppliers.css';

import {
  trackProductWithPatch,
  trackProductWithPost,
  getProductTrackGroupId,
} from '../../../../actions/Synthesis';
import AdminLayout from '../../../../components/AdminLayout';
import Auth from '../../../../components/Auth/Auth';
import { Seller } from '../../../../interfaces/Seller';
import ProductsTable from './ProductsTable';
import SupplierKPI from './SupplierKPI';
import get from 'lodash/get';
import ProductDetails from './ProductDetails';
import { closeSupplierProductDetailModal } from '../../../../actions/Modals';
import SupplierDetails from './SupplierDetails';
import { resetSupplier } from '../../../../actions/Suppliers';

interface SupplierProps {
  // trackProductWithPatch(
  //   productID: string,
  //   productTrackGroupID: string,
  //   status: string,
  //   supplierID: string
  // ): () => void;

  // trackProductWithPost(
  //   productID: string,
  //   productTrackGroupID: string,
  //   status: string,
  //   supplierID: string
  // ): () => void;

  //getProductTrackGroupId(supplierID: string): () => void;
  sellerData: Seller;
  //productTrackGroup: [{ id: 0 }];
  match: { params: { supplierID: ''; auth: Auth } };
  productDetailsModalOpen: false;
  closeProductDetailModal: () => void;
  resetSupplier: () => void;
}

export class Supplier extends React.Component<SupplierProps> {
  componentDidMount() {
    //this.props.getProductTrackGroupId(this.props.match.params.supplierID);
  }
  componentWillUnmount() {
    this.props.resetSupplier();
  }

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
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'Synthesis'}
      >
        <Segment basic={true} className="setting">
          <Divider />
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width={4}>
                <SupplierKPI />
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
      </AdminLayout>
    );
  }
}

const mapStateToProps = (state: any) => ({
  productTrackGroup: state.synthesis.productTrackGroup,
  sellerData: state.settings.profile,
  productDetailsModalOpen: get(state, 'modals.supplierProductDetail.open', false),
});

const mapDispatchToProps = {
  getProductTrackGroupId: (supplierID: string) => getProductTrackGroupId(supplierID),
  trackProductWithPatch: (
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string
  ) => trackProductWithPatch(productID, productTrackGroupID, status, supplierID),
  trackProductWithPost: (
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string
  ) => trackProductWithPost(productID, productTrackGroupID, status, supplierID),
  closeProductDetailModal: () => closeSupplierProductDetailModal(),
  resetSupplier: () => resetSupplier(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supplier);
