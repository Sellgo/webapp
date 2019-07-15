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
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import {
  getProducts,
  trackProductWithPatch,
  trackProductWithPost,
  Product,
  getProductsChartHistoryPrice,
  getProductsChartHistoryRank,
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
import { ProductFiltersPreset } from '../../../../constant/constant';

// import history from '../../../../history';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface State {
  isOpen: boolean;
  products: Product[];
  productDetailModalOpen: boolean;
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

  trackProductWithPost(
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string,
  ): () => void;

  getTimeEfficiency(): () => void;

  getProductTrackData(supplierID: string): () => void;

  getProductTrackGroupId(supplierID: string, supplierName: string): () => void;

  getProductsChartHistoryPrice(supplierID: string): () => void;

  getProductsChartHistoryRank(supplierID: string): () => void;

  getProductDetail(product_id: string, supplierID: string): () => void;

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
    productDetailModalOpen: false,
    totalPages: 5,
    currentPage: 1,
    pageSize: 10,
    unitProfitFilter: {
      min: 0,
      max: 100,
    },
    marginFilter: {
      min: 0,
      max: 100,
    },
    unitsPerMonthFilter: {
      min: 0,
      max: 100,
    },
    profitPerMonthFilter: {
      min: 0,
      max: 100,
    },
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
    this.props.getProductTrackData(this.props.match.params.supplierID);
    this.props.getProductsChartHistoryPrice(this.props.match.params.supplierID);
    this.props.getProductsChartHistoryRank(this.props.match.params.supplierID);
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
      unitProfitFilter: { min: minUnitProfit, max: maxUnitProfit },
      profitPerMonthFilter: { min: minProfitPerMonth, max: maxProfitPerMonth },
      unitsPerMonthFilter: { min: minUnitsPerMonth, max: maxUnitsPerMonth },
      marginFilter: { min: minMargin, max: maxMargin },
    });
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  productDetailsWithVisualization = (product_id: string) => {
    this.props.getProductDetail(product_id, this.props.match.params.supplierID);
    this.props.getProductDetailChart(product_id);
    this.props.getProductDetailChartPrice(product_id);
    this.setState({ productDetailModalOpen: true });
  };
  renderTable = () => {
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.pageSize,
      (currentPage + 1) * this.state.pageSize,
    );
    return this.props.products.length == 0 ? (
      <Segment>
        <Loader active={true} inline="centered" size="massive">
          Loading
        </Loader>
      </Segment>
    ) : (
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>
              <Checkbox/>
            </Table.HeaderCell>
            <Table.HeaderCell width={3} style={{ paddingLeft: 0 }}>
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
          {this.props.products[0].id == -10000000 ? (
            <Table.Row key={134}>
              <Table.Cell/>
              <Table.Cell>
                <h1>Data not found</h1>
              </Table.Cell>
            </Table.Row>
          ) : (
            productsTable.map((value, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Checkbox/>
                  </Table.Cell>
                  <Table.Cell>
                    <Grid>
                      <Grid.Column floated="left">
                        <Image
                          src={value.image_url == null ? '/images/intro.png' : value.image_url}
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
                          {value.asin}
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column style={{ display: 'inline-flex' }}>
                            <Image
                              src={value.image_url == null ? '/images/intro.png' : value.image_url}
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
                        if (value.tracking_status != null) {
                          this.props.trackProductWithPatch(
                            String(value.product_track_id),
                            '2',
                            value.tracking_status === 'active' ? 'inactive' : 'active',
                            this.props.match.params.supplierID,
                          );
                        } else {
                          this.props.trackProductWithPost(
                            String(value.product_id),
                            '2',
                            'active',
                            this.props.match.params.supplierID,
                          );
                        }
                      }}
                    >
                      {value.tracking_status == 'active' ? 'Untrack' : 'Track Now'}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>{new Date(value.last_syn).toLocaleString()}</Table.Cell>
                  <Table.Cell>
                    <Table.Cell
                      as={Link}
                      to={'//' + value.amazon_url.split('//')[1]}
                      target={'_blank'}
                    >
                      <Icon name="amazon" style={{ color: 'black' }}/>
                      &nbsp;
                    </Table.Cell>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
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
    );
  };

  productDetailViewModal = () => {
    const popup_rank_conainer: number[] = [];
    const popup_price_conainer: number[] = [];

    for (let i = 0; i < this.props.product_detail_chart_values.length; i++) {
      popup_rank_conainer.push(Number(this.props.product_detail_chart_values[i].rank));
    }
    for (let i = 0; i < this.props.product_detail_chart_values_2.length; i++) {
      popup_price_conainer.push(Number(this.props.product_detail_chart_values_2[i].price));
    }
    return (
      <Modal
        size={'large'}
        open={this.state.productDetailModalOpen}
        onClose={() => {
          this.setState({ productDetailModalOpen: false });
        }}
        closeIcon={true}
      >
        <Modal.Content>
          <Grid>
            <Grid.Column floated="left" width={14}>
              <Grid style={{ height: 40 }}>
                <Grid.Column  >
                  <h3>{this.props.product_detail.title}</h3>
                </Grid.Column>
                {/*<Grid.Column floated="right" width={2}>{'short Details'}</Grid.Column>*/}
              </Grid>
              <Divider/>
              <Grid style={{ margin: 0 }}>
                <Grid.Column style={{ margin: 0 }} floated="left" width={4}>
                  <Grid.Row>Price</Grid.Row>
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
                  <Grid.Row/>
                  <br/>
                  <Grid.Row/>
                  <br/>
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
                  <Grid.Row/>
                  <br/>
                  <Grid.Row/>
                  <br/>
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
              <a href={this.props.product_detail.amazon_url} target={'_blank'}>
                <Icon name="amazon" style={{ color: 'black' }}/>
              </a>
              <p>{this.props.product_detail.asin}</p>
              <p>{this.props.product_detail.upc}</p>
              <p>{'MSKU'}</p>
              <p>{'FNSKU'}</p>
            </Grid.Column>
          </Grid>
          {popup_price_conainer.length == 0 && popup_rank_conainer.length == 0 ? (
            <Loader active={true} inline="centered" className="popup-loader" size="massive">
              Loading
            </Loader>
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
                    name: 'Price',
                    color: '#c0f1ff',
                    data: popup_price_conainer,
                  },
                  {
                    type: 'areaspline',
                    name: 'Rank',
                    color: '#a3a0fb78',
                    data: popup_rank_conainer,
                  },
                ],
              }}
              {...this.props}
            />
          )}
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
          <Button negative={true}>No</Button>
          <Button positive={true} icon="checkmark" labelPosition="right" content="Yes"/>
          <Button positive={true} icon="checkmark" labelPosition="right" content="Yes"/>
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
                const marginFilterUpdatedValue = data.marginFilter;
                if (marginFilterUpdatedValue.max > this.state.maxMargin) {
                  marginFilterUpdatedValue.max = this.state.maxMargin;
                }
                if (marginFilterUpdatedValue.min < this.state.minMargin) {
                  marginFilterUpdatedValue.min = this.state.minMargin;
                }
                const profitPerMonthFilterUpdatedValue = data.profitPerMonthFilter;
                if (profitPerMonthFilterUpdatedValue.max > this.state.maxProfitPerMonth) {
                  profitPerMonthFilterUpdatedValue.max = this.state.maxProfitPerMonth;
                }
                if (profitPerMonthFilterUpdatedValue.min < this.state.minProfitPerMonth) {
                  profitPerMonthFilterUpdatedValue.min = this.state.minProfitPerMonth;
                }
                const unitProfitFilterUpdatedValue = data.unitProfitFilter;
                if (unitProfitFilterUpdatedValue.max > this.state.maxUnitProfit) {
                  unitProfitFilterUpdatedValue.max = this.state.maxUnitProfit;
                }
                if (unitProfitFilterUpdatedValue.min < this.state.minUnitProfit) {
                  unitProfitFilterUpdatedValue.min = this.state.minUnitProfit;
                }
                const unitsPerMonthFilterUpdatedValue = data.unitsPerMonthFilter;
                if (unitsPerMonthFilterUpdatedValue.max > this.state.maxUnitsPerMonth) {
                  unitsPerMonthFilterUpdatedValue.max = this.state.maxUnitsPerMonth;
                }
                if (unitsPerMonthFilterUpdatedValue.min < this.state.minUnitsPerMonth) {
                  unitsPerMonthFilterUpdatedValue.min = this.state.minUnitsPerMonth;
                }

                this.setState(
                  {
                    marginFilter: marginFilterUpdatedValue,
                    profitPerMonthFilter: profitPerMonthFilterUpdatedValue,
                    unitProfitFilter: unitProfitFilterUpdatedValue,
                    unitsPerMonthFilter: unitsPerMonthFilterUpdatedValue,
                  },
                  () => {
                    this.updateFilters();
                  },
                );
              }}
            />
          </Grid.Column>
        </Grid.Row>
        {this.state.minUnitProfit !== -100 &&
        this.state.minMargin !== -100 &&
        this.state.minProfitPerMonth !== -100 &&
        this.state.minProfitPerMonth !== -100 ? (
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
                            Unit Profit <Icon title="Sellgo" name="question circle outline"/>
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.minUnitProfit}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0, paddingRight: 10 }} width={7}>
                                  <InputRange
                                    minValue={this.state.minUnitProfit}
                                    maxValue={this.state.maxUnitProfit}
                                    value={this.state.unitProfitFilter}
                                    onChange={value => {
                                      this.setState({
                                        unitProfitFilter: value,
                                      });
                                    }}
                                    onChangeComplete={value => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column
                                  floated="right"
                                  width={4}
                                  style={{ padding: 0, marginLeft: 10, paddingRight: 10 }}
                                >
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
                            Margin (%) <Icon title="Sellgo" name="question circle outline"/>
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.minMargin}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0, paddingRight: 10 }} width={7}>
                                  <InputRange
                                    minValue={this.state.minMargin}
                                    maxValue={this.state.maxMargin}
                                    value={this.state.marginFilter}
                                    onChange={value => {
                                      this.setState({
                                        marginFilter: value,
                                      });
                                    }}
                                    onChangeComplete={value => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column
                                  floated="right"
                                  width={4}
                                  style={{ padding: 0, marginLeft: 10, paddingRight: 10 }}
                                >
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
                            Units per Month <Icon title="Sellgo" name="question circle outline"/>
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.minUnitsPerMonth}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0, paddingRight: 10 }} width={7}>
                                  <InputRange
                                    minValue={this.state.minUnitsPerMonth}
                                    maxValue={this.state.maxUnitsPerMonth}
                                    value={this.state.unitsPerMonthFilter}
                                    onChange={value => {
                                      this.setState({
                                        unitsPerMonthFilter: value,
                                      });
                                    }}
                                    onChangeComplete={value => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column
                                  floated="right"
                                  width={4}
                                  style={{ padding: 0, marginLeft: 10, paddingRight: 10 }}
                                >
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
                            Profit per Month <Icon title="Sellgo" name="question circle outline"/>
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.minProfitPerMonth}</div>
                                </Grid.Column>
                                <Grid.Column style={{ padding: 0, paddingRight: 10 }} width={7}>
                                  <InputRange
                                    minValue={this.state.minProfitPerMonth}
                                    maxValue={this.state.maxProfitPerMonth}
                                    value={this.state.profitPerMonthFilter}
                                    onChange={value => {
                                      this.setState({
                                        profitPerMonthFilter: value,
                                      });
                                    }}
                                    onChangeComplete={value => {
                                      this.updateFilters();
                                    }}
                                  />
                                </Grid.Column>
                                <Grid.Column
                                  floated="right"
                                  width={4}
                                  style={{ padding: 0, marginLeft: 10, paddingRight: 10 }}
                                >
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
        ) : null}
      </Grid>
    );
  };

  updateFilters = () => {
    const products: Product[] = this.props.products;
    const newProducts: Product[] = [];
    for (const product of products) {
      let shouldAdd = true;
      if (
        this.state.unitProfitFilter.min !== this.state.minUnitProfit &&
        parseFloat(product.profit) < this.state.unitProfitFilter.min
      ) {
        shouldAdd = false;
      }
      if (
        this.state.unitProfitFilter.max !== this.state.maxUnitProfit &&
        parseFloat(product.profit) > this.state.unitProfitFilter.max
      ) {
        shouldAdd = false;
      }
      if (
        this.state.marginFilter.min !== this.state.minMargin &&
        parseFloat(product.margin) < this.state.marginFilter.min
      ) {
        shouldAdd = false;
      }
      if (
        this.state.marginFilter.max !== this.state.maxMargin &&
        parseFloat(product.margin) > this.state.marginFilter.max
      ) {
        shouldAdd = false;
      }
      if (
        this.state.unitsPerMonthFilter.min !== this.state.minUnitsPerMonth &&
        parseFloat(product.sales_monthly) < this.state.unitsPerMonthFilter.min
      ) {
        shouldAdd = false;
      }
      if (
        this.state.unitsPerMonthFilter.max !== this.state.maxUnitsPerMonth &&
        parseFloat(product.sales_monthly) > this.state.unitsPerMonthFilter.max
      ) {
        shouldAdd = false;
      }
      if (
        this.state.profitPerMonthFilter.min !== this.state.minProfitPerMonth &&
        parseFloat(product.profit_monthly) < this.state.profitPerMonthFilter.min
      ) {
        shouldAdd = false;
      }
      if (
        this.state.profitPerMonthFilter.max !== this.state.maxProfitPerMonth &&
        parseFloat(product.profit_monthly) > this.state.profitPerMonthFilter.max
      ) {
        shouldAdd = false;
      }
      if (shouldAdd) {
        newProducts.push(product);
      }
    }
    const totalPages = Math.ceil(newProducts.length / this.state.pageSize);
    this.setState({
      totalPages,
      currentPage: totalPages < this.state.currentPage ? 1 : this.state.currentPage,
      products: newProducts,
    });
    return;
  };

  renderHeaderSupplierMatrics = () => {
    const avg_price= [];
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
                          <Feed.Date content="Avg Daily Units Sold"/>
                          <Feed.Summary>
                            {this.props.products_track_data.daily_sales == null
                              ? ''
                              : Number(this.props.products_track_data.daily_sales).toLocaleString()}
                          </Feed.Summary>
                          <Divider/>
                          <Feed.Date content="Avg BB Price/ Fees"/>
                          <Feed.Summary>
                            {this.props.products_track_data.fees == null
                              ? ''
                              : Number(this.props.products_track_data.fees).toLocaleString()}
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
                          <Feed.Date content="Avg Daily Revenue/ Profit"/>
                          <Feed.Summary>
                            {this.props.products_track_data.profit == null
                              ? ''
                              : Number(this.props.products_track_data.profit).toLocaleString()}
                          </Feed.Summary>
                          <Divider/>
                          <Feed.Date content="Avg ROI/ ROII"/>
                          <Feed.Summary>
                            {this.props.products_track_data.roi == null
                              ? ''
                              : Number(this.props.products_track_data.roi).toLocaleString()}
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
                          <Feed.Date content="Avg Daily Rank"/>
                          <Feed.Summary>
                            {this.props.products_track_data.daily_rank == null
                              ? ''
                              : Number(this.props.products_track_data.daily_rank).toLocaleString()}
                          </Feed.Summary>
                          <Divider/>
                          <Feed.Date content="Avg LQS"/>
                          <Feed.Summary>
                            {this.props.products_track_data.daily_rank == null
                              ? ''
                              : Number(this.props.products_track_data.daily_rank).toLocaleString()}
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
                      {avg_price!=undefined && avg_price.length == 0 && avg_rank.length == 0 ? (
                          <Loader
                            active={true}
                            inline="centered"
                            className="popup-loader"
                            size="massive"
                          >
                            Loading
                          </Loader>
                        ) :
                        (avg_price[0]!==-1000000) ? (
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
                                  name: 'Avg Price',
                                  color: '#c0f1ff',
                                  data: avg_price,
                                },
                                {
                                  type: 'areaspline',
                                  name: 'Avg Rank',
                                  color: '#a3a0fb78',
                                  data: avg_rank,
                                },
                              ],
                            }}
                            {...this.props}
                          />
                        ) : null}
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
        <Divider/>
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
        <Divider/>
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
                      : '0'}{' '}
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
                      : '0'}{' '}
                    %
                  </strong>
                </h2>
              </span>
            </div>
          </Grid.Column>
        </Grid>
        <Divider/>
        {this.renderTable()}
        {this.productDetailViewModal()}
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
    getProductTrackData: (supplierID: string) => dispatch(getProductTrackData(supplierID)),
    getProductTrackGroupId: (supplierID: string, supplierName: string) =>
      dispatch(getProductTrackGroupId(supplierID, supplierName)),
    getProductDetail: (product_id: string, supplierID: string) =>
      dispatch(getProductDetail(product_id, supplierID)),
    getProductDetailChart: (product_id: string) => dispatch(getProductDetailChart(product_id)),
    getProductDetailChartPrice: (product_id: string) =>
      dispatch(getProductDetailChartPrice(product_id)),
    getProductsChartHistoryPrice: (supplierID: string) =>
      dispatch(getProductsChartHistoryPrice(supplierID)),
    getProductsChartHistoryRank: (supplierID: string) =>
      dispatch(getProductsChartHistoryRank(supplierID)),
    trackProductWithPatch: (
      productID: string,
      productTrackGroupID: string,
      status: string,
      supplierID: string,
    ) => dispatch(trackProductWithPatch(productID, productTrackGroupID, status, supplierID)),
    trackProductWithPost: (
      productID: string,
      productTrackGroupID: string,
      status: string,
      supplierID: string,
    ) => dispatch(trackProductWithPost(productID, productTrackGroupID, status, supplierID)),

    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
