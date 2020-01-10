import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { filterRanges, products, filteredProducts } from './dummy';
import { initialFilterRanges, findFiltersGrouped } from '../../../constants/Tracker';
import FilterSection from '../../../components/FilterSection';
import SliderRange from '../../../components/SliderRange';
import AdviceCard from '../AdviceCard';
import CheckboxFilter from './CheckboxFilter';
import './index.scss';

export default class ProductFilters extends Component {
  state = {
    productRanges: initialFilterRanges,
  };
  handlePresetChange = (e: any, { value }: any) => {};

  render() {
    if (products.length === 1 && products[0] === undefined) return <div></div>;
    const { productRanges } = this.state;
    const filterGroups = findFiltersGrouped();

    return (
      <div className="synthesis-supplier-filters">
        <div className="inner-wrap">
          <AdviceCard />
          <p className="products-count">
            {filteredProducts.length} of {products.length} products
          </p>

          <Divider />

          <div className="filters">
            {filterRanges &&
              filterGroups.map((group: any, index: number) => (
                <FilterSection title={group.text} key={index}>
                  {group.filters.map((filter: any, index: number) => (
                    <div key={index}>
                      <SliderRange
                        title={'Avg Unit Profit'}
                        dataKey={'filter.id'}
                        showInputs={filter.showInputs}
                        range={250}
                        filterRange={filterRanges.avg_margin}
                        // handleCompleteChange={this.handleCompleteChange}
                      />
                      <Divider />
                    </div>
                  ))}
                </FilterSection>
              ))}
            <div className="check-filter">
              <CheckboxFilter title={'Inventory'} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
