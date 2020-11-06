import _ from 'lodash';
import get from 'lodash/get';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { filterTrackedProducts } from '../../actions/ProductTracker';
import { filterSupplierProducts } from '../../actions/Suppliers';
import './index.scss';

interface ActiveFilterProps {
  tableType: string;
  supplierFilterState: any;
  trackerFilterState: any;
  filterProfitFinderProducts: (value: string, filterData: any) => void;
  filterTrackerProducts: (filterData: any, groupId: any) => void;
  activeGroupId: any;
  filterSearch: string;
}

const ActiveFilters = (props: ActiveFilterProps) => {
  const {
    tableType,
    supplierFilterState,
    trackerFilterState,
    filterProfitFinderProducts,
    activeGroupId,
    filterSearch,
  } = props;
  const getFilter = () => {
    switch (tableType) {
      case 'products':
        return JSON.parse(localStorage.getItem('profitFinderFilterState') || '[]');
      // case 'trackerTable':
      //   return typeof localStorage.trackerFilter === 'undefined'
      //     ? null
      //     : JSON.parse(localStorage.trackerFilter);
    }
  };

  const [filterState, setFilterState] = React.useState(getFilter());
  const [filterIsActive, setFilterActive] = React.useState(false);

  useEffect(() => {
    if (!_.isEmpty(filterState)) {
      setFilterState(getFilter());
      console.log('filterState: ', filterState);
    }
  }, [supplierFilterState, trackerFilterState]);

  const activeFilterToggle = () => {
    console.log('activeFilterToggle: ', filterState);
    setFilterActive(!filterIsActive);
    localStorage.setItem('profitFinderFilterStateActive', JSON.stringify(!filterIsActive));
    // filterState.isActive = !filterIsActive;
    // console.log('activeFilterToggle after: ', filterState, !filterIsActive);
    // setFilterState(filterState)
    setFilter();
  };

  const setFilter = () => {
    const filterData = filterState;
    console.log('setFilter: ', filterData);
    switch (tableType) {
      case 'products': {
        filterProfitFinderProducts(filterSearch, filterData);
        localStorage.setItem('filterState', JSON.stringify(filterData));
        break;
      }
      case 'trackerTable': {
        filterTrackedProducts(filterData, activeGroupId);
        localStorage.setItem('trackerFilter', JSON.stringify(filterData));
        break;
      }
    }
  };

  return (
    <div className={`active-filters-wrapper `}>
      {filterState ? (
        <>
          <input
            key={`active-filter-toggle ${filterIsActive}`}
            checked={filterIsActive}
            onChange={() => {
              activeFilterToggle();
            }}
            type="checkbox"
          />
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  supplierFilterState: get(state, 'supplier.filterData'),
  trackerFilterState: get(state, 'productTracker.filterData'),
  activeGroupId: get(state, 'productTracker.menuItem'),
  filterSearch: get(state, 'supplier.filterSearch'),
});

const mapDispatchToProps = {
  filterProfitFinderProducts: (value: string, filterData: any) =>
    filterSupplierProducts(value, filterData),
  filterTrackerProducts: (filterData: any, groupId: any) =>
    filterTrackedProducts(filterData, groupId),
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveFilters);
