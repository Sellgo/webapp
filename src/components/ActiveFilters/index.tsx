import get from 'lodash/get';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';

const ActiveFilters = (props: any) => {
  const { filterData, toggleFilter } = props;

  const activeState = JSON.parse(localStorage.getItem('profitFinderFilterStateActive') || 'false');
  console.log('activeState: ', activeState);
  const [filterIsActive, setFilterActive] = React.useState(activeState);

  useEffect(() => {
    if (activeState) {
      setFilterActive(activeState);
    }
  }, [activeState]);

  const activeFilterToggle = () => {
    setFilterActive(!filterIsActive);
    toggleFilter(!filterIsActive);
  };

  return (
    <div className={`active-filters-wrapper `}>
      {filterData ? (
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
  filterSearch: get(state, 'supplier.filterSearch'),
});

export default connect(mapStateToProps)(ActiveFilters);
