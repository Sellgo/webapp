import React, { useState, useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Range } from '../../../interfaces/Generic';
import get from 'lodash/get';
import _ from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
import { ProductTrackerFilterInterface } from '../../../interfaces/Filters';
import ProductTrackerFilter from '../../../components/ProductTrackerFilter';
import {
  findMinMax,
  filterProductsByGroupId,
  DEFAULT_PERIOD,
  filterPeriods,
} from '../../../constants/Tracker';
import {
  filterTrackedProducts,
  fetchAllSupplierProductTrackerDetails,
  resetFilter,
  setProductTrackerPageNumber,
} from '../../../actions/ProductTracker';
import { sellerIDSelector } from '../../../selectors/Seller';
import ProfitabilityFilterPreset from '../../../components/ProfitabilityFilterPreset';

interface Props {
  setPageNumber: (pageNumber: number) => void;
  filterProducts: (filterData: any, groupId: any) => void;
  trackerDetails: any;
  resettingFilter: any;
  activeGroupId: any;
  fetchAllTrackedProductDetails: (periodValue: any) => void;
  filterReset: (data: boolean) => void;
  isLoadingTrackerProducts: boolean;
}

function ProductTrackerFilterSection(props: Props) {
  const {
    filterProducts,
    trackerDetails,
    activeGroupId,
    fetchAllTrackedProductDetails,
    isLoadingTrackerProducts,
    resettingFilter,
    filterReset,
    setPageNumber,
  } = props;
  const sellerID = sellerIDSelector();

  const filterStorage =
    typeof localStorage.trackerFilter === 'undefined' ||
    (JSON.parse(localStorage.trackerFilter) &&
      JSON.parse(localStorage.trackerFilter).sellerID !== sellerID)
      ? null
      : JSON.parse(localStorage.trackerFilter);

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
    amazonChoice: [],
    reviews: [],
    removeNegative: [],
    profitabilityFilter: {
      value: 'Profitable',
      active: false,
    },
    period: DEFAULT_PERIOD,
    avg_price: filteredRanges.avg_price,
    avg_profit: filteredRanges.avg_profit,
    avg_margin: filteredRanges.avg_margin,
    avg_roi: filteredRanges.avg_roi,
    avg_daily_sales: filteredRanges.avg_daily_sales,
    avg_rank: filteredRanges.avg_rank,
    customer_reviews: filteredRanges.customer_reviews,
    activeGroupId: activeGroupId,
    customizable: [
      {
        dataKey: 'listing-monthly',
        operation: '≤',
        value: 1200,
        active: false,
      },
      {
        dataKey: 'avg_profit',
        operation: '≤',
        value: 250,
        active: false,
      },
      {
        dataKey: 'avg_margin',
        operation: '≤',
        value: 15,
        active: false,
      },
      {
        dataKey: 'avg_price',
        operation: '≤',
        value: 20,
        active: false,
      },
      {
        dataKey: 'avg_daily_sales',
        operation: '≥',
        value: 90,
        active: false,
      },
      {
        dataKey: 'customer_reviews',
        operation: '≤',
        value: 25,
        active: false,
      },
    ],
  };
  const initialFilterState: any =
    filterStorage && filterStorage.sellerID === sellerID ? filterStorage : filterInitialData;

  const [filterState, setFilterState] = React.useState(initialFilterState);
  const [hasAllFilter, setHasAllFilter] = React.useState(false);

  if (filterState.amazonChoice === undefined) {
    filterState.amazonChoice = filterInitialData.amazonChoice;
  }
  if (filterState.profitabilityFilter === undefined) {
    filterState.profitabilityFilter = filterInitialData.profitabilityFilter;
  }
  if (filterState.customizable === undefined) {
    filterState.customizable = filterInitialData.customizable;
  }

  useEffect(() => {
    /*
      Reset filter when changing groups
    */
    if (filterState.customizable.length !== filterInitialData.customizable.length) {
      filterState.customizable = _.map(filterInitialData.customizable, (item: any) => {
        const item2 = _.findKey(filterState.customizable, { dataKey: item.dataKey });

        return _.extend(item, item2);
      });
    }
    if (!_.isEmpty(groupProducts)) {
      if (filterStorage && filterStorage.activeGroupId !== activeGroupId) {
        setFilterType('');
        const filterValue = filterState;
        filterValue.activeGroupId = activeGroupId;
        setFilterState(filterValue);
        filterProducts(filterState, activeGroupId);
        localStorage.setItem('trackerFilter', JSON.stringify(filterState));
      } else if (filterStorage) {
        if (resettingFilter) {
          resetFilter();
          setTimeout(() => {
            applyFilter();
            filterReset(false);
          }, 500);
        } else {
          setTimeout(() => {
            filterProducts(filterState, activeGroupId);
            localStorage.setItem('trackerFilter', JSON.stringify(filterState));
          }, 500);
        }
      } else {
        resetFilter();
      }

      if (isAllReviews) {
        selectAllReviews(true);
      }

      setHasAllFilter(isAllFilterUse());
    }
  }, [filterState, activeGroupId, filterType, isLoadingTrackerProducts, groupProducts]);

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
        label: 'Rating',
        dataKey: 'rating',
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
    period: filterPeriods,
    presets: [
      {
        label: 'Amazon',
        dataKey: 'amazon-choice-preset',
        radio: false,
        data: [
          {
            label: 'Amazon Choice Products',
            dataKey: 'amazon-choice-products',
            checked: true,
          },
          {
            label: 'Amazon is NOT a seller',
            dataKey: 'not-amazon-products',
            checked: true,
          },
        ],
      },
      {
        label: 'Customizable',
        dataKey: 'customizable-preset',
        radio: false,
        data: [
          {
            label: 'Listing generates',
            dataKey: 'listing-monthly',
            targetValue: '$/month',
          },
          {
            label: 'Profit is',
            dataKey: 'avg_profit',
            targetValue: '$/month',
          },
          {
            label: 'Profit Margin is',
            dataKey: 'avg_margin',
            targetValue: '%',
          },
          {
            label: 'Amazon price is',
            dataKey: 'avg_price',
            targetValue: '$',
          },
          {
            label: 'Estimated Sales Volume is',
            dataKey: 'avg_daily_sales',
            targetValue: '/month',
          },
          {
            label: 'Product review is',
            dataKey: 'customer_reviews',
            targetValue: 'reviews',
          },
        ],
      },
    ],
  };

  const [filterRanges, setFilterRanges] = React.useState(filterDataState.all.filterRanges);
  const [filterReviews, setFilterReviews] = React.useState(filterDataState.all.reviews.data);
  const [presetFilter, setPresetFilter] = React.useState(filterDataState.presets);

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

  const toggleReviewsCheckbox = (filterDataKey: string) => {
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

  const toggleAmazonPresetCheckbox = (filterDataKey: string) => {
    const data = filterState;
    const presetData = _.map(presetFilter, preset => {
      if (preset.dataKey === 'amazon-choice-preset') {
        _.map(preset.data, amzData => {
          amzData.checked = data.amazonChoice.indexOf(filterDataKey) !== -1;
          return amzData;
        });
      }
      return preset;
    });
    setPresetFilter(presetData);
    if (data.amazonChoice.indexOf(filterDataKey) !== -1) {
      data.amazonChoice.splice(data.amazonChoice.indexOf(filterDataKey), 1);
    } else {
      data.amazonChoice.push(filterDataKey);
    }
    setFilterState(data);
    applyFilter(true);
  };
  const setPeriod = (value: number) => {
    fetchAllTrackedProductDetails(value);
    const filterValue = filterState;
    filterValue.period = value;
    setFilterState(filterValue);
    localStorage.setItem('trackerFilter', JSON.stringify(filterState));
  };

  const toggleNegative = (datakey: string, isPreset?: boolean) => {
    const data = filterState;
    const filterDetails = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        if (isPreset) {
          if (data.removeNegative.indexOf(datakey) !== -1) {
            //only toggle negative slider if change is from preset
            data.removeNegative.splice(data.removeNegative.indexOf(datakey), 1);
            filter.range = rangeData[datakey];
            filter.filterRange = rangeData[datakey];
          }
        } else {
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
      }
      return filter;
    });

    //resets custom filter based on slider
    if (!isPreset) {
      toggleOffCustomFilter(datakey);
    }

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

  const customizableFilterWithSlider = (dataKey: string) => {
    const filterData = filterState;
    _.map(filterData.customizable, filter => {
      if (filter.dataKey === dataKey && filter.active && filterData[dataKey] !== undefined) {
        switch (filter.operation) {
          case '≤':
            filterData[dataKey].min = rangeData[dataKey].min;
            filterData[dataKey].max =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            break;
          case '≥':
            filterData[dataKey].min =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            filterData[dataKey].max = rangeData[dataKey].max;
            break;
          case '=':
            filterData[dataKey].min =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            filterData[dataKey].max =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            break;
          default:
            return null;
        }
      }
    });
    setFilterState(filterData);
  };

  const customizeFilterChange = (dataKey: string, type: string, value?: any) => {
    _.map(filterState.customizable, customizableData => {
      if (customizableData.dataKey === dataKey) {
        if (type === 'operation') {
          customizableData.operation = value;
        } else if (type === 'filter-value') {
          customizableData.value = value;
        } else if (type === 'toggle') {
          customizableData.active = !customizableData.active;
          if (!customizableData.active && filterState[dataKey]) {
            filterState[dataKey] = rangeData[dataKey];
          }
        }
      }
      return customizableData;
    });
    setFilterState(filterState);
    customizableFilterWithSlider(dataKey);
    //resets negative filter on slider based on custom filter key
    toggleNegative(dataKey, true);
    applyFilter(true);
  };

  const toggleOffCustomFilter = (dataKey: string) => {
    const filterData = filterState;
    _.map(filterData.customizable, filter => {
      if (filter.dataKey === dataKey && filter.active) {
        filter.active = false;
      }
      return filter;
    });
    setFilterState(filterData);
  };
  const applyFilter = (isPreset?: boolean) => {
    setPageNumber(1);
    setHasAllFilter(isAllFilterUse());

    if (
      !isPreset &&
      JSON.stringify(initialFilterState.avg_profit) !== JSON.stringify(filterState.avg_profit)
    ) {
      filterState.profitabilityFilter.active = false;
    }

    filterProducts(filterState, activeGroupId);
    localStorage.setItem('trackerFilter', JSON.stringify(filterState));
    if (!isPreset) {
      setFilterType('');
    }
  };

  const resetFilter = (onClick?: boolean) => {
    const ranges = findMinMax(groupProducts);
    const data = filterState;
    data.sellerID = sellerIDSelector();

    data.reviews = [];
    data.removeNegative = [];
    selectAllReviews();
    data.avg_price = ranges.avg_price;

    data.avg_profit = ranges.avg_profit;

    data.avg_margin = ranges.avg_margin;

    data.avg_roi = ranges.avg_roi;

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
    if (onClick) {
      setFilterType('');
    }
    applyFilter();
  };

  const resetAmazonChoicePreset = () => {
    const data = _.map(presetFilter, filter => {
      if (filter.dataKey === 'amazon-choice-preset') {
        _.map(filter.data, dk => {
          dk.checked = true;
          return dk;
        });
      }
      return filter;
    });
    const filterValue = filterState;
    filterState.amazonChoice = filterInitialData.amazonChoice;

    setPresetFilter(data);
    setFilterState(filterValue);
  };

  const resetPreset = () => {
    resetAmazonChoicePreset();
    applyFilter(true);
  };

  const setProfitability = (value?: any) => {
    const filterValue = _.cloneDeep(filterState);
    const objData = {
      value: value ? value : filterValue.profitabilityFilter.value,
      active: value ? true : !filterValue.profitabilityFilter.active,
    };
    filterValue.profitabilityFilter = objData;

    if (filterValue.profitabilityFilter.active) {
      if (filterValue.profitabilityFilter.value === 'Profitable') {
        filterValue.avg_profit.min = 0.01;
        filterValue.avg_profit.max = rangeData.avg_profit.max;
      } else if (filterValue.profitabilityFilter.value === 'Non-Profitable Products') {
        filterValue.avg_profit.min = rangeData.avg_profit.min;
        filterValue.avg_profit.max = 0;
      }
    } else {
      filterValue.avg_profit = rangeData.avg_profit;
    }
    setFilterState(filterValue);
  };

  const handleFilterType = (type: string) => {
    if (filterType === type) {
      setFilterType('');
      return;
    }
    setFilterType(type);
  };

  const isAllFilterUse = () => {
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
            <Icon name="filter" className={` ${hasAllFilter ? 'blue' : 'grey'} `} />
          </Button>
          <Button
            basic
            icon
            labelPosition="left"
            className={`tracker-filter-section__header__all-container__button more-btn ${filterType ===
              'more-filter' && 'active'}`}
            onClick={() => handleFilterType('more-filter')}
          >
            <span className="tracker-filter-section__header__all-container__button__name">
              More
            </span>
            <Icon name="angle down" />
          </Button>
          <ProfitabilityFilterPreset
            setProfitability={setProfitability}
            applyFilter={applyFilter}
            filterState={filterState}
          />
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
          filterState={filterState}
          initialFilterState={filterInitialData}
          toggleSelectAllReviews={toggleSelectAllReviews}
          isAllReviews={isAllReviews}
          toggleReviewsCheckbox={toggleReviewsCheckbox}
          toggleAmazonPresetCheckbox={toggleAmazonPresetCheckbox}
          toggleNegative={toggleNegative}
          resetPreset={resetPreset}
          customizeFilterChange={customizeFilterChange}
        />
      </>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  isLoadingTrackerProducts: get(state, 'productTracker.isLoadingTrackerProducts'),
  activeGroupId: get(state, 'productTracker.menuItem'),
  trackerDetails: get(state, 'productTracker.trackerDetails'),
  resettingFilter: get(state, 'productTracker.resettingFilter'),
});

const mapDispatchToProps = {
  filterProducts: (filterData: any, groupId: any) => filterTrackedProducts(filterData, groupId),
  filterReset: (data: boolean) => resetFilter(data),
  fetchAllTrackedProductDetails: (periodValue: any) =>
    fetchAllSupplierProductTrackerDetails(periodValue),
  setPageNumber: (pageNumber: number) => setProductTrackerPageNumber(pageNumber),
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerFilterSection);
