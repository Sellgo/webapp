import React, { Component } from 'react';
import { Button, Modal, Header, Divider } from 'semantic-ui-react';
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
  history: any;
  location: any;
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
      currentProgressShow,
      currentProgress,
    } = this.props;
    return (
      <>
        <Modal
          size={'large'}
          open={uploadSupplierModalOpen}
          onClose={() => {
            (currentStep === 0 && currentConfirmationShow === false) ||
            (currentProgressShow && currentStep === 2 && currentProgress >= 100)
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

  setClearSearchValue = () => {
    this.setState({
      searchValue: '',
    });
  };

  render() {
    const { currentProgressShow, currentProgress, currentStep, match } = this.props;

    return (
      <>
        <SubscriptionMessage page={'search-management'} />
        <PageHeader
          title="Search Management"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Search Management' }]}
          auth={match.params.auth}
        />
        <SearchFilter
          handleChange={this.setSearchChange}
          filterValue={this.state.searchValue}
          clearSearch={this.setClearSearchValue}
        />
        {this.renderAddNewSupplierModal()}
        <div className="search-management-content">
          <SuppliersTable
            onEdit={this.openUpdateSupplierPopup}
            supplierSearch={this.state.searchValue}
          />

          {currentProgressShow && currentStep === 2 && currentProgress >= 100 ? null : (
            <Modal open={this.state.exitConfirmation} className="Actions__confirm-container">
              <Modal.Content>
                <div>
                  <Header as="h4" icon>
                    {currentProgressShow === true
                      ? 'Do you want to exit?'
                      : 'Exit before uploading?'}
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
          )}

          <this.UserOnboardingModal />
        </div>
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
