import React from 'react';
import './index.scss';
import { Checkbox, Button, Divider } from 'semantic-ui-react';
import _ from 'lodash';
import { SupplierFilter, FilterState } from '../../interfaces/Filters';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  toggleCheckboxFilter: (filterDataKey: string, label: string) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  toggleSelectAll: () => void;
  selectAll: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleNegative: (datakey: string) => void;
  filterData: SupplierFilter;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: FilterState;
  setRadioFilter: (filterType: string, value: string) => void;
  isSelectAll: boolean;
}

function FilterContainer(props: Props) {
  const [seeAll, setSeeAll] = React.useState(false);
  const {
    filterType,
    applyFilter,
    toggleCheckboxFilter,
    resetFilter,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    initialFilterState,
    setRadioFilter,
    toggleSelectAll,
    isSelectAll,
    selectAll,
    toggleNegative,
  } = props;

  return (
    <div className="filter-container">
      <Divider />
      {filterType === 'all-filter' && (
        <>
          <div
            className={
              !seeAll ? 'all-filter-content-wrapper' : 'see-all all-filter-content-wrapper'
            }
          >
            {_.map(filterData.allFilter, (filter, key) => {
              return (
                <div className={`all-filter-content ${filter.dataKey}`} key={key}>
                  <div className="content-header">
                    <span className="filter-name">{filter.label}</span>
                    {filter.dataKey === 'product-category' && (
                      <span className="reset category-list" onClick={() => selectAll()}>
                        x Reset
                      </span>
                    )}
                  </div>
                  <div className={seeAll ? 'see-all filter-list' : 'filter-list'}>
                    {filter.dataKey === 'product-category' && (
                      <div className="ui checkbox select-all">
                        <input
                          id="select-all"
                          checked={isSelectAll}
                          onChange={() => {
                            toggleSelectAll();
                          }}
                          type="checkbox"
                        />
                        <label htmlFor="select-all"> Select all</label>
                      </div>
                    )}

                    {_.map(filter.data, (filterData, dataKey) => {
                      if (filter.radio === true) {
                        return (
                          <div className={`ui radio checkbox ${filterData.dataKey}`} key={dataKey}>
                            <input
                              id={filterData.dataKey}
                              checked={initialFilterState.productSize === filterData.label}
                              onChange={() => {
                                setRadioFilter(filter.dataKey, filterData.label);
                              }}
                              type="radio"
                            />
                            <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                          </div>
                        );
                      } else {
                        if (!seeAll && dataKey > 3) return null;
                        return (
                          <div className="ui checkbox" key={dataKey}>
                            <input
                              id={filterData.dataKey}
                              checked={
                                initialFilterState.allFilter.indexOf(filterData.label) !== -1
                              }
                              onChange={() => {
                                toggleCheckboxFilter(filterData.dataKey, filterData.label);
                              }}
                              type="checkbox"
                            />
                            <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                          </div>
                        );
                      }
                    })}
                  </div>
                  {filter.dataKey === 'product-category' && (
                    <div
                      key={filter.dataKey}
                      className="toggle-see-all"
                      onClick={() => setSeeAll(!seeAll)}
                    >
                      {seeAll ? 'Show less' : 'See all'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <Divider className="middle-divider" />
          <div className="slider-filters">
            <div className="slider-wrapper">
              {_.map(filterData.filterRanges, filter => {
                return (
                  <div className="range-container" key={filter.dataKey}>
                    <div className="range-label">{filter.label}</div>
                    <span className="reset" onClick={() => resetSingleFilter(`${filter.dataKey}`)}>
                      x Reset
                    </span>
                    <FilterSliderInput
                      dataKey={filter.dataKey}
                      range={filter.range}
                      filterRange={filter.filterRange}
                      handleCompleteChange={handleCompleteChange}
                      labelSign={filter.sign}
                    />
                    {filter.removeNegative !== undefined && (
                      <div className="remove-negative">
                        <Checkbox
                          label="Remove Negative Values"
                          key={filter.dataKey}
                          onChange={() => {
                            toggleNegative(filter.dataKey);
                          }}
                          checked={initialFilterState.removeNegative.indexOf(filter.dataKey) !== -1}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="button-wrapper">
              <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
                Reset
              </Button>
              <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
                Apply
              </Button>
            </div>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
}

export default FilterContainer;
