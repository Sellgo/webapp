import React, { Component } from 'react';
import { Card, Grid, Dropdown, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Product } from '../../../../interfaces/Product';
import 'react-rangeslider/lib/index.css';
import { supplierProductsSelector } from '../../../../selectors/Supplier';
import FilterSection from '../../../../components/FilterSection';
import SliderRange from '../../../../components/SliderRange';
import { updateSupplierFilterRanges } from '../../../../actions/Suppliers';
import {
  initialFilterRanges,
  findMinMaxRange,
  findFilterProducts,
  dataKeys,
  dataKeyMapping,
  findFiltersGrouped,
} from '../../../../constants/Suppliers';
import get from 'lodash/get';
import { defaultSelect } from '../../../../constants';
import SupplierTableMetrics from '../../SuppliersTable/SupplierTableMetrics';
import AdviceCard from '../AdviceCard';
import './index.scss';

interface SupplierFiltersProps {
  products: Product[];
  filteredProducts: Product[];
  filterRanges: any;
  updateFilterRanges: (filterRanges: any) => void;
}

class SupplierFilters extends Component<SupplierFiltersProps> {
  state = {
    productRanges: initialFilterRanges,
  };

  componentDidMount() {
    const { products } = this.props;

    if (products) {
      // Get min and max range for each filter setting based on all products
      const productRanges = findMinMaxRange(products);
      this.setState({ productRanges });
    }
  }

  componentWillReceiveProps(props: any) {
    if (props.products && props.products !== this.props.products) {
      // Get min and max range for each filter setting based on all products
      const productRanges = findMinMaxRange(props.products);
      this.setState({ productRanges });
    }
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

    if (range.min === '' || range.max === '' || range.min > range.max) {
      // Is it possible for min/max to be empty or min to be bigger than max?
      // Looks like we just update this filterRange in that case and avoid
      // updating the others so that their values don't get messed up.
      updateFilterRanges(productRanges);
    } else {
      // Update this filter range
      newFilterRanges[dataKey] = range;
      // Get products that match the new set of filter ranges
      const filteredProducts = findFilterProducts(products, newFilterRanges);
      // Then update all filter ranges based on the new set of products
      // The result is that changing one filter affects the min/max range of others
      const updatedFilterRanges: any = findMinMaxRange(filteredProducts);

      updatedFilterRanges[dataKey] = range;

      updateFilterRanges(updatedFilterRanges);
    }
  };

  renderFilterComponent = (filter: any, productRange: any, filterRange: any) => {
    if (filter.showSlider) {
      // TODO: Replace with functional MixMaxInput component (from ProditSys)
      return (
        <SliderRange
          title={filter.text}
          dataKey={filter.id}
          showInputs={filter.showInputs}
          // Min and max range
          range={productRange}
          // Current slider start/end
          filterRange={filterRange}
          handleCompleteChange={this.handleCompleteChange}
        />
      );
    } else {
      return (
        <SliderRange
          title={filter.text}
          dataKey={filter.id}
          // Min and max range
          range={productRange}
          // Current slider start/end
          filterRange={filterRange}
          handleCompleteChange={this.handleCompleteChange}
        />
      );
    }
  };

  render() {
    const { products, filteredProducts, filterRanges } = this.props;
    if (products.length === 1 && products[0] === undefined) return <div></div>;
    const { productRanges } = this.state;
    const filterGroups = findFiltersGrouped();

    return (
      <div className="synthesisSupplierFilters">
        <div className="innerWrap">
          {/*<AdviceCard />*/}
          <p className="productsCount">
            {filteredProducts.length} of {products.length} products
          </p>

          <Divider />

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

          <div className="filters">
            {filterRanges &&
              filterGroups.map((group: any) => (
                <FilterSection title={group.text}>
                  {group.filters.map((filter: any) => (
                    <>
                      {this.renderFilterComponent(
                        filter,
                        productRanges[filter.id],
                        filterRanges[filter.id]
                      )}
                    </>
                  ))}
                </FilterSection>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: supplierProductsSelector(state),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterRanges: get(state, 'supplier.filterRanges'),
});

const mapDispatchToProps = {
  updateFilterRanges: (filterRanges: any) => updateSupplierFilterRanges(filterRanges),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierFilters);
