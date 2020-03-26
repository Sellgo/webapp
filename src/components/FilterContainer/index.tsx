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
  toggleCheckboxFilter: (filterDataKey: string, label: string) => void;
  applyFilter: () => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  filterData: SupplierFilter;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: FilterState;
  setRadioFilter: (filterType: string, value: string) => void;
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
  } = props;

  return (
    <div className="filter-container">
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
                  <span className="filter-name">{filter.label}</span>
                  <div className={!seeAll ? 'see-all filter-list' : 'filter-list'}>
                    {_.map(filter.data, (filterData, dataKey) => {
                      if (filter.radio === true) {
                        if (!seeAll && dataKey > 3) return null;
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
                  <span
                    className="toggle-see-all"
                    onClick={() => setSeeAll(!seeAll)}
                    hidden={key == 1 && seeAll}
                  >
                    {seeAll ? 'Show less' : 'See all'}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="slider-filters">
            <div className="slider-wrapper">
              {_.map(filterData.filterRanges, filter => {
                return (
                  <div className="range-container">
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
      )}
    </div>
  );
}

export default FilterContainer;
