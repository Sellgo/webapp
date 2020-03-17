import React from 'react';
import './index.scss';
import { Checkbox, Radio, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData } from '../../interfaces/Filters';

interface Props {
  filterType: string;
}
function FilterContainer(props: Props) {
  const { filterType } = props;
  const filterData: FilterData[] = [
    {
      label: 'Sort By',
      dataKey: 'sort-by',
      checkedValue: 'most-profitable',
      radio: true,
      data: [
        {
          label: 'Most Profitable',
          dataKey: 'most-profitable',
        },
        {
          label: 'Most Units Sold',
          dataKey: 'most-unit-sold',
        },
        {
          label: 'Highest ROI',
          dataKey: 'highest-roi',
        },
      ],
    },
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
      label: 'Sellability',
      dataKey: 'sellability',
      radio: false,
      data: [
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
      label: 'Dimensions',
      dataKey: 'dimension',
      checkedValue: 'small-size',
      radio: true,
      data: [
        {
          label: 'Small Size',
          dataKey: 'small-size',
        },
        {
          label: 'Medium Size',
          dataKey: 'medium-size',
        },
        {
          label: 'Over Size',
          dataKey: 'over-size',
        },
      ],
    },
    {
      label: 'Weight',
      dataKey: 'weight',
      checkedValue: 'light-weight',
      radio: true,
      data: [
        {
          label: 'Light Weight',
          dataKey: 'light-weight',
        },
        {
          label: 'Medium Weight',
          dataKey: 'medium-weight',
        },
        {
          label: 'Over Weight',
          dataKey: 'over-weight',
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

  const applyFilter = () => {
    console.log('filterData: ', allFilters);
  };

  return (
    <div className="filter-container">
      {filterType === 'all-filter' && (
        <>
          {' '}
          <div className="all-filter-content-wrapper">
            {_.map(allFilters, (filter, key) => {
              return (
                <div className="all-filter-content" key={key}>
                  <span className="filter-name">{filter.label}</span>
                  <div className="filter-list">
                    {_.map(filter.data, (filterData, dataKey) => {
                      if (!filterData.childData && _.isEmpty(filterData.childData)) {
                        if (filter.radio === true) {
                          return (
                            <Radio
                              key={dataKey}
                              className={filterData.dataKey}
                              label={filterData.label}
                              value={filterData.dataKey}
                              filter={filter.dataKey}
                              checked={filter.checkedValue === filterData.dataKey}
                              onClick={() => setRadioFilter(filter.dataKey, filterData.dataKey)}
                            />
                          );
                        } else {
                          return (
                            <Checkbox
                              label={filterData.label}
                              key={dataKey}
                              onClick={() => {
                                toggleCheckboxFilter(filter.dataKey, filterData.dataKey);
                              }}
                              defaultChecked={filterData.checked}
                            />
                          );
                        }
                      } else {
                        return (
                          <div className="filter-child-content" key={dataKey}>
                            <Checkbox
                              label={filterData.label}
                              onClick={() => {
                                toggleCheckboxFilter(filter.dataKey, filterData.dataKey);
                              }}
                              defaultChecked={filterData.checked}
                            />
                            <div className="filter-child-list">
                              {_.map(filterData.childData, (childData, childKey) => {
                                return <Checkbox label={childData.label} key={childKey} />;
                              })}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="button-wrapper">
            <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default FilterContainer;
