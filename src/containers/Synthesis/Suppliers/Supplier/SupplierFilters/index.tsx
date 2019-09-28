import React, { Component } from 'react';
import { Card, Grid, Dropdown, Feed, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ProductFiltersPreset } from '../../../../../constants/constants';
import { Product } from '../../../../../interfaces/Product';
import InputRange from 'react-input-range';
import 'react-rangeslider/lib/index.css';
import 'react-input-range/lib/css/index.css';
import { supplierProductsSelector } from '../../../../../selectors/Supplier';
import './SupplierFilters.css';
import SliderRange from '../../../../../components/SliderRange';
import { updateFilterSupplierProducts } from '../../../../../actions/Suppliers';

interface SupplierFiltersProps {
  products: Product[];
  updateFilterProducts: (products: any) => void;
}
class SupplierFilters extends Component<SupplierFiltersProps> {
  state = {
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

  componentDidMount() {
    const { products } = this.props;
    let minUnitProfit = Number.MAX_SAFE_INTEGER;
    let maxUnitProfit = Number.MIN_SAFE_INTEGER;

    let minMargin = Number.MAX_SAFE_INTEGER;
    let maxMargin = Number.MIN_SAFE_INTEGER;
    let minUnitsPerMonth = Number.MAX_SAFE_INTEGER;
    let maxUnitsPerMonth = Number.MIN_SAFE_INTEGER;
    let minProfitPerMonth = Number.MAX_SAFE_INTEGER;
    let maxProfitPerMonth = Number.MIN_SAFE_INTEGER;
    for (const product of products) {
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

  updateFilters = () => {
    const { products } = this.props;
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
    return newProducts;
  };
  handleChange = (datKey: any, range: any) => {
    console.log(datKey, range);
    const { products, updateFilterProducts } = this.props;
    const filterProducts = products.filter(
      (p: any) => p[datKey] >= range.min && p[datKey] <= range.max
    );
    updateFilterProducts(filterProducts);
  };
  render() {
    const { products } = this.props;
    if (products.length === 1 && products[0] === undefined) return <div></div>;
    const minProfit = Math.min(...products.map((p: any) => Number(p.profit)));
    const maxProfit = Math.max(...products.map((p: any) => Number(p.profit)));

    const minMargin = Math.min(...products.map((p: any) => Number(p.margin)));
    const maxMargin = Math.max(...products.map((p: any) => Number(p.margin)));

    const minSalesMonthly = Math.min(...products.map((p: any) => Number(p.sales_monthly)));
    const maxSalesMonthly = Math.max(...products.map((p: any) => Number(p.sales_monthly)));

    const minProfitMonthly = Math.min(...products.map((p: any) => Number(p.profit_monthly)));
    const maxProfitMonthly = Math.max(...products.map((p: any) => Number(p.profit_monthly)));

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column floated="left" width={6}>
            Syn Preset
          </Grid.Column>
          <Grid.Column floated="right" width={10}>
            <Dropdown />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ marginTop: 15 }}>
            <Card
              raised={true}
              style={{
                width: '100%',
                padding: '10px',
              }}
            >
              <Card.Content>
                <SliderRange
                  title="Unit Profit"
                  datKey="profit"
                  range={{ min: minProfit, max: maxProfit }}
                  handleChange={this.handleChange}
                />
                <Divider />
                <SliderRange
                  title="Margin"
                  datKey="margin"
                  range={{ min: minMargin, max: maxMargin }}
                  handleChange={this.handleChange}
                />
                <Divider />
                <SliderRange
                  title="Units Per Month"
                  datKey="sales_monthly"
                  range={{ min: minSalesMonthly, max: maxSalesMonthly }}
                  handleChange={this.handleChange}
                />
                <Divider />
                <SliderRange
                  title="Profit Per Month"
                  datKey="profit_monthly"
                  range={{ min: minProfitMonthly, max: maxProfitMonthly }}
                  handleChange={this.handleChange}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    return (
      <div>
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
                              Profit per Month{' '}
                              <Icon title="Sellgo" name="question circle outline" />
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
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: supplierProductsSelector(state),
});

const mapDispatchToProps = {
  updateFilterProducts: (products: any) => updateFilterSupplierProducts(products),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierFilters);
