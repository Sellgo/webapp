import * as React from 'react';
import {
  Button,
  Divider,
  Grid,
  Segment,
  Icon,
  Popup,
  Modal,
  List,
  Container,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './suppliers.css';
import { Link } from 'react-router-dom';

import {
  getSellers,
  Supplier,
  saveSupplierNameAndDescription,
  updateSupplierNameAndDescription,
  resetUploadCSVResponse,
  getTimeEfficiency,
  TimeEfficiency,
  deleteSupplier,
  postProductTrackGroupId,
  Product,
} from '../../../Action/SYNActions';

import { getIsMWSAuthorized, getBasicInfoSeller } from '../../../Action/SettingActions';
import AdminLayout from '../../../components/AdminLayout';
import { SellField } from '../../../Action/SettingActions';
import { localStorageKeys } from '../../../constant/constant';
import { Modals } from '../../../components/Modals';
import MesssageComponent from '../../../components/MessageComponent';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import Auth from '../../../components/Auth/Auth';
import UploadSupplierFiles from '../../UploadSupplierFiles';
import { openUploadSupplierModal, closeUploadSupplierModal } from '../../../Action/modals';
import get from 'lodash/get';
import SuppliersTable from './SuppliersTable';
import { suppliersSelector } from '../../../selectors/suppliers';

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
}

interface Props {
  getSellers(): () => void;

  getBasicInfoSeller(): () => void;

  getTimeEfficiency(): () => void;

  resetUploadCSVResponse(): () => void;

  getIsMWSAuthorized(): () => void;

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
  new_supplier: string;
  time_efficiency_data: TimeEfficiency[];
  sellerData: SellField;
  uploadCSVResponse: { message: ''; status: '' };
  openUploadSupplierModal: typeof openUploadSupplierModal;
  closeUploadSupplierModal: typeof closeUploadSupplierModal;
  uploadSupplierModalOpen: boolean;
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
    this.props.resetUploadCSVResponse();
    this.props.getIsMWSAuthorized();
    this.props.getSellers();
    this.props.getTimeEfficiency();
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
      if (nextProps.uploadCSVResponse.status == 'failed') {
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
    if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
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
    if (localStorage.getItem(localStorageKeys.isMWSAuthorized) === 'true') {
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
        onClose={this.handleClose}
        closeIcon={true}
        style={{ width: '90%' }}
        trigger={
          <Button
            basic={true}
            color="black"
            primary={true}
            style={{ borderRadius: '50px' }}
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
      this.props.getSellers();
    });
  };

  render() {
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'Synthesis'}
      >
        <Segment basic={true} className="setting">
          <Divider
            style={{
              borderTop: '1px solid rgba(34,36,38,.20)',
              borderBottom: '1px solid rgba(34,36,38,.20)',
            }}
          />
          <Grid>
            <Grid.Column width={5} floated="left" className={'middle aligned'}>
              {this.renderAddNewSupplierModal()}
              <Popup
                className={'addSupplierPopup'}
                trigger={<Icon name="question circle" size={'large'} color={'grey'} />}
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
            </Grid.Column>
            <Grid.Column width={5} floated="right">
              <Card raised={true} style={{ borderRadius: 10, width: 290 }}>
                <Card.Content
                  style={{
                    paddingTop: 4,
                    paddingBottom: 4,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      padding: '11px',
                      // width: '100%',
                    }}
                  >
                    <span>
                      Time Saved
                      <h2>
                        {this.props.time_efficiency_data.length > 0
                          ? Number(this.props.time_efficiency_data[0].saved_time).toFixed(0) +
                            ' hrs'
                          : '0 hrs'}
                      </h2>
                    </span>
                    <span style={{ marginLeft: 15, flex: 'right' }}>
                      Efficiency
                      <h2>
                        {this.props.time_efficiency_data.length > 0
                          ? Number(this.props.time_efficiency_data[0].efficiency).toFixed(0) + ' %'
                          : '0 %'}
                      </h2>
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
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
    uploadCSVResponse: state.synReducer.uploadCSVResponse,
    new_supplier: state.synReducer.new_supplier,
    time_efficiency_data: state.synReducer.time_efficiency_data,
    sellerData: state.settings.profile,
    uploadSupplierModalOpen: get(state, 'modals.uploadSupplier.open', false),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
    resetUploadCSVResponse: () => dispatch(resetUploadCSVResponse()),
    getIsMWSAuthorized: () => dispatch(getIsMWSAuthorized()),
    postProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(postProductTrackGroupId(supplierID, supplierName)),
    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suppliers);
