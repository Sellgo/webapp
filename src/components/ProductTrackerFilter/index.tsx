import React from 'react';
import './index.scss';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import { Range } from '../../interfaces/Generic';
import AllFilter from './AllFilter';
import PresetFilter from './PresetFilter';

interface Props {
  filterType: string;
  applyFilter: (isPreset?: boolean) => void;
  resetFilter: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleSelectAllReviews: () => void;
  filterData: ProductTrackerFilterInterface;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: ProductTrackerFilterState;
  isAllReviews: boolean;
  toggleReviewsCheckbox: (filterDataKey: string) => void;
  toggleAmazonPresetCheckbox: (filterDataKey: string) => void;
  toggleNegative: (datakey: string) => void;
  resetPreset: () => void;
  setRadioFilter: (filterDataKey: string, label: string) => void;
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
    toggleReviewsCheckbox,
    toggleAmazonPresetCheckbox,
    toggleNegative,
    resetPreset,
    setRadioFilter,
  } = props;

  return (
    <div className="pt-filter-content">
      {filterType === 'all-filter' && (
        <AllFilter
          applyFilter={applyFilter}
          initialFilterState={initialFilterState}
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
      {filterType === 'more-filter' && (
        <PresetFilter
          applyFilter={applyFilter}
          initialFilterState={initialFilterState}
          filterData={filterData}
          setRadioFilter={setRadioFilter}
          toggleAmazonPresetCheckbox={toggleAmazonPresetCheckbox}
          resetPreset={resetPreset}
        />
      )}
    </div>
  );
}

export default ProductTrackerFilter;
