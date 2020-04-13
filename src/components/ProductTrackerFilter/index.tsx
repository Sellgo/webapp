import React from 'react';
import './index.scss';
import { Checkbox, Button, Divider } from 'semantic-ui-react';
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
  toggleCheckboxFilter: (filterDataKey: string, label: string) => void;
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
  } = props;

  return (
    <div className="pt-filter-content">
      <Divider />
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
                            // toggleNegative(filter.dataKey);
                          }}
                          checked={initialFilterState.removeNegative.indexOf(filter.dataKey) !== -1}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-filter-content__all-filter__reviews">
                <div className="pt-filter-content__all-filter__reviews__header">
                  <span className="pt-filter-content__all-filter__reviews__name">
                    {filterData.all.reviews.label}
                  </span>
                </div>
                <div className="filter-list">
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
                          toggleCheckboxFilter(filterData.dataKey, filterData.label);
                        }}
                        checked={initialFilterState.reviews.indexOf(filterData.label) !== -1}
                      />
                    );
                  })}
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
            </div>
            <Divider />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductTrackerFilter;
