import React from 'react';
import './index.scss';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import { Range } from '../../interfaces/Generic';
import AllFilter from './AllFilter';

interface Props {
  filterType: string;
  applyFilter: (isPreset?: boolean) => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleSelectAllReviews: () => void;
  filterData: ProductTrackerFilterInterface;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  filterState: ProductTrackerFilterState;
  isAllReviews: boolean;
  toggleReviewsCheckbox: (filterDataKey: string) => void;
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
    toggleSelectAllReviews,
    isAllReviews,
    toggleReviewsCheckbox,
    toggleNegative,
    filterState,
  } = props;

  return (
    <div className="pt-filter-content">
      {filterType === 'all-filter' && (
        <AllFilter
          applyFilter={applyFilter}
          filterState={filterState}
          filterData={filterData}
          toggleNegative={toggleNegative}
          toggleSelectAllReviews={toggleSelectAllReviews}
          isAllReviews={isAllReviews}
          toggleReviewsCheckbox={toggleReviewsCheckbox}
          resetFilter={resetFilter}
          handleCompleteChange={handleCompleteChange}
          resetSingleFilter={resetSingleFilter}
        />
      )}
    </div>
  );
}

export default ProductTrackerFilter;
