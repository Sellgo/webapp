import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import FilterSliderInput from '../FilterSliderInput';
import { Checkbox, Button, Divider } from 'semantic-ui-react';
import { setIsScroll } from '../../actions/Suppliers';
import _ from 'lodash';
import { Range } from '../../interfaces/Generic';

interface AllFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleSelectAllReviews: () => void;
  filterData: ProductTrackerFilterInterface;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: ProductTrackerFilterState;
  isAllReviews: boolean;
  toggleReviewsCheckbox: (filterDataKey: string) => void;
  toggleNegative: (datakey: string) => void;
}

const AllFilter = (props: AllFilterProps) => {
  const {
    applyFilter,
    resetFilter,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    initialFilterState,
    toggleSelectAllReviews,
    isAllReviews,
    toggleReviewsCheckbox,
    toggleNegative,
  } = props;

  return (
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
        <div className="pt-filter-content__all-filter__wrapper__reviews">
          <div className="pt-filter-content__all-filter__wrapper__reviews__header">
            <span className="pt-filter-content__all-filter__wrapper__reviews__name">
              {filterData.all.reviews.label}
            </span>
          </div>
          <div className="pt-filter-content__all-filter__wrapper__reviews__list">
            <div className="ui checkbox">
              <input
                id="all-reviews"
                checked={isAllReviews}
                onChange={() => {
                  toggleSelectAllReviews();
                }}
                type="checkbox"
              />
              <label htmlFor="all-reviews"> All </label>
            </div>
            {_.map(filterData.all.reviews.data, (filterData, dataKey) => {
              return (
                <div className="ui checkbox" key={dataKey}>
                  <input
                    id={filterData.label}
                    checked={initialFilterState.reviews.indexOf(filterData.dataKey) !== -1}
                    onChange={() => {
                      toggleReviewsCheckbox(filterData.dataKey);
                    }}
                    type="checkbox"
                  />
                  <label htmlFor={filterData.label}> {filterData.label} </label>
                </div>
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
  );
};

const mapStateToProps = (state: any) => {
  return {
    isScrollSelector: get(state, 'supplier.setIsScroll'),
    scrollTop: get(state, 'supplier.setScrollTop'),
  };
};

const mapDispatchToProps = {
  setIsScroll: (value: boolean) => setIsScroll(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFilter);
