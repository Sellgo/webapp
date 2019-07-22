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
  Confirm, List,
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
  New_Supplier,
  uploadCSV,
  getTimeEfficiency,
  TimeEfficiency,
  deleteSupplier, postProductTrackGroupId,
} from '../../../Action/SYNActions';
import { AdminLayout } from '../../../components/AdminLayout';
import { SellField } from '../../../Action/SettingActions';

interface State {
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
    supplier_group_id: 1,
    timezone: string;
    upcharge_fee: string;
    website: string;
    xid: string;
  }
}

interface Props {
  getSellers(): () => void;

  getTimeEfficiency(): () => void;
  postProductTrackGroupId(supplierID: string, supplierName: string): () => void;

  saveSupplierNameAndDescription(name: string, description: string, callBack: any): () => any;

  updateSupplierNameAndDescription(name: string, description: string, update_product_id: string, callBack: any): () => any;

  deleteSupplier(supplier_id: any, callBack: any): () => any;

  uploadCSV(new_supplier_id: string, file: any): () => void;

  match: { params: { auth: null } };
  suppliers: Supplier[];
  new_supplier_id: New_Supplier;
  time_efficiency_data: TimeEfficiency[];
  sellerData: SellField;
}

export class Suppliers extends React.Component<Props, State> {
  state: State = {
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
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
  };
  fileInputRef: any = React.createRef();

  componentDidMount() {
    const data = {
      key: 'userID',
      value: localStorage.getItem('userId'),
    };
    this.props.getSellers();
    this.props.getTimeEfficiency();
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    this.setState({
      totalPages: Math.ceil(nextProps.suppliers.length / this.state.singlePageItemsCount),
    });
  }

  componentDidUpdate(prevProps: any) {

  }

  handleModel = () => {
    const {isOpen} = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  fileChange = (event: any): void => {
    this.setState({file: event.target.files[0]}, () => {
    });
  };

  public addNewSupplier = (): void => {
    if (this.state.updateDetails) {
      this.props.updateSupplierNameAndDescription(this.state.supplier_name, this.state.supplier_description, this.state.update_product_id, (data: any) => {
        this.props.getSellers();
        if (this.state.file != '') {
          this.props.uploadCSV(String(this.state.update_product_id), this.state.file);
          this.setState({file: ''});
        }
        this.setState({updateDetails: false});
        this.handleClose();

      });
    } else {
      this.props.saveSupplierNameAndDescription(this.state.supplier_name, this.state.supplier_description, (data: any) => {
        console.log(data);
        this.props.postProductTrackGroupId(data.id,this.state.supplier_name);
        this.props.getSellers();
        if (this.props.new_supplier_id != null && this.state.file != '') {
          this.props.uploadCSV(String(this.props.new_supplier_id), this.state.file);
          this.setState({file: ''});
        }

        this.handleClose();
      });
    }
  };

  openUpdateSupplierPopup = (value: any): void => {
    this.setState({
      modalOpen: true,
      update_product_id: value.id,
      updateDetails: true,
      supplier_name: value.name,
      supplier_description: value.description,
    });
  };

  handleOpen = () => {
    this.setState({supplier_name: '', supplier_description: '', modalOpen: true, updateDetails: false});
  };

  handleClose = () => this.setState({modalOpen: false, updateDetails: false});

  public onChangeSupplierDescription = async(event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({supplier_description: (event.target as HTMLTextAreaElement).value});
    return false;
  };
  public onChangeSupplierName = async(event: any) => {
    this.setState({supplier_name: event.target.value});
    return false;
  };

  renderAddNewSupplierModal = () => {
    return (
      <Modal size={'tiny'}
             open={this.state.modalOpen}
             onClose={this.handleClose}
             closeIcon={true} trigger={
        <Button
          basic color='black'
          primary={true}
          style={{borderRadius: '50px'}}
          onClick={this.handleOpen}
        >
          Add New Supplier
        </Button>
      }>
        <Modal.Header>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column style={{margin: 0}} floated='left' width={6}>
                Add New Supplier
              </Grid.Column>
              <Grid.Column style={{padding: 0}} floated="left">
                <Icon name="file"/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Header>
        <Modal.Content>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                Supplier Name*
              </Grid.Column>
              <Grid.Column width={8} floated="left">
                <Input value={this.state.supplier_name}
                       onChange={(event) => {
                         this.onChangeSupplierName(event);
                       }}
                       style={{width: 300}}
                       placeholder="question circle"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Description
              </Grid.Column>
              <Grid.Column width={9} floated="left">
                <Form>
                  <TextArea value={this.state.supplier_description}
                            onChange={(event) => {
                              this.onChangeSupplierDescription(event);
                            }}
                            style={{minHeight: 100, width: 300, margin: '5px 0', padding: '9px'}}
                            placeholder="Write your latest update here"/>
                </Form>
              </Grid.Column>
              <Grid.Column width={1} floated="left">
                <Icon
                  name="pencil"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{marginTop: '10px', marginBottom: '10px'}} floated="right" width={9}>
                <Checkbox/>
                &nbsp;
                Automatically upload upon exit
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            size="mini"
            basic
            color="grey"
            style={{borderRadius: 20}}
            floated="left"
            onClick={this.handleClose}
            content="Cancel"
          />
          <Button
            size="mini"
            basic
            floated="left"
            color="blue"
            disabled={(((this.state.supplier_name == '' && this.state.file == '') || (!this.state.updateDetails && this.state.supplier_name == '')) ? true : false)}
            style={{borderRadius: 20}}
            onClick={this.addNewSupplier}
            content="Save"
          />
          <Button
            size="mini"
            color="blue"
            style={{borderRadius: 20}}
            icon="chevron down"
            labelPosition="right"
            content="Upload Supplier CSV"
            onClick={() => this.fileInputRef.current.click()}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
            // webkitRelativePath=""
          />
          <Popup
            trigger={<Icon name="question circle" circular/>}
            content='Sellgo'
            position='top left'
            size='tiny'
          />
        </Modal.Actions>
      </Modal>
    );
  };

  public deleteSupplier = () => {
    this.props.deleteSupplier(this.state.delete_supplier_container.id, (data: any) => {
      this.setState({delete_confirmation: false});
      this.props.getSellers();
    });

  };
  renderTable = () => {
    const currentPage = this.state.currentPage - 1;
    const suppliers = [...this.props.suppliers].slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount);
    return (
      ((this.props.suppliers.length == 0) ?
          <Segment>
            <Loader hidden={(this.props.suppliers.length == 0) ? false : true} active inline='centered'
                    size='massive'>Loading</Loader>
          </Segment>
          :
          < Table basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Checkbox/>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Supplier Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center' width={1}>Status</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Product to Listing Ratio</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Supplier Rate (%)</Table.HeaderCell>
                {/*<Table.HeaderCell>Note</Table.HeaderCell>*/}
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(
                (this.props.suppliers[0].id == -10000000)) ?
                <Table.Row key={134}>
                  <Table.Cell>
                  </Table.Cell>
                  <Table.Cell>
                    <h1>
                      Data not found
                    </h1>
                  </Table.Cell>
                </Table.Row> :
                suppliers.map((value: Supplier, index) => {
                  return (
                    <Table.Row key={value.id}>
                      <Table.Cell>
                        <Checkbox/>
                      </Table.Cell>
                      <Table.Cell style={{width: '600px'}}>
                        <Table.Cell as={Link} to={`/syn/${value.id}`}>
                          {value.name}
                        </Table.Cell>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>{value.status}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Dropdown text='SYN'
                                  fluid
                                  selection
                                  options={[{
                                    key: 'SYN',
                                    text: 'SYN',
                                    value: 'SYN',
                                  }]}
                                  onChange={(e, data) => {
                                    if (data.value === 'SYN') {
                                      history.push(`/syn/${value.id}`);
                                    }
                                  }}>
                        </Dropdown>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        {(value.item_total_count != null && value.item_active_count != null) ? Number((value.item_total_count / value.item_active_count).toFixed(2)).toLocaleString() : 0}
                      </Table.Cell>
                      <Table.Cell textAlign='center'>{Number(value.rate).toLocaleString()}</Table.Cell>
                      {/*<Table.Cell>*/}
                      {/*  <Input focus placeholder='Note'/>*/}
                      {/*</Table.Cell>*/}
                      <Table.Cell textAlign='right' style={{paddingRight: '10px'}}>
                        <Table.Cell as={Link} to={`/syn/`}>
                          <Icon
                            onClick={() => {
                              this.openUpdateSupplierPopup(value);
                            }}
                            name='cloud upload' style={{color: 'black'}}/>&nbsp;
                        </Table.Cell>
                        <Table.Cell as={Link} to={`/syn/${value.id}`}>
                          <Icon name='refresh' style={{color: 'black'}}/>&nbsp;
                        </Table.Cell>
                        <Table.Cell
                          as={Link}
                          to={{}}
                          onClick={() => {
                            this.openUpdateSupplierPopup(value);
                          }}
                        >
                          <Icon
                            name='pencil' style={{color: 'black'}}/>&nbsp;
                        </Table.Cell>
                        <Table.Cell
                          onClick={() => {
                            this.setState({delete_confirmation: true, delete_supplier_container: value});
                          }}
                          as={Link} to="/syn">
                          <Icon name='trash alternate' style={{color: 'black'}}/>
                          {/*{this.renderDeleteModal(value, index)}*/}
                        </Table.Cell>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3'>
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
              }}/>
          </Table>
      )
    );
  };

  render() {
    return (
      <AdminLayout auth={this.props.match.params.auth} sellerData={this.props.sellerData} title={'SYN'}>
        <Segment basic={true} className="setting">
          <Divider/>
          <Grid>
            <Grid.Column width={5} floated='left' className={'middle aligned'}>
              {this.renderAddNewSupplierModal()}
              <Popup className={'addSupplierPopup'}
                trigger={<Icon name='question circle' circular/>}
                position='top left'
                size='tiny'
              >
                <h4>
                  Adding a Supplier
                </h4>
                To add a supplier:
                <List as={'ol'}>
                  <List.Item as='li'>
                    In the Business menu, select the Suppliers.
                  </List.Item>
                  <List.Item as='li'>
                    On the Suppliers tab, select New Supplier.
                  </List.Item>
                  <List.Item as='li'>
                    On the New Supplier screen, enter the details of the suppler.
                  </List.Item>
                  <List.Item as='li'>
                    Save the details of the new supplier.
                  </List.Item>
                </List>
              </Popup>
            </Grid.Column>
            <Grid.Column width={5} floated='right'>
              <div className="ui" style={{
                display: 'inline-flex',
                border: '1px solid #000',
                padding: '11px',
                borderRadius: '15px',
              }}>
              <span style={{padding: '8px'}}>
                Time Saved
                <h2>
                  <strong>
                    {this.props.time_efficiency_data.length > 0 ? Number(this.props.time_efficiency_data[0].saved_time).toFixed(0) + ' hrs' : '0 hrs'}
                  </strong>
                </h2>
              </span>
                <span style={{padding: '8px'}}>
                Efficiency
                <h2>
                  <strong>
                    {this.props.time_efficiency_data.length > 0 ? Number(this.props.time_efficiency_data[0].efficiency).toFixed(0) + ' %' : '0 %'}
                  </strong>
                </h2>
              </span>
              </div>
            </Grid.Column>
          </Grid>
          {this.renderTable()}
        </Segment>
      </AdminLayout>
    );
  }


}

const mapStateToProps = (state: any) => {
  return {
    suppliers: state.synReducer.get('suppliers'),
    new_supplier_id: state.synReducer.get('new_supplier'),
    time_efficiency_data: state.synReducer.get('time_efficiency_data'),
    sellerData: state.settings.get('profile'),

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
    postProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(postProductTrackGroupId(supplierID, supplierName)),
    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
    saveSupplierNameAndDescription: (name: string, description: string, callBack: any) => dispatch(saveSupplierNameAndDescription(name, description, callBack)),
    updateSupplierNameAndDescription: (name: string, description: string, update_product_id: string, callBack: any) => dispatch(updateSupplierNameAndDescription(name, description, update_product_id, callBack)),
    deleteSupplier: (supplier_id: any, callBack: any) => dispatch(deleteSupplier(supplier_id, callBack)),
    uploadCSV: (new_supplier_id: string, file: any) => dispatch(uploadCSV(new_supplier_id, file)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suppliers);