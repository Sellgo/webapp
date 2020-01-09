import React, { Component } from 'react';
import { Dropdown, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Product, ProductsTrackData } from '../../../interfaces/Product';
import FilterSection from '../../../components/FilterSection';
import SliderRange from '../../../components/SliderRange';
import AdviceCard from '../AdviceCard';
import { dataKeys } from '../../../constants/Suppliers';

export default class ProductFilters extends Component {
  render() {
    return (
      <div className="synthesis-supplier-filters">
        <div className="inner-wrap">
          <AdviceCard />
          <p className="products-count">100 of 100 products</p>

          <Divider />

          <div className="filters">
            {/* {filterRanges &&
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
              ))} */}
            <FilterSection />
          </div>
        </div>
      </div>
    );
  }
}
