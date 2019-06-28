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
  Card, Label,
  Feed,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './supplierDetail.css';

import { Link } from 'react-router-dom';

import {
  getProducts,
  getSellers,
  trackProduct,
  Product,
  Supplier,
  getProductAttributes,
} from '../../../../Action/SYNActions';

interface State {
  isOpen: boolean;
}

interface Props {
  getProducts(supplierID: string): () => void;

  getProductAttributes(productID: string): () => void;

  trackProduct(productID: string, productTrackGroupID: string): () => void;

  products: Product[];
  match: { params: { supplierID: '' } };
}

export class SupplierDetail extends React.Component<Props, State> {
  state = {
    isOpen: false,

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
    this.refetchProducts();
  }

  refetchProducts = () => {
    this.props.getProducts(this.props.match.params.supplierID);
  };
  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };
  renderTable = () => {
    const productsTable: Product[] = this.props.products;
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
                    <Grid.Column floated="left">
                      <Image src={new URL('http://localhost:3000/images/intro.png')} size='tiny'/>
                    </Grid.Column>
                    <Grid.Column width={8} floated="left" className={'middle aligned'}>
                      <Grid.Row as={Link} to={`/syn/`}>
                        {value.id}
                      </Grid.Row>
                      <Grid.Row style={{ display: 'inline-flex' }}>
                        <Grid.Column>
                          <Image
                            src={new URL('http://localhost:3000/images/intro.png')}
                            size="mini"
                          />
                        </Grid.Column>
                        <Grid.Column as={Link} to={`/syn/`}>
                          {'value.listCat'}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid>
                </Table.Cell>
                <Table.Cell>
                  {this.productDetailView(value)}
                </Table.Cell>
                <Table.Cell>
                  {value.roi}
                </Table.Cell>
                <Table.Cell>
                  {value.margin}
                </Table.Cell>
                <Table.Cell>
                  {value.sales_monthly}
                </Table.Cell>
                <Table.Cell>
                  {value.profit_monthly}
                </Table.Cell>
                <Table.Cell>
                  <Button basic style={{ borderRadius: 20 }} color='blue' onClick={() => {
                    this.props.trackProduct(value.id, '2');
                  }}>
                    Track Now
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {'value.lastSyn'}
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
  productDetailView = (product: Product) => {
    return (
      <Modal size={'large'} closeIcon={true} trigger={
        <Button basic style={{ borderRadius: 20 }} color='blue'>
          View
        </Button>
      }>
        <Modal.Content>
          <Grid >
            <Grid.Column floated="left" width={14}>
              <Grid style={{ height: 40 }}>
                <Grid.Column floated="left" width={10}>
                  <h2>
                    {'product.Title' + ' and ' + 'product.Description'}
                  </h2>
                </Grid.Column>
                <Grid.Column width={2}>
                  {'short Details'}
                </Grid.Column>
              </Grid>
              <Divider/>
              <Grid style={{ margin: 0 }}>
                <Grid.Column style={{ margin: 0 }} floated="left" width={4}>
                  <Grid.Row>
                    Price
                  </Grid.Row>
                  <Grid.Row>
                    Fees
                  </Grid.Row>
                  <Grid.Row>
                    Product cost
                  </Grid.Row>
                  <Grid.Row>
                    Inbound shipping cost
                  </Grid.Row>
                  <Grid.Row>
                    Outbound shipping cost
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      Profit
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      Margin
                    </h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={2}>
                  <Grid.Row>
                    Price
                  </Grid.Row>
                  <Grid.Row>
                    Fees
                  </Grid.Row>
                  <Grid.Row>
                    PCost
                  </Grid.Row>
                  <Grid.Row>
                    ISCost
                  </Grid.Row>
                  <Grid.Row>
                    OScost
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      Profit
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      Margin
                    </h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={4}>
                  <Grid.Row>
                    Avg Monthly sales
                  </Grid.Row>
                  <Grid.Row>
                    Avg monthly revnue
                  </Grid.Row>
                  <Grid.Row>
                    Avg monthly profit
                  </Grid.Row>
                  <Grid.Row/>
                  <br/>
                  <Grid.Row/>
                  <br/>
                  <Grid.Row>
                    <h4>
                      ROI/ Return on Investment
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      ROII/ ROI Inventory
                    </h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={4}>
                  <Grid.Row>
                    moSales
                  </Grid.Row>
                  <Grid.Row>
                    moRev
                  </Grid.Row>
                  <Grid.Row>
                    moProf
                  </Grid.Row>
                  <Grid.Row/>
                  <br/>
                  <Grid.Row/>
                  <br/>
                  <Grid.Row>
                    <h4>
                      synMar
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      synMar
                    </h4>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column floated="right" width={2} >
              <Image src={new URL('http://localhost:3000/images/intro.png')} size='mini'  style={{display:'inline-block'}}/>
              <Icon name='amazon' style={{ color: 'black' }}/>
              <p>
                {'ASIN'}
              </p>
              <p>
                {'UPC'}
              </p>
              <p>
                {'MSKU'}
              </p>
              <p>
                {'FNSKU'}
              </p>
            </Grid.Column>
          </Grid>
          CHART HERE
        </Modal.Content>
      </Modal>
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

    return (
      <Grid centered>
        <Grid.Column width={4} floated="left">
          <Grid.Row style={{ display: 'inline-flex' }}>
            <Grid.Column>
              Syn Preset
            </Grid.Column>
            <Grid.Column style={{ margin: '0 0 0 10px' }}>
              <Dropdown
                style={{ width: '170px' }}
                placeholder='Select a preset'
                fluid
                selection
                options={[
                  {
                    key: 'Unit Profit',
                    text: 'Unit Profit',
                    value: 'Unit Profit',
                  },
                  {
                    key: 'Margin (%)',
                    text: 'Margin (%)',
                    value: 'Margin (%)',
                  },
                  {
                    key: 'Units per Month',
                    text: 'Units per Month',
                    value: 'Units per Month',
                  },
                  {
                    key: 'ROI/ Return of Investment',
                    text: 'ROI/ Return of Investment',
                    value: 'ROI/ Return of Investment',
                  },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: 20 }}>
            <Card raised>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        Unit Profit <Icon title="Sellgo" name="question circle outline"/>
                      </Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <div className="min-max">
                          0
                        </div>
                        <input onChange={() => {
                        }} min="0" max="100" type="range" className="slider"/>
                        <div className="min-max">
                          100
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>Margin (%) <Icon title="Sellgo" name="question circle outline"/></Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <div className="min-max">
                          0
                        </div>
                        <input onChange={(e) => {
                        }} min="0" max="100" type="range" className="slider"/>
                        <div className="min-max">
                          100
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>Units per Month <Icon title="Sellgo" name="question circle outline"/></Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <div className="min-max">
                          0
                        </div>
                        <input onChange={() => {
                        }} min="0" max="100" type="range" className="slider"/>
                        <div className="min-max">
                          100
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>ROI/ Return of Investment <Icon title="Sellgo"
                                                                    name="question circle outline"/></Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <div className="min-max">
                          0
                        </div>
                        <input onChange={($event) => {
                        }} min="0" max="100" type="range" className="slider"/>
                        <div className="min-max">
                          100
                        </div>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={12} floated="left">
          <Grid.Row style={{ width: '96%' }}>
            <Card raised style={{ width: '100%' }}>
              <Card.Content>
                <Card.Group itemsPerRow={3}>
                  <Card raised>
                    <Card.Content>
                      <Feed>
                        <Feed.Event>
                          <Feed.Content>
                            <Feed.Date content='Avg Daily Units Sold'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Date content='Avg BB Price/ Fees'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                  </Card>
                  <Card raised>
                    <Card.Content>
                      <Feed>
                        <Feed.Event>
                          <Feed.Content>
                            <Feed.Date content='Avg Daily Revenue/ Profit'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Date content='Avg BB Price/ Fees'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                  </Card>
                  <Card raised>
                    <Card.Content>
                      <Feed>
                        <Feed.Event>
                          <Feed.Content>
                            <Feed.Date content='Avg Daily Rank'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                            <Divider/>
                            <Feed.Date content='Avg LQS'/>
                            <Feed.Summary>
                              Avg#
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </Card.Content>
                  </Card>
                </Card.Group>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        Chart Here
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Row>
        </Grid.Column>

      </Grid>
    )
      ;
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

const mapStateToProps = (state: any) => {
  return {
    products: state.synReducer.get('products'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: (supplierID: string) => dispatch(getProducts(supplierID)),
    getProductAttributes: (productID: string) => dispatch(getProductAttributes(productID)),
    trackProduct: (supplierID: string, productTrackGroupID: string) =>
      dispatch(trackProduct(supplierID, productTrackGroupID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
