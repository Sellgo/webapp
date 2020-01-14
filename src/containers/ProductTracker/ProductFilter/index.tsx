import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react';
import { filterRanges, products, filteredProducts, checkFilter } from '../../../utils/dummy';
import { findFiltersGrouped } from '../../../constants/Tracker';
import FilterSection from '../../../components/FilterSection';
import SliderRange from '../../../components/SliderRange';
// import AdviceCard from '../AdviceCard';
import CheckboxFilter from './CheckboxFilter';
import './index.scss';

export default class ProductFilters extends Component {
  handlePresetChange = (e: any, { value }: any) => {};

  render() {
    if (products.length === 1 && products[0] === undefined) return <div></div>;
    const filterGroups = findFiltersGrouped();

    return (
      <div className="product-tracker-filters">
        <div className="inner-wrap">
          {/* <AdviceCard /> */}
          <p className="products-count">
            <span>{filteredProducts.length} of</span>{' '}
            <span style={{ color: '#4B9AF7' }}>{products.length} products</span>
          </p>

          <Divider />

          <div className="filters">
            {filterRanges &&
              filterGroups.map((group: any, index: number) => (
                <FilterSection title={group.text} key={index}>
                  {group.filters.map((filter: any, index: number) => (
                    <div key={index}>
                      <SliderRange
                        title={filter.text}
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
            {checkFilter.map(check => (
              <div className="check-filter">
                <CheckboxFilter title={check.title} check={check.checkData} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
