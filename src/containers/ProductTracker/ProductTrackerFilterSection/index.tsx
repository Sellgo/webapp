import React, { useState, useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Product } from '../../../interfaces/Product';
import { Range } from '../../../interfaces/Generic';
import get from 'lodash/get';
import _ from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
import { ProductTrackerFilterInterface } from '../../../interfaces/Filters';
import ProductTrackerFilter from '../../../components/ProductTrackerFilter';
import { findNewMinMaxRange } from '../../../constants/Tracker';
import { filterTrackedProducts } from '../../../actions/ProductTracker';

interface Props {
  filteredProducts: Product[];
  filterProducts: (value: string, filterData: any, groupId: any) => void;
  filterSearch: string;
  trackerDetails: any;
  activeGroupId: any;
}

function ProductTrackerFilterSection(props: Props) {
  const { filteredProducts, filterProducts, filterSearch, trackerDetails, activeGroupId } = props;

  const [filterType, setFilterType] = useState('');
  const [isAllReviews, setAllReviews] = useState(true);

  console.log('activeGroupId: ', activeGroupId);
  console.log('trackerDetails: ', trackerDetails);
  const filteredRanges = findNewMinMaxRange(trackerDetails.results);
  const rangeData: any = _.cloneDeep(filteredRanges);

  console.log('filteredProducts: ', filteredProducts);
  const filterInitialData: any = {
    reviews: [],
    removeNegative: [],
    period: 'Today',
    avg_price: filteredRanges.avg_price,
    avg_profit: filteredRanges.avg_profit,
    avg_margin: filteredRanges.avg_margin,
    avg_roi: filteredRanges.avg_roi,
    avg_daily_sales: filteredRanges.avg_daily_sales,
    avg_rank: filteredRanges.avg_rank,
    customer_reviews: filteredRanges.customer_reviews,
  };
  const [filterState, setFilterState] = React.useState(filterInitialData);

  useEffect(() => {
    if (isAllReviews) {
      selectAllReviews();
    }
    filterProducts(filterSearch, filterState, activeGroupId);
  }, [filterState, activeGroupId]);

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
              ? { min: 0, max: rangeData.avg_profit.max }
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
              ? { min: 0, max: rangeData.avg_margin.max }
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
              ? { min: 0, max: rangeData.avg_roi.max }
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
            dataKey: '1-star',
            checked: true,
          },
          {
            label: '2-star',
            dataKey: '2-star',
            checked: true,
          },
          {
            label: '3-star',
            dataKey: '3-star',
            checked: true,
          },
          {
            label: '4-star',
            dataKey: '4-star',
            checked: true,
          },
          {
            label: '5-star',
            dataKey: '5-star',
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
          label: 'Today',
          dataKey: 'today',
        },
        {
          label: 'Week',
          dataKey: 'week',
        },
        {
          label: 'Month',
          dataKey: 'mnth',
        },
        {
          label: '3 Month',
          dataKey: '3-Month',
        },
        {
          label: 'Year',
          dataKey: 'year',
        },
        {
          label: 'All (xxx days)',
          dataKey: 'all',
        },
      ],
    },
  };
  const [trackerFilterData, setTrackerFilterData] = React.useState(filterDataState);
  const [filterRanges, setFilterRanges] = React.useState(filterDataState.all.filterRanges);

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
      data.reviews = [];
      setFilterState(data);
    }
  };

  const selectAllReviews = () => {
    setAllReviews(true);
    const data = filterState;
    _.map(filterDataState.all.reviews.data, reviewsData => {
      if (data.reviews.indexOf(reviewsData.label) === -1) {
        data.reviews.push(reviewsData.label);
      }
      return reviewsData;
    });

    setFilterState(data);
  };

  const toggleCheckboxFilter = (filterDataKey: string, label: string) => {
    const data = _.cloneDeep(filterState);
    setAllReviews(false);
    _.map(filterDataState.all.reviews.data, reviewsData => {
      if (filterDataKey === reviewsData.dataKey) {
        reviewsData.checked = data.reviews.indexOf(filterDataKey) !== -1;
      }
      return reviewsData;
    });
    if (data.reviews.indexOf(label) !== -1) {
      data.reviews.splice(data.reviews.indexOf(label), 1);
    } else {
      data.reviews.push(label);
    }
    setFilterState(data);
  };

  const setPeriod = (value: string) => {
    const data = _.cloneDeep(trackerFilterData);
    data.period.checkedValue = value;
    const filterValue = filterState;
    filterState.period = value;
    setTrackerFilterData(data);
    setFilterState(filterValue);
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
          filter.range = { min: 0, max: rangeData[datakey].max };
          filter.filterRange = { min: 0, max: rangeData[datakey].max };
          data[filter.dataKey] = { min: 0, max: rangeData[datakey].max };
        }
      }
      return filter;
    });
    setFilterRanges(filterDetails);
    setFilterState(data);
  };

  const resetSingleFilter = (datakey: string) => {
    const filterDetails = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = filter.range;
        filterDetails[datakey] = filter.range;
      }
      return filter;
    });
    setFilterRanges(data);
    setFilterState(filterDetails);
  };

  const applyFilter = () => {
    filterProducts(filterSearch, filterState, activeGroupId);
    console.log('Apply Filter: ', filterState);
  };

  const resetFilter = () => {
    const data = filterState;
    data.reviews = [];
    data.period = [];
    data.removeNegative = [];
    data.productSize = 'Today';
    data.avg_price = rangeData.avg_price;
    data.avg_profit = rangeData.avg_profit;
    data.avg_margin = rangeData.avg_margin;
    data.avg_roi = rangeData.avg_roi;
    data.avg_daily_sales = rangeData.avg_daily_sales;
    data.avg_rank = rangeData.avg_rank;
    data.customer_reviews = rangeData.customer_reviews;
    selectAllReviews();
    const filterRangeKeys = Object.keys(rangeData);
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

  return (
    <div className="tracker-filter-section">
      <div className="tracker-filter-section__header">
        <Button
          basic
          icon
          labelPosition="left"
          className={`tracker-filter-section__header__button ${
            filterType === 'all-filter' ? 'active' : ''
          }`}
          onClick={() => handleFilterType('all-filter')}
        >
          <span className="tracker-filter-section__header__button__name">All</span>
          <Icon
            className="tracker-filter-section__header__button__slider"
            name="sliders horizontal"
          />
        </Button>
        <Button
          basic
          icon
          labelPosition="left"
          className={`tracker-filter-section__header__button ${
            filterType === 'period-filter' ? 'active' : ''
          }`}
          onClick={() => handleFilterType('period-filter')}
        >
          <span className="tracker-filter-section__header__button__name">Period</span>
          <Icon
            className="tracker-filter-section__header__button__slider"
            name="sliders horizontal"
          />
        </Button>
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
          setPeriod={setPeriod}
          toggleNegative={toggleNegative}
        />
      </>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  activeGroupId: get(state, 'productTracker.menuItem'),
  filteredProducts: get(state, 'productTracker.filteredProducts'),
  filterSearch: get(state, 'productTracker.filterSearch'),
  trackerDetails: get(state, 'productTracker.trackerDetails'),
});

const mapDispatchToProps = {
  filterProducts: (value: string, filterData: any, groupId: any) =>
    filterTrackedProducts(value, filterData, groupId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerFilterSection);
