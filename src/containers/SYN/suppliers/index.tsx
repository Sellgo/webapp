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

import { Link } from 'react-router-dom';

import { getSellers, Supplier } from '../../../Action/SYNActions';

interface State {
  isOpen: boolean;
}

interface Props {
  getSellers(): () => void;
  suppliers: Supplier[];
}

export class Suppliers extends React.Component<Props, State> {
  state = {
    isOpen: false,
    size: '',
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
  renderAddNewSupplierModal = () => {
    return (
      <Modal closeIcon={true} trigger={
        <Button
          basic color='black'
          primary={true}
          style={{ borderRadius: '50px' }}>Add New Supplier
        </Button>
      }>
        <Modal.Header>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                Add New Supplier
              </Grid.Column>
              <Grid.Column floated="left">
                <Icon name="question circle"/>
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
                <Input placeholder="question circle"/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                Description
              </Grid.Column>
              <Grid.Column width={8} floated="left">
                <TextArea placeholder="Write your latest update here"/>
              </Grid.Column>
              <Grid.Column width={1} floated="left">
                <Icon name="pencil"/>
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
            content="Cancel"
          />
          <Button
            size="mini"
            basic
            floated="left"
            color="blue"
            style={{ borderRadius: 20 }}
            content="Save"
          />
          <Button
            size="mini"
            color="blue"
            style={{ borderRadius: 20 }}
            icon="chevron down"
            labelPosition="right"
            content="Upload Supplier CSV"/>
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
    console.log(localStorage.getItem('idToken'));
    const suppliers = [...this.props.suppliers];
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
            // contact: string;
            // description: string;
            // email: string;
            // freight_fee: string;
            // id: any;
            // item_active_count: any;
            // item_total_count: any;
            // name: string;
            // phone: string;
            // rate: string;
            // seller_id: any;
            // status: string;
            // supplier_group_id: any;
            // timezone: string;
            // upcharge_fee: string;
            // website: string;
            // xid: string;
            return (
              <Table.Row key={value.id}>
                <Table.Cell>
                  <Checkbox/>
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
                              key: 'One',
                              text: 'One',
                              value: 'One',
                            },
                              {
                                key: 'Two',
                                text: 'Two',
                                value: 'Two',
                              }]}>
                  </Dropdown>
                </Table.Cell>
                <Table.Cell>
                  {+(value.item_total_count / value.item_active_count).toFixed(2)}
                </Table.Cell>
                <Table.Cell>{value.rate}</Table.Cell>
                <Table.Cell>
                  <Input focus={true} placeholder='Note'/>
                </Table.Cell>
                <Table.Cell>
                  <Table.Cell as={Link} to={`/syn/${value.id}`}>
                    <Icon name='cloud upload' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to="/syn">
                    <Icon name='refresh' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                  <Table.Cell as={Link} to={`/syn/${value.id}`}>
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
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left'/>
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right'/>
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