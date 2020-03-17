import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import FilterContainer from '../FilterContainer';

interface FilterObject {
  label: string;
  dataKey: string;
}
interface State {
  filterData: FilterObject[];
}

function FilterSection2(props: any, state: State) {
  state = {
    filterData: [
      {
        label: 'Time',
        dataKey: 'time-filter',
      },
      {
        label: 'Price',
        dataKey: 'price-filter',
      },
      {
        label: 'Profit/ ROI',
        dataKey: 'profit-roi-filter',
      },
      {
        label: 'Ranks/ Unit Sold',
        dataKey: 'ranks-units-sold-filter',
      },
    ],
  };

  const [filterType, setFilterType] = useState('');

  return (
    <div className="filter-section">
      <div className="filter-header">
        <Button
          basic
          icon
          labelPosition="left"
          className="all-filter"
          onClick={() => setFilterType('all-filter')}
        >
          <span className="filter-name">All</span>
          <span className="filter-count">1</span>
          <Icon className="slider" name="sliders horizontal" />
        </Button>
        {_.map(state.filterData, filter => {
          return (
            <Button
              basic
              icon
              labelPosition="left"
              className={filter.dataKey}
              key={filter.dataKey}
              onClick={() => setFilterType(filter.dataKey)}
            >
              <span className="filter-name">{filter.label}</span>
              <span className="filter-arrow-down">
                <Icon color="black" name="caret down" />
              </span>
              <Icon className="filter-left-icon" name="ellipsis vertical" />
            </Button>
          );
        })}
      </div>
      <div className="filter-wrapper">
        <hr />
        <FilterContainer filterType={filterType} />
      </div>
    </div>
  );
}

export default FilterSection2;
