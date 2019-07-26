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
  Progress,
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
  getProductTrackGroupId,
  getProductsChartHistoryRank,
  getProductDetail,
  getProductDetailChartRank,
  getProductDetailChartPrice,
  getProductTrackData,
  getLastFileID,
  resetProductData,
  getSynthesisProgressUpdates,
  ProductsTrackData,
  ProductDetails,
  ProductChartDetailsRank,
  ChartAveragePrice,
  ChartAverageRank,
  ProductChartDetailsPrice,
  Supplier,
  TimeEfficiency,
  getTimeEfficiency,
  getSellers,
} from '../../../../Action/SYNActions';
import { numberWithCommas, ProductFiltersPreset } from '../../../../constant/constant';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { SellField } from '../../../../Action/SettingActions';
import AdminLayout from '../../../../components/AdminLayout';
import Auth from '../../../../components/Auth/Auth';

interface State {
  isOpen: boolean;
  products: Product[];
  productDetailModalOpen: boolean;
  currentPage: any;
  totalPages: any;
  singlePageItemsCount: any;
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
  sortDirection: any;
  sortedColumn: string;

  isSideBarExpanded: boolean;
}

interface Props {
  getProducts(supplierID: string): () => void;

  getSellers(): () => void;

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

  resetProductData(data: {}): () => void;

  getProductTrackData(supplierID: string): () => void;

  getLastFileID(supplierID: string): () => void;

  getProductTrackGroupId(supplierID: string): () => void;

  getProductsChartHistoryPrice(supplierID: string): () => void;

  getProductsChartHistoryRank(supplierID: string): () => void;

  getProductDetail(product_id: string, supplierID: string): () => void;

  getProductDetailChartRank(product_id: string): () => void;

  getProductDetailChartPrice(product_id: string): () => void;

  getSynthesisProgressUpdates(synthesisFileID: string): () => void;

  time_efficiency_data: TimeEfficiency[];
  suppliers: Supplier[];
  products: Product[];
  products_track_data: ProductsTrackData;
  product_detail: ProductDetails;
  chart_values_price: ChartAveragePrice[];
  chart_values_rank: ChartAverageRank[];
  product_detail_chart_values_rank: ProductChartDetailsRank[];
  product_detail_chart_values_price: ProductChartDetailsPrice[];
  sellerData: SellField;
  synthesisFileID: { synthesis_file_id: 0 };
  synthesisFileProgressUpdates: { progress: 0 };
  productTrackGroup: [{ id: 0 }];
  match: { params: { supplierID: ''; auth: Auth } };

  isSideBarExpanded: false;
}

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
    singlePageItemsCount: 50,
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
    sortDirection: undefined,
    sortedColumn: '',
    isSideBarExpanded: false,
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#0E6FCF',
  };

  componentDidMount() {
    const data = {
      key: 'userID',
      value: localStorage.getItem('userId'),
    };
    this.props.resetProductData({});
    this.props.getProductTrackGroupId(this.props.match.params.supplierID);
    this.props.getLastFileID(this.props.match.params.supplierID);
    this.props.getProducts(this.props.match.params.supplierID);
    this.props.getProductTrackData(this.props.match.params.supplierID);
    this.props.getProductsChartHistoryPrice(this.props.match.params.supplierID);
    this.props.getProductsChartHistoryRank(this.props.match.params.supplierID);
    if (this.props.time_efficiency_data.length === 0) {
      this.props.getTimeEfficiency();
    }
    if (this.props.suppliers.length == 0) {
      this.props.getSellers();
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (this.state.isSideBarExpanded !== nextProps.isSideBarExpanded) {
      setTimeout(() => {
        this.setState({
          isSideBarExpanded: nextProps.isSideBarExpanded,
        });
      }, 0);
    }

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
      totalPages: Math.ceil(nextProps.products.length / this.state.singlePageItemsCount),
      minUnitProfit,
      maxUnitProfit,
      minMargin,
      maxMargin,
      minUnitsPerMonth,
      maxUnitsPerMonth,
      minProfitPerMonth,
      maxProfitPerMonth,
      unitProfitFilter: {min: minUnitProfit, max: maxUnitProfit},
      profitPerMonthFilter: {min: minProfitPerMonth, max: maxProfitPerMonth},
      unitsPerMonthFilter: {min: minUnitsPerMonth, max: maxUnitsPerMonth},
      marginFilter: {min: minMargin, max: maxMargin},
    });
  }

  handleModel = () => {
    const {isOpen} = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  productDetailsWithVisualization = (product_id: string) => {
    this.props.getProductDetail(product_id, this.props.match.params.supplierID);
    this.props.getProductDetailChartRank(product_id);
    this.props.getProductDetailChartPrice(product_id);
    this.setState({productDetailModalOpen: true});
  };

  handleSort = (clickedColumn: string) => {
    const {sortedColumn, products, sortDirection} = this.state;
    if (sortedColumn !== clickedColumn) {
      const sortedProducts = products.sort((a, b) => {
        let aColumn, bColumn;
        if (
          clickedColumn == 'profit' ||
          clickedColumn == 'margin' ||
          clickedColumn == 'sales_monthly' ||
          clickedColumn == 'profit_monthly'
        ) {
          aColumn = Number(a[clickedColumn]);
          bColumn = Number(b[clickedColumn]);
        } else if (clickedColumn == 'last_syn') {
          aColumn = a[clickedColumn];
          bColumn = b[clickedColumn];
        } else {
          aColumn = a[clickedColumn];
          bColumn = b[clickedColumn];
        }
        if (aColumn < bColumn) {
          return -1;
        }
        if (aColumn > bColumn) {
          return 1;
        }
        return 0;
      });
      this.setState({
        sortedColumn: clickedColumn,
        products: sortedProducts,
        sortDirection: 'ascending',
      });
    } else {
      this.setState({
        products: products.reverse(),
        sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
      });
    }
  };

  renderTable = () => {
    const {sortedColumn, sortDirection} = this.state;
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount,
    );
    return this.props.products.length == 0 ? (
      <Segment>
        <Loader active={true} inline="centered" size="massive">
          Loading
        </Loader>
      </Segment>
    ) : (
      <Table sortable={true} basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{paddingLeft: 0}}
              sorted={sortedColumn === 'title' ? sortDirection : undefined}
              onClick={() => this.handleSort('title')}
            >
              Product Info
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{minWidth: 120}}
              sorted={sortedColumn === 'profit' ? sortDirection : undefined}
              onClick={() => this.handleSort('profit')}
            >
              Profit
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{minWidth: 120}}
              sorted={sortedColumn === 'margin' ? sortDirection : undefined}
              onClick={() => this.handleSort('margin')}
            >
              Margin
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{minWidth: 120}}
              sorted={sortedColumn === 'sales_monthly' ? sortDirection : undefined}
              onClick={() => this.handleSort('sales_monthly')}
            >
              Sales/mo
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{minWidth: 120}}
              sorted={sortedColumn === 'profit_monthly' ? sortDirection : undefined}
              onClick={() => this.handleSort('profit_monthly')}
            >
              Profit/Mo
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Add to Tracker</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{minWidth: 120}}
              sorted={sortedColumn === 'last_syn' ? sortDirection : undefined}
              onClick={() => this.handleSort('last_syn')}
            >
              Last Syn
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={1}/>
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
                  <Table.Cell style={{width: 600}}>
                    <Grid>
                      <Grid.Column style={{marginRight: 60}} className={'middle aligned'}>
                        <Image
                          src={value.image_url == null ? '/images/intro.png' : value.image_url}
                          size="tiny"
                        />
                      </Grid.Column>
                      <Grid.Column width={10} className={'middle aligned'}>
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
                          <Grid.Column style={{display: 'inline-flex'}}>
                            <Image
                              style={{marginRight: 10}}
                              src={'/images/intro.png'}
                              size="mini"
                            />
                            {value.amazon_category_name}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column style={{alignSelf: 'center'}}>
                        <Button
                          basic={true}
                          style={{borderRadius: 20}}
                          color="blue"
                          onClick={() => {
                            this.productDetailsWithVisualization(String(value.product_id));
                          }}
                        >
                          View
                        </Button>
                      </Grid.Column>
                    </Grid>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {Number(value.profit).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {Number(value.margin).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {Number(value.sales_monthly).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {Number(value.profit_monthly).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      basic={true}
                      style={{borderRadius: 20}}
                      color={value.tracking_status === 'active' ? 'teal' : 'blue'}
                      onClick={() => {
                        let productTrackGroupID = 2;
                        if (
                          this.props.productTrackGroup.length > 0 &&
                          this.props.productTrackGroup[0].id > 0
                        ) {
                          productTrackGroupID = this.props.productTrackGroup[0].id;
                          if (value.tracking_status != null) {
                            this.props.trackProductWithPatch(
                              String(value.product_track_id),
                              String(productTrackGroupID),
                              value.tracking_status === 'active' ? 'inactive' : 'active',
                              this.props.match.params.supplierID,
                            );
                          } else {
                            this.props.trackProductWithPost(
                              String(value.product_id),
                              String(productTrackGroupID),
                              'active',
                              this.props.match.params.supplierID,
                            );
                          }
                        }
                      }}
                    >
                      {value.tracking_status == 'active' ? 'Untrack' : 'Track Now'}
                    </Button>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <p style={{fontSize: 13}}>{new Date(value.last_syn).toLocaleString()}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Cell
                      as={Link}
                      to={'//' + value.amazon_url.split('//')[1]}
                      target={'_blank'}
                    >
                      <Icon name="amazon" style={{color: 'black'}}/>
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

    for (let i = 0; i < this.props.product_detail_chart_values_rank.length; i++) {
      popup_rank_conainer.push(Number(this.props.product_detail_chart_values_rank[i].rank));
    }
    for (let i = 0; i < this.props.product_detail_chart_values_price.length; i++) {
      popup_price_conainer.push(Number(this.props.product_detail_chart_values_price[i].price));
    }

    return (
      <Modal
        size={'large'}
        open={this.state.productDetailModalOpen}
        onClose={() => {
          this.setState({productDetailModalOpen: false});
        }}
        closeIcon={true}
      >
        <Modal.Content>
          <Grid>
            <Grid.Column floated="left" width={13}>
              <Grid style={{height: 40}}>
                <Grid.Column>
                  <h3>{this.props.product_detail.title}</h3>
                </Grid.Column>
                {/*<Grid.Column floated="right" width={2}>{'short Details'}</Grid.Column>*/}
              </Grid>
              <Divider/>
              <Grid style={{margin: 0}}>
                <Grid.Column style={{margin: 0}} floated="left" width={4}>
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
            <Grid.Column floated="right" width={3} style={{paddingLeft: 30}}>
              <div style={{position: 'relative'}}>
                <Image
                  src={
                    new URL(
                      this.props.product_detail.image_url != null
                        ? this.props.product_detail.image_url
                        : 'http://localhost:3000/images/intro.png',
                    )
                  }
                  size="tiny"
                  style={{display: 'inline-block'}}
                />
                <a
                  style={{position: 'absolute', right: 20, top: '38%'}}
                  href={this.props.product_detail.amazon_url}
                  target={'_blank'}
                >
                  <Icon name="amazon" style={{color: 'black'}}/>
                </a>
              </div>
              <p style={{marginTop: 10}}>ASIN: {this.props.product_detail.asin}</p>
              <p>UPC: {this.props.product_detail.upc}</p>
              {/*<p>{'MSKU'}</p>*/}
              {/*<p>{'FNSKU'}</p>*/}
            </Grid.Column>
          </Grid>
          {popup_price_conainer.length == 0 && popup_rank_conainer.length == 0 ? (
            <Loader active={true} inline="centered" className="popup-loader" size="massive">
              Loading
            </Loader>
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              allowChartUpdate={true}
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
                  min: 0,
                  title: {
                    text: '',
                  },
                  labels: {
                    style: {
                      color: '#ccc',
                    },
                  },
                },
                tooltip: {
                  formatter() {
                    return (this.series.name == 'Price' ? '$' : '') + numberWithCommas(this.y);
                  },
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
        trigger={<Icon name="trash alternate" style={{color: 'black'}}/>}
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
            <Grid.Column width={16} style={{marginTop: 15}}>
              {/* <Grid.Row style={{ display: 'inline-flex' }}> */}

              {/* </Grid.Row> */}
              {/* <Grid.Row style={{ marginTop: 20 }}> */}
              <Card
                raised={true}
                style={{
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
                              <Grid.Row style={{alignItems: 'center'}}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{padding: 0, paddingLeft: 10, marginRight: 10}}
                                >
                                  <div className="min-max">{this.state.unitProfitFilter.min}</div>
                                </Grid.Column>
                                <Grid.Column style={{padding: 0, paddingRight: 10}} width={7}>
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
                                  style={{padding: 0, marginLeft: 10, paddingRight: 10}}
                                >
                                  <div className="min-max">{this.state.unitProfitFilter.max}</div>
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
                              <Grid.Row style={{alignItems: 'center'}}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{padding: 0, paddingLeft: 10, marginRight: 10}}
                                >
                                  <div className="min-max">{this.state.marginFilter.min}</div>
                                </Grid.Column>
                                <Grid.Column style={{padding: 0, paddingRight: 10}} width={7}>
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
                                  style={{padding: 0, marginLeft: 10, paddingRight: 10}}
                                >
                                  <div className="min-max">{this.state.marginFilter.max}</div>
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
                              <Grid.Row style={{alignItems: 'center'}}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{padding: 0, paddingLeft: 10, marginRight: 10}}
                                >
                                  <div className="min-max">
                                    {this.state.unitsPerMonthFilter.min}
                                  </div>
                                </Grid.Column>
                                <Grid.Column style={{padding: 0, paddingRight: 10}} width={7}>
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
                                  style={{padding: 0, marginLeft: 10, paddingRight: 10}}
                                >
                                  <div className="min-max">
                                    {this.state.unitsPerMonthFilter.max}
                                  </div>
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
                              <Grid.Row style={{alignItems: 'center'}}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{padding: 0, paddingLeft: 10, marginRight: 10}}
                                >
                                  <div className="min-max">
                                    {this.state.profitPerMonthFilter.min}
                                  </div>
                                </Grid.Column>
                                <Grid.Column style={{padding: 0, paddingRight: 10}} width={7}>
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
                                  style={{padding: 0, marginLeft: 10, paddingRight: 10}}
                                >
                                  <div className="min-max">
                                    {this.state.profitPerMonthFilter.max}
                                  </div>
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
    const totalPages = Math.ceil(newProducts.length / this.state.singlePageItemsCount);
    this.setState({
      totalPages,
      currentPage: totalPages < this.state.currentPage ? 1 : this.state.currentPage,
      products: newProducts,
    });
    return;
  };

  renderHeaderSupplierMatrics = () => {
    const avg_price = [];
    const avg_rank = [];
    for (let i = 0; i < this.props.chart_values_price.length; i++) {
      avg_price.push([
        new Date(this.props.chart_values_price[i].cdate).getTime(),
        Number(this.props.chart_values_price[i].avg_price),
      ]);
    }
    for (let i = 0; i < this.props.chart_values_rank.length; i++) {
      avg_rank.push([
        new Date(this.props.chart_values_rank[i].cdate).getTime(),
        Number(this.props.chart_values_rank[i].avg_rank),
      ]);
    }
    return (
      <Grid.Column width={4} floated="left">
        <Grid.Row>
          <Card
            raised={true}
            style={{
              width: this.state.isSideBarExpanded ? '98%' : '93%',
              transition: 'width 0.4s',
            }}
          >
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
                      {avg_price != undefined && avg_price.length == 0 && avg_rank.length == 0 ? (
                        <Loader
                          active={true}
                          inline="centered"
                          className="popup-loader"
                          size="massive"
                        >
                          Loading
                        </Loader>
                      ) : avg_price[1][1] !== -1000000 ? (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={{
                            chart: {zoomType: 'x'},
                            title: {
                              text: 'Statistics',
                              align: 'left',
                            },
                            xAxis: {
                              type: 'datetime',
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
                              min: 0,
                              title: {
                                text: '',
                              },
                              labels: {
                                style: {
                                  color: '#ccc',
                                },
                              },
                            },
                            tooltip: {
                              formatter() {
                                return (
                                  (this.series.name == 'Avg Price' ? '$' : '') +
                                  numberWithCommas(this.y)
                                );
                              },
                            },
                            legend: {
                              align: 'left',
                              itemStyle: {
                                color: '#ccc',
                              },
                            },
                            series: [
                              {
                                type: 'area',
                                name: 'Avg Price',
                                color: '#c0f1ff',
                                data: avg_price,
                              },
                              {
                                type: 'area',
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
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'SYN'}
      >
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
          {this.renderMiddleRows()}
          <Divider style={{paddingBottom: 0, marginBottom: 0}}/>
          {this.renderTable()}
          {this.productDetailViewModal()}
        </Segment>
      </AdminLayout>
    );
  }

  renderMiddleRows = () => {
    const progress =
      this.props.synthesisFileProgressUpdates.progress != undefined
        ? this.props.synthesisFileProgressUpdates.progress
        : '0';
    const totalProducts = this.props.products.length;
    const totalPages = this.state.totalPages;
    const singlePageItemsCount = this.state.singlePageItemsCount;
    const currentPage = this.state.currentPage;
    const maxCount = (currentPage * singlePageItemsCount > totalProducts) ? totalProducts : currentPage * singlePageItemsCount;
    const minCount = (((currentPage - 1) * singlePageItemsCount) + 1);
    console.log(totalPages);
    console.log(currentPage * singlePageItemsCount);
    console.log(((currentPage - 1) * singlePageItemsCount) + 1);

    return (
      <Grid>
        <Grid.Column width={4} textAlign="center">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div>{`${minCount}-${maxCount} of ${totalProducts} items`}</div>
            <Dropdown
              text={String(this.state.singlePageItemsCount)}
              style={{width: '40%', alignSelf: 'center', margin: 'auto'}}
              fluid={true}
              selection={true}
              options={[
                {
                  key: '10',
                  text: '10',
                  value: '10',
                },
                {
                  key: '30',
                  text: '30',
                  value: '30',
                },
                {
                  key: '50',
                  text: '50',
                  value: '50',
                },
                {
                  key: '100',
                  text: '100',
                  value: '100',
                },
              ]}
              onChange={(e, data) => {
                const singlePageItemCounts = Number(data.value);
                const totalPages = Math.ceil(this.props.products.length / singlePageItemCounts);
                this.setState({
                  singlePageItemsCount: singlePageItemCounts,
                  totalPages,
                  currentPage: totalPages < this.state.currentPage ? 1 : this.state.currentPage,
                });
              }}
            />
            <div>{'Items per Page'}</div>
          </div>
        </Grid.Column>
        <Grid.Column width={8} textAlign="center">
          <Progress
            style={{width: '80%', alignSelf: 'center', margin: 'auto'}}
            indicating={true}
            percent={progress}
            autoSuccess={true}
          />
          {'Progress: ' + progress + '%'}
        </Grid.Column>
        <Grid.Column
          width={4}
          floated="right"
          style={{
            padding: 0,
          }}
        >
          <div
            className="ui"
            style={{
              display: 'inline-flex',
            }}
          >
            <span style={{padding: '0 8px'}}>
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
            <span style={{padding: '0 8px'}}>
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
    );
  };

  show(size: string) {
    // this.setState({ size: size, open: true })
  }

  close = () => {
    // this.setState({ open: false })
  };
}

const mapStateToProps = (state: any) => {
  return {
    synthesisFileID: state.synReducer.get('synthesisFileID'),
    synthesisFileProgressUpdates: state.synReducer.get('synthesisFileProgressUpdates'),
    time_efficiency_data: state.synReducer.get('time_efficiency_data'),
    products: state.synReducer.get('products'),
    suppliers: state.synReducer.get('suppliers'),
    products_track_data: state.synReducer.get('products_track_data'),
    chart_values_price: state.synReducer.get('chart_values_price'),
    chart_values_rank: state.synReducer.get('chart_values_rank'),
    product_detail: state.synReducer.get('product_detail'),
    productTrackGroup: state.synReducer.get('productTrackGroup'),
    product_detail_chart_values_rank: state.synReducer.get('product_detail_chart_values_rank'),
    product_detail_chart_values_price: state.synReducer.get('product_detail_chart_values_price'),
    sellerData: state.settings.get('profile'),
    isSideBarExpanded: state.settings.get('isSideBarExpanded'),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSellers: () => dispatch(getSellers()),
    resetProductData: (data: {}) => dispatch(resetProductData(data)),
    getLastFileID: (supplierID: string) => dispatch(getLastFileID(supplierID)),
    getProducts: (supplierID: string) => dispatch(getProducts(supplierID)),
    getProductTrackData: (supplierID: string) => dispatch(getProductTrackData(supplierID)),
    getProductTrackGroupId: (supplierID: string) => dispatch(getProductTrackGroupId(supplierID)),
    getProductDetail: (product_id: string, supplierID: string) =>
      dispatch(getProductDetail(product_id, supplierID)),
    getProductDetailChartRank: (product_id: string) =>
      dispatch(getProductDetailChartRank(product_id)),
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

    getSynthesisProgressUpdates: (synthesisFileID: string) =>
      dispatch(getSynthesisProgressUpdates(synthesisFileID)),
    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupplierDetail);
