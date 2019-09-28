import React, { Component } from 'react';
import { Button, Divider, Segment, Icon, Popup, Modal, List, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './synthesis.css';

import { getAmazonMWSAuthorized, getBasicInfoSeller } from '../../actions/Settings';
import AdminLayout from '../../components/AdminLayout';
import Auth from '../../components/Auth/Auth';
import UploadSupplierFiles from '../UploadSupplierFiles';
import {
  openUploadSupplierModal,
  closeUploadSupplierModal,
  openUserOnboardingModal,
  closeUserOnboardingModal,
} from '../../actions/Modals';
import get from 'lodash/get';
import SuppliersTable from './SuppliersTable';
import UserOnboarding from '../UserOnboarding';
import { Seller } from '../../interfaces/Seller';
import { amazonMWSAuthorizedSelector } from '../../selectors/Settings';
import { error } from '../../utils/notifications';

interface SynthesisProps {
  amazonMWSAuthorized: boolean;
  uploadSupplierModalOpen: boolean;
  userOnboardingModalOpen: boolean;
  match: { params: { auth: Auth } };
  sellerData: Seller;
  getBasicInfoSeller: () => void;
  getAmazonMWSAuthorized: () => void;
  openUserOnboardingModal: () => void;
  openUploadSupplierModal: (supplier?: any) => void;
  closeUploadSupplierModal: () => void;
}

class Synthesis extends Component<SynthesisProps> {
  state = { exit_confirmation: false };
  fileInputRef: any = React.createRef();

  componentDidMount() {
    this.props.getBasicInfoSeller();
    this.props.getAmazonMWSAuthorized();
    const visited = localStorage.getItem('firstLogin');
    if (!visited) {
      this.props.openUserOnboardingModal();
      localStorage['firstLogin'] = true;
    }
  }

  openUpdateSupplierPopup = (supplier: any): void => {
    if (this.props.amazonMWSAuthorized) {
      this.props.openUploadSupplierModal(supplier);
      this.setState({
        update_product_id: supplier.id,
        updateDetails: true,
        supplier_name: supplier.name,
        supplier_description: supplier.description,
      });
    } else {
      error('UnAuthorized Access! Please add Amazon MWS Token.');
    }
  };

  handleAddNewSupplierModalOpen = () => {
    if (this.props.amazonMWSAuthorized) {
      this.props.openUploadSupplierModal();
      this.setState({
        supplier_name: '',
        supplier_description: '',
        updateDetails: false,
      });
    } else {
      error('UnAuthorized Access! Please add Amazon MWS Token.');
    }
  };

  handleClose = () => {
    this.props.closeUploadSupplierModal();
    this.setState({ updateDetails: false });
  };

  renderAddNewSupplierModal = () => {
    return (
      <Modal
        size={'large'}
        open={this.props.uploadSupplierModalOpen}
        onClose={() => {
          this.setState({ exit_confirmation: true });
        }}
        closeIcon={true}
        style={{ width: '90%' }}
        trigger={
          <Button
            primary={true}
            className="add-new-supplier"
            onClick={this.handleAddNewSupplierModalOpen}
          >
            Add New Supplier
          </Button>
        }
      >
        <Modal.Content>
          <UploadSupplierFiles />
        </Modal.Content>
      </Modal>
    );
  };

  renderUserOnboardingModal = () => {
    return (
      <Modal size={'small'} open={this.props.userOnboardingModalOpen}>
        <Modal.Content>
          <UserOnboarding />
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
        callToAction={
          <>
            {this.renderAddNewSupplierModal()}
            <Popup
              className={'addSupplierPopup'}
              trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
              position="top left"
              size="tiny"
            >
              <h4>Adding a Supplier</h4>
              To add a supplier:
              <List as={'ol'}>
                <List.Item as="li">In the Business menu, select the Suppliers.</List.Item>
                <List.Item as="li">On the Suppliers tab, select New Supplier.</List.Item>
                <List.Item as="li">
                  On the New Supplier screen, enter the details of the suppler.
                </List.Item>
                <List.Item as="li">Save the details of the new supplier.</List.Item>
              </List>
            </Popup>
          </>
        }
      >
        <Segment basic={true} className="setting">
          <Divider
            style={{
              borderTop: '1px solid rgba(34,36,38,.20)',
              borderBottom: '1px solid rgba(34,36,38,.20)',
            }}
          />
          <SuppliersTable onEdit={this.openUpdateSupplierPopup} />
          <Confirm
            content="Do you want to exit?"
            open={this.state.exit_confirmation}
            onCancel={() => {
              this.setState({ exit_confirmation: false });
            }}
            onConfirm={() => {
              this.setState({ exit_confirmation: false });
              this.handleClose();
            }}
          />
          {this.renderUserOnboardingModal()}
        </Segment>
      </AdminLayout>
    );
  }
}

const mapStateToProps = (state: any) => ({
  amazonMWSAuthorized: amazonMWSAuthorizedSelector(state),
  sellerData: state.settings.profile,
  uploadSupplierModalOpen: get(state, 'modals.uploadSupplier.open', false),
  userOnboardingModalOpen: get(state, 'modals.userOnboarding.open', false),
});

const mapDispatchToProps = {
  getBasicInfoSeller,
  getAmazonMWSAuthorized,
  openUploadSupplierModal: (supplier?: any) =>
    openUploadSupplierModal(supplier ? supplier : undefined),
  closeUploadSupplierModal,
  openUserOnboardingModal,
  closeUserOnboardingModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Synthesis);
