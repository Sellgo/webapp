import React, { useEffect } from 'react';
import './index.scss';
import { Checkbox, Radio, Button, Input, Divider } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData, SupplierFilter, RangeModel, FilterState } from '../../interfaces/Filters';
import InputRange from 'react-input-range';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  toggleCheckboxFilter: (filterDataKey: string, label: string) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  toggleSellectAll: () => void;
  selectAll: () => void;
  resetSingleFilter: (datakey: string) => void;
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
    toggleSellectAll,
    isSelectAll,
    selectAll,
  } = props;

  return (
    <div className="filter-container">
      {filterType === 'all-filter' && (
        <>
          <Divider />
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
                      <Checkbox
                        label="Sellect all"
                        key="sellect-all"
                        className="select-all"
                        onClick={() => {
                          toggleSellectAll();
                        }}
                        checked={isSelectAll}
                      />
                    )}

                    {_.map(filter.data, (filterData, dataKey) => {
                      if (filter.radio === true) {
                        return (
                          <Radio
                            key={dataKey}
                            className={filterData.dataKey}
                            label={filterData.label}
                            checked={initialFilterState.productSize === filterData.label}
                            onClick={() => setRadioFilter(filter.dataKey, filterData.label)}
                          />
                        );
                      } else {
                        if (!seeAll && dataKey > 3) return null;
                        return (
                          <Checkbox
                            label={filterData.label}
                            key={dataKey}
                            onClick={() => {
                              toggleCheckboxFilter(filterData.dataKey, filterData.label);
                            }}
                            checked={initialFilterState.allFilter.indexOf(filterData.label) !== -1}
                          />
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
