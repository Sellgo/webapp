import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import FilterContainer from '../FilterContainer';
import { FilterData } from '../../interfaces/Filters';

interface FilterObject {
  label: string;
  dataKey: string;
}
interface State {
  filterTitle: FilterObject[];
}

function FilterSection2(props: any, state: State) {
  const [filterType, setFilterType] = useState('');
  state = {
    filterTitle: [
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

  const filterData: FilterData[] = [
    {
      label: 'Sellers',
      dataKey: 'seller',
      radio: false,
      data: [
        {
          label: 'Amazon',
          dataKey: 'amazon',
          checked: true,
        },
        {
          label: 'FBA',
          dataKey: 'fba',
          checked: false,
          childData: [
            {
              label: '> 3 FBA',
              dataKey: '3fba',
              checked: false,
            },
          ],
        },
        {
          label: 'FBM',
          dataKey: 'fbm',
          checked: false,
        },
      ],
    },
    {
      label: 'Product Category',
      dataKey: 'product-category',
      radio: false,
      data: [
        {
          label: 'All',
          dataKey: 'all-products',
          checked: true,
        },
        {
          label: 'Appliances',
          dataKey: 'appliances',
          checked: false,
        },
        {
          label: 'Arts, Craft and Sewing',
          dataKey: 'arts-craft-sewing',
          checked: false,
        },
        {
          label: 'Baby',
          dataKey: 'baby',
          checked: false,
        },
        {
          label: 'Books',
          dataKey: 'books',
          checked: false,
        },
      ],
    },
    {
      label: 'Product Size Tiers',
      dataKey: 'product-size-tiers',
      checkedValue: 'small-standard-size',
      radio: true,
      data: [
        {
          label: 'All size',
          dataKey: 'all-size',
        },
        {
          label: 'Small stadard-size',
          dataKey: 'small-standard-size',
        },
        {
          label: 'Large stadard-size',
          dataKey: 'large-standard-size',
        },
        {
          label: 'Small oversize',
          dataKey: 'small-oversize',
        },
        {
          label: 'Medium oversize',
          dataKey: 'medium-oversize',
        },
        {
          label: 'Over oversize',
          dataKey: 'over-oversize',
        },
      ],
    },
  ];

  const [allFilters, setAllFilters] = React.useState(filterData);

  const setRadioFilter = (filterType: string, value: string) => {
    const data = _.map(allFilters, filter => {
      if (filter.dataKey === filterType) {
        filter.checkedValue = value;
      }
      return filter;
    });
    setAllFilters(data);
  };

  const toggleCheckboxFilter = (filterType: string, filterDataKey: string) => {
    const filter = _.map(allFilters, filter => {
      if (filter.dataKey === filterType) {
        const filterData = _.map(filter.data, filterData => {
          if (filterData.dataKey === filterDataKey) {
            filterData.checked = !filterData.checked;
          }
        });
      }
      return filter;
    });
    setAllFilters(filter);
  };

  const resetPrice = () => {
    console.log('resetPrice: ');
  };

  const applyFilter = () => {
    console.log('filterData: ', allFilters);
  };
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
        {_.map(state.filterTitle, filter => {
          return (
            <Button
              basic
              icon
              labelPosition="left"
              className={filterType == filter.dataKey ? `active ${filter.dataKey}` : filter.dataKey}
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
        <FilterContainer
          filterType={filterType}
          applyFilter={applyFilter}
          setRadioFilter={setRadioFilter}
          toggleCheckboxFilter={toggleCheckboxFilter}
          resetPrice={resetPrice}
          allFilters={allFilters}
        />
      </div>
    </div>
  );
}

export default FilterSection2;
