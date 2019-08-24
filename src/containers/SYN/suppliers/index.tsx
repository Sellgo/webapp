import * as React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Table,
  Checkbox,
  Dropdown,
  Input,
  Icon,
  Popup,
  Modal,
  TextArea,
  Pagination,
  Loader,
  Confirm,
  List,
  Container,
  Card,
  Feed,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import './suppliers.css';
import history from '../../../history';
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

    this.setState({
      totalPages: Math.ceil(nextProps.suppliers.length / this.state.singlePageItemsCount),
      suppliers: nextProps.suppliers,
    });
  }

  componentDidUpdate(prevProps: any) {}

  fileChange = (event: any): void => {
    this.setState({ file: event.target.files[0] }, () => {});
  };

  openUpdateSupplierPopup = (value: any): void => {
    if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
      this.props.openUploadSupplierModal();
      this.setState({
        update_product_id: value.id,
        updateDetails: true,
        supplier_name: value.name,
        supplier_description: value.description,
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
        size={'tiny'}
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

  handleSort = (clickedColumn: keyof Supplier) => {
    const { sortedColumn, sortDirection } = this.state;
    const suppliers = JSON.parse(JSON.stringify(this.state.suppliers));
    if (sortedColumn !== clickedColumn) {
      const sortedSuppliers = suppliers.sort((a: Supplier, b: Supplier) => {
        let aColumn, bColumn;
        if (clickedColumn == 'rate') {
          aColumn = Number(a[clickedColumn]);
          bColumn = Number(b[clickedColumn]);
        } else {
          aColumn = a[clickedColumn];
          bColumn = b[clickedColumn];
        }

        if (aColumn < bColumn) {
          return -1;
        }
        if (aColumn > bColumn) {
          return 1;
        }
        return 0;
      });
      this.setState({
        sortedColumn: clickedColumn,
        suppliers: sortedSuppliers,
        sortDirection: 'ascending',
      });
    } else {
      this.setState({
        suppliers: suppliers.reverse(),
        sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
      });
    }
  };

  renderTable = () => {
    const { sortedColumn, sortDirection } = this.state;
    const currentPage = this.state.currentPage - 1;
    const suppliers = [...this.state.suppliers].slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount
    );
    return this.state.suppliers.length == 0 ? (
      <Segment>
        <Loader
          hidden={this.state.suppliers.length == 0 ? false : true}
          active={true}
          inline="centered"
          size="massive"
        >
          Loading
        </Loader>
      </Segment>
    ) : (
      <Table sortable={true} basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortedColumn === 'name' ? sortDirection : undefined}
              onClick={() => this.handleSort('name')}
            >
              Supplier Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={1}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={sortedColumn === 'p2l_ratio' ? sortDirection : undefined}
              onClick={() => this.handleSort('p2l_ratio')}
            >
              Product to Listing Ratio
              <span>
                {' '}
                <Popup
                  trigger={<Icon name="question circle" color={'grey'} />}
                  position="top left"
                  size="tiny"
                  content="Product to Listing Ratio"
                />
              </span>
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={sortedColumn === 'rate' ? sortDirection : undefined}
              onClick={() => this.handleSort('rate')}
            >
              Supplier Rate (%)
              <span>
                {' '}
                <Popup
                  trigger={<Icon name="question circle" color={'grey'} />}
                  position="top left"
                  size="tiny"
                  content="Supplier Rate (%)"
                />
              </span>
            </Table.HeaderCell>
            {/*<Table.HeaderCell>Note</Table.HeaderCell>*/}
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.suppliers[0].id == -10000000 ? (
            <Table.Row key={134}>
              <Table.Cell>
                <h1>Data not found</h1>
              </Table.Cell>
            </Table.Row>
          ) : (
            suppliers.map((value: Supplier, index) => {
              return (
                <Table.Row key={value.id}>
                  <Table.Cell style={{ width: '600px' }}>
                    <Table.Cell as={Link} to={`/syn/${value.id}`}>
                      {value.name}
                    </Table.Cell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{value.status}</Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Dropdown
                      className={'SynDropDown'}
                      text="SYN"
                      selectOnBlur={false}
                      fluid={true}
                      selection={true}
                      options={[
                        {
                          key: '0',
                          text: 'SYN',
                          value: 'SYN',
                        },
                      ]}
                      onChange={(e, data) => {
                        if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
                          if (data.value === 'SYN') {
                            history.push(`/syn/${value.id}`);
                          }
                        } else {
                          this.message.title = 'Unauthorized Access';
                          this.message.message = 'MWS Auth token not found';
                          this.message.description = 'Please Setup MWS Authorization Token';
                          this.message.to = '/dashboard/setting';
                          this.message.icon = 'warning sign';
                          this.message.color = '#cf3105';
                          this.handleMessageModal();
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{value.p2l_ratio}</Table.Cell>
                  <Table.Cell textAlign="center">{Number(value.rate).toLocaleString()}</Table.Cell>
                  {/*<Table.Cell>*/}
                  {/*  <Input focus placeholder='Note'/>*/}
                  {/*</Table.Cell>*/}
                  <Table.Cell textAlign="right" style={{ paddingRight: '10px' }}>
                    {/* <Table.Cell as={Link} to={`/syn/`}>
                     <Icon
                     onClick={() => {
                     this.openUpdateSupplierPopup(value);
                     }}
                     name='cloud upload' style={{color: 'black'}}
                     />&nbsp;
                     </Table.Cell> */}
                    <Table.Cell as={Link}>
                      <Icon
                        name="refresh"
                        style={{ color: 'black' }}
                        onClick={() => {
                          if (localStorage.getItem(localStorageKeys.isMWSAuthorized) == 'true') {
                          } else {
                            this.message.title = 'Unauthorized Access';
                            this.message.message = 'MWS Auth token not found';
                            this.message.description = 'Please Setup MWS Authorization Token';
                            this.message.to = '/dashboard/setting';
                            this.message.icon = 'warning sign';
                            this.message.color = '#cf3105';
                            this.handleMessageModal();
                          }
                        }}
                      />
                      &nbsp;
                    </Table.Cell>
                    <Table.Cell
                      as={Link}
                      to={{}}
                      onClick={() => {
                        this.openUpdateSupplierPopup(value);
                      }}
                    >
                      <Icon name="pencil" style={{ color: 'black' }} />
                      &nbsp;
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => {
                        this.setState({
                          delete_confirmation: true,
                          delete_supplier_container: value,
                        });
                      }}
                      as={Link}
                      to="/syn"
                    >
                      <Icon name="trash alternate" style={{ color: 'black' }} />
                      {/*{this.renderDeleteModal(value, index)}*/}
                    </Table.Cell>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Pagination
                totalPages={this.state.totalPages}
                activePage={this.state.currentPage}
                onPageChange={(event, data) => {
                  this.setState({
                    currentPage: data.activePage,
                  });
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
        <Confirm
          content="Do you want to delete supplier?"
          open={this.state.delete_confirmation}
          onCancel={() => {
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
          onConfirm={() => {
            this.deleteSupplier();
          }}
        />
      </Table>
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
          {this.renderTable()}
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
    suppliers: state.synReducer.suppliers,
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
    openUploadSupplierModal: () => dispatch(openUploadSupplierModal()),
    closeUploadSupplierModal: () => dispatch(closeUploadSupplierModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suppliers);
