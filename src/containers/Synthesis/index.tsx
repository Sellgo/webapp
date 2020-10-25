import React, { Component } from 'react';
import { Button, Segment, Icon, Popup, Modal, List, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './synthesis.scss';
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
import {
  currentSynthesisId,
  currentProgress,
  currentStepSelector,
  currentProgressShow,
  currentConfirmationShow,
} from '../../selectors/UploadSupplier';
import { setProgressShow, setConfirmationShow } from '../../actions/UploadSupplier';
import { setProgress } from '../../actions/Suppliers';
import SubscriptionMessage from '../../components/FreeTrialMessageDisplay';
import { isSubscriptionFree } from '../../utils/subscriptions';

import SearchFilter from '../../components/SearchFilter/';

interface SynthesisProps {
  uploadSupplierModalOpen: boolean;
  userOnboardingModalOpen: boolean;
  openUserOnboardingModal: () => void;
  openUploadSupplierModal: (supplier?: any) => void;
  closeUploadSupplierModal: () => void;
  setProgressShow: any;
  setConfirmationShow: any;
  currentSynId: any;
  currentStep: any;
  currentProgressShow: any;
  currentConfirmationShow: boolean;
  currentProgress: any;
  setProgress: any;
  match: any;
  subscriptionType: string;
}

class Synthesis extends Component<SynthesisProps> {
  state = {
    exitConfirmation: false,
    isEditModal: false,
    searchValue: '',
  };

  openUpdateSupplierPopup = (supplier: any): void => {
    const { openUploadSupplierModal } = this.props;
    this.setState({ isEditModal: true });
    openUploadSupplierModal(supplier);
  };

  handleAddNewSupplierModalOpen = () => {
    const { openUploadSupplierModal } = this.props;
    this.setState({ isEditModal: false });
    openUploadSupplierModal();
  };

  handleClose = () => {
    const { closeUploadSupplierModal, setProgressShow, setProgress } = this.props;
    this.setState({ isEditModal: false });
    setProgressShow(false);
    setProgress(0);
    closeUploadSupplierModal();
    setConfirmationShow(false);
  };

  renderAddNewSupplierModal = () => {
    const {
      uploadSupplierModalOpen,
      currentStep,
      currentConfirmationShow,
      subscriptionType,
    } = this.props;
    if (isSubscriptionFree(subscriptionType)) {
      return (
        <Button basic className="add-new-supplier disabled">
          Add New Search
        </Button>
      );
    } else {
      return (
        <>
          <Modal
            size={'large'}
            open={uploadSupplierModalOpen}
            onClose={() => {
              currentStep === 0 && currentConfirmationShow === false
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
                Add New Search
              </Button>
            }
          >
            <Modal.Content>
              <UploadSupplier {...this.state} />
            </Modal.Content>
          </Modal>
        </>
      );
    }
  };

  renderCallToActionBtns = () => {
    const { subscriptionType } = this.props;
    if (!isSubscriptionFree(subscriptionType)) {
      return (
        <>
          <Popup
            basic
            className={'add-supplier-popup'}
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
            positionFixed
            on="hover"
          >
            <h4>{'Adding new Search'}</h4>
            To add a new search:
            <List as={'ol'}>
              <List.Item as="li">Click on Add New Search.</List.Item>
              <List.Item as="li">In the popup enter the details of the search.</List.Item>
              <List.Item as="li">Select your supplier file from your computer (.csv).</List.Item>
              <List.Item as="li">
                We will check your file for errors and you will have the option to fix it.
              </List.Item>
              <List.Item as="li">Click on upload.</List.Item>
              <List.Item as="li">
                You can close the popup and the upload progress will still run.
              </List.Item>
            </List>
          </Popup>
        </>
      );
    }
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

  setSearchChange = (e: any) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  render() {
    const { currentProgressShow, match } = this.props;

    return (
      <>
        <SubscriptionMessage />
        <PageHeader
          title="Search Management"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Search Management' }]}
          callToAction={this.renderCallToActionBtns()}
          auth={match.params.auth}
        />
        <SearchFilter handleChange={this.setSearchChange} filterValue={this.state.searchValue} />
        {this.renderAddNewSupplierModal()}
        <Segment basic={true}>
          <SuppliersTable
            onEdit={this.openUpdateSupplierPopup}
            supplierSearch={this.state.searchValue}
          />
          <Modal open={this.state.exitConfirmation} className="Actions__confirm-container">
            <Modal.Content>
              <div>
                <Header as="h4" icon>
                  {currentProgressShow === true ? 'Do you want to exit?' : 'Exit before uploading?'}
                  {currentProgressShow === false && (
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
  uploadSupplierModalOpen: get(state, 'modals.uploadSupplier.open', false),
  userOnboardingModalOpen: get(state, 'modals.userOnboarding.open', false),
  currentProgress: currentProgress(state),
  currentSynId: currentSynthesisId(state),
  currentStep: currentStepSelector(state),
  currentProgressShow: currentProgressShow(state),
  currentConfirmationShow: currentConfirmationShow(state),
});

const mapDispatchToProps = {
  openUploadSupplierModal: (supplier?: any) =>
    openUploadSupplierModal(supplier ? supplier : undefined),
  closeUploadSupplierModal,
  openUserOnboardingModal,
  setProgressShow,
  setConfirmationShow,
  setProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(Synthesis);
