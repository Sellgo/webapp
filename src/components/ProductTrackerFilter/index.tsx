import React from 'react';
import './index.scss';
import { Checkbox, Button, Divider, Radio } from 'semantic-ui-react';
import _ from 'lodash';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  applyFilter: () => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleSelectAllReviews: () => void;
  filterData: ProductTrackerFilterInterface;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: ProductTrackerFilterState;
  isAllReviews: boolean;
  toggleCheckboxFilter: (filterDataKey: string) => void;
  setPeriod: (value: number) => void;
  toggleNegative: (datakey: string) => void;
}

function ProductTrackerFilter(props: Props) {
  const {
    filterType,
    applyFilter,
    resetFilter,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    initialFilterState,
    toggleSelectAllReviews,
    isAllReviews,
    toggleCheckboxFilter,
    setPeriod,
    toggleNegative,
  } = props;

  return (
    <div className="pt-filter-content">
      {filterType === '' && <Divider />}
      {filterType === 'all-filter' && (
        <>
          <div className="pt-filter-content__all-filter">
            <div className="pt-filter-content__all-filter__wrapper">
              {_.map(filterData.all.filterRanges, filter => {
                return (
                  <div
                    className="pt-filter-content__all-filter__wrapper__range-container"
                    key={filter.dataKey}
                  >
                    <div className="pt-filter-content__all-filter__wrapper__range-container__label">
                      {filter.label}
                    </div>
                    <span
                      className="pt-filter-content__all-filter__wrapper__range-container__reset"
                      onClick={() => resetSingleFilter(`${filter.dataKey}`)}
                    >
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
                      <div className="pt-filter-content__all-filter__wrapper__remove-negative">
                        <Checkbox
                          label="Remove Negative Values"
                          key={filter.dataKey}
                          onClick={() => {
                            toggleNegative(filter.dataKey);
                          }}
                          checked={initialFilterState.removeNegative.indexOf(filter.dataKey) !== -1}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-filter-content__all-filter__wrapper__reviews">
                <div className="pt-filter-content__all-filter__wrapper__reviews__header">
                  <span className="pt-filter-content__all-filter__wrapper__reviews__name">
                    {filterData.all.reviews.label}
                  </span>
                </div>
                <div className="pt-filter-content__all-filter__wrapper__reviews__list">
                  <Checkbox
                    label="all"
                    key="all-reviews"
                    className="all-reviews"
                    onClick={() => {
                      toggleSelectAllReviews();
                    }}
                    checked={isAllReviews}
                  />
                  {_.map(filterData.all.reviews.data, (filterData, dataKey) => {
                    return (
                      <Checkbox
                        label={filterData.label}
                        key={dataKey}
                        onClick={() => {
                          toggleCheckboxFilter(filterData.dataKey);
                        }}
                        checked={initialFilterState.reviews.indexOf(filterData.dataKey) !== -1}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="pt-filter-content__button-wrapper">
              <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
                Reset
              </Button>
              <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
                Apply
              </Button>
            </div>
            <Divider />
          </div>
        </>
      )}
      {filterType === 'period-filter' && (
        <>
          <div className="pt-filter-content__period">
            <div className="pt-filter-content__period__header">
              <span className="pt-filter-content__period__name">{filterData.period.label}</span>
            </div>
            <div className="pt-filter-content__period__list">
              {_.map(filterData.period.data, filterData => {
                return (
                  <Radio
                    key={filterData.dataKey}
                    className={filterData.dataKey}
                    label={filterData.label}
                    checked={initialFilterState.period === filterData.value}
                    onClick={() => setPeriod(filterData.value || 1)}
                  />
                );
              })}
            </div>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
}

export default ProductTrackerFilter;
