import React, { useState, useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Range } from '../../../interfaces/Generic';
import get from 'lodash/get';
import _ from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
import { ProductTrackerFilterInterface } from '../../../interfaces/Filters';
import ProductTrackerFilter from '../../../components/ProductTrackerFilter';
import { findMinMax, filterProductsByGroupId, DEFAULT_PERIOD } from '../../../constants/Tracker';
import {
  filterTrackedProducts,
  fetchAllSupplierProductTrackerDetails,
} from '../../../actions/ProductTracker';
import { sellerIDSelector } from '../../../selectors/Seller';
import { setSupplierPageNumber } from '../../../actions/Suppliers';

interface Props {
  setPageNumber: (pageNumber: number) => void;
  filterProducts: (filterData: any, groupId: any) => void;
  trackerDetails: any;
  activeGroupId: any;
  fetchAllTrackedProductDetails: (periodValue: any) => void;
  isLoadingTrackerProducts: boolean;
}

function ProductTrackerFilterSection(props: Props) {
  const {
    filterProducts,
    trackerDetails,
    activeGroupId,
    fetchAllTrackedProductDetails,
    isLoadingTrackerProducts,
    setPageNumber,
  } = props;
  const sellerID = sellerIDSelector();
  const filterStorage = JSON.parse(
    typeof localStorage.trackerFilter === 'undefined' ? null : localStorage.trackerFilter
  );
  const selectAllStorage = JSON.parse(
    typeof localStorage.filterSelectAllReviews === 'undefined' ||
      !filterStorage ||
      filterStorage.sellerID !== sellerID
      ? true
      : localStorage.filterSelectAllReviews
  );

  const [filterType, setFilterType] = useState('');
  const [isAllReviews, setAllReviews] = useState(selectAllStorage);
  const groupProducts = filterProductsByGroupId(trackerDetails.results, activeGroupId);
  const filteredRanges = findMinMax(groupProducts);
  const rangeData: any = _.cloneDeep(filteredRanges);
  const filterInitialData: any = {
    sellerID: sellerID,
    reviews: [],
    removeNegative: [],
    period: DEFAULT_PERIOD,
    avg_price: filteredRanges.avg_price,
    avg_profit: filteredRanges.avg_profit,
    avg_margin: filteredRanges.avg_margin,
    avg_roi: filteredRanges.avg_roi,
    avg_daily_sales: filteredRanges.avg_daily_sales,
    avg_rank: filteredRanges.avg_rank,
    customer_reviews: filteredRanges.customer_reviews,
    activeGroupId: activeGroupId,
  };
  const initialFilterState: any =
    filterStorage && filterStorage.sellerID === sellerID ? filterStorage : filterInitialData;

  const [filterState, setFilterState] = React.useState(initialFilterState);
  const [hasFilter, setHasFilter] = React.useState(false);

  useEffect(() => {
    /*
      Reset filter when changing groups
    */
    if (filterStorage && filterStorage.activeGroupId !== activeGroupId) {
      setFilterType('');
      resetFilter(true);
      const filterValue = filterState;
      filterValue.activeGroupId = activeGroupId;
      setFilterState(filterValue);
      filterProducts(filterState, activeGroupId);
      localStorage.setItem('trackerFilter', JSON.stringify(filterState));
    } else if (filterStorage) {
      setTimeout(() => {
        filterProducts(filterState, activeGroupId);
        localStorage.setItem('trackerFilter', JSON.stringify(filterState));
      }, 500);
    } else {
      resetFilter();
    }

    if (isAllReviews) {
      selectAllReviews(true);
    }

    setHasFilter(isFilterUse());
  }, [filterState, activeGroupId, filterType, isLoadingTrackerProducts]);

  const filterDataState: ProductTrackerFilterInterface = {
    all: {
      filterRanges: [
        {
          label: 'Avg Buy Box Price $',
          dataKey: 'avg_price',
          minPlaceholder: 'Min',
          maxPlaceholder: 'Max',
          range: rangeData.avg_price,
          filterRange: filterState.avg_price,
          sign: '$',
        },
        {
          label: 'Avg Profit $',
          dataKey: 'avg_profit',
          minPlaceholder: '$ Min',
          maxPlaceholder: '$ Max',
          range:
            filterState.removeNegative.indexOf('avg_profit') !== -1
              ? {
                  min: rangeData.avg_profit.min < 0 ? 0 : rangeData.avg_profit.min,
                  max: rangeData.avg_profit.max < 0 ? 0 : rangeData.avg_profit.max,
                }
              : rangeData.avg_profit,
          filterRange: filterState.avg_profit,
          removeNegative: false,
          sign: '$',
        },
        {
          label: 'Avg Profit Margin %',
          dataKey: 'avg_margin',
          minPlaceholder: 'Min %',
          maxPlaceholder: 'Max %',
          range:
            filterState.removeNegative.indexOf('avg_margin') !== -1
              ? {
                  min: rangeData.avg_margin.min < 0 ? 0 : rangeData.avg_margin.min,
                  max: rangeData.avg_margin.max < 0 ? 0 : rangeData.avg_margin.max,
                }
              : rangeData.avg_margin,
          filterRange: filterState.avg_margin,
          removeNegative: false,
          sign: '%',
        },
        {
          label: 'Avg ROI/ Return On Investment %',
          dataKey: 'avg_roi',
          minPlaceholder: 'Min %',
          maxPlaceholder: 'Max %',
          range:
            filterState.removeNegative.indexOf('avg_roi') !== -1
              ? {
                  min: rangeData.avg_roi.min < 0 ? 0 : rangeData.avg_roi.min,
                  max: rangeData.avg_roi.max < 0 ? 0 : rangeData.avg_roi.max,
                }
              : rangeData.avg_roi,
          filterRange: filterState.avg_roi,
          removeNegative: false,
          sign: '%',
        },
        {
          label: 'Avg Unit Sold',
          dataKey: 'avg_daily_sales',
          minPlaceholder: 'Min sold',
          maxPlaceholder: 'Max sold ',
          range: rangeData.avg_daily_sales,
          filterRange: filterState.avg_daily_sales,
        },
        {
          label: 'Avg Rank',
          dataKey: 'avg_rank',
          minPlaceholder: 'Min rank',
          maxPlaceholder: 'Max rank ',
          range: rangeData.avg_rank,
          filterRange: filterState.avg_rank,
        },
        {
          label: 'Total Review Count',
          dataKey: 'customer_reviews',
          minPlaceholder: 'Min rank',
          maxPlaceholder: 'Max rank ',
          range: rangeData.customer_reviews,
          filterRange: filterState.customer_reviews,
        },
      ],
      reviews: {
        label: 'Reviews',
        dataKey: 'reviews',
        radio: false,
        data: [
          {
            label: '1-star',
            dataKey: '1',
            checked: true,
          },
          {
            label: '2-star',
            dataKey: '2',
            checked: true,
          },
          {
            label: '3-star',
            dataKey: '3',
            checked: true,
          },
          {
            label: '4-star',
            dataKey: '4',
            checked: true,
          },
          {
            label: '5-star',
            dataKey: '5',
            checked: true,
          },
        ],
      },
    },
    period: {
      label: 'Period Reference',
      dataKey: 'period-reference',
      checkedValue: 'Today',
      radio: true,
      data: [
        {
          label: '1D',
          dataKey: 'today',
          value: 1,
        },
        {
          label: '7D',
          dataKey: 'week',
          value: 7,
        },
        {
          label: '30D',
          dataKey: 'month',
          value: 30,
        },
        {
          label: '90D',
          dataKey: '3-Month',
          value: 90,
        },
        {
          label: '365D',
          dataKey: 'year',
          value: 365,
        },
      ],
    },
  };
  const [filterRanges, setFilterRanges] = React.useState(filterDataState.all.filterRanges);
  const [filterReviews, setFilterReviews] = React.useState(filterDataState.all.reviews.data);

  const handleCompleteChange = (datakey: string, range: Range) => {
    const filterDetails: any = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = range;
      }
      return filter;
    });
    filterDetails[datakey] = range;
    setFilterState(filterDetails);
    setFilterRanges(data);
  };

  const toggleSelectAllReviews = () => {
    setAllReviews(!isAllReviews);
    const data = filterState;
    if (!isAllReviews) {
      selectAllReviews();
    } else {
      localStorage.setItem('filterSelectAllReviews', JSON.stringify(false));
      data.reviews = [];
      setFilterState(data);
    }
  };

  const selectAllReviews = (firstLoad?: boolean) => {
    if (!firstLoad) {
      localStorage.setItem('filterSelectAllReviews', JSON.stringify(true));
    }
    setAllReviews(true);
    const data = filterState;
    _.map(filterDataState.all.reviews.data, reviewsData => {
      if (data.reviews.indexOf(reviewsData.dataKey) === -1) {
        data.reviews.push(reviewsData.dataKey);
      }
      return reviewsData;
    });

    setFilterState(data);
  };

  const toggleCheckboxFilter = (filterDataKey: string) => {
    const data = filterState;
    setAllReviews(false);
    localStorage.setItem('filterSelectAllReviews', JSON.stringify(false));
    const tempReviews = _.map(filterReviews, review => {
      review.checked = data.reviews.indexOf(filterDataKey) !== -1;
      return review;
    });
    setFilterReviews(tempReviews);
    if (data.reviews.indexOf(filterDataKey) !== -1) {
      data.reviews.splice(data.reviews.indexOf(filterDataKey), 1);
    } else {
      data.reviews.push(filterDataKey);
      if (data.reviews.length === filterReviews.length) {
        selectAllReviews();
      }
    }
    setFilterState(data);
  };

  const setPeriod = (value: number) => {
    fetchAllTrackedProductDetails(value);
    const filterValue = filterState;
    filterValue.period = value;
    setFilterState(filterValue);
    localStorage.setItem('trackerFilter', JSON.stringify(filterState));
  };

  const toggleNegative = (datakey: string) => {
    const data = filterState;
    const filterDetails = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        if (data.removeNegative.indexOf(datakey) !== -1) {
          data.removeNegative.splice(data.removeNegative.indexOf(datakey), 1);
          filter.range = rangeData[datakey];
          filter.filterRange = rangeData[datakey];
          data[datakey] = rangeData[datakey];
        } else {
          data.removeNegative.push(datakey);
          filter.range = {
            min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
            max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
          };
          filter.filterRange = {
            min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
            max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
          };
          data[filter.dataKey] = {
            min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
            max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
          };
        }
      }
      return filter;
    });
    setFilterRanges(filterDetails);
    setFilterState(data);
  };

  const resetSingleFilter = (datakey: string) => {
    const ranges = findMinMax(groupProducts);
    const filterDetails = _.cloneDeep(filterState);
    const filterRangesData: any = _.cloneDeep(filterRanges);
    const data = _.map(filterRangesData, filter => {
      if (filter.dataKey === datakey) {
        if (filterDetails.removeNegative.indexOf(datakey) !== -1) {
          filter.range = ranges[datakey];
          filter.filterRange = {
            min: ranges[datakey].min < 0 ? 0 : ranges[datakey].min,
            max: ranges[datakey].max < 0 ? 0 : ranges[datakey].max,
          };
          filterDetails[datakey] = {
            min: ranges[datakey].min < 0 ? 0 : ranges[datakey].min,
            max: ranges[datakey].max < 0 ? 0 : ranges[datakey].max,
          };
        } else {
          filter.filterRange = ranges[datakey];
          filterDetails[datakey] = ranges[datakey];
        }
      }
      return filter;
    });
    setFilterRanges(data);
    setFilterState(filterDetails);
  };

  const applyFilter = () => {
    setPageNumber(1);
    setHasFilter(isFilterUse());
    filterProducts(filterState, activeGroupId);
    localStorage.setItem('trackerFilter', JSON.stringify(filterState));
  };

  const resetFilter = (fromPeriod?: boolean) => {
    const ranges = findMinMax(groupProducts);
    const data = filterState;
    data.sellerID = sellerIDSelector();
    if (!fromPeriod) {
      data.reviews = [];
      data.removeNegative = [];
      selectAllReviews();
    }
    data.avg_price = ranges.avg_price;

    data.avg_profit =
      fromPeriod && data.removeNegative.indexOf('avg_profit') !== -1
        ? {
            min: ranges.avg_profit.min < 0 ? 0 : ranges.avg_profit.min,
            max: ranges.avg_profit.max < 0 ? 0 : ranges.avg_profit.max,
          }
        : ranges.avg_profit;

    data.avg_margin =
      fromPeriod && data.removeNegative.indexOf('avg_margin') !== -1
        ? {
            min: ranges.avg_margin.min < 0 ? 0 : ranges.avg_margin.min,
            max: ranges.avg_margin.max < 0 ? 0 : ranges.avg_margin.max,
          }
        : ranges.avg_margin;

    data.avg_roi =
      fromPeriod && data.removeNegative.indexOf('avg_roi') !== -1
        ? {
            min: ranges.avg_roi.min < 0 ? 0 : ranges.avg_roi.min,
            max: ranges.avg_roi.max < 0 ? 0 : ranges.avg_roi.max,
          }
        : ranges.avg_roi;

    data.avg_daily_sales = ranges.avg_daily_sales;
    data.avg_rank = ranges.avg_rank;
    data.customer_reviews = ranges.customer_reviews;
    const filterRangeKeys = Object.keys(ranges);
    _.each(filterRangeKeys, key => {
      const ranges = _.map(filterRanges, filter => {
        if (filter.dataKey === key) {
          filter.filterRange = filter.range;
        }
        return filter;
      });
      setFilterRanges(ranges);
    });
    setFilterState(data);
  };

  const handleFilterType = (type: string) => {
    if (filterType === type) {
      setFilterType('');
      return;
    }
    setFilterType(type);
  };

  const isFilterUse = () => {
    const ranges = findMinMax(groupProducts);
    if (JSON.stringify(ranges.customer_reviews) !== JSON.stringify(filterState.customer_reviews))
      return true;
    if (JSON.stringify(ranges.avg_daily_sales) !== JSON.stringify(filterState.avg_daily_sales))
      return true;
    if (JSON.stringify(ranges.avg_profit) !== JSON.stringify(filterState.avg_profit)) return true;
    if (JSON.stringify(ranges.avg_margin) !== JSON.stringify(filterState.avg_margin)) return true;
    if (JSON.stringify(ranges.avg_price) !== JSON.stringify(filterState.avg_price)) return true;
    if (JSON.stringify(ranges.avg_rank) !== JSON.stringify(filterState.avg_rank)) return true;
    if (JSON.stringify(ranges.avg_roi) !== JSON.stringify(filterState.avg_roi)) return true;
    if (!isAllReviews) return true;
    return false;
  };

  return (
    <div className="tracker-filter-section">
      <div className="tracker-filter-section__header">
        <div className="tracker-filter-section__header__all-container">
          <Button
            basic
            icon
            labelPosition="left"
            className={`tracker-filter-section__header__all-container__button all-btn ${filterType ===
              'all-filter' && 'active'}`}
            onClick={() => handleFilterType('all-filter')}
          >
            <Icon
              className="tracker-filter-section__header__all-container__button__slider"
              name="sliders horizontal"
            />
            <span className="tracker-filter-section__header__all-container__button__name">All</span>
            <Icon name="filter" className={` ${hasFilter ? 'blue' : 'grey'} `} />
          </Button>
        </div>
        <div className="tracker-filter-section__header__period-container">
          {_.map(filterDataState.period.data, filterData => {
            return (
              <div
                className={`tracker-filter-section__header__period-container__period-items ${filterData.value ===
                  filterState.period && 'active'}`}
                key={filterData.dataKey}
              >
                <span
                  onClick={() => {
                    setPeriod(filterData.value || 1);
                  }}
                >
                  {filterData.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <>
        <ProductTrackerFilter
          filterType={filterType}
          applyFilter={applyFilter}
          resetSingleFilter={resetSingleFilter}
          resetFilter={resetFilter}
          filterData={filterDataState}
          handleCompleteChange={handleCompleteChange}
          initialFilterState={filterState}
          toggleSelectAllReviews={toggleSelectAllReviews}
          isAllReviews={isAllReviews}
          toggleCheckboxFilter={toggleCheckboxFilter}
          toggleNegative={toggleNegative}
        />
      </>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  isLoadingTrackerProducts: get(state, 'productTracker.isLoadingTrackerProducts'),
  activeGroupId: get(state, 'productTracker.menuItem'),
  trackerDetails: get(state, 'productTracker.trackerDetails'),
});

const mapDispatchToProps = {
  filterProducts: (filterData: any, groupId: any) => filterTrackedProducts(filterData, groupId),
  fetchAllTrackedProductDetails: (periodValue: any) =>
    fetchAllSupplierProductTrackerDetails(periodValue),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerFilterSection);
