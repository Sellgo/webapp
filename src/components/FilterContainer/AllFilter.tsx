import React from 'react';
import { FilterState, SupplierFilter } from '../../interfaces/Filters';
import { Divider, Checkbox, Button } from 'semantic-ui-react';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';
import _ from 'lodash';

interface AllFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleNegative: (datakey: string) => void;
  filterData: SupplierFilter;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  filterState: FilterState;
  filterCategory: any;
}

const AllFilter = (props: AllFilterProps) => {
  const {
    applyFilter,
    resetFilter,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    filterState,
    toggleNegative,
    filterCategory,
  } = props;

  return (
    <>
      {filterCategory}
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
                      checked={filterState.removeNegative.indexOf(filter.dataKey) !== -1}
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
    </>
  );
};

export default AllFilter;
