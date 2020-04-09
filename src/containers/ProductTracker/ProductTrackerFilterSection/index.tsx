import React, { useState } from 'react';
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

interface Props {
  filteredProducts: Product[];
}

function ProductTrackerFilterSection(props: Props) {
  const { filteredProducts } = props;

  const [filterType, setFilterType] = useState('');

  const filteredRanges = findNewMinMaxRange(filteredProducts);
  const rangeData: any = _.cloneDeep(filteredRanges);

  console.log('filteredProducts: ', filteredProducts);
  console.log('rangeData: ', filteredRanges);
  const filterInitialData: any = {
    reviews: [],
    period: [],
    removeNegative: [],
    productSize: 'Today',
    avg_price: filteredRanges.avg_price,
    avg_profit: filteredRanges.avg_profit,
    avg_margin: filteredRanges.avg_margin,
    avg_roi: filteredRanges.avg_roi,
    avg_daily_sales: filteredRanges.avg_daily_sales,
    avg_rank: filteredRanges.avg_rank,
    customer_reviews: filteredRanges.customer_reviews,
  };
  const [filterState, setFilterState] = React.useState(filterInitialData);
  const filterDataState: ProductTrackerFilterInterface = {
    all: {
      filterRanges: [
        {
          label: 'Avg Buy Box Price $',
          dataKey: 'avg_price',
          minPlaceholder: 'Min',
          maxPlaceholder: 'Max',
          range: rangeData.avg_price,
          filterRange: filterInitialData.avg_price,
          sign: '$',
        },
        {
          label: 'Avg Profit $',
          dataKey: 'avg_profit',
          minPlaceholder: '$ Min',
          maxPlaceholder: '$ Max',
          range: rangeData.avg_profit,
          filterRange: filterInitialData.avg_profit,
          removeNegative: false,
          sign: '$',
        },
        {
          label: 'Avg Profit Margin %',
          dataKey: 'avg_margin',
          minPlaceholder: 'Min %',
          maxPlaceholder: 'Max %',
          range: rangeData.avg_margin,
          filterRange: filterInitialData.avg_margin,
          removeNegative: false,
          sign: '%',
        },
        {
          label: 'Avg ROI/ Return On Investment %',
          dataKey: 'avg_roi',
          minPlaceholder: 'Min %',
          maxPlaceholder: 'Max %',
          range: rangeData.avg_roi,
          filterRange: filterInitialData.avg_roi,
          removeNegative: false,
          sign: '%',
        },
        {
          label: 'Avg Unit Sold',
          dataKey: 'avg_daily_sales',
          minPlaceholder: 'Min sold',
          maxPlaceholder: 'Max sold ',
          range: rangeData.avg_daily_sales,
          filterRange: filterInitialData.avg_daily_sales,
        },
        {
          label: 'Avg Rank',
          dataKey: 'avg_rank',
          minPlaceholder: 'Min rank',
          maxPlaceholder: 'Max rank ',
          range: rangeData.avg_rank,
          filterRange: filterInitialData.avg_rank,
        },
        {
          label: 'Total Review Count',
          dataKey: 'customer_reviews',
          minPlaceholder: 'Min rank',
          maxPlaceholder: 'Max rank ',
          range: rangeData.customer_reviews,
          filterRange: filterInitialData.customer_reviews,
        },
      ],
      reviews: [
        {
          label: 'Product Category',
          dataKey: 'product-category',
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
          ],
        },
      ],
    },
    period: {
      label: 'Period Reference',
      dataKey: 'product-size-tiers',
      checkedValue: 'Small standard-size',
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
  console.log('filterDataState: ', filterDataState);
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
    // filterProducts(filterSearch, filterState);
    console.log('Apply Filter: ', filterState);
  };

  const resetFilter = () => {
    const data = filterState;
    data.supplier_id = filterState.supplier_id;
    data.allFilter = [];
    data.productSize = 'All size';
    data.price = rangeData.price;
    data.profit = rangeData.profit;
    data.roi = rangeData.roi;
    data.sales_monthly = rangeData.sales_monthly;
    data.rank = rangeData.rank;

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
        />
      </>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  filteredProducts: get(state, 'productTracker.filteredProducts'),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerFilterSection);
