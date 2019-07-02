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
  Menu,
  Modal,
  Card,
  Feed,
  Dimmer,
  Loader, Pagination,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './supplierDetail.css';

import { Link } from 'react-router-dom';

import {
  getProducts,
  // getSellers,
  trackProduct,
  Product,
  // Supplier,
  getProductAttributes,
  getProductTrackData,
  getChartValues1,
  getChartValues2,
  getProductDetail,
  getProductDetailChart,
  getProductDetailChartPrice
} from '../../../../Action/SYNActions';

// interface 
import {
  ProductsTrackData,
  ProductDetails,
  ProductChartDetails,
  ChartAveragePrice,
  ChartAverageRank,
  ProductChartDetailsPrice
} from '../../../../Action/SYNActions';

// import history from '../../../../history';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface State {
  isOpen: boolean;
  isFilterApplied: boolean;
  unitProfitFilter: any;
  marginFilter: any;
  unitsPerMonth: any;
  ROIFilter: any;
  products: Product[];
  modalOpen: boolean;
  currentPage: any;
  totalPages: any;
  pageSize: any;
}

interface Props {
  getProducts(supplierID: string): () => void;

  getProductAttributes(productID: string): () => void;

  trackProduct(productID: string, productTrackGroupID: string): () => void;

  getProductTrackData(): () => void;
  getChartValues1(product_track_group_id: string): () => void;
  getChartValues2(product_track_group_id: string): () => void;
  getProductDetail(product_id: string): () => void;
  getProductDetailChart(product_id: string): () => void;
  getProductDetailChartPrice(product_id: string): () => void;
  products: Product[];
  products_track_data: ProductsTrackData;
  product_detail: ProductDetails;
  chart_values_1: ChartAveragePrice[],
  chart_values_2: ChartAverageRank[],
  product_detail_chart_values: ProductChartDetails[];
  product_detail_chart_values_2: ProductChartDetailsPrice[];
  match: { params: { supplierID: '' } };
}

let delayedTimer: any = null;

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

// const options: Highcharts.Options = {
//   title: {
//     text: 'Statistics',
//     align: 'left'
//   },
//   xAxis: {
//     categories: [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun'
//     ],
//     labels: {
//       style: {
//         color: '#ccc'
//       }
//     }
//   },
//   credits: {
//     enabled: false
//   },
//   yAxis: {
//     title: {
//       text: ''
//     },
//     labels: {
//       formatter: function () {
//         return '$' + (this.value / 1000) + 'k';
//       },
//       style: {
//         color: '#ccc'
//       }
//     }
//   },
//   tooltip: {
//     pointFormat: '$<b>{point.y:,.0f}</b>'
//   },
//   legend: {
//     align: 'left',
//     itemStyle: {
//       color: '#ccc'
//     }
//   },
//   series: [{
//     type: 'areaspline',
//     name: "Products sold",
//     color: "#c0f1ff",
//     data: [10000, 1000, 8000, 4000, 8000, 2000]
//   },
//   {
//     type: 'areaspline',
//     name: "Total views",
//     color: "#a3a0fb78",
//     data: [5000, 3000, 5000, 7000, 5000, 10000]
//   }]
// }

export class SupplierDetail extends React.Component<Props, State> {
  state = {
    isOpen: false,
    isFilterApplied: false,
    unitProfitFilter: 0,
    marginFilter: 0,
    unitsPerMonth: 0,
    ROIFilter: 0,
    products: [],
    modalOpen: false,
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

  componentDidMount() {
    const data = {
      key: 'userID',
      value: localStorage.getItem('userId'),
    };
    this.props.getProducts(this.props.match.params.supplierID);
    this.props.getProductTrackData();
    this.props.getChartValues1("2");
    this.props.getChartValues2("2");
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    this.setState({
      products: nextProps.products,
      totalPages: Math.ceil(nextProps.products.length / this.state.pageSize),
    });
  }

  // refetchProducts = () => {
  // };
  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  productDetailsWithVisualization = (product_id: string) => {
    console.log("product_id: ", product_id)
    this.props.getProductDetail(product_id);
    this.props.getProductDetailChart(product_id);
    this.props.getProductDetailChartPrice(product_id);
    this.setState({ modalOpen: true });
  }

  renderTable = () => {
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.pageSize,
      (currentPage + 1) * this.state.pageSize
    );
    return (
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
          {productsTable.map((value, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>
                  <Grid>
                    <Grid.Column floated="left">
                      {/*<Image src={new URL(((value.image_url == null) ? 'http://localhost:3000/images/intro.png' : value.image_url))} size="tiny" />*/}
                    </Grid.Column>
                    <Grid.Column width={8} floated="left" className={'middle aligned'}>
                      <Grid.Row as={Link}
                        onClick={() => {
                          this.productDetailsWithVisualization(String(value.product_id));
                        }}>
                        {value.title}
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column style={{ display: 'inline-flex' }}>
                          <Image
                            // src={new URL(((value.image_url == null) ? 'http://localhost:3000/images/intro.png' : value.image_url))}
                            size="mini"
                          />
                          {/* </Grid.Column> */}
                          {/* <Grid.Column as={Link} to={`/syn/`}> */}
                          {value.asin}
                          {/* </Grid.Column> */}
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
                <Table.Cell>{Number(value.profit_monthly).toLocaleString()}</Table.Cell>
                <Table.Cell>{Number(value.margin).toLocaleString()}</Table.Cell>
                <Table.Cell>{Number(value.sales_monthly).toLocaleString()}</Table.Cell>
                <Table.Cell>{Number(value.profit_monthly).toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <Button
                    basic={true}
                    style={{ borderRadius: 20 }}
                    color="blue"
                    onClick={() => {
                      this.props.trackProduct(String(value.id), '2');
                    }}
                  >
                    Track Now
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
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan={10}>
              {/*<Menu pagination={true}>*/}
              {/*  <Menu.Item as="a" icon={true}>*/}
              {/*    <Icon name="chevron left" />*/}
              {/*  </Menu.Item>*/}
              {/*  <Menu.Item as="a">1</Menu.Item>*/}
              {/*  <Menu.Item as="a">2</Menu.Item>*/}
              {/*  <Menu.Item as="a">3</Menu.Item>*/}
              {/*  <Menu.Item as="a">4</Menu.Item>*/}
              {/*  <Menu.Item as="a" icon={true}>*/}
              {/*    <Icon name="chevron right" />*/}
              {/*  </Menu.Item>*/}
              {/*</Menu>*/}
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

  handleClose = () => this.setState({ modalOpen: false })

  productDetailView = () => {
    console.log("product_detail_chart_values: ", this.props)
    console.log("productDetailView");
    // this.props.product_detail_chart_values

    let popup_rank_conainer: Array<number> = [];
    let popup_price_conainer: Array<number> = [];

    for (let i = 0; i < this.props.product_detail_chart_values.length; i++) {
      popup_rank_conainer.push(Number(this.props.product_detail_chart_values[i].rank))
    }
    for (let i = 0; i < this.props.product_detail_chart_values_2.length; i++) {
      popup_price_conainer.push(Number(this.props.product_detail_chart_values_2[i].price))
    }
    // this.props.getProductDetail(product_id);
    // this.props.getProductDetailChart(product_id);
    // getProductDegetProductDetailCharttail(product_id: string): () => void;
    // (product_id: string): () => void;F
    return (
      <Modal
        size={'large'}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
      >
        <Modal.Content>
          <Grid>
            <Grid.Column floated="left" width={14}>
              <Grid style={{ height: 40 }}>
                <Grid.Column floated="left" width={10}>
                  <h2>{'product.Title' + ' and ' + 'product.Description'}</h2>
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
                  <Grid.Row>{(this.props.product_detail.price == null) ? 0 : Number(this.props.product_detail.price).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.fees == null) ? 0 : Number(this.props.product_detail.fees).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.product_cost == null) ? 0 : Number(this.props.product_detail.product_cost).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.inb_shipping_cost == null) ? 0 : Number(this.props.product_detail.inb_shipping_cost).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.oub_shipping_cost == null) ? 0 : Number(this.props.product_detail.oub_shipping_cost).toLocaleString()}</Grid.Row>
                  <Grid.Row>
                    <h4>{(this.props.product_detail.profit == null) ? 0 : Number(this.props.product_detail.profit).toLocaleString()}</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>{(this.props.product_detail.margin == null) ? 0 : Number(this.props.product_detail.margin).toLocaleString()}</h4>
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
                  <Grid.Row>{(this.props.product_detail.monthly_sales == null) ? 0 : Number(this.props.product_detail.monthly_sales).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.monthly_revenue == null) ? 0 : Number(this.props.product_detail.monthly_revenue).toLocaleString()}</Grid.Row>
                  <Grid.Row>{(this.props.product_detail.profit_monthly == null) ? 0 : Number(this.props.product_detail.profit_monthly).toLocaleString()}</Grid.Row>
                  <Grid.Row />
                  <br />
                  <Grid.Row />
                  <br />
                  <Grid.Row>
                    <h4>{(this.props.product_detail.roi == null) ? 0 : Number(this.props.product_detail.roi).toLocaleString()}</h4>
                  </Grid.Row>
                  <Grid.Row>
                    <h4>0
                    {/* {(this.props.product_detail.upc == null) ? 0 : Number(this.props.product_detail.upc).toLocaleString()} */}
                    </h4>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column floated="right" width={2}>
              <Image
                src={new URL('http://localhost:3000/images/intro.png')}
                size="mini"
                style={{ display: 'inline-block' }}
              />
              <Icon name="amazon" style={{ color: 'black' }} />
              <p>{this.props.product_detail.asin}</p>
              <p>{this.props.product_detail.upc}</p>
              <p>{'MSKU'}</p>
              <p>{'FNSKU'}</p>
            </Grid.Column>
          </Grid>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: 'Statistics',
                align: 'left'
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#ccc'
                  }
                }
              },
              credits: {
                enabled: false
              },
              yAxis: {
                title: {
                  text: ''
                },
                labels: {
                  formatter: function () {
                    return '$' + (this.value / 1000) + 'k';
                  },
                  style: {
                    color: '#ccc'
                  }
                }
              },
              tooltip: {
                pointFormat: '$<b>{point.y:,.0f}</b>'
              },
              legend: {
                align: 'left',
                itemStyle: {
                  color: '#ccc'
                }
              },
              series: [{
                type: 'areaspline',
                name: "Products sold",
                color: "#c0f1ff",
                data: popup_price_conainer
              },
              {
                type: 'areaspline',
                name: "Total views",
                color: "#a3a0fb78",
                data: popup_rank_conainer
              }]
            }}
            {...this.props}
          />
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
          <Grid.Column floated="left" width={6}>Syn Preset</Grid.Column>
          <Grid.Column floated="right" width={10}>
            <Dropdown
              // style={{ width: '200px' }}
              placeholder="Select a preset"
              fluid={true}
              selection={true}
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
              onChange={(e, data) => {
                console.log(data);
                //TODO proof of concept for dropdown filter
                if (data.value === 'ROI/ Return of Investment') {
                  this.setState({
                    ROIFilter: 24,
                  }, () => {
                    this.updateFilters();
                  });
                }
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ marginTop: 15 }}>
            {/* <Grid.Row style={{ display: 'inline-flex' }}> */}


            {/* </Grid.Row> */}
            {/* <Grid.Row style={{ marginTop: 20 }}> */}
            <Card raised={true}
              style={{
                // marginTop: 20,
                width: "100%"
              }}
            >
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        Unit Profit <Icon title="Sellgo" name="question circle outline" />
                      </Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <Grid>
                          <Grid.Row>
                            <Grid.Column floated="left" width={4}>
                              <div className="min-max">0</div>
                            </Grid.Column>
                            <Grid.Column
                              style={{ padding: 0 }}
                              width={8}>

                              <input
                                onChange={event => {
                                  const value = event.target.value;
                                  if (delayedTimer != null) {
                                    clearTimeout(delayedTimer);
                                  }
                                  delayedTimer = setTimeout(() => {
                                    console.log(event);
                                    this.setState(
                                      {
                                        isFilterApplied: true,
                                        unitProfitFilter: parseInt(value, 10),
                                      },
                                      () => {
                                        this.updateFilters();
                                      },
                                    );
                                  }, 500);
                                }}
                                value={this.state.unitProfitFilter}
                                min="0"
                                max="1000"
                                type="range"
                                className="slider"
                              />
                            </Grid.Column>
                            <Grid.Column floated="right" width={4}>
                              <div className="min-max">100</div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        Margin (%) <Icon title="Sellgo" name="question circle outline" />
                      </Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <Grid>
                          <Grid.Row>
                            <Grid.Column floated="left" width={4}>
                              <div className="min-max">0</div>
                            </Grid.Column>
                            <Grid.Column
                              style={{ padding: 0 }}
                              width={8}>
                              <input
                                onChange={event => {
                                  const value = event.target.value;
                                  if (delayedTimer != null) {
                                    clearTimeout(delayedTimer);
                                  }
                                  delayedTimer = setTimeout(() => {
                                    console.log(event);
                                    this.setState(
                                      {
                                        isFilterApplied: true,
                                        marginFilter: parseInt(value, 10),
                                      },
                                      () => {
                                        this.updateFilters();
                                      },
                                    );
                                  }, 500);
                                }}
                                value={this.state.marginFilter}
                                min="0"
                                max="100"
                                type="range"
                                className="slider"
                              />
                            </Grid.Column>
                            <Grid.Column floated="right" width={4}>
                              <div className="min-max">100</div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        Units per Month <Icon title="Sellgo" name="question circle outline" />
                      </Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <Grid>
                          <Grid.Row>
                            <Grid.Column floated="left" width={4}>
                              <div className="min-max">0</div>
                            </Grid.Column>
                            <Grid.Column
                              style={{ padding: 0 }}
                              width={8}>
                              <input
                                onChange={event => {
                                  const value = event.target.value;
                                  if (delayedTimer != null) {
                                    clearTimeout(delayedTimer);
                                  }
                                  delayedTimer = setTimeout(() => {
                                    console.log(event);
                                    this.setState(
                                      {
                                        isFilterApplied: true,
                                        unitsPerMonth: parseInt(value, 10),
                                      },
                                      () => {
                                        this.updateFilters();
                                      },
                                    );
                                  }, 500);
                                }}
                                value={this.state.unitsPerMonth}
                                min="0"
                                max="100"
                                type="range"
                                className="slider"
                              />
                            </Grid.Column>
                            <Grid.Column floated="right" width={4}>
                              <div className="min-max">100</div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        ROI/ Return of Investment{' '}
                        <Icon title="Sellgo" name="question circle outline" />
                      </Feed.Summary>
                      <Feed.Summary className="min-max-slider-wrapper">
                        <Grid>
                          <Grid.Row>
                            <Grid.Column floated="left" width={4}>
                              <div className="min-max">0</div>
                            </Grid.Column>
                            <Grid.Column
                              style={{ padding: 0 }}
                              width={8}>
                              <input
                                // onChange={event => {
                                //   // const value = event.target.value;
                                //   // if (delayedTimer != null) {
                                //   //   clearTimeout(delayedTimer);
                                //   // }
                                //   // delayedTimer = setTimeout(() => {
                                //   //   this.setState(
                                //   //     {
                                //   //       isFilterApplied: true,
                                //   //       ROIFilter: parseInt(value, 10),
                                //   //     },
                                //   //     () => {
                                //   //       this.updateFilters();
                                //   //     },
                                //   //   );
                                //   // }, 1000);
                                // }}
                                value={this.state.ROIFilter}
                                min="0"
                                max="100"
                                type="range"
                                className="slider"
                              />
                            </Grid.Column>
                            <Grid.Column floated="right" width={4}>
                              <div className="min-max">100</div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
            {/* </Grid.Row> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  updateFilters = () => {
    let products: Product[] = this.props.products;
    console.log('ROI FILTER VALUE : ' + this.state.ROIFilter);
    let newProducts: Product[] = [];
    for (let product of products) {
      let shouldAdd = true;
      // if (this.state.unitProfitFilter > 0 && parseInt(product.profit_monthly, 10) !== this.state.unitProfitFilter) {
      //   shouldAdd = false;
      // }
      // if (this.state.marginFilter > 0 && parseInt(product.margin, 10) !== this.state.marginFilter) {
      //   shouldAdd = false;
      // }
      // if (this.state.unitsPerMonth > 0 && parseInt(product.sales_monthly, 10) !== this.state.unitsPerMonth) {
      //   shouldAdd = false;
      // }
      // if (this.state.ROIFilter > 0 && parseInt(product.profit_monthly, 10) !== this.state.ROIFilter) {
      //   shouldAdd = false;
      // }
      if (shouldAdd) {
        newProducts.push(product);
      }
    }

    this.setState({
      products: newProducts,
    });
    return;
  };

  renderHeaderSupplierMatrics = () => {

    let avg_price = [];
    let avg_rank = [];
    console.log(this.props)
    for (let i = 0; i < this.props.chart_values_1.length; i++) {
      avg_price.push(Number(this.props.chart_values_1[i].avg_price));
    }
    for (let i = 0; i < this.props.chart_values_2.length; i++) {
      avg_rank.push(Number(this.props.chart_values_2[i].avg_rank));
    }
    console.log("avg_price: ", avg_price)
    console.log("avg_rank: ", avg_rank)
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
                          <Feed.Summary>{Number(this.props.products_track_data.daily_sales).toLocaleString()}</Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg BB Price/ Fees" />
                          <Feed.Summary>{Number(this.props.products_track_data.fees).toLocaleString()}</Feed.Summary>
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
                          <Feed.Summary>{Number(this.props.products_track_data.profit).toLocaleString()}</Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg BB Price/ Fees" />
                          <Feed.Summary>{Number(this.props.products_track_data.profit).toLocaleString()}</Feed.Summary>
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
                          <Feed.Summary>{Number(this.props.products_track_data.daily_rank).toLocaleString()}</Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg LQS" />
                          <Feed.Summary>{Number(this.props.products_track_data.daily_rank).toLocaleString()}</Feed.Summary>
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
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                          title: {
                            text: 'Statistics',
                            align: 'left'
                          },
                          xAxis: {
                            labels: {
                              style: {
                                color: '#ccc'
                              }
                            }
                          },
                          credits: {
                            enabled: false
                          },
                          yAxis: {
                            title: {
                              text: ''
                            },
                            labels: {
                              formatter: function () {
                                return '$' + (this.value / 1000) + 'k';
                              },
                              style: {
                                color: '#ccc'
                              }
                            }
                          },
                          tooltip: {
                            pointFormat: '$<b>{point.y:,.0f}</b>'
                          },
                          legend: {
                            align: 'left',
                            itemStyle: {
                              color: '#ccc'
                            }
                          },
                          series: [{
                            type: 'areaspline',
                            name: "Products sold",
                            color: "#c0f1ff",
                            data: avg_price
                          },
                          {
                            type: 'areaspline',
                            name: "Total views",
                            color: "#a3a0fb78",
                            data: avg_rank
                          }]
                        }}
                        {...this.props}
                      />
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
    console.log("this.props: ", this.props)
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
            </Grid.Column >
          </Grid.Row>
        </Grid>
        <Divider />
        <Grid>
          <Grid.Column width={5} floated='right'
            style={{
              padding: 0
            }}>
            <div className="ui" style={{
              display: 'inline-flex',
              // border: '1px solid #000',
              // padding: '11px',
              // borderRadius: '15px',
            }}>
              <span style={{ padding: '0 8px' }}>
                Time Saved
                <h2>
                  <strong>
                    99 hrs
                 </strong>
                </h2>
              </span>
              <span style={{ padding: '0 8px' }}>
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
    products: state.synReducer.get('products'),
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
    getProductAttributes: (productID: string) => dispatch(getProductAttributes(productID)),
    getProductTrackData: () => dispatch(getProductTrackData()),
    getProductDetail: (product_id: string) => dispatch(getProductDetail(product_id)),
    getProductDetailChart: (product_id: string) => dispatch(getProductDetailChart(product_id)),
    getProductDetailChartPrice: (product_id: string) => dispatch(getProductDetailChartPrice(product_id)),
    getChartValues1: (product_track_group_id: string) => dispatch(getChartValues1(product_track_group_id)),
    getChartValues2: (product_track_group_id: string) => dispatch(getChartValues2(product_track_group_id)),
    trackProduct: (supplierID: string, productTrackGroupID: string) =>
      dispatch(trackProduct(supplierID, productTrackGroupID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
