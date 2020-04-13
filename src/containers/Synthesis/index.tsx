import React, { Component } from 'react';
import { Button, Segment, Icon, Popup, Modal, List, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './synthesis.scss';
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
import { currentSynthesisId, currentProgress } from '../../selectors/UploadSupplier';
import { setProgressShow } from '../../actions/UploadSupplier';
import { setProgress } from '../../actions/Suppliers';

interface SynthesisProps {
  amazonMWSAuthorized: boolean;
  uploadSupplierModalOpen: boolean;
  userOnboardingModalOpen: boolean;
  getAmazonMWSAuthorized: () => void;
  openUserOnboardingModal: () => void;
  openUploadSupplierModal: (supplier?: any) => void;
  closeUploadSupplierModal: () => void;
  setProgressShow: any;
  currentSynId: any;
  currentProg: any;
  setProgress: any;
  match: any;
}

class Synthesis extends Component<SynthesisProps> {
  state = {
    exitConfirmation: false,
    isEditModal: false,
  };
  componentDidMount() {
    const { getAmazonMWSAuthorized, openUserOnboardingModal } = this.props;
    getAmazonMWSAuthorized();
    const acceptedTos = localStorage.getItem('acceptedTos');
    const acceptedPp = localStorage.getItem('acceptedPp');
    if (!acceptedTos || !acceptedPp) {
      openUserOnboardingModal();
    }
  }

  openUpdateSupplierPopup = (supplier: any): void => {
    const { amazonMWSAuthorized, openUploadSupplierModal } = this.props;
    if (amazonMWSAuthorized) {
      this.setState({ isEditModal: true });
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
      this.setState({ isEditModal: false });
      openUploadSupplierModal();
    } else {
      error('Unauthorized access! Please add Amazon Seller Central credentials', {
        onClose: () => history.push('/settings#amazon-mws'),
      });
    }
  };

  handleClose = () => {
    const { closeUploadSupplierModal, setProgressShow, setProgress } = this.props;
    this.setState({ isEditModal: false });
    setProgressShow(false);
    setProgress(0);
    closeUploadSupplierModal();
  };

  renderAddNewSupplierModal = () => {
    const { uploadSupplierModalOpen, currentProg, currentSynId } = this.props;

    return (
      <>
        <Modal
          size={'large'}
          open={uploadSupplierModalOpen}
          onClose={() => {
            currentProg >= 100 && !currentSynId
              ? this.handleClose()
              : this.setState({ exitConfirmation: true });
          }}
          closeIcon={true}
          style={{ width: '90%' }}
          className="new-supplier-modal"
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
            <UploadSupplier {...this.state} />
          </Modal.Content>
        </Modal>
        <Popup
          className={'add-supplier-popup'}
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
    const { userOnboardingModalOpen, match } = this.props;
    return (
      <Modal size={'small'} open={userOnboardingModalOpen}>
        <Modal.Content>
          <UserOnboarding auth={match.params.auth} />
        </Modal.Content>
      </Modal>
    );
  };

  render() {
    const { currentSynId, currentProg } = this.props;
    return (
      <>
        <PageHeader
          title="Profit Finder"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Profit Finder' }]}
          callToAction={this.renderAddNewSupplierModal()}
        />

        <Segment basic={true}>
          <SuppliersTable onEdit={this.openUpdateSupplierPopup} />
          <Modal open={this.state.exitConfirmation} className="Actions__confirm-container">
            <Modal.Content>
              <div>
                <Header as="h4" icon>
                  {!currentSynId && currentProg < 100
                    ? 'Do you want to exit?'
                    : 'Exit before uploading?'}
                  {!(!currentSynId && currentProg < 100) && (
                    <Header.Subheader>
                      The current process will be saved into the "drafts" tab but will not be
                      processed
                    </Header.Subheader>
                  )}
                  <Header.Subheader />
                </Header>
                <Divider clearing />
              </div>
            </Modal.Content>
            <div className="Actions__btn">
              <Button content="No" onClick={() => this.setState({ exitConfirmation: false })} />
              <Button
                content="Yes"
                onClick={() => {
                  this.setState({ exitConfirmation: false });
                  this.handleClose();
                }}
              />
            </div>
          </Modal>

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
  currentProg: currentProgress(state),
  currentSynId: currentSynthesisId(state),
});

const mapDispatchToProps = {
  getAmazonMWSAuthorized,
  openUploadSupplierModal: (supplier?: any) =>
    openUploadSupplierModal(supplier ? supplier : undefined),
  closeUploadSupplierModal,
  openUserOnboardingModal,
  setProgressShow,
  setProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Synthesis);
