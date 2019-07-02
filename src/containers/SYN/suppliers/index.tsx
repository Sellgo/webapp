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
  Menu,
  Popup,
  Modal,
  TextArea, Pagination,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import MesssageComponent from '../../../components/MessageComponent';
// import { Modals } from '../../../components/Modals';
// import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import './suppliers.css';
import history from '../../../history';
import { Link } from 'react-router-dom';

import {
  getSellers,
  Supplier,
  saveSupplierNameAndDescription,
  New_Supplier,
  uploadCSV,
} from '../../../Action/SYNActions';

interface State {
  isOpen: boolean;
  size: string;
  modalOpen: boolean;
  supplier_name: string;
  supplier_description: string;
  file: any;
  currentPage: any;
  totalPages: any;
  pageSize: any;
}

interface Props {
  getSellers(): () => void;

  saveSupplierNameAndDescription(name: string, description: string): () => void;

  uploadCSV(new_supplier_id: string, file: any): () => void;

  suppliers: Supplier[];
  new_supplier_id: New_Supplier;
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
    pageSize: 10,
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
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    this.setState({
      totalPages: Math.ceil(nextProps.suppliers.length / this.state.pageSize),
    });
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.new_supplier_id !== prevProps.new_supplier_id) {
      const formData = new FormData();
      formData.append('file', this.state.file);
      console.log('formData: ', formData);
      this.props.uploadCSV(String(this.props.new_supplier_id), this.state.file);
    }
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  fileChange = (e: any): void => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log('File chosen --->', this.state.file);
    });
  };

  addNewSupplier = (): void => {
    // console.log(this.props);
    this.props.saveSupplierNameAndDescription(this.state.supplier_name, this.state.supplier_description);
    // console.log("addNewSupplier()", this.state.supplier_name, " ", this.state.supplier_description);
    // this.setState({ modalOpen: false });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  renderAddNewSupplierModal = () => {
    return (
      <Modal size={'tiny'}
             open={this.state.modalOpen}
             onClose={this.handleClose}
             closeIcon={true} trigger={
        <Button
          basic color='black'
          primary={true}
          style={{ borderRadius: '50px' }}
          onClick={this.handleOpen}
        >
          Add New Supplier
        </Button>
      }>
        <Modal.Header>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column style={{ margin: 0 }} floated='left' width={6}>
                Add New Supplier
              </Grid.Column>
              <Grid.Column style={{ padding: 0 }} floated="left">
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
                <Input value={this.state.supplier_name} onChange={(event) => {
                  this.setState({ supplier_name: event.target.value });
                }} style={{ width: 300 }} placeholder="question circle"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Description
              </Grid.Column>
              <Grid.Column width={9} floated="left">
                <Form>
                  <TextArea value={this.state.supplier_description} onChange={(event) => {
                    this.setState({ supplier_description: (event.target as HTMLTextAreaElement).value });
                  }} style={{ minHeight: 100, width: 300, margin: '5px 0', padding: '9px' }}
                            placeholder="Write your latest update here"/>
                </Form>
              </Grid.Column>
              <Grid.Column width={1} floated="left">
                <Icon name="pencil"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ marginTop: '10px', marginBottom: '10px' }} floated="right" width={9}>
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
            style={{ borderRadius: 20 }}
            floated="left"
            onClick={this.handleClose}
            content="Cancel"
          />
          <Button
            size="mini"
            basic
            floated="left"
            color="blue"
            disabled={((this.state.supplier_name == '') ? true : false)}
            style={{ borderRadius: 20 }}
            onClick={this.addNewSupplier}
            content="Save"
          />
          <Button
            size="mini"
            color="blue"
            style={{ borderRadius: 20 }}
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

  renderTable = () => {
    const currentPage = this.state.currentPage - 1;
    const suppliers = [...this.props.suppliers].slice(
      currentPage * this.state.pageSize,
      (currentPage + 1) * this.state.pageSize);
    console.log(suppliers);
    // test value
    // const x: Supplier = {
    //   name: 'Name',
    //   item_active_count: 20,
    //   contact: 'test',
    //   description: 'description',
    //   email: 'Long email',
    //   seller_id: 'sellerID',
    //   timezone: 'timezone',
    //   status: 'Active',
    //   freight_fee: '200',
    //   id: 12,
    //   item_total_count: 200,
    //   phone: '2000000',
    //   rate: '200',
    //   supplier_group_id: 300,
    //   upcharge_fee: '20000',
    //   website: 'google.com',
    //   xid: '123123',
    // };
    // suppliers.push(x);
    return (
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox/>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Supplier Name
            </Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Product to Listing Ratio</Table.HeaderCell>
            <Table.HeaderCell>Supplier Rate (%)</Table.HeaderCell>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {suppliers.map((value: Supplier, index) => {
            return (
              <Table.Row key={value.id}>
                <Table.Cell>
                  <Checkbox/>
                </Table.Cell>
                <Table.Cell style={{ width: '350px' }}>
                  <Table.Cell as={Link} to={`/syn/${value.id}`}>
                    {value.name}
                  </Table.Cell>
                </Table.Cell>
                <Table.Cell>{value.status}</Table.Cell>
                <Table.Cell>
                  <Dropdown text='SYN'
                            fluid
                            selection
                            options={[{
                              key: 'SYN',
                              text: 'SYN',
                              value: 'SYN',
                            }]}
                            onChange={(e, data) => {
                              console.log(data);
                              if (data.value === 'SYN') {
                                history.push(`/syn/${value.id}`);
                              }
                            }}>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  {+(value.item_total_count / value.item_active_count).toFixed(2)}
                </Table.Cell>
                <Table.Cell>{value.rate}</Table.Cell>
                <Table.Cell>
                  <Input focus placeholder='Note'/>
                </Table.Cell>
                <Table.Cell style={{ paddingRight: '10px' }}>
                  <Table.Cell as={Link} to={`/syn/`}>
                    <Icon name='cloud upload' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to={`/syn/${value.id}`}>
                    <Icon name='refresh' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to={`/syn/`}>
                    <Icon name='pencil' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to="/syn">
                    <Icon name='trash alternate' style={{ color: 'black' }}/>
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
      </Table>
    );
  };
  renderDeleteModal = (value: Supplier, index: any) => {
    return (
      <Modal trigger={
        <Icon name='trash alternate' style={{ color: 'black' }}/>
      } onClose={this.close}>
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes'/>
          <Button positive icon='checkmark' labelPosition='right' content='Yes'/>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    const memberDate = `May 5 2018`;
    const { isOpen } = this.state;
    return (
      <Segment basic={true} className="setting">
        <Divider/>
        <Grid>
          <Grid.Column width={5} floated='left' className={'middle aligned'}>
            {this.renderAddNewSupplierModal()}
            <Popup
              trigger={<Icon name='question circle' circular/>}
              content='Sellgo'
              position='top left'
              size='tiny'
            />
          </Grid.Column>
          <Grid.Column width={5} floated='right'>
            <div className="ui" style={{
              display: 'inline-flex',
              border: '1px solid #000',
              padding: '11px',
              borderRadius: '15px',
            }}>
              <span style={{ padding: '8px' }}>
                Time Saved
                <h2>
                  <strong>
                    99 hrs
                 </strong>
                </h2>
              </span>
              <span style={{ padding: '8px' }}>
                Efficiency
                <h2>
                  <strong>
                    99%
                  </strong>
                </h2>
              </span>
            </div>
          </Grid.Column>
        </Grid>
        {this.renderTable()}
      </Segment>
    );
  }

  show(size: string) {
    // this.setState({ size: size, open: true })
  }

  close = () => {
    // this.setState({ open: false })
  };
}

// const mapStateToProps = (state: any) => {
//   console.log('state state: ', state);
//   return ({
//     suppliers: state.synReducer.get('suppliers'),
//   });
// };

const mapStateToProps = (state: any) => ({
  suppliers: state.synReducer.get('suppliers'),
  new_supplier_id: state.synReducer.get('new_supplier'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
    saveSupplierNameAndDescription: (name: string, description: string) => dispatch(saveSupplierNameAndDescription(name, description)),
    uploadCSV: (new_supplier_id: string, file: any) => dispatch(uploadCSV(new_supplier_id, file)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suppliers);