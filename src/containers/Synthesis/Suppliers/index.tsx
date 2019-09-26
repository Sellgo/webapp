import React from 'react';
import {
  Button,
  Divider,
  Segment,
  Icon,
  Popup,
  Modal,
  List,
  Container,
  Confirm,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './suppliers.css';
import { Link } from 'react-router-dom';

import {
  saveSupplierNameAndDescription,
  updateSupplierNameAndDescription,
  deleteSupplier,
  postProductTrackGroupId,
} from '../../../actions/Synthesis';

import { getAmazonMWSAuthorized, getBasicInfoSeller } from '../../../actions/Settings';
import AdminLayout from '../../../components/AdminLayout';
import { Modals } from '../../../components/Modals';
import MesssageComponent from '../../../components/MessageComponent';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import Auth from '../../../components/Auth/Auth';
import UploadSupplierFiles from '../../UploadSupplierFiles';
import {
  openUploadSupplierModal,
  closeUploadSupplierModal,
  openUserOnboardingModal,
  closeUserOnboardingModal,
} from '../../../actions/Modals';
import get from 'lodash/get';
import SuppliersTable from './SuppliersTable';
import UserOnboarding from '../../UserOnboarding';
import { suppliersSelector } from '../../../selectors/Supplier';
import { Seller } from '../../../interfaces/Seller';
import { amazonMWSAuthorizedSelector } from '../../../selectors/Settings';
import { Supplier } from '../../../interfaces/Supplier';

interface State {
  isMessageModalOn: boolean;
  isOpen: boolean;
  size: string;
  modalOpen: boolean;
  supplier_name: string;
  supplier_description: string;
  file: any;
  currentPage: any;
  totalPages: any;
  singlePageItemsCount: any;
  updateDetails: boolean;
  update_product_id: string;
  delete_confirmation: boolean;
  suppliers: Supplier[];
  delete_supplier_container: {
    contact: string;
    description: string;
    email: string;
    freight_fee: string;
    id: number;
    item_active_count: string;
    item_total_count: string;
    name: string;
    phone: string;
    rate: string;
    seller_id: number;
    status: string;
    supplier_group_id: 1;
    timezone: string;
    upcharge_fee: string;
    website: string;
    xid: string;
  };
  sortDirection: any;
  sortedColumn: string;
  exit_confirmation: boolean;
}

interface Props {
  getBasicInfoSeller(): () => void;

  getAmazonMWSAuthorized(): () => void;

  postProductTrackGroupId(supplierID: string, supplierName: string): () => void;

  saveSupplierNameAndDescription(name: string, description: string, callBack: any): () => any;

  updateSupplierNameAndDescription(
    name: string,
    description: string,
    update_product_id: string,
    callBack: any
  ): () => any;

  deleteSupplier(supplier_id: any, callBack: any): () => any;

  match: { params: { auth: Auth } };
  suppliers: Supplier[];
  amazonMWSAuthorized: boolean;
  new_supplier: string;
  sellerData: Seller;
  uploadCSVResponse: { message: ''; status: '' };
  openUploadSupplierModal: typeof openUploadSupplierModal;
  closeUploadSupplierModal: typeof closeUploadSupplierModal;
  uploadSupplierModalOpen: boolean;
  openUserOnboardingModal: typeof openUserOnboardingModal;
  closeUserOnboardingModal: typeof closeUserOnboardingModal;
  userOnboardingModalOpen: boolean;
}

export class Suppliers extends React.Component<Props, State> {
  state: State = {
    suppliers: [],
    isOpen: false,
    size: '',
    modalOpen: false,
    supplier_name: '',
    supplier_description: '',
    file: '',
    totalPages: 5,
    currentPage: 1,
    singlePageItemsCount: 10,
    updateDetails: false,
    isMessageModalOn: false,
    update_product_id: '0',
    delete_confirmation: false,
    delete_supplier_container: {
      contact: '',
      description: '',
      email: '',
      freight_fee: '',
      id: 0,
      item_active_count: '',
      item_total_count: '',
      name: '',
      phone: '',
      rate: '',
      seller_id: 0,
      status: '',
      supplier_group_id: 1,
      timezone: '',
      upcharge_fee: '',
      website: '',
      xid: '',
    },
    sortDirection: undefined,
    sortedColumn: '',
    exit_confirmation: false,
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#cf3105',
  };
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

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (
      nextProps.uploadCSVResponse.status !== this.props.uploadCSVResponse.status &&
      nextProps.uploadCSVResponse.status !== 'unset'
    ) {
      this.message.message = nextProps.uploadCSVResponse.message;
      this.message.description = ' ';
      this.message.description2 = '    ';
      this.message.to = '#';
      if (nextProps.uploadCSVResponse.status === 'failed') {
        this.message.title = 'Upload Failed';
        this.message.icon = 'warning sign';
        this.message.color = '#cf3105';
      } else {
        this.message.title = 'Upload Successful';
        this.message.icon = 'check circle';
        this.message.color = '#4285f4';
      }
      this.handleMessageModal();
    }
  }

  componentDidUpdate(prevProps: any) {}

  fileChange = (event: any): void => {
    this.setState({ file: event.target.files[0] }, () => {});
  };

  openUpdateSupplierPopup = (supplier: Supplier): void => {
    if (this.props.amazonMWSAuthorized) {
      this.props.openUploadSupplierModal(supplier);
      this.setState({
        update_product_id: supplier.id,
        updateDetails: true,
        supplier_name: supplier.name,
        supplier_description: supplier.description,
      });
    } else {
      this.message.title = 'Unauthorized Access';
      this.message.message = 'MWS Auth token not found';
      this.message.description = 'Please Setup MWS Authorization Token';
      this.message.to = '/dashboard/setting';
      this.message.icon = 'warning sign';
      this.message.color = '#cf3105';
      this.handleMessageModal();
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
      this.message.title = 'Unauthorized Access';
      this.message.message = 'MWS Auth token not found';
      this.message.description = 'Please Setup MWS Authorization Token';
      this.message.to = '/dashboard/setting';
      this.message.icon = 'warning sign';
      this.message.color = '#cf3105';
      this.handleMessageModal();
    }
  };

  handleClose = () => {
    this.props.closeUploadSupplierModal();
    this.setState({ updateDetails: false });
  };

  handleMessageChange = (message: any) => {
    this.message = {
      ...this.message,
      ...message,
    };

    this.handleMessageModal();
  };

  public onChangeSupplierDescription = async (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ supplier_description: (event.target as HTMLTextAreaElement).value });
    return false;
  };

  public onChangeSupplierName = async (event: any) => {
    this.setState({ supplier_name: event.target.value });
    return false;
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

  public deleteSupplier = () => {
    this.props.deleteSupplier(this.state.delete_supplier_container.id, (data: any) => {
      this.setState({ delete_confirmation: false });
    });
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
          <SuppliersTable
            delete_confirmation={this.state.delete_confirmation}
            onMessageChange={this.handleMessageChange}
            onEdit={this.openUpdateSupplierPopup}
            onDelete={(value: any) => {
              this.setState({
                delete_confirmation: true,
                delete_supplier_container: value,
              });
            }}
            onPageChange={(data: any) => {
              this.setState({
                currentPage: data.activePage,
              });
            }}
            onCancelDelete={() => {
              this.setState({
                delete_confirmation: false,
                delete_supplier_container: {
                  contact: '',
                  description: '',
                  email: '',
                  freight_fee: '',
                  id: 0,
                  item_active_count: '',
                  item_total_count: '',
                  name: '',
                  phone: '',
                  rate: '',
                  seller_id: 0,
                  status: '',
                  supplier_group_id: 1,
                  timezone: '',
                  upcharge_fee: '',
                  website: '',
                  xid: '',
                },
              });
            }}
            onDeleteSupplier={this.deleteSupplier}
          />
          <Modals
            title=""
            size="large"
            open={this.state.isMessageModalOn}
            close={this.handleMessageModal}
            bCloseIcon={true}
          >
            <Container textAlign="center">
              <MesssageComponent message={this.message} isModal={true} />
              <Segment textAlign="center" basic={true}>
                <Button
                  style={buttonStyle}
                  content="Ok"
                  onClick={this.handleMessageModal}
                  as={Link}
                  to={this.message.to}
                />
              </Segment>
            </Container>
          </Modals>
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

  handleMessageModal = () => {
    const { isMessageModalOn } = this.state;
    this.setState({
      isMessageModalOn: !isMessageModalOn,
    });
  };
}

const mapStateToProps = (state: any) => {
  return {
    suppliers: suppliersSelector(state),
    amazonMWSAuthorized: amazonMWSAuthorizedSelector(state),
    uploadCSVResponse: state.synthesis.uploadCSVResponse,
    new_supplier: state.synthesis.new_supplier,
    sellerData: state.settings.profile,
    uploadSupplierModalOpen: get(state, 'modals.uploadSupplier.open', false),
    userOnboardingModalOpen: get(state, 'modals.userOnboarding.open', false),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
    getAmazonMWSAuthorized: () => dispatch(getAmazonMWSAuthorized()),
    postProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(postProductTrackGroupId(supplierID, supplierName)),
    saveSupplierNameAndDescription: (name: string, description: string, callBack: any) =>
      dispatch(saveSupplierNameAndDescription(name, description, callBack)),
    updateSupplierNameAndDescription: (
      name: string,
      description: string,
      update_product_id: string,
      callBack: any
    ) => dispatch(updateSupplierNameAndDescription(name, description, update_product_id, callBack)),
    deleteSupplier: (supplier_id: any, callBack: any) =>
      dispatch(deleteSupplier(supplier_id, callBack)),
    openUploadSupplierModal: (supplier?: Supplier) =>
      dispatch(openUploadSupplierModal(supplier ? supplier : undefined)),
    closeUploadSupplierModal: () => dispatch(closeUploadSupplierModal()),
    openUserOnboardingModal: () => dispatch(openUserOnboardingModal()),
    closeUserOnboardingModal: () => dispatch(closeUserOnboardingModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suppliers);
