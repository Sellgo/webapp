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
  Card,
  Feed,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../suppliers.css';

import { Link } from 'react-router-dom';

import { getProducts, getSellers, Product, Supplier } from '../../../../Action/SYNActions';

interface State {
  isOpen: boolean;
}

interface Props {
  // getProducts(sellerID: string): () => void;
  // products: Product[];
}

export class SupplierDetail extends React.Component<Props, State> {
  state = {
    isOpen: false,
    Products: [
      {
        productTitle: 'Test',
        listCat: 'List Categories',
        Profit: '10usd',
        Margin: '10usd',
        Sales_mo: '120',
        profit_mo: '120USD',
        lastSyn: '20/05/2019',
      },
      {
        productTitle: 'Test',
        listCat: 'List Categories',
        Profit: '5usd',
        Margin: '10usd',
        Sales_mo: '9000',
        profit_mo: '2000USD',
        lastSyn: '15/06/2019',
      },
    ],
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
    const productsTable = this.state.Products;
    return (
      <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>
              <Checkbox/>
            </Table.HeaderCell>
            <Table.HeaderCell width={4}>
              Product Info
            </Table.HeaderCell>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>Profit</Table.HeaderCell>
            <Table.HeaderCell width={1}>Margin</Table.HeaderCell>
            <Table.HeaderCell width={1}>Sales/mo</Table.HeaderCell>
            <Table.HeaderCell width={1}>Profit/Mo</Table.HeaderCell>
            <Table.HeaderCell width={1}>Add to Tracker</Table.HeaderCell>
            <Table.HeaderCell width={1}>Last Syn</Table.HeaderCell>
            <Table.HeaderCell width={1}/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productsTable.map((value, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Checkbox/>
                </Table.Cell>
                <Table.Cell>
                  <Grid>
                    <Grid.Column width={2} floated="left">
                      <Image src={new URL('http://localhost:3000/images/intro.png')} size='tiny'/>
                    </Grid.Column>
                    <Grid.Column width={8} floated="left" className={'middle aligned'}>
                      <Grid.Row as={Link} to={`/syn/`}>
                        {value.productTitle}
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Image
                            src={new URL('http://localhost:3000/images/intro.png')}
                            size="mini"
                          />
                        </Grid.Column>
                        <Grid.Column as={Link} to={`/syn/`}>
                          {value.listCat}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                </Table.Cell>
                <Table.Cell>
                  <Button basic style={{ borderRadius: 20 }} color='blue'>
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {value.Profit}
                </Table.Cell>
                <Table.Cell>
                  {value.Margin}
                </Table.Cell>
                <Table.Cell>
                  {value.Sales_mo}
                </Table.Cell>
                <Table.Cell>
                  {value.profit_mo}
                </Table.Cell>
                <Table.Cell>
                  <Button basic style={{ borderRadius: 20 }} color='blue'>
                    Track Now
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {value.lastSyn}
                </Table.Cell>
                <Table.Cell>
                  <Table.Cell as={Link} to={`/syn/`}>
                    <Icon name='amazon' style={{ color: 'black' }}/>&nbsp;
                  </Table.Cell>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row textAlign='center'>
            <Table.HeaderCell colSpan={10}>
              <Menu pagination>
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
  renderHeader = () => {
    const items = [
      {
        header: 'Project Report - April',
        description: 'Leverage agile',
        meta: 'ROI: 30%',
      },
      {
        header: 'Project Report - May',
        description: 'Bring to the table',
        meta: 'ROI: 34%',
      },
      {
        header: 'Project Report - June',
        description:
          'Capitalise on low hanging fruit ',
        meta: 'ROI: 27%',
      },
    ]
    return (
      <Grid>
        <Grid.Column width={5} floated="left" className={'middle aligned'}>
          <Grid.Row>
            Syn Preset
          </Grid.Row>
          <Card>
            <Card.Content>
              <Card.Header>Recent Activity</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Label image='/images/avatar/small/jenny.jpg' />
                  <Feed.Content>
                    <Feed.Date content='1 day ago' />
                    <Feed.Summary>
                      You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image='/images/avatar/small/molly.png' />
                  <Feed.Content>
                    <Feed.Date content='3 days ago' />
                    <Feed.Summary>
                      You added <a>Molly Malone</a> as a friend.
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>

                <Feed.Event>
                  <Feed.Label image='/images/avatar/small/elliot.jpg' />
                  <Feed.Content>
                    <Feed.Date content='4 days ago' />
                    <Feed.Summary>
                      You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={5} >
          <Card.Group items={items}>
          </Card.Group>
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
    );
  };

  render() {
    const memberDate = `May 5 2018`;
    const { isOpen } = this.state;
    return (
      <Segment basic={true} className="setting">
        <Divider/>
        {this.renderHeader()}
        <Divider/>
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
