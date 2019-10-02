import React, { Component } from 'react';
import { Card, Grid, Dropdown, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Product } from '../../../../interfaces/Product';
import 'react-rangeslider/lib/index.css';
import { supplierProductsSelector } from '../../../../selectors/Supplier';

import SliderRange from '../../../../components/SliderRange';
import { updateSupplierFilterRanges } from '../../../../actions/Suppliers';
import {
  initialFilterRanges,
  findMinMaxRange,
  findFilterProducts,
  dataKeys,
  dataKeyMapping,
} from '../../../../constants/Suppliers';
import get from 'lodash/get';
import { defaultSelect } from '../../../../constants';
import SupplierTableMetrics from '../../SuppliersTable/SupplierTableMetrics';

// Migrated from profitSys
import AdviceCard from '../AdviceCard';

// Original CSS
// TODO: scope and merge with new index.scss style
import './SupplierFilters.css';
// New css
import './index.scss';

interface SupplierFiltersProps {
  products: Product[];
  filterRanges: any;
  updateFilterRanges: (filterRanges: any) => void;
}

class SupplierFilters extends Component<SupplierFiltersProps> {
  state = {
    productRanges: initialFilterRanges,
  };

  componentDidMount() {
    const { products } = this.props;
    const productRanges = findMinMaxRange(products);
    this.setState({ productRanges });
  }

  handlePresetChange = (e: any, { value }: any) => {
    const { products, updateFilterRanges } = this.props;
    const { productRanges } = this.state;
    if (value === '') {
      updateFilterRanges(productRanges);
    } else {
      const newFilterRanges = { ...productRanges };
      const presetRange = {
        min: productRanges[value].min < 0 ? 0 : productRanges[value].min,
        max: productRanges[value].max,
      };
      newFilterRanges[value] = presetRange;
      const filteredProducts = findFilterProducts(products, newFilterRanges);
      const updatedFilterRanges: any = findMinMaxRange(filteredProducts);
      updatedFilterRanges[value] = presetRange;
      updateFilterRanges(updatedFilterRanges);
    }
  };

  handleCompleteChange = (dataKey: any, range: any) => {
    const { products, updateFilterRanges } = this.props;
    const { productRanges } = this.state;
    const newFilterRanges = { ...productRanges };
    newFilterRanges[dataKey] = range;

    if (range.min === '' || range.max === '' || range.min > range.max) {
      updateFilterRanges(newFilterRanges);
    } else {
      const filteredProducts = findFilterProducts(products, newFilterRanges);
      const updatedFilterRanges: any = findMinMaxRange(filteredProducts);
      updatedFilterRanges[dataKey] = range;
      updateFilterRanges(updatedFilterRanges);
    }
  };

  render() {
    const { products, filterRanges } = this.props;
    if (products.length === 1 && products[0] === undefined) return <div></div>;
    const { productRanges } = this.state;

    return (
      <div className="profitSysFilterPanel">
        <AdviceCard />
        <p className={'products'}>xxx of xxx products</p>

        <div className="searchDropdown">
          <Dropdown
            placeholder="Select a Preset"
            fluid
            search
            selection
            options={[
              defaultSelect,
              ...dataKeys.map((dk: any) => ({
                key: dk,
                text: dataKeyMapping[dk].presetText,
                value: dk,
              })),
            ]}
            onChange={this.handlePresetChange}
          />
        </div>

        {filterRanges
          ? dataKeys.map((dk: string) => (
              <React.Fragment key={dk}>
                <SliderRange
                  title={dataKeyMapping[dk].text}
                  dataKey={dk}
                  range={productRanges[dk]}
                  filterRange={filterRanges[dk]}
                  handleCompleteChange={this.handleCompleteChange}
                />
                <Divider />
              </React.Fragment>
            ))
          : ''}
      </div>
    );

    return (
      <div className="profitSysFilterPanel">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <AdviceCard />
            </Grid.Column>

            <Grid.Column floated="left" width={6}>
              Synthesis Preset
            </Grid.Column>
            <Grid.Column floated="right" width={10}>
              <Dropdown
                placeholder="Select a preset"
                fluid={true}
                selection={true}
                options={[
                  defaultSelect,
                  ...dataKeys.map((dk: any) => ({
                    key: dk,
                    text: dataKeyMapping[dk].presetText,
                    value: dk,
                  })),
                ]}
                onChange={this.handlePresetChange}
              />
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
                  {filterRanges
                    ? dataKeys.map((dk: string) => (
                        <React.Fragment key={dk}>
                          <SliderRange
                            title={dataKeyMapping[dk].text}
                            dataKey={dk}
                            range={productRanges[dk]}
                            filterRange={filterRanges[dk]}
                            handleCompleteChange={this.handleCompleteChange}
                          />
                          <Divider />
                        </React.Fragment>
                      ))
                    : ''}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ justifyContent: 'center', marginTop: 15 }}>
            <SupplierTableMetrics />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: supplierProductsSelector(state),
  filterRanges: get(state, 'supplier.filterRanges'),
});

const mapDispatchToProps = {
  updateFilterRanges: (products: any) => updateSupplierFilterRanges(products),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierFilters);
