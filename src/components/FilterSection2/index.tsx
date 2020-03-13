import React from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';

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
        dataKey: 'time-filter',
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
  return (
    <div className="filter-section">
      <div className="filter-header">
        <Button basic icon labelPosition="left" className="all-filter">
          <span className="filter-name">All</span>
          <span className="filter-count">1</span>
          <Icon class="slider" name="sliders horizontal" />
        </Button>
        {_.map(state.filterData, (filter, key) => {
          return (
            <Button basic icon labelPosition="left" className={filter.dataKey} key={filter.dataKey}>
              <span className="filter-name">{filter.label}</span>
              <span className="filter-arrow-down">
                <Icon color="black" name="caret down" />
              </span>
              <Icon className="filter-left-icon" name="ellipsis vertical" />
            </Button>
          );
        })}
      </div>
      <div className="filter-wrapper" />
    </div>
  );
}

export default FilterSection2;
