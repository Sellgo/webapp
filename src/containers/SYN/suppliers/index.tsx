import * as React from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Select,
  Table,
  Checkbox,
  Dropdown,
  Input,
  Icon,
  Menu,
  Popup,
  Modal,
  TextArea,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
// import MesssageComponent from '../../../components/MessageComponent';
// import { Modals } from '../../../components/Modals';
// import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import './suppliers.css';
import history from '../../../history';
import { Link } from 'react-router-dom';

import { getSellers, Supplier } from '../../../Action/SYNActions';

interface State {
  isOpen: boolean;
  size: string;
  modalOpen: boolean;
}

interface Props {
  getSellers(): () => void;
  suppliers: Supplier[];
}

export class Suppliers extends React.Component<Props, State> {
  state = {
    isOpen: false,
    size: '',
    modalOpen: false
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

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  fileChange = (e: any) => {
    console.log("this.props: ", this.props);
    console.log('e: ', e);
    // this.setState({ file: e.target.files[0] }, () => {
    //   console.log("File chosen --->", this.state.file);
    // });
  };

  addNewSupplier() {
    console.log("addNewSupplier()");
    // this.setState({ modalOpen: false });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

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
            onClick={this.handleOpen}>
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
                <Icon name="file" />
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
                <Input style={{ width: 300 }} placeholder="question circle" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Description
              </Grid.Column>
              <Grid.Column width={9} floated="left">
                <Form>
                  <TextArea style={{ minHeight: 100, width: 300, margin: '5px 0', padding: '9px' }}
                    placeholder="Write your latest update here" />
                </Form>
              </Grid.Column>
              <Grid.Column width={1} floated="left">
                <Icon name="pencil" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column style={{ marginTop: '10px', marginBottom: '10px' }} floated="right" width={9}>
                <Checkbox />
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
            trigger={<Icon name="question circle" circular />}
            content='Sellgo'
            position='top left'
            size='tiny'
          />
        </Modal.Actions>
      </Modal>
    );
  };
  renderTable = () => {
    const suppliers = [...this.props.suppliers];
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
              <Checkbox />
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
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>
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
                  <Input focus placeholder='Note' />
                </Table.Cell>
                <Table.Cell>
                  <Table.Cell as={Link} to={`/syn/`}>
                    <Icon name='cloud upload' style={{ color: 'black' }} />&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to={`/syn/${value.id}`}>
                    <Icon name='refresh' style={{ color: 'black' }} />&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to={`/syn/`}>
                    <Icon name='pencil' style={{ color: 'black' }} />&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to="/syn">
                    <Icon name='trash alternate' style={{ color: 'black' }} />
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
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  };
  renderDeleteModal = (value: Supplier, index: any) => {
    return (
      <Modal trigger={
        <Icon name='trash alternate' style={{ color: 'black' }} />
      } onClose={this.close}>
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' />
          <Button positive icon='checkmark' labelPosition='right' content='Yes' />
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    const memberDate = `May 5 2018`;
    const { isOpen } = this.state;
    return (
      <Segment basic={true} className="setting">

        <Divider />

        <Grid>
          <Grid.Column width={5} floated='left' className={'middle aligned'}>
            {this.renderAddNewSupplierModal()}
            <Popup
              trigger={<Icon name='question circle' circular />}
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suppliers);