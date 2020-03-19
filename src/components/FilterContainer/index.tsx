import React, { useEffect } from 'react';
import './index.scss';
import { Checkbox, Radio, Button } from 'semantic-ui-react';
import _ from 'lodash';
import { FilterData, SupplierFilter, RangeModel } from '../../interfaces/Filters';
import InputRange from 'react-input-range';

interface Props {
  filterType: string;
  setRadioFilter: (filterType: string, value: string) => void;
  toggleCheckboxFilter: (filterType: string, filterDataKey: string) => void;
  applyFilter: () => void;
  resetFilter: (datakey: string) => void;
  filterData: SupplierFilter;
  range: any;
  handlePrice: (range: any) => void;
  handleProfit: (range: any) => void;
  handleRoi: (range: any) => void;
  handleUnitSold: (range: any) => void;
  handleRank: (range: any) => void;
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
    handlePrice,
    handleProfit,
    handleRoi,
    handleUnitSold,
    handleRank,
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
          <div className="content-wrapper">
            <div className="range-container">
              <h3>Price $</h3>
              <span className="reset" onClick={() => resetFilter(filterData.price.dataKey)}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={
                    filterData.price.range.min === undefined ? Number.MAX_SAFE_INTEGER : range.min
                  }
                  maxValue={
                    filterData.price.range.max === undefined ? Number.MAX_SAFE_INTEGER : range.max
                  }
                  value={{
                    min:
                      filterData.price.range.min === undefined
                        ? 0
                        : Number(filterData.price.range.min),
                    max:
                      filterData.price.range.max === undefined
                        ? 0
                        : Number(filterData.price.range.max),
                  }}
                  onChange={handlePrice}
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
              <span
                className="reset"
                onClick={() => resetFilter(filterData.profitRoi.profit.dataKey)}
              >
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={
                    filterData.profitRoi.profit.range.min === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.min
                  }
                  maxValue={
                    filterData.profitRoi.profit.range.max === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.max
                  }
                  value={{
                    min:
                      filterData.profitRoi.profit.range.min === undefined
                        ? 0
                        : Number(filterData.profitRoi.profit.range.min),
                    max:
                      filterData.profitRoi.profit.range.max === undefined
                        ? 0
                        : Number(filterData.profitRoi.profit.range.max),
                  }}
                  onChange={handleProfit}
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
              <span className="reset" onClick={() => resetFilter(filterData.profitRoi.roi.dataKey)}>
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={
                    filterData.profitRoi.roi.range.min === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.min
                  }
                  maxValue={
                    filterData.profitRoi.roi.range.max === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.max
                  }
                  value={{
                    min:
                      filterData.profitRoi.roi.range.min === undefined
                        ? 0
                        : Number(filterData.profitRoi.roi.range.min),
                    max:
                      filterData.profitRoi.roi.range.max === undefined
                        ? 0
                        : Number(filterData.profitRoi.roi.range.max),
                  }}
                  onChange={handleRoi}
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
              <span
                className="reset"
                onClick={() => resetFilter(filterData.rankUnitSold.unitSold.dataKey)}
              >
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={
                    filterData.rankUnitSold.unitSold.range.min === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.min
                  }
                  maxValue={
                    filterData.rankUnitSold.unitSold.range.max === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.max
                  }
                  value={{
                    min:
                      filterData.rankUnitSold.unitSold.range.min === undefined
                        ? 0
                        : Number(filterData.rankUnitSold.unitSold.range.min),
                    max:
                      filterData.rankUnitSold.unitSold.range.max === undefined
                        ? 0
                        : Number(filterData.rankUnitSold.unitSold.range.max),
                  }}
                  onChange={handleUnitSold}
                />
                <div className="min$-max$-content">
                  <span>Min sold</span>
                  <span>Max sold</span>
                </div>
              </div>
            </div>

            <div className="range-container">
              <h3>Rank</h3>
              <span
                className="reset"
                onClick={() => resetFilter(filterData.rankUnitSold.rank.dataKey)}
              >
                x Reset
              </span>
              <div className="range-content">
                <InputRange
                  step={0.01}
                  minValue={
                    filterData.rankUnitSold.rank.range.min === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.min
                  }
                  maxValue={
                    filterData.rankUnitSold.rank.range.max === undefined
                      ? Number.MAX_SAFE_INTEGER
                      : range.max
                  }
                  value={{
                    min:
                      filterData.rankUnitSold.rank.range.min === undefined
                        ? 0
                        : Number(filterData.rankUnitSold.rank.range.min),
                    max:
                      filterData.rankUnitSold.rank.range.max === undefined
                        ? 0
                        : Number(filterData.rankUnitSold.rank.range.max),
                  }}
                  onChange={handleRank}
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
