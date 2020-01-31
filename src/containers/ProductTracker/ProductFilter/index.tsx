import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { findFiltersGrouped } from '../../../constants/Tracker';
import FilterSection from '../../../components/FilterSection';
import SliderRange from '../../../components/SliderRange';
import AdviceCard from '../AdviceCard';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { ProductTrackerDetails, ProductsPaginated } from '../../../interfaces/Product';
import {
  initialFilterRanges,
  findMinMaxRange,
  parseMinMaxRange,
  findFilterProducts,
} from '../../../constants/Tracker';
import './index.scss';
import { updateTrackerFilterRanges } from '../../../actions/ProductTracker';

interface ProductFiltersProps {
  products: ProductsPaginated;
  filteredProducts: ProductTrackerDetails[];
  filterRanges: any;
  updateFilterRanges: (filterRanges: any) => void;
  handlePeriodDrop: any;
  periodValue: number;
}
class ProductFilters extends Component<ProductFiltersProps> {
  state = {
    productRanges: initialFilterRanges,
  };

  componentWillReceiveProps(props: any) {
    if (props.products && props.products !== this.props.products && props.products.count > 0) {
      // Get min and max range for each filter setting based on all products
      // const productRanges = findMinMaxRange(props.products.results);
      const productRanges = parseMinMaxRange(props.products.min_max);
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
      updateFilterRanges(productRanges);
    } else {
      // Update this filter range
      newFilterRanges[dataKey] = range;
      // Get products that match the new set of filter ranges
      const filteredProducts = findFilterProducts(products, newFilterRanges);
      // Then update all filter ranges based on the new set of products
      const updatedFilterRanges: any = findMinMaxRange(filteredProducts);
      // But keep this filter range at value we just applied
      updatedFilterRanges[dataKey] = range;

      updateFilterRanges(updatedFilterRanges);
    }
  };
  renderFilterComponent = (filter: any, productRange: any, filterRange: any) => {
    return (
      <SliderRange
        title={filter.text}
        dataKey={filter.id}
        showInputs={filter.showInputs}
        range={productRange}
        filterRange={filterRange}
        handleCompleteChange={this.handleCompleteChange}
      />
    );
  };

  render() {
    const { products, filteredProducts, filterRanges, periodValue } = this.props;
    if (
      products &&
      products.results &&
      products.results.length === 1 &&
      products.results[0] === undefined
    ) {
      return <div></div>;
    }
    const { productRanges } = this.state;
    const filterGroups = findFiltersGrouped();

    return (
      <div className="product-tracker-filters">
        <div className="inner-wrap">
          <AdviceCard handlePeriodDrop={this.props.handlePeriodDrop} periodValue={periodValue} />
          <p className="products-count">
            <span>{filteredProducts.length} of</span>{' '}
            <span style={{ color: '#4B9AF7' }}>{products.count} products</span>
          </p>

          <Divider />

          <div className="filters">
            {filterRanges &&
              filterGroups.map((group: any, index: number) => (
                <FilterSection title={group.text} key={index}>
                  {group.filters.map((filter: any, index: number) => (
                    <div key={index}>
                      {this.renderFilterComponent(
                        filter,
                        productRanges[filter.id],
                        filterRanges[filter.id]
                      )}
                    </div>
                  ))}
                </FilterSection>
              ))}
            {/* {checkFilter.map(check => (
              <div className="check-filter">
                <CheckboxFilter title={check.title} check={check.checkData} />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  products: get(state, 'productTracker.trackerDetails'),
  filteredProducts: get(state, 'productTracker.filteredProducts'),
  filterRanges: get(state, 'productTracker.filterRanges'),
});

const mapDispatchToProps = {
  updateFilterRanges: (filterRanges: any) => updateTrackerFilterRanges(filterRanges),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFilters);
