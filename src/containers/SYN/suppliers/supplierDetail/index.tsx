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
import '../suppliers.css';

import { Link } from 'react-router-dom';

import { getProducts, getSellers, Product } from '../../../../Action/SYNActions';

interface State {
  isOpen: boolean;
}

interface Props {
  getProducts(sellerID: string): () => void;
  products: Product[];
}

export class SupplierDetail extends React.Component<Props, State> {
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
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };
  renderTable = () => {
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
  renderDeleteModal = (value: Product, index: any) => {
    return (
      <Modal
        trigger={<Icon name="trash alternate" style={{ color: 'black' }}/>}
        onClose={this.close}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button positive icon="checkmark" labelPosition="right" content="Yes"/>
          <Button positive icon="checkmark" labelPosition="right" content="Yes"/>
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
          <Grid.Column width={5} floated="left" className={'middle aligned'}>
            <Popup
              trigger={<Icon name='question circle' circular/>}
              content="Sellgo"
              position="top left"
              size="tiny"
            />
          </Grid.Column>
          <Grid.Column width={5} floated="right">
            <div
              className="ui"
              style={{
                display: 'inline-flex',
                border: '1px solid #000',
                padding: '11px',
                borderRadius: '15px',
              }}
            >
              <span style={{ padding: '8px' }}>
               MORE DETAILS
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

const mapStateToProps = (state: any) => ({
  products: state.synReducer.get('products'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: (sellerID: string) => dispatch(getProducts(sellerID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
