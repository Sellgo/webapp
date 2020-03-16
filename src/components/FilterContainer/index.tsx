import React from 'react';
import './index.scss';
import { Checkbox } from 'semantic-ui-react';
import _ from 'lodash';
import { AllFilters } from '../../interfaces/Filters';

interface Props {
  filterType: string;
}

interface State {
  allFilter: AllFilters;
}

function FilterContainer(props: Props, state: State) {
  state = {
    allFilter: {
      sortBy: [
        {
          label: 'Most Profitable',
          dataKey: 'most-profitable',
          checked: true,
        },
        {
          label: 'Most Units Sold',
          dataKey: 'most-unit-sold',
          checked: false,
        },
        {
          label: 'Highest ROI',
          dataKey: 'highest-roi',
          checked: false,
        },
      ],
      sellers: [
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
      sellability: [
        {
          label: 'Non-Hazmat',
          dataKey: 'non-hazmat',
          checked: true,
        },
        {
          label: 'Non-Gated',
          dataKey: 'non-gated',
          checked: false,
        },
      ],
      productCategory: [
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
      dimensions: [
        {
          label: 'Small Size',
          dataKey: 'small-size',
          checked: true,
        },
        {
          label: 'Medium Size',
          dataKey: 'medium-size',
          checked: false,
        },
        {
          label: 'Over Size',
          dataKey: 'over-size',
          checked: false,
        },
      ],
      weight: [
        {
          label: 'Light Weight',
          dataKey: 'light-weight',
          checked: true,
        },
        {
          label: 'Medium Weight',
          dataKey: 'medium-weight',
          checked: false,
        },
        {
          label: 'Over Weight',
          dataKey: 'over-weight',
          checked: false,
        },
      ],
    },
  };
  return (
    <div className="filter-container">
      <hr />
      <div className="filter-content">
        <span className="filter-name">Sort By</span>
        <div className="filter-list" />
        {_.map(state.allFilter.sortBy, filter => {
          return <Checkbox label={filter.label} />;
        })}
      </div>
    </div>
  );
}

export default FilterContainer;
