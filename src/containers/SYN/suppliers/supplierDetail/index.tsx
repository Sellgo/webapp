import * as React from 'react';
import {
  Button,
  Divider,
  Grid,
  Image,
  Segment,
  Table,
  Checkbox,
  Dropdown,
  Icon,
  Modal,
  Card,
  Feed,
  Loader,
  Pagination,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './supplierDetail.css';
import { Link } from 'react-router-dom';
import 'react-rangeslider/lib/index.css';
import Slider from 'react-rangeslider';
import {
  getProducts,
  trackProductWithPatch,
  Product,
  getChartValues1,
  getChartValues2,
  getProductDetail,
  getProductDetailChart,
  getProductDetailChartPrice,
  getProductTrackGroupId,
  getProductTrackData,
  ProductsTrackData,
  ProductDetails,
  ProductChartDetails,
  ChartAveragePrice,
  ChartAverageRank,
  ProductChartDetailsPrice,
  Supplier,
  TimeEfficiency,
  getTimeEfficiency,
} from '../../../../Action/SYNActions';
import {
  ProductFiltersPreset,
} from '../../../../constant/constant';

// import history from '../../../../history';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface State {
  isOpen: boolean;
  products: Product[];
  modalOpen: boolean;
  currentPage: any;
  totalPages: any;
  pageSize: any;
  unitProfitFilter: any;
  marginFilter: any;
  unitsPerMonthFilter: any;
  profitPerMonthFilter: any;
  minUnitProfit: any;
  maxUnitProfit: any;
  minMargin: any;
  maxMargin: any;
  minUnitsPerMonth: any;
  maxUnitsPerMonth: any;
  minProfitPerMonth: any;
  maxProfitPerMonth: any;
}

interface Props {
  getProducts(supplierID: string): () => void;

  trackProductWithPatch(
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string,
  ): () => void;

  getTimeEfficiency(): () => void;

  getProductTrackData(): () => void;

  getProductTrackGroupId(supplierID: string, supplierName: string): () => void;

  getChartValues1(product_track_group_id: string): () => void;

  getChartValues2(product_track_group_id: string): () => void;

  getProductDetail(product_id: string): () => void;

  getProductDetailChart(product_id: string): () => void;

  getProductDetailChartPrice(product_id: string): () => void;

  time_efficiency_data: TimeEfficiency[];
  suppliers: Supplier[];
  products: Product[];
  products_track_data: ProductsTrackData;
  product_detail: ProductDetails;
  chart_values_1: ChartAveragePrice[];
  chart_values_2: ChartAverageRank[];
  product_detail_chart_values: ProductChartDetails[];
  product_detail_chart_values_2: ProductChartDetailsPrice[];
  match: { params: { supplierID: '' } };
}

// const delayedTimer: any = null;

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
});

export class SupplierDetail extends React.Component<Props, State> {
  state = {
    isOpen: false,

    products: [],
    modalOpen: false,
    totalPages: 5,
    currentPage: 1,
    pageSize: 10,
    unitProfitFilter: 0,
    marginFilter: 0,
    unitsPerMonthFilter: 0,
    profitPerMonthFilter: 0,
    minUnitProfit: 0,
    maxUnitProfit: 100,
    minMargin: 0,
    maxMargin: 100,
    minUnitsPerMonth: 0,
    maxUnitsPerMonth: 100,
    minProfitPerMonth: 0,
    maxProfitPerMonth: 100,
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
    this.props.getProducts(this.props.match.params.supplierID);
    this.props.getProductTrackData();
    this.props.getChartValues1('2');
    this.props.getChartValues2('2');
    if (this.props.time_efficiency_data.length === 0) {
      this.props.getTimeEfficiency();

    }

    // this.props.getProductTrackGroupId(this.props.match.params.supplierID);
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    let minUnitProfit = Number.MAX_SAFE_INTEGER;
    let maxUnitProfit = Number.MIN_SAFE_INTEGER;

    let minMargin = Number.MAX_SAFE_INTEGER;
    let maxMargin = Number.MIN_SAFE_INTEGER;
    let minUnitsPerMonth = Number.MAX_SAFE_INTEGER;
    let maxUnitsPerMonth = Number.MIN_SAFE_INTEGER;
    let minProfitPerMonth = Number.MAX_SAFE_INTEGER;
    let maxProfitPerMonth = Number.MIN_SAFE_INTEGER;
    for (const product of nextProps.products) {
      if (parseInt(product.profit, 10) < minUnitProfit) {
        minUnitProfit = Math.floor(parseFloat(product.profit));
      }
      if (parseInt(product.profit, 10) > maxUnitProfit) {
        maxUnitProfit = Math.floor(parseFloat(product.profit));
      }
      if (parseInt(product.margin, 10) < minMargin) {
        minMargin = Math.floor(parseFloat(product.margin));
      }
      if (parseInt(product.margin, 10) > maxMargin) {
        maxMargin = Math.floor(parseFloat(product.margin));
      }
      if (parseInt(product.sales_monthly, 10) < minUnitsPerMonth) {
        minUnitsPerMonth = Math.floor(parseFloat(product.sales_monthly));
      }
      if (parseInt(product.sales_monthly, 10) > maxUnitsPerMonth) {
        maxUnitsPerMonth = Math.floor(parseFloat(product.sales_monthly));
      }
      if (parseInt(product.profit_monthly, 10) < minProfitPerMonth) {
        minProfitPerMonth = Math.floor(parseFloat(product.profit_monthly));
      }
      if (parseInt(product.profit_monthly, 10) > maxProfitPerMonth) {
        maxProfitPerMonth = Math.floor(parseFloat(product.profit_monthly));
      }
    }
    if (minUnitProfit === Number.MAX_SAFE_INTEGER) {
      minUnitProfit = -100;
    }
    if (maxUnitProfit === Number.MIN_SAFE_INTEGER) {
      maxUnitProfit = -100;
    }
    if (minMargin === Number.MAX_SAFE_INTEGER) {
      minMargin = -100;
    }
    if (maxMargin === Number.MIN_SAFE_INTEGER) {
      maxMargin = -100;
    }
    if (minUnitsPerMonth === Number.MAX_SAFE_INTEGER) {
      minUnitsPerMonth = -100;
    }
    if (maxUnitsPerMonth === Number.MIN_SAFE_INTEGER) {
      maxUnitsPerMonth = -100;
    }
    if (minProfitPerMonth === Number.MAX_SAFE_INTEGER) {
      minProfitPerMonth = -100;
    }
    if (maxProfitPerMonth === Number.MIN_SAFE_INTEGER) {
      maxProfitPerMonth = -100;
    }
    this.setState({
      products: nextProps.products,
      totalPages: Math.ceil(nextProps.products.length / this.state.pageSize),
      minUnitProfit,
      maxUnitProfit,
      minMargin,
      maxMargin,
      minUnitsPerMonth,
      maxUnitsPerMonth,
      minProfitPerMonth,
      maxProfitPerMonth,
      unitProfitFilter: minUnitProfit,
      profitPerMonthFilter: minProfitPerMonth,
      unitsPerMonthFilter: minUnitsPerMonth,
      marginFilter: minMargin,
    });
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  productDetailsWithVisualization = (product_id: string) => {
    this.props.getProductDetail(product_id);
    this.props.getProductDetailChart(product_id);
    this.props.getProductDetailChartPrice(product_id);
    this.setState({ modalOpen: true });
  };
  renderTable = () => {
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.pageSize,
      (currentPage + 1) * this.state.pageSize,
    );
    console.log("this.state.products: ", this.props.products);
    // this.setState({}); 
    return (
      ((this.props.products.length == 0)
        ?
        (
          <Segment>
            <Loader active inline='centered' size='massive'>
              Loading
            </Loader>
          </Segment>
        )
        :
        (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>
                  <Checkbox />
                </Table.HeaderCell>
                <Table.HeaderCell width={4}>Product Info</Table.HeaderCell>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell width={1}>Profit</Table.HeaderCell>
                <Table.HeaderCell width={1}>Margin</Table.HeaderCell>
                <Table.HeaderCell width={1}>Sales/mo</Table.HeaderCell>
                <Table.HeaderCell width={1}>Profit/Mo</Table.HeaderCell>
                <Table.HeaderCell width={1}>Add to Tracker</Table.HeaderCell>
                <Table.HeaderCell width={1}>Last Syn</Table.HeaderCell>
                <Table.HeaderCell width={1} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(
                (this.props.products[0].id == -10000000)) ?
                <Table.Row key={134}>
                  <Table.Cell>
                  </Table.Cell>
                  <Table.Cell>
                    <h1>
                      Data not found
                    </h1>
                  </Table.Cell>
                </Table.Row> :
                productsTable.map((value, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell>
                        <Grid>
                          <Grid.Column floated="left">
                            <Image
                              src={(value.image_url == null) ? '/images/intro.png' : value.image_url}
                              size="tiny"
                            />
                          </Grid.Column>
                          <Grid.Column width={8} floated="left" className={'middle aligned'}>
                            <Grid.Row
                              as={Link}
                              to={{}}
                              onClick={() => {
                                this.productDetailsWithVisualization(String(value.product_id));
                              }}
                            >
                              {value.title}
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column style={{ display: 'inline-flex' }}>
                                <Image
                                  src={(value.image_url == null) ? '/images/intro.png' : value.image_url}
                                  size="mini"
                                />
                                {value.asin}
                              </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                        </Grid>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          basic={true}
                          style={{ borderRadius: 20 }}
                          color="blue"
                          onClick={() => {
                            this.productDetailsWithVisualization(String(value.product_id));
                          }}
                        >
                          View
                  </Button>
                        {/* {this.productDetailView(String(value.product_id))} */}
                      </Table.Cell>
                      <Table.Cell>{Number(value.profit).toLocaleString()}</Table.Cell>
                      <Table.Cell>{Number(value.margin).toLocaleString()}</Table.Cell>
                      <Table.Cell>{Number(value.sales_monthly).toLocaleString()}</Table.Cell>
                      <Table.Cell>{Number(value.profit_monthly).toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        <Button
                          basic={true}
                          style={{ borderRadius: 20 }}
                          color={value.tracking_status === 'active' ? 'teal' : 'blue'}
                          onClick={() => {
                            this.props.trackProductWithPatch(
                              String(value.product_track_id),
                              '2',
                              value.tracking_status === 'active' ? 'inactive' : 'active',
                              this.props.match.params.supplierID,
                            );
                          }}
                        >
                          {value.tracking_status == 'active' ? 'Untrack' : 'Track Now'}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{new Date(value.last_syn).toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        <Table.Cell as={Link} to={'//' + value.amazon_url}>
                          <Icon name="amazon" style={{ color: 'black' }} />
                          &nbsp;
                  </Table.Cell>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
            <Table.Footer>
              <Table.Row textAlign="center">
                <Table.HeaderCell colSpan={10}>
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
        )
      )
    );
  };

  handleClose = () => this.setState({ modalOpen: false });

  productDetailView = () => {
    const popup_rank_conainer: number[] = [];
    const popup_price_conainer: number[] = [];

    for (let i = 0; i < this.props.product_detail_chart_values.length; i++) {
      popup_rank_conainer.push(Number(this.props.product_detail_chart_values[i].rank));
    }
    for (let i = 0; i < this.props.product_detail_chart_values_2.length; i++) {
      popup_price_conainer.push(Number(this.props.product_detail_chart_values_2[i].price));
    }
    return (
      <Modal size={'large'} open={this.state.modalOpen} onClose={this.handleClose} closeIcon={true}>
        <Modal.Content>
          <Grid>
            <Grid.Column floated="left" width={14}>
              <Grid style={{ height: 40 }}>
                <Grid.Column floated="left" width={10}>
                  <h2>{'Product Title' + ' & ' + 'Description'}</h2>
                </Grid.Column>
                <Grid.Column width={2}>{'short Details'}</Grid.Column>
              </Grid>
              <Divider />
              <Grid style={{ margin: 0 }}>
                <Grid.Column style={{ margin: 0 }} floated="left" width={4}>
                  <Grid.Row>Parice</Grid.Row>
                  <Grid.Row>Fees</Grid.Row>
                  <Grid.Row>Product cost</Grid.Row>
                  <Grid.Row>Inbound shipping cost</Grid.Row>
                  <Grid.Row>Outbound shipping cost</Grid.Row>
                  <Grid.Row>
                    <h4>Profit</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>Margin</h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={2}>
                  <Grid.Row>
                    {this.props.product_detail.price == null
                      ? 0
                      : Number(this.props.product_detail.price).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.fees == null
                      ? 0
                      : Number(this.props.product_detail.fees).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.product_cost == null
                      ? 0
                      : Number(this.props.product_detail.product_cost).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.inb_shipping_cost == null
                      ? 0
                      : Number(this.props.product_detail.inb_shipping_cost).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.oub_shipping_cost == null
                      ? 0
                      : Number(this.props.product_detail.oub_shipping_cost).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      {this.props.product_detail.profit == null
                        ? 0
                        : Number(this.props.product_detail.profit).toLocaleString()}
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      {this.props.product_detail.margin == null
                        ? 0
                        : Number(this.props.product_detail.margin).toLocaleString()}
                    </h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={4}>
                  <Grid.Row>Avg Monthly sales</Grid.Row>
                  <Grid.Row>Avg monthly revnue</Grid.Row>
                  <Grid.Row>Avg monthly profit</Grid.Row>
                  <Grid.Row />
                  <br />
                  <Grid.Row />
                  <br />
                  <Grid.Row>
                    <h4>ROI/ Return on Investment</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>ROII/ ROI Inventory</h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={4}>
                  <Grid.Row>
                    {this.props.product_detail.monthly_sales == null
                      ? 0
                      : Number(this.props.product_detail.monthly_sales).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.monthly_revenue == null
                      ? 0
                      : Number(this.props.product_detail.monthly_revenue).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row>
                    {this.props.product_detail.profit_monthly == null
                      ? 0
                      : Number(this.props.product_detail.profit_monthly).toLocaleString()}
                  </Grid.Row>
                  <Grid.Row />
                  <br />
                  <Grid.Row />
                  <br />
                  <Grid.Row>
                    <h4>
                      {this.props.product_detail.roi == null
                        ? 0
                        : Number(this.props.product_detail.roi).toLocaleString()}
                    </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>
                      0
                      {/* {(this.props.product_detail.upc == null) ? 0 : Number(this.props.product_detail.upc).toLocaleString()} */}
                    </h4>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column floated="right" width={2}>
              <Image
                src={
                  new URL(
                    this.props.product_detail.image_url != null
                      ? this.props.product_detail.image_url
                      : 'http://localhost:3000/images/intro.png',
                  )
                }
                size="mini"
                style={{ display: 'inline-block' }}
              />
              <a href={this.props.product_detail.amazon_url}>
                <Icon name="amazon" style={{ color: 'black' }} />
              </a>
              <p>{this.props.product_detail.asin}</p>
              <p>{this.props.product_detail.upc}</p>
              <p>{'MSKU'}</p>
              <p>{'FNSKU'}</p>
            </Grid.Column>
          </Grid>
          {
            (popup_price_conainer.length == 0 && popup_rank_conainer.length == 0) ? (
              <Loader active inline='centered' className="popup-loader" size='massive'>Loading</Loader>
            ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    title: {
                      text: 'Statistics',
                      align: 'left',
                    },
                    xAxis: {
                      labels: {
                        style: {
                          color: '#ccc',
                        },
                      },
                    },
                    credits: {
                      enabled: false,
                    },
                    yAxis: {
                      title: {
                        text: '',
                      },
                      labels: {
                        formatter() {
                          return '$' + this.value / 1000 + 'k';
                        },
                        style: {
                          color: '#ccc',
                        },
                      },
                    },
                    tooltip: {
                      pointFormat: '$<b>{point.y:,.0f}</b>',
                    },
                    legend: {
                      align: 'left',
                      itemStyle: {
                        color: '#ccc',
                      },
                    },
                    series: [
                      {
                        type: 'areaspline',
                        name: 'Products sold',
                        color: '#c0f1ff',
                        data: popup_price_conainer,
                      },
                      {
                        type: 'areaspline',
                        name: 'Total views',
                        color: '#a3a0fb78',
                        data: popup_rank_conainer,
                      },
                    ],
                  }}
                  {...this.props}
                />
              )
          }
        </Modal.Content>
      </Modal>
    );
  };

  renderDeleteModal = (value: Product, index: any) => {
    return (
      <Modal
        trigger={<Icon name="trash alternate" style={{ color: 'black' }} />}
        onClose={this.close}
      >
        <Modal.Header>Delete Your Account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your account</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative={true}>No</Button>
          <Button positive={true} icon="checkmark" labelPosition="right" content="Yes" />
          <Button positive={true} icon="checkmark" labelPosition="right" content="Yes" />
        </Modal.Actions>
      </Modal>
    );
  };

  renderHeaderFilters = () => {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            Syn Preset
          </Grid.Column>
          <Grid.Column floated="right" width={10}>
            <Dropdown
              // style={{ width: '200px' }}
              placeholder="Select a preset"
              fluid={true}
              selection={true}
              options={ProductFiltersPreset.map((filter, index) => {
                return {
                  key: filter.key,
                  text: filter.text,
                  value: index,
                };
              })}
              onChange={(e, selectedData) => {
                // TODO proof of concept for dropdown filter
                const index: any = selectedData.value;
                const data: any = ProductFiltersPreset[index].data;
                console.log(ProductFiltersPreset[index].data);
                this.setState(
                  {
                    marginFilter: (data.marginFilter > this.state.maxMargin) ? this.state.maxMargin : (data.marginFilter < this.state.minMargin) ? this.state.minMargin : data.marginFilter,
                    profitPerMonthFilter: (data.profitPerMonthFilter > this.state.maxProfitPerMonth) ? this.state.maxProfitPerMonth : (data.profitPerMonthFilter < this.state.minProfitPerMonth) ? this.state.minProfitPerMonth : data.profitPerMonthFilter,
                    unitProfitFilter: (data.unitProfitFilter > this.state.maxUnitProfit) ? this.state.maxUnitProfit : (data.unitProfitFilter < this.state.minUnitProfit) ? this.state.minUnitProfit : data.unitProfitFilter,
                    unitsPerMonthFilter: (data.unitsPerMonthFilter > this.state.maxUnitsPerMonth) ? this.state.maxUnitsPerMonth : (data.unitsPerMonthFilter < this.state.minUnitsPerMonth) ? this.state.minUnitsPerMonth : data.unitsPerMonthFilter,
                  },
                  () => {
                    this.updateFilters();
                  },
                );
              }}
            />
          </Grid.Column>
        </Grid.Row>
        {(this.state.minUnitProfit !== -100 && this.state.minMargin !== -100 && this.state.minProfitPerMonth !== -100 && this.state.minProfitPerMonth !== -100) ?
          <Grid.Row>
            <Grid.Column width={16} style={{ marginTop: 15 }}>
              {/* <Grid.Row style={{ display: 'inline-flex' }}> */}

              {/* </Grid.Row> */}
              {/* <Grid.Row style={{ marginTop: 20 }}> */}
              <Card
                raised={true}
                style={{
                  // marginTop: 20,
                  width: '100%',
                }}
              >
                <Card.Content>
                  <Feed>
                    {this.state.minUnitProfit !== -100 ? (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            Unit Profit <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row>
                                <Grid.Column floated="left" width={5}>
                                  <div className="min-max">{this.state.minUnitProfit}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0 }} width={6}>
                                  <Slider
                                    min={this.state.minUnitProfit}
                                    max={this.state.maxUnitProfit}
                                    value={this.state.unitProfitFilter}
                                    tooltip={true}
                                    onChange={value => {
                                      this.setState(
                                        {
                                          unitProfitFilter: value,
                                        },
                                      );
                                    }}
                                    onChangeComplete={() => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                  <div className="min-max">{this.state.maxUnitProfit}</div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ) : null}
                    {this.state.minMargin !== -100 ? (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            Margin (%) <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row>
                                <Grid.Column floated="left" width={5}>
                                  <div className="min-max">{this.state.minMargin}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0 }} width={6}>
                                  <Slider
                                    min={this.state.minMargin}
                                    max={this.state.maxMargin}
                                    value={this.state.marginFilter}
                                    tooltip={true}
                                    onChange={value => {
                                      this.setState(
                                        {
                                          marginFilter: value,
                                        },
                                      );
                                    }}
                                    onChangeComplete={() => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                  <div className="min-max">{this.state.maxMargin}</div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ) : null}
                    {this.state.minProfitPerMonth !== -100 ? (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            Units per Month <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row>
                                <Grid.Column floated="left" width={5}>
                                  <div className="min-max">{this.state.minUnitsPerMonth}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0 }} width={6}>
                                  <Slider
                                    min={this.state.minUnitsPerMonth}
                                    max={this.state.maxUnitsPerMonth}
                                    value={this.state.unitsPerMonthFilter}
                                    tooltip={true}
                                    onChange={value => {
                                      this.setState(
                                        {
                                          unitsPerMonthFilter: value,
                                        },
                                      );
                                    }}
                                    onChangeComplete={() => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                  <div className="min-max">{this.state.maxUnitsPerMonth}</div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ) : null}
                    {this.state.minProfitPerMonth !== -100 ? (
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                            Profit per Month <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row>
                                <Grid.Column floated="left" width={5}>
                                  <div className="min-max">{this.state.minProfitPerMonth}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0 }} width={6}>
                                  <Slider
                                    min={this.state.minProfitPerMonth}
                                    max={this.state.maxProfitPerMonth}
                                    value={this.state.profitPerMonthFilter}
                                    tooltip={true}
                                    onChange={value => {
                                      this.setState(
                                        {
                                          profitPerMonthFilter: value,
                                        },
                                      );
                                    }}
                                    onChangeComplete={() => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                  <div className="min-max">{this.state.maxProfitPerMonth}</div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    ) : null}
                  </Feed>
                </Card.Content>
              </Card>
              {/* </Grid.Row> */}
            </Grid.Column>
          </Grid.Row>
          : null
        }
      </Grid>
    );
  };

  updateFilters = () => {
    const products: Product[] = this.props.products;
    const newProducts: Product[] = [];
    for (const product of products) {
      let shouldAdd = true;
      if (
        this.state.unitProfitFilter !== this.state.minUnitProfit &&
        parseFloat(product.profit) <= this.state.unitProfitFilter
      ) {
        shouldAdd = false;
      }
      if (
        this.state.marginFilter !== this.state.minMargin &&
        parseFloat(product.margin) <= this.state.marginFilter
      ) {
        shouldAdd = false;
      }
      if (
        this.state.unitsPerMonthFilter !== this.state.minUnitsPerMonth &&
        parseFloat(product.sales_monthly) <= this.state.unitsPerMonthFilter
      ) {
        shouldAdd = false;
      }
      if (
        this.state.profitPerMonthFilter !== this.state.minProfitPerMonth &&
        parseFloat(product.profit_monthly) <= this.state.profitPerMonthFilter
      ) {
        shouldAdd = false;
      }
      if (shouldAdd) {
        newProducts.push(product);
      }
    }
    const totalPages = Math.ceil(newProducts.length / this.state.pageSize);
    this.setState({
      totalPages: totalPages,
      currentPage: (totalPages < this.state.currentPage) ? 1 : this.state.currentPage,
      products: newProducts,
    });
    return;
  };

  renderHeaderSupplierMatrics = () => {
    const avg_price = [];
    const avg_rank = [];
    for (let i = 0; i < this.props.chart_values_1.length; i++) {
      avg_price.push(Number(this.props.chart_values_1[i].avg_price));
    }
    for (let i = 0; i < this.props.chart_values_2.length; i++) {
      avg_rank.push(Number(this.props.chart_values_2[i].avg_rank));
    }
    return (
      <Grid.Column width={11} floated="left">
        <Grid.Row style={{ width: '95%' }}>
          <Card raised={true} style={{ width: '100%' }}>
            <Card.Content>
              <Card.Group itemsPerRow={3}>
                <Card raised={true}>
                  <Card.Content>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date content="Avg Daily Units Sold" />
                          <Feed.Summary>
                            {(this.props.products_track_data.daily_sales == null) ? '' : Number(this.props.products_track_data.daily_sales).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg BB Price/ Fees" />
                          <Feed.Summary>
                            {(this.props.products_track_data.fees == null) ? '' : Number(this.props.products_track_data.fees).toLocaleString()}
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  </Card.Content>
                </Card>
                <Card raised={true}>
                  <Card.Content>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date content="Avg Daily Revenue/ Profit" />
                          <Feed.Summary>
                            {(this.props.products_track_data.profit == null) ? '' : Number(this.props.products_track_data.profit).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg ROI/ ROII" />
                          <Feed.Summary>
                            {(this.props.products_track_data.roi == null) ? '' : Number(this.props.products_track_data.roi).toLocaleString()}
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                  </Card.Content>
                </Card>
                <Card raised={true}>
                  <Card.Content>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date content="Avg Daily Rank" />
                          <Feed.Summary>
                            {(this.props.products_track_data.daily_rank == null) ? '' : Number(this.props.products_track_data.daily_rank).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg LQS" />
                          <Feed.Summary>
                            {(this.props.products_track_data.daily_rank == null) ? '' : Number(this.props.products_track_data.daily_rank).toLocaleString()}
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
                      {(avg_price.length == 0 && avg_rank.length == 0) ?
                        (<Loader active inline='centered' className="popup-loader" size='massive'>Loading</Loader>) :
                        (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                              title: {
                                text: 'Statistics',
                                align: 'left',
                              },
                              xAxis: {
                                labels: {
                                  style: {
                                    color: '#ccc',
                                  },
                                },
                              },
                              credits: {
                                enabled: false,
                              },
                              yAxis: {
                                title: {
                                  text: '',
                                },
                                labels: {
                                  formatter() {
                                    return '$' + this.value / 1000 + 'k';
                                  },
                                  style: {
                                    color: '#ccc',
                                  },
                                },
                              },
                              tooltip: {
                                pointFormat: '$<b>{point.y:,.0f}</b>',
                              },
                              legend: {
                                align: 'left',
                                itemStyle: {
                                  color: '#ccc',
                                },
                              },
                              series: [
                                {
                                  type: 'areaspline',
                                  name: 'Products sold',
                                  color: '#c0f1ff',
                                  data: avg_price,
                                },
                                {
                                  type: 'areaspline',
                                  name: 'Total views',
                                  color: '#a3a0fb78',
                                  data: avg_rank,
                                },
                              ],
                            }}
                            {...this.props}
                          />
                        )
                      }
                    </Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid.Column>
    );
  };

  render() {
    // const memberDate = `May 5 2018`;
    // const { isOpen } = this.state;
    return (
      <Segment basic={true} className="setting">
        <Divider />
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" width={4}>
              {this.renderHeaderFilters()}
            </Grid.Column>
            <Grid.Column floated="right" width={12}>
              {this.renderHeaderSupplierMatrics()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid>
          <Grid.Column
            width={5}
            floated="right"
            style={{
              padding: 0,
            }}
          >
            <div
              className="ui"
              style={{
                display: 'inline-flex',
                // border: '1px solid #000',
                // padding: '11px',
                // borderRadius: '15px',
              }}
            >
              <span style={{ padding: '0 8px' }}>
                Time Saved
                <h2>
                  <strong>
                    {this.props.time_efficiency_data.length > 0
                      ? this.props.time_efficiency_data[0].saved_time
                      : null}{' '}
                    hrs
                  </strong>
                </h2>
              </span>
              <span style={{ padding: '0 8px' }}>
                Efficiency
                <h2>
                  <strong>
                    {this.props.time_efficiency_data.length > 0
                      ? this.props.time_efficiency_data[0].efficiency
                      : null}
                    %
                  </strong>
                </h2>
              </span>
            </div>
          </Grid.Column>
        </Grid>
        <Divider />
        {this.renderTable()}
        {this.productDetailView()}
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
    time_efficiency_data: state.synReducer.get('time_efficiency_data'),
    products: state.synReducer.get('products'),
    suppliers: state.synReducer.get('suppliers'),
    products_track_data: state.synReducer.get('products_track_data'),
    chart_values_1: state.synReducer.get('chart_values_1'),
    chart_values_2: state.synReducer.get('chart_values_2'),
    product_detail: state.synReducer.get('product_detail'),
    product_detail_chart_values: state.synReducer.get('product_detail_chart_values'),
    product_detail_chart_values_2: state.synReducer.get('product_detail_chart_values_2'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: (supplierID: string) => dispatch(getProducts(supplierID)),
    getProductTrackData: () => dispatch(getProductTrackData()),
    getProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(getProductTrackGroupId(supplierID, supplierName)),
    getProductDetail: (product_id: string) => dispatch(getProductDetail(product_id)),
    getProductDetailChart: (product_id: string) => dispatch(getProductDetailChart(product_id)),
    getProductDetailChartPrice: (product_id: string) =>
      dispatch(getProductDetailChartPrice(product_id)),
    getChartValues1: (product_track_group_id: string) =>
      dispatch(getChartValues1(product_track_group_id)),
    getChartValues2: (product_track_group_id: string) =>
      dispatch(getChartValues2(product_track_group_id)),
    trackProductWithPatch: (
      productID: string,
      productTrackGroupID: string,
      status: string,
      supplierID: string,
    ) => dispatch(trackProductWithPatch(productID, productTrackGroupID, status, supplierID)),

    getTimeEfficiency: () => dispatch(getTimeEfficiency()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
