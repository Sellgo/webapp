import React, { useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
// import { findMinMax } from '../../../constants/Suppliers';
// import { ProductTrackerFilter } from '../../../interfaces/Filters';
import { Product } from '../../../interfaces/Product';
// import { Range } from '../../../interfaces/Generic';
import get from 'lodash/get';
// import _ from 'lodash';
import { Button, Icon } from 'semantic-ui-react';
// import FilterContainer from '../../../components/FilterContainer';

interface Props {
  filteredProducts: Product[];
}

function ProductTrackerFilterSection() {
  // function ProductTrackerFilterSection(props: Props) {
  // const { filteredProducts } = props;

  const [filterType, setFilterType] = useState('');

  // const filteredRanges = findMinMax(filteredProducts);
  // const rangeData: any = _.cloneDeep(filteredRanges);

  // const filterInitialData: any = {
  //   reviews: [],
  //   period: [],
  //   productSize: 'Today',
  //   price: filteredRanges.price,
  //   profit: filteredRanges.profit,
  //   margin: filteredRanges.margin,
  //   roi: filteredRanges.roi,
  //   sales_monthly: filteredRanges.sales_monthly,
  //   rank: filteredRanges.rank,
  // };
  // const [filterState, setFilterState] = React.useState(filterInitialData);

  // const filterDataState: ProductTrackerFilter = {
  //   all: {
  //     filterRanges: [
  //       {
  //         label: 'Buy Box Price $',
  //         dataKey: 'price',
  //         minPlaceholder: 'Min',
  //         maxPlaceholder: 'Max',
  //         range: rangeData.price,
  //         filterRange: filterInitialData.price,
  //         sign: '$',
  //       },
  //       {
  //         label: 'Profit $',
  //         dataKey: 'profit',
  //         minPlaceholder: '$ Min',
  //         maxPlaceholder: '$ Max',
  //         range: rangeData.profit,
  //         filterRange: filterInitialData.profit,
  //         removeNegative: false,
  //         sign: '$',
  //       },
  //       {
  //         label: 'Profit Margin %',
  //         dataKey: 'margin',
  //         minPlaceholder: 'Min %',
  //         maxPlaceholder: 'Max %',
  //         range: rangeData.margin,
  //         filterRange: filterInitialData.margin,
  //         removeNegative: false,
  //         sign: '%',
  //       },
  //       {
  //         label: 'ROI/ Return On Investment %',
  //         dataKey: 'roi',
  //         minPlaceholder: 'Min %',
  //         maxPlaceholder: 'Max %',
  //         range: rangeData.roi,
  //         filterRange: filterInitialData.roi,
  //         removeNegative: false,
  //         sign: '%',
  //       },
  //       {
  //         label: 'Unit Sold',
  //         dataKey: 'sales_monthly',
  //         minPlaceholder: 'Min sold',
  //         maxPlaceholder: 'Max sold ',
  //         range: rangeData.sales_monthly,
  //         filterRange: filterInitialData.sales_monthly,
  //       },
  //       {
  //         label: 'Rank',
  //         dataKey: 'rank',
  //         minPlaceholder: 'Min rank',
  //         maxPlaceholder: 'Max rank ',
  //         range: rangeData.rank,
  //         filterRange: filterInitialData.rank,
  //       },
  //     ],
  //     reviews: [
  //       {
  //         label: 'Product Category',
  //         dataKey: 'product-category',
  //         radio: false,
  //         data: [
  //           {
  //             label: '1-star',
  //             dataKey: '1-star',
  //             checked: true,
  //           },
  //           {
  //             label: '2-star',
  //             dataKey: '2-star',
  //             checked: true,
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   period: {
  //     label: 'Period Reference',
  //     dataKey: 'product-size-tiers',
  //     checkedValue: 'Small standard-size',
  //     radio: true,
  //     data: [
  //       {
  //         label: 'Today',
  //         dataKey: 'today',
  //       },
  //       {
  //         label: 'Week',
  //         dataKey: 'week',
  //       },
  //       {
  //         label: 'Month',
  //         dataKey: 'mnth',
  //       },
  //       {
  //         label: '3 Month',
  //         dataKey: '3-Month',
  //       },
  //       {
  //         label: 'Year',
  //         dataKey: 'year',
  //       },
  //       {
  //         label: 'All (xxx days)',
  //         dataKey: 'all',
  //       }
  //     ],
  //   },
  // };
  // const [filterRanges, setFilterRanges] = React.useState(filterDataState.all.filterRanges);

  // const handleCompleteChange = (datakey: string, range: Range) => {
  //   const filterDetails: any = filterState;
  //   const data = _.map(filterRanges, filter => {
  //     if (filter.dataKey === datakey) {
  //       filter.filterRange = range;
  //     }
  //     return filter;
  //   });
  //   filterDetails[datakey] = range;
  //   setFilterState(filterDetails);
  //   setFilterRanges(data);
  // };

  // const resetSingleFilter = (datakey: string) => {
  //   const filterDetails = filterState;
  //   const data = _.map(filterRanges, filter => {
  //     if (filter.dataKey === datakey) {
  //       filter.filterRange = filter.range;
  //       filterDetails[datakey] = filter.range;
  //     }
  //     return filter;
  //   });
  //   setFilterRanges(data);
  //   setFilterState(filterDetails);
  // };

  // const applyFilter = () => {
  //   // filterProducts(filterSearch, filterState);
  //   console.log("Apply Filter: ", filterState)
  // };

  // const resetFilter = () => {
  //   const data = filterState;
  //   data.supplier_id = filterState.supplier_id;
  //   data.allFilter = [];
  //   data.productSize = 'All size';
  //   data.price = rangeData.price;
  //   data.profit = rangeData.profit;
  //   data.roi = rangeData.roi;
  //   data.sales_monthly = rangeData.sales_monthly;
  //   data.rank = rangeData.rank;

  //   const filterRangeKeys = Object.keys(rangeData);
  //   _.each(filterRangeKeys, key => {
  //     const ranges = _.map(filterRanges, filter => {
  //       if (filter.dataKey === key) {
  //         filter.filterRange = filter.range;
  //       }
  //       return filter;
  //     });
  //     setFilterRanges(ranges);
  //   });
  //   setFilterState(data);
  // };

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
        {/* <FilterContainer
          filterType={filterType}
          applyFilter={applyFilter}
          resetSingleFilter={resetSingleFilter}
          toggleCheckboxFilter={toggleCheckboxFilter}
          resetFilter={resetFilter}
          filterData={filterDataState}
          handleCompleteChange={handleCompleteChange}
          initialFilterState={filterState}
          setRadioFilter={setRadioFilter}
          toggleSelectAll={toggleSelectAll}
          isSelectAll={isSelectAll}
          selectAll={selectAll}
          toggleNegative={toggleNegative}
        /> */}
      </>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  filteredProducts: get(state, 'productTracker.filteredProducts'),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTrackerFilterSection);
