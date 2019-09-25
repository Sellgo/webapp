import React, { Component } from 'react';
import { Card, Grid, Dropdown, Feed, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ProductFiltersPreset } from '../../../../../constants/constants';
import { Product } from '../../../../../interfaces/Product';
import InputRange from 'react-input-range';
import { supplierProductsSelector } from '../../../../../selectors/Supplier';

interface SupplierKPIProps {
  products: Product[];
}
class SupplierKPI extends Component<SupplierKPIProps> {
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
    return newProducts;
  };
  render() {
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierKPI);
