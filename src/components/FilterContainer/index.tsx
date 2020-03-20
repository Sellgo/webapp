import React, { useEffect } from 'react';
import './index.scss';
import { Checkbox, Radio, Button, Input } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData, SupplierFilter, RangeModel } from '../../interfaces/Filters';
import InputRange from 'react-input-range';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  setRadioFilter: (filterType: string, value: string) => void;
  toggleCheckboxFilter: (filterType: string, filterDataKey: string) => void;
  applyFilter: () => void;
  resetFilter: (datakey: string) => void;
  filterData: SupplierFilter;
  range: any;
  handleCompleteChange: (dataKey: string, range: Range) => void;
}

function FilterContainer(props: Props) {
  const {
    filterType,
    applyFilter,
    setRadioFilter,
    toggleCheckboxFilter,
    resetFilter,
    filterData,
    range,
    handleCompleteChange,
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

      {filterType === 'price-filter' && (
        <>
          <div className="range-container">
            <h3>Price $</h3>
            <span className="reset" onClick={() => resetFilter('sda')}>
              x Reset
            </span>
            {_.map(filterData.filterRanges, filter => {
              if (filter.dataKey == 'price-filter') {
                return (
                  <FilterSliderInput
                    dataKey={filter.dataKey}
                    range={range.price}
                    filterRange={filter.range}
                    handleCompleteChange={handleCompleteChange}
                  />
                );
              }
            })}
          </div>
          <div className="button-wrapper">
            <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </>
      )}

      {filterType === 'profit-roi-filter' && (
        <>
          <div className="content-wrapper">
            <div className="range-container">
              <h3>Profit $</h3>
              <span className="reset" onClick={() => resetFilter('sda')}>
                x Reset
              </span>
              <div className="range-content">
                <div className="min$-max$-content">
                  <span>$ Min</span>
                  <span>$ Max</span>
                </div>
                <div className="min%-max%-content">
                  <span>Min %</span>
                  <span>Max %</span>
                </div>
              </div>
            </div>

            <div className="range-container">
              <h3>ROI/ Return On Investment $</h3>
              <span className="reset" onClick={() => resetFilter('sda')}>
                x Reset
              </span>
              <div className="range-content">
                <div className="min-max-content">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
              Apply
            </Button>
          </div>
        </>
      )}

      {filterType === 'ranks-units-sold-filter' && (
        <>
          <div className="content-wrapper">
            <div className="range-container">
              <h3>Unit Sold</h3>
              <span className="reset" onClick={() => resetFilter('sda')}>
                x Reset
              </span>
              <div className="range-content">
                <div className="min$-max$-content">
                  <span>Min sold</span>
                  <span>Max sold</span>
                </div>
              </div>
            </div>

            <div className="range-container">
              <h3>Rank</h3>
              <span className="reset" onClick={() => resetFilter('sda')}>
                x Reset
              </span>
              <div className="range-content">
                <div className="min-max-content">
                  <span>Min rank</span>
                  <span>Max rank</span>
                </div>
              </div>
            </div>
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
