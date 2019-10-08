import React, { Component } from 'react';
import { Button, Divider, Segment, Icon, Popup, Modal, List, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './synthesis.css';
import history from '../../history';
import { getAmazonMWSAuthorized } from '../../actions/Settings';
import UploadSupplier from './UploadSupplier';
import {
  openUploadSupplierModal,
  closeUploadSupplierModal,
  openUserOnboardingModal,
} from '../../actions/Modals';
import get from 'lodash/get';
import SuppliersTable from './SuppliersTable';
import UserOnboarding from '../UserOnboarding';
import PageHeader from '../../components/PageHeader';
import { amazonMWSAuthorizedSelector } from '../../selectors/Settings';
import { error } from '../../utils/notifications';

interface SynthesisProps {
  amazonMWSAuthorized: boolean;
  uploadSupplierModalOpen: boolean;
  userOnboardingModalOpen: boolean;
  getAmazonMWSAuthorized: () => void;
  openUserOnboardingModal: () => void;
  openUploadSupplierModal: (supplier?: any) => void;
  closeUploadSupplierModal: () => void;
}

class Synthesis extends Component<SynthesisProps> {
  state = { exitConfirmation: false };
  componentDidMount() {
    const { getAmazonMWSAuthorized, openUserOnboardingModal } = this.props;
    getAmazonMWSAuthorized();
    const visited = localStorage.getItem('firstLogin');
    if (!visited) {
      openUserOnboardingModal();
      localStorage['firstLogin'] = true;
    }
  }

  openUpdateSupplierPopup = (supplier: any): void => {
    const { amazonMWSAuthorized, openUploadSupplierModal } = this.props;
    if (amazonMWSAuthorized) {
      openUploadSupplierModal(supplier);
    } else {
      error('Unauthorized access! Please add Amazon Seller Central credentials', {
        onClose: () => history.push('/settings#amazon-mws'),
      });
    }
  };

  handleAddNewSupplierModalOpen = () => {
    const { amazonMWSAuthorized, openUploadSupplierModal } = this.props;
    if (amazonMWSAuthorized) {
      openUploadSupplierModal();
    } else {
      error('Unauthorized access! Please add Amazon Seller Central credentials', {
        onClose: () => history.push('/settings#amazon-mws'),
      });
    }
  };

  handleClose = () => {
    const { closeUploadSupplierModal } = this.props;
    closeUploadSupplierModal();
  };

  renderAddNewSupplierModal = () => {
    const { uploadSupplierModalOpen } = this.props;
    return (
      <>
        <Modal
          size={'large'}
          open={uploadSupplierModalOpen}
          onClose={() => {
            this.setState({ exitConfirmation: true });
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
            <UploadSupplier />
          </Modal.Content>
        </Modal>
        <Popup
          className={'addSupplierPopup'}
          trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
          position="top left"
          size="tiny"
        >
          <h4>{'Adding a Supplier'}</h4>
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
    );
  };

  UserOnboardingModal = () => {
    const { userOnboardingModalOpen } = this.props;
    return (
      <Modal size={'small'} open={userOnboardingModalOpen}>
        <Modal.Content>
          <UserOnboarding />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    return (
      <>
        <PageHeader
          title="Synthesis"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Profit Syn' }]}
          callToAction={this.renderAddNewSupplierModal()}
        />

        <Segment basic={true}>
          <SuppliersTable onEdit={this.openUpdateSupplierPopup} />
          <Confirm
            content="Do you want to exit?"
            open={this.state.exitConfirmation}
            onCancel={() => {
              this.setState({ exitConfirmation: false });
            }}
            onConfirm={() => {
              this.setState({ exitConfirmation: false });
              this.handleClose();
            }}
          />
          <this.UserOnboardingModal />
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  amazonMWSAuthorized: amazonMWSAuthorizedSelector(state),
  uploadSupplierModalOpen: get(state, 'modals.uploadSupplier.open', false),
  userOnboardingModalOpen: get(state, 'modals.userOnboarding.open', false),
});

const mapDispatchToProps = {
  getAmazonMWSAuthorized,
  openUploadSupplierModal: (supplier?: any) =>
    openUploadSupplierModal(supplier ? supplier : undefined),
  closeUploadSupplierModal,
  openUserOnboardingModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Synthesis);
