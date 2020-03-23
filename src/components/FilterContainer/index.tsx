import React, { useEffect } from 'react';
import './index.scss';
import { Checkbox, Radio, Button, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData, SupplierFilter, RangeModel, FilterState } from '../../interfaces/Filters';
import InputRange from 'react-input-range';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  setRadioFilter: (filterType: string, value: string) => void;
  toggleCheckboxFilter: (filterDataKey: string) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  filterData: SupplierFilter;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: FilterState;
}

function FilterContainer(props: Props) {
  const {
    filterType,
    applyFilter,
    setRadioFilter,
    toggleCheckboxFilter,
    resetFilter,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    initialFilterState,
  } = props;

  return (
    <div className="filter-container">
      {filterType === 'all-filter' && (
        <>
          <div className="all-filter-content-wrapper">
            {_.map(filterData.allFilter, (filter, key) => {
              return (
                <div className="all-filter-content" key={key}>
                  <span className="filter-name">{filter.label}</span>
                  <div className="filter-list">
                    {_.map(filter.data, (filterData, dataKey) => {
                      if (filter.radio === true) {
                        return (
                          <Radio
                            key={dataKey}
                            className={filterData.dataKey}
                            label={filterData.label}
                            value={filterData.dataKey}
                            filter={filter.dataKey}
                            checked={initialFilterState.productSize === filterData.dataKey}
                            onClick={() => setRadioFilter(filter.dataKey, filterData.dataKey)}
                          />
                        );
                      } else {
                        return (
                          <Checkbox
                            label={filterData.label}
                            key={dataKey}
                            onClick={() => {
                              toggleCheckboxFilter(filterData.dataKey);
                            }}
                            checked={
                              initialFilterState.allFilter.indexOf(filterData.dataKey) !== -1
                            }
                          />
                        );
                      }
                    })}
                  </div>
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
        </>
      )}

      {filterType === 'price-filter' && (
        <>
          {_.map(filterData.filterRanges, filter => {
            if (filter.dataKey == 'price') {
              return (
                <div className="range-container" key={filter.dataKey}>
                  <h3>{filter.label}</h3>
                  <span className="reset" onClick={() => resetSingleFilter(`${filter.dataKey}`)}>
                    x Reset
                  </span>
                  <FilterSliderInput
                    dataKey={filter.dataKey}
                    range={filter.range}
                    filterRange={filter.filterRange}
                    handleCompleteChange={handleCompleteChange}
                  />
                </div>
              );
            }
          })}
          <div className="button-wrapper">
            <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
              Reset
            </Button>
            <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </>
      )}

      {filterType === 'profit-roi-filter' && (
        <>
          {_.map(filterData.filterRanges, filter => {
            if (filter.dataKey == 'profit' || filter.dataKey == 'roi') {
              return (
                <div className="range-container" key={filter.dataKey}>
                  <h3>{filter.label}</h3>
                  <span className="reset" onClick={() => resetSingleFilter(`${filter.dataKey}`)}>
                    x Reset
                  </span>
                  <FilterSliderInput
                    dataKey={filter.dataKey}
                    range={filter.range}
                    filterRange={filter.filterRange}
                    handleCompleteChange={handleCompleteChange}
                  />
                </div>
              );
            }
          })}
          <div className="button-wrapper">
            <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
              Reset
            </Button>
            <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </>
      )}

      {filterType === 'ranks-units-sold-filter' && (
        <>
          {_.map(filterData.filterRanges, filter => {
            if (filter.dataKey == 'rank' || filter.dataKey == 'sales_monthly') {
              return (
                <div className="range-container" key={filter.dataKey}>
                  <h3>{filter.label}</h3>
                  <span className="reset" onClick={() => resetSingleFilter(`${filter.dataKey}`)}>
                    x Reset
                  </span>
                  <FilterSliderInput
                    dataKey={filter.dataKey}
                    range={filter.range}
                    filterRange={filter.filterRange}
                    handleCompleteChange={handleCompleteChange}
                  />
                </div>
              );
            }
          })}
          <div className="button-wrapper">
            <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
              Reset
            </Button>
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
