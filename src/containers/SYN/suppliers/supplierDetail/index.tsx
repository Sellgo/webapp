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
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import './supplierDetail.css';
import { Link } from 'react-router-dom';
import 'react-rangeslider/lib/index.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import '../suppliers.css';

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
  getProductDetailChartKpi,
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
  ProductChartDetailsKpi,
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
  showChart: any;
  showProductChart: any;
}

interface Props {
  getProducts(supplierID: string): () => void;

  getSellers(): () => void;

  trackProductWithPatch(
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string
  ): () => void;

  trackProductWithPost(
    productID: string,
    productTrackGroupID: string,
    status: string,
    supplierID: string
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

  getProductDetailChartKpi(supplierID: string): () => void;

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
  product_detail_chart_values_kpi: ProductChartDetailsKpi[];
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
let SupplierDetailState: SupplierDetail;

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
    showChart: 'chart0',
    showProductChart: 'chart0',
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
    SupplierDetailState = this;
    const data = {
      key: 'userID',
      value: localStorage.getItem('userId'),
    };
    this.props.resetProductData({});
    this.props.getProductTrackGroupId(this.props.match.params.supplierID);
    this.props.getLastFileID(this.props.match.params.supplierID);
    this.props.getProducts(this.props.match.params.supplierID);
    this.props.getProductTrackData(this.props.match.params.supplierID);
    //this.props.getProductsChartHistoryPrice(this.props.match.params.supplierID);
    //this.props.getProductsChartHistoryRank(this.props.match.params.supplierID);
    if (this.props.time_efficiency_data.length === 0) {
      this.props.getTimeEfficiency();
    }
    if (this.props.suppliers.length == 0) {
      this.props.getSellers();
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (this.state.isSideBarExpanded !== nextProps.isSideBarExpanded) {
      this.setState({
        isSideBarExpanded: nextProps.isSideBarExpanded,
      });
    }
    if (this.props.products !== nextProps.products) {
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
        unitProfitFilter: { min: minUnitProfit, max: maxUnitProfit },
        profitPerMonthFilter: { min: minProfitPerMonth, max: maxProfitPerMonth },
        unitsPerMonthFilter: { min: minUnitsPerMonth, max: maxUnitsPerMonth },
        marginFilter: { min: minMargin, max: maxMargin },
      });
    }
  }

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  productDetailsWithVisualization = (product_id: string) => {
    this.props.getProductDetail(product_id, this.props.match.params.supplierID);
    this.props.getProductDetailChartRank(product_id);
    this.props.getProductDetailChartPrice(product_id);
    this.props.getProductDetailChartKpi(product_id);
    this.setState({ productDetailModalOpen: true });
  };

  handleSort = (clickedColumn: keyof Product) => {
    const { sortedColumn, sortDirection } = this.state;
    const products = JSON.parse(JSON.stringify(this.state.products));
    if (sortedColumn !== clickedColumn) {
      const sortedProducts = products.sort((a: Product, b: Product) => {
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
    const { sortedColumn, sortDirection } = this.state;
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount
    );
    return this.state.products.length === 0 ? (
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
              style={{ paddingLeft: 0 }}
              sorted={sortedColumn === 'title' ? sortDirection : undefined}
              onClick={() => this.handleSort('title')}
            >
              Product Info
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ minWidth: 120 }}
              sorted={sortedColumn === 'profit' ? sortDirection : undefined}
              onClick={() => this.handleSort('profit')}
            >
              Profit
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ minWidth: 120 }}
              sorted={sortedColumn === 'margin' ? sortDirection : undefined}
              onClick={() => this.handleSort('margin')}
            >
              Margin
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ minWidth: 120 }}
              sorted={sortedColumn === 'sales_monthly' ? sortDirection : undefined}
              onClick={() => this.handleSort('sales_monthly')}
            >
              Sales/mo
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ minWidth: 120 }}
              sorted={sortedColumn === 'profit_monthly' ? sortDirection : undefined}
              onClick={() => this.handleSort('profit_monthly')}
            >
              Profit/Mo
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Add to Tracker</Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              style={{ minWidth: 120 }}
              sorted={sortedColumn === 'last_syn' ? sortDirection : undefined}
              onClick={() => this.handleSort('last_syn')}
            >
              Last Syn
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={1} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.products[0].id == -10000000 ? (
            <Table.Row key={134}>
              <Table.Cell>
                <h1>Data not found</h1>
              </Table.Cell>
            </Table.Row>
          ) : (
            productsTable.map((value, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell style={{ width: 600 }}>
                    <Grid>
                      <Grid.Column style={{ marginRight: 60 }} className={'middle aligned'}>
                        <Image
                          style={{ width: 'auto', height: 'auto', maxHeight: 80, maxWidth: 80 }}
                          src={value.image_url == null ? '/images/intro.png' : value.image_url}
                          // size="tiny"
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
                          <Grid.Column style={{ display: 'inline-flex' }}>
                            <Image
                              style={{ marginRight: 10 }}
                              src={'/images/intro.png'}
                              size="mini"
                            />
                            {value.amazon_category_name}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column style={{ alignSelf: 'center' }}>
                        <Button
                          basic={true}
                          style={{
                            borderRadius: 100,
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 15,
                            paddingRight: 15,
                          }}
                          color="blue"
                          onClick={() => {
                            this.productDetailsWithVisualization(String(value.product_id));
                          }}
                        >
                          <h2 style={{ fontSize: 17 }}>View</h2>
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
                      style={{
                        borderRadius: 20,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
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
                              this.props.match.params.supplierID
                            );
                          } else {
                            this.props.trackProductWithPost(
                              String(value.product_id),
                              String(productTrackGroupID),
                              'active',
                              this.props.match.params.supplierID
                            );
                          }
                        }
                      }}
                    >
                      <h2 style={{ fontSize: 17 }}>
                        {value.tracking_status == 'active' ? 'Untrack' : 'Track Now'}
                      </h2>
                    </Button>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <p style={{ fontSize: 13 }}>{new Date(value.last_syn).toLocaleString()}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Cell
                      as={Link}
                      to={'//' + value.amazon_url.split('//')[1]}
                      target={'_blank'}
                    >
                      <Icon name="amazon" size={'large'} style={{ color: 'black' }} />
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
    const { showProductChart } = this.state;

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
            <Grid.Column floated="left" width={13}>
              <Grid style={{ height: 40 }}>
                <Grid.Column>
                  <h3>{this.props.product_detail.title}</h3>
                </Grid.Column>
                {/*<Grid.Column floated="right" width={2}>{'short Details'}</Grid.Column>*/}
              </Grid>
              <Divider />
              <Grid style={{ margin: 0 }}>
                <Grid.Column style={{ margin: 0 }} floated="left" width={4}>
                  <Grid.Row>Price</Grid.Row>
                  <Grid.Row>Fees</Grid.Row>
                  <Grid.Row>Product cost</Grid.Row>
                  <Grid.Row>Inbound shipping cost</Grid.Row>
                  <Grid.Row>Outbound shipping cost</Grid.Row>
                  <Grid.Row>
                    <h4>Profit (in $)</h4>
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
                        : Number(this.props.product_detail.margin).toLocaleString() + ' %'}
                    </h4>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column floated="left" width={4}>
                  <Grid.Row>Avg monthly sales</Grid.Row>
                  <Grid.Row>Avg monthly revenue</Grid.Row>
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
                        : Number(this.props.product_detail.roi).toLocaleString() + ' %'}
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
            <Grid.Column floated="right" width={3} style={{ paddingLeft: 30 }}>
              <div style={{ position: 'relative' }}>
                <Image
                  src={
                    new URL(
                      this.props.product_detail.image_url != null
                        ? this.props.product_detail.image_url
                        : 'http://localhost:3000/images/intro.png'
                    )
                  }
                  size="tiny"
                  style={{ display: 'inline-block' }}
                />
                <a
                  style={{ position: 'absolute', right: 20, top: '38%' }}
                  href={this.props.product_detail.amazon_url}
                  target={'_blank'}
                >
                  <Icon name="amazon" size={'large'} style={{ color: 'black' }} />
                </a>
              </div>
              <p style={{ marginTop: 10 }}>ASIN: {this.props.product_detail.asin}</p>
              <p>UPC: {this.props.product_detail.upc}</p>
              {/*<p>{'MSKU'}</p>*/}
              {/*<p>{'FNSKU'}</p>*/}
            </Grid.Column>
          </Grid>
          {this.props.product_detail_chart_values_rank.length &&
          this.props.product_detail_chart_values_price.length ? (
            <React.Fragment>
              <br />
              <this.renderProductCharts />
              <br />
              <Form>
                <Form.Group inline={true}>
                  <label />
                  <Form.Radio
                    label="Statistics"
                    value="chart0"
                    checked={showProductChart === 'chart0'}
                    onChange={(e, { value }) => this.handleProductChartChange(e, value)}
                  />
                  <Form.Radio
                    label="Profit vs ROI"
                    value="chart1"
                    checked={showProductChart === 'chart1'}
                    onChange={(e, { value }) => this.handleProductChartChange(e, value)}
                  />
                </Form.Group>
              </Form>
            </React.Fragment>
          ) : null}
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

  renderProductStatistics = (props: any) => {
    const popup_price_conainer = props.popup_price_conainer;
    const popup_rank_conainer = props.popup_rank_conainer;
    return (
      <HighchartsReact
        highcharts={Highcharts}
        allowChartUpdate={true}
        options={{
          chart: { zoomType: 'x' },
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
            shared: true,
          },

          legend: {
            align: 'left',
          },
          series: [
            {
              type: 'line',
              name: 'Price($)',
              color: '#CAE1F3',
              data: popup_price_conainer,
            },
            {
              type: 'line',
              name: 'Rank',
              color: '#F3E9CA',
              data: popup_rank_conainer,
            },
          ],
        }}
        {...this.props}
      />
    );
  };

  renderROI = (props: any) => {
    const product_timeline = props.product_timeline;
    const product_profit = props.product_profit;
    const product_roi = props.product_roi;
    return (
      <HighchartsReact // CEM 69
        highcharts={Highcharts}
        options={{
          chart: {
            zoomType: 'xy',
          },
          title: {
            text: 'Profit vs ROI',
          },
          xAxis: [
            {
              type: 'datetime',
              categories: product_timeline,
              crosshair: true,
            },
          ],
          yAxis: [
            {
              // Primary yAxis
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              lineWidth: 2,
              title: {
                text: 'Total Profit($)',
                align: 'high',
                style: {
                  color: 'black',
                },
              },
            },
            {
              // Secondary yAxis
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              lineWidth: 2,
              title: {
                text: 'ROI(%)',
                align: 'high',
                style: {
                  color: 'black',
                },
              },
              labels: {
                format: '{value}',
                style: {
                  color: 'black',
                },
              },
              opposite: true,
            },
          ],
          tooltip: {
            shared: true,
          },
          legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: 'rgba(255,255,255,0.25)',
          },
          series: [
            {
              name: 'Total Profit($)',
              type: 'spline',
              yAxis: 1,
              data: product_profit,
            },
            {
              name: 'ROI(%)',
              type: 'spline',
              data: product_roi,
            },
          ],
        }}
        {...this.props}
      />
    );
  };

  handleProductChartChange = (e: any, showProductChart: any) => this.setState({ showProductChart });

  renderProductCharts = () => {
    switch (this.state.showProductChart) {
      case 'chart0':
        const popup_rank_conainer = [];
        const popup_price_conainer = [];

        for (let i = 0; i < this.props.product_detail_chart_values_rank.length; i++) {
          popup_rank_conainer.push([
            new Date(this.props.product_detail_chart_values_rank[i].cdate).getTime(),
            Number(this.props.product_detail_chart_values_rank[i].rank),
          ]);
        }
        for (let i = 0; i < this.props.product_detail_chart_values_price.length; i++) {
          popup_price_conainer.push([
            new Date(this.props.product_detail_chart_values_price[i].cdate).getTime(),
            Number(this.props.product_detail_chart_values_price[i].price),
          ]);
        }
        return popup_price_conainer.length == 0 && popup_rank_conainer.length == 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : (
          <this.renderProductStatistics
            popup_price_conainer={popup_price_conainer}
            popup_rank_conainer={popup_rank_conainer}
          />
        );

      case 'chart1':
        const product_timeline = [];
        const product_profit = [];
        const product_roi = [];

        for (let i = 0; i < this.props.product_detail_chart_values_kpi.length; i++) {
          product_timeline.push(
            new Date(this.props.product_detail_chart_values_kpi[i].cdate).toDateString()
          );
          product_profit.push(parseFloat(this.props.product_detail_chart_values_kpi[i].profit));
          product_roi.push(parseFloat(this.props.product_detail_chart_values_kpi[i].roi));
        }
        return product_timeline.length && product_profit.length && product_roi.length ? (
          <this.renderROI
            product_timeline={product_timeline}
            product_profit={product_profit}
            product_roi={product_roi}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      default:
        return null;
    }
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
                if (
                  marginFilterUpdatedValue.max > this.state.maxMargin ||
                  marginFilterUpdatedValue.max < this.state.minMargin
                ) {
                  marginFilterUpdatedValue.max = this.state.maxMargin;
                }
                if (
                  marginFilterUpdatedValue.min < this.state.minMargin ||
                  marginFilterUpdatedValue.min > this.state.maxMargin
                ) {
                  marginFilterUpdatedValue.min = this.state.minMargin;
                }
                const profitPerMonthFilterUpdatedValue = data.profitPerMonthFilter;
                if (
                  profitPerMonthFilterUpdatedValue.max > this.state.maxProfitPerMonth ||
                  profitPerMonthFilterUpdatedValue.max < this.state.minProfitPerMonth
                ) {
                  profitPerMonthFilterUpdatedValue.max = this.state.maxProfitPerMonth;
                }
                if (
                  profitPerMonthFilterUpdatedValue.min < this.state.minProfitPerMonth ||
                  profitPerMonthFilterUpdatedValue.min > this.state.maxProfitPerMonth
                ) {
                  profitPerMonthFilterUpdatedValue.min = this.state.minProfitPerMonth;
                }
                const unitProfitFilterUpdatedValue = data.unitProfitFilter;
                if (
                  unitProfitFilterUpdatedValue.max > this.state.maxUnitProfit ||
                  unitProfitFilterUpdatedValue.max < this.state.minUnitProfit
                ) {
                  unitProfitFilterUpdatedValue.max = this.state.maxUnitProfit;
                }
                if (
                  unitProfitFilterUpdatedValue.min < this.state.minUnitProfit ||
                  unitProfitFilterUpdatedValue.min > this.state.maxUnitProfit
                ) {
                  unitProfitFilterUpdatedValue.min = this.state.minUnitProfit;
                }
                const unitsPerMonthFilterUpdatedValue = data.unitsPerMonthFilter;
                if (
                  unitsPerMonthFilterUpdatedValue.max > this.state.maxUnitsPerMonth ||
                  unitsPerMonthFilterUpdatedValue.max < this.state.minUnitsPerMonth
                ) {
                  unitsPerMonthFilterUpdatedValue.max = this.state.maxUnitsPerMonth;
                }
                if (
                  unitsPerMonthFilterUpdatedValue.min < this.state.minUnitsPerMonth ||
                  unitsPerMonthFilterUpdatedValue.min > this.state.maxUnitsPerMonth
                ) {
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
                  }
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
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.unitProfitFilter.min}</div>
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
                            Margin (%) <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">{this.state.marginFilter.min}</div>
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
                            Units per Month <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">
                                    {this.state.unitsPerMonthFilter.min}
                                  </div>
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
                            Profit per Month <Icon title="Sellgo" name="question circle outline" />
                          </Feed.Summary>
                          <Feed.Summary className="min-max-slider-wrapper">
                            <Grid>
                              <Grid.Row style={{ alignItems: 'center' }}>
                                <Grid.Column
                                  floated="left"
                                  width={4}
                                  style={{ padding: 0, paddingLeft: 10, marginRight: 10 }}
                                >
                                  <div className="min-max">
                                    {this.state.profitPerMonthFilter.min}
                                  </div>
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

  renderStatistics = (props: any) => (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: { zoomType: 'x' },
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
          shared: true,
        },
        legend: {
          align: 'left',
        },
        series: [
          {
            type: 'line',
            name: 'Avg Price($)',
            color: '#CAE1F3',
            data: props.avg_price,
          },
          {
            type: 'line',
            name: 'Avg Rank',
            color: '#F3E9CA',
            data: props.avg_rank,
          },
        ],
      }}
      {...this.props}
    />
  );

  renderProfit = (props: any) => {
    const profit_monthly = props.profit_monthly;
    const sales_monthly = props.sales_monthly;
    const monthly_data = props.monthly_data;

    return (
      <HighchartsReact // CEM 67
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'scatter',
            zoomType: 'xy',
          },
          xAxis: {
            title: {
              text: 'Unit sold/mo',
            },
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Profit($)',
            },
          },
          title: {
            text: 'Profit vs Unit Sold/mo',
          },
          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                states: {
                  hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)',
                  },
                },
              },
              states: {
                hover: {
                  marker: {
                    enabled: false,
                  },
                },
              },
            },
          },
          tooltip: {
            headerFormat: '<br/>',
            pointFormat: '{point.name}<br/>Units sold: {point.x} u/mo<br/> Profit($): {point.y}',
          },
          series: [
            {
              type: 'scatter',
              regression: true,
              regressionSettings: {
                type: 'linear',
                color: 'red',
              },
              color: '#CAE1F3',
              negativeColor: '#F3D2CA',
              name: 'SKUs',
              data: monthly_data,
            },
          ],
        }}
        {...this.props}
      />
    );
  };

  renderHit = (props: any) => {
    const supplier = props.supplier;
    const rate = parseFloat(supplier.rate);
    const p2l_ratio = supplier.p2l_ratio - parseFloat(supplier.rate);
    const miss = 100 - supplier.p2l_ratio;
    return (
      <HighchartsReact // CEM 68
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'pie',
          },
          title: {
            text: 'Hit/Miss vs Profitable SKUs',
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              },
            },
          },
          series: [
            {
              type: 'pie',
              name: 'SKUs',
              colorByPoint: true,
              data: [
                {
                  name: 'Profitable SKUs',
                  y: rate,
                  sliced: true,
                  selected: true,
                  color: '#FBC4C4',
                },
                {
                  name: 'Hit Non-Profitable SKUs',
                  y: p2l_ratio,
                  color: '#CAE1F3',
                },
                {
                  name: 'Miss',
                  y: miss,
                  color: '#ECEBEB',
                },
              ],
            },
          ],
        }}
        {...this.props}
      />
    );
  };

  renderRevenue = (props: any) => {
    const productSKUs = props.productSKUs;
    const product_cost = props.product_cost;
    const fees = props.fees;
    const profit = props.profit;

    return (
      <HighchartsReact // CEM 70
        highcharts={Highcharts}
        options={{
          chart: { type: 'column', zoomType: 'x' },
          title: {
            text: 'Revenue Breakdown Comparison',
            align: 'center',
          },
          xAxis: {
            categories: productSKUs,
            // max:10,
            visible: false,
          },
          yAxis: {
            min: 0,
            /* gridLineWidth: 0,
             minorGridLineWidth: 0, */
            title: {
              text: 'Revenue ($)',
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: 'grey',
              },
            },
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total($): {point.stackTotal}',
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false,
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
              },
            },
          },
          series: [
            { type: 'column', color: '#CAE1F3', name: 'Profit($)', data: profit },
            { type: 'column', color: '#F3D2CA', name: 'Amz fee($)', data: fees },
            { type: 'column', color: '#F3E9CA', name: 'COGS($)', data: product_cost },
          ],
        }}
        {...this.props}
      />
    );
  };

  renderPOFP = (props: any) => {
    const productSKUs = props.productSKUs;
    const roi = props.roi;
    const profit = props.profit;

    return (
      <HighchartsReact // CEM 70
        highcharts={Highcharts}
        options={{
          chart: { type: 'column', zoomType: 'x' },
          title: {
            text: 'Point of First Profit (POFP)',
            align: 'center',
          },
          xAxis: {
            categories: productSKUs,
            // max:10,
            visible: false,
          },
          yAxis: {
            // min: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            title: {
              text: 'Profit($)',
            },
            stackLabels: {
              enabled: true,
              format: '<b>ROI %</b>',
              style: {
                fontWeight: 'bold',
                color: 'grey',
              },
            },
          },
          tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: 'ROI(%): {point.name} <br/> {series.name}: {point.y}',
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false,
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
              },
            },
          },
          series: [
            {
              type: 'column',
              color: '#CAE1F3',
              negativeColor: '#F3D2CA',
              name: 'Profit($)',
              data: roi,
            },
          ],
        }}
        {...this.props}
      />
    );
  };

  handleSwitchChart = (e: any, showChart: any) => this.setState({ showChart });

  renderCharts = () => {
    const currentPage = this.state.currentPage - 1;
    const productsTable: Product[] = this.state.products.slice(
      currentPage * this.state.singlePageItemsCount,
      (currentPage + 1) * this.state.singlePageItemsCount
    );

    const products = productsTable.sort(
      (a, b) => parseFloat(b['profit']) - parseFloat(a['profit'])
    );
    let productSKUs = [];
    let profit = [];
    profit = products.map(e => parseFloat(e['profit']));
    productSKUs = products.map(e => e['title']);
    switch (this.state.showChart) {
      case 'chart-1':
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

        return avg_price != undefined && avg_price.length == 0 && avg_rank.length == 0 ? (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        ) : avg_price.length != 0 && avg_price[0][1] !== -1000000 ? (
          <this.renderStatistics avg_price={avg_price} avg_rank={avg_rank} />
        ) : null;

      case 'chart0':
        const supplierID = this.props.match.params.supplierID;
        const supplier = this.props.suppliers.filter(
          supplier => supplier.id === parseInt(supplierID)
        )[0];
        if (!supplier) {
          this.props.getSellers();
        }
        return supplier && supplier.rate ? <this.renderHit supplier={supplier} /> : null;

      case 'chart1':
        let monthly_data = [];
        let profit_monthly = [];
        let sales_monthly = [];
        monthly_data = products.map(e => {
          return {
            name: e['title'],
            x: parseFloat(e['sales_monthly']),
            y: parseFloat(e['profit_monthly']),
          };
        });
        profit_monthly = products.map(e => parseFloat(e['profit_monthly']));
        sales_monthly = products.map(e => parseFloat(e['sales_monthly']));

        return productSKUs.length &&
          profit.length &&
          profit_monthly.length &&
          sales_monthly.length ? (
          <this.renderProfit
            productSKUs={productSKUs}
            profit_monthly={profit_monthly}
            sales_monthly={sales_monthly}
            monthly_data={monthly_data}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      case 'chart3':
        let product_cost = [];
        let fees = [];
        product_cost = products.map(e => parseFloat(e['product_cost']));
        fees = products.map(e => parseFloat(e['fees']));

        return productSKUs.length && profit.length && product_cost.length && fees.length ? (
          <this.renderRevenue
            productSKUs={productSKUs}
            product_cost={product_cost}
            fees={fees}
            profit={profit}
          />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      case 'chart4':
        let roi = [];
        roi = products.map(e => {
          return { name: parseFloat(e['roi']), y: parseFloat(e['profit']) };
        });
        return productSKUs.length && roi.length ? (
          <this.renderPOFP productSKUs={productSKUs} roi={roi} profit={profit} />
        ) : (
          <Loader active={true} inline="centered" className="popup-loader" size="massive">
            Loading
          </Loader>
        );
      default:
        return null;
    }
  };

  renderHeaderSupplierMatrics = () => {
    const { showChart } = this.state;
    return (
      <Grid.Column width={4} floated="left">
        <Grid.Row>
          <Card
            raised={true}
            style={{
              width: this.state.isSideBarExpanded ? '100%' : '95%',
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
                          <Feed.Date content="Avg Daily Units Sold" />
                          <Feed.Summary>
                            {this.props.products_track_data.daily_sales == null
                              ? ''
                              : Number(this.props.products_track_data.daily_sales).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg BB Price/ Fees" />
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
                          <Feed.Date content="Avg Daily Revenue/ Profit" />
                          <Feed.Summary>
                            {this.props.products_track_data.profit == null
                              ? ''
                              : Number(this.props.products_track_data.profit).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg ROI/ ROII" />
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
                          <Feed.Date content="Avg Daily Rank" />
                          <Feed.Summary>
                            {this.props.products_track_data.daily_rank == null
                              ? ''
                              : Number(this.props.products_track_data.daily_rank).toLocaleString()}
                          </Feed.Summary>
                          <Divider />
                          <Feed.Date content="Avg LQS" />
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
                      {this.props.products.length && this.props.suppliers.length ? (
                        <React.Fragment>
                          <br />
                          <this.renderCharts />
                          <br />
                          <Form>
                            <Form.Group inline={true}>
                              <label />
                              {/* <Form.Radio
                                label="Statistics"
                                value="chart-1"
                                checked={showChart === 'chart-1'}
                                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
                              /> */}
                              <Form.Radio
                                label="Hit/Miss vs Profitable SKUs"
                                value="chart0"
                                checked={showChart === 'chart0'}
                                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
                              />
                              <Form.Radio
                                label="Profit vs Unit Sold"
                                value="chart1"
                                checked={showChart === 'chart1'}
                                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
                              />
                              <Form.Radio
                                label="Revenue Breakdown"
                                value="chart3"
                                checked={showChart === 'chart3'}
                                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
                              />
                              <Form.Radio
                                label="Point of First Profit (POFP)"
                                value="chart4"
                                checked={showChart === 'chart4'}
                                onChange={(e, { value }) => this.handleSwitchChart(e, value)}
                              />
                            </Form.Group>
                          </Form>
                        </React.Fragment>
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
        title={'Synthesis'}
      >
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
          {this.renderMiddleRows()}
          <Divider style={{ paddingBottom: 0, marginBottom: 0 }} />
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
    const totalProducts = this.state.products.length;
    const totalPages = this.state.totalPages;
    const singlePageItemsCount = this.state.singlePageItemsCount;
    const currentPage = this.state.currentPage;
    const maxCount =
      currentPage * singlePageItemsCount > totalProducts
        ? totalProducts
        : currentPage * singlePageItemsCount;
    const minCount = (currentPage - 1) * singlePageItemsCount + 1;

    return (
      <Grid>
        <Grid.Column width={4} textAlign="center">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{`${minCount}-${maxCount} of ${totalProducts} items`}</div>
            <Dropdown
              text={String(this.state.singlePageItemsCount)}
              style={{ width: '40%', alignSelf: 'center', margin: 'auto' }}
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
            style={{ width: '80%', alignSelf: 'center', margin: 'auto' }}
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
    synthesisFileID: state.synReducer.synthesisFileID,
    synthesisFileProgressUpdates: state.synReducer.synthesisFileProgressUpdates,
    time_efficiency_data: state.synReducer.time_efficiency_data,
    products: state.synReducer.products,
    suppliers: state.synReducer.suppliers,
    products_track_data: state.synReducer.products_track_data,
    chart_values_price: state.synReducer.chart_values_price,
    chart_values_rank: state.synReducer.chart_values_rank,
    product_detail: state.synReducer.product_detail,
    productTrackGroup: state.synReducer.productTrackGroup,
    product_detail_chart_values_rank: state.synReducer.product_detail_chart_values_rank,
    product_detail_chart_values_price: state.synReducer.product_detail_chart_values_price,
    product_detail_chart_values_kpi: state.synReducer.product_detail_chart_values_kpi,
    sellerData: state.settings.profile,
    isSideBarExpanded: state.settings.isSideBarExpanded,
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
    getProductDetailChartKpi: (product_id: string) =>
      dispatch(getProductDetailChartKpi(product_id)),
    getProductsChartHistoryPrice: (supplierID: string) =>
      dispatch(getProductsChartHistoryPrice(supplierID)),
    getProductsChartHistoryRank: (supplierID: string) =>
      dispatch(getProductsChartHistoryRank(supplierID)),
    trackProductWithPatch: (
      productID: string,
      productTrackGroupID: string,
      status: string,
      supplierID: string
    ) => dispatch(trackProductWithPatch(productID, productTrackGroupID, status, supplierID)),
    trackProductWithPost: (
      productID: string,
      productTrackGroupID: string,
      status: string,
      supplierID: string
    ) => dispatch(trackProductWithPost(productID, productTrackGroupID, status, supplierID)),

    getSynthesisProgressUpdates: (synthesisFileID: string) =>
      dispatch(getSynthesisProgressUpdates(synthesisFileID)),
    getTimeEfficiency: () => dispatch(getTimeEfficiency()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDetail);
