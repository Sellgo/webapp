import React from 'react';
import './index.scss';
import { Checkbox, Radio, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData } from '../../interfaces/Filters';
import InputRange from 'react-input-range';

interface Props {
  filterType: string;
  setRadioFilter: (filterType: string, value: string) => void;
  toggleCheckboxFilter: (filterType: string, filterDataKey: string) => void;
  applyFilter: () => void;
  resetPrice: () => void;
  allFilters: FilterData[];
}

function FilterContainer(props: Props) {
  const {
    filterType,
    allFilters,
    applyFilter,
    setRadioFilter,
    toggleCheckboxFilter,
    resetPrice,
  } = props;

  return (
    <div className="filter-container">
      {filterType === 'all-filter' && (
        <>
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

      {filterType === 'price-filter' && (
        <>
          <div className="content-wrapper">
            <div className="range-container">
              <h3>Price $</h3>
              <span className="reset" onClick={() => resetPrice()}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={0}
                  maxValue={20}
                  value={{ min: 2, max: 10 }}
                  onChange={value => {
                    console.log('value: ', value);
                  }}
                />
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

      {filterType === 'profit-roi-filter' && (
        <>
          <div className="content-wrapper">
            <div className="range-container">
              <h3>Profit $</h3>
              <span className="reset" onClick={() => resetPrice()}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={0}
                  maxValue={20}
                  value={{ min: 2, max: 10 }}
                  onChange={value => {
                    console.log('value: ', value);
                  }}
                />
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
              <span className="reset" onClick={() => resetPrice()}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={0}
                  maxValue={20}
                  value={{ min: 2, max: 10 }}
                  onChange={value => {
                    console.log('value: ', value);
                  }}
                />
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
              <span className="reset" onClick={() => resetPrice()}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={0}
                  maxValue={20}
                  value={{ min: 2, max: 10 }}
                  onChange={value => {
                    console.log('value: ', value);
                  }}
                />
                <div className="min$-max$-content">
                  <span>Min sold</span>
                  <span>Max sold</span>
                </div>
              </div>
            </div>

            <div className="range-container">
              <h3>Rank</h3>
              <span className="reset" onClick={() => resetPrice()}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={0}
                  maxValue={20}
                  value={{ min: 2, max: 10 }}
                  onChange={value => {
                    console.log('value: ', value);
                  }}
                />
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
