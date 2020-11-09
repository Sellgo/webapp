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

          <div className="active-filters-wrapper__items-wrapper">
            <div className="active-filters-wrapper__items-wrapper__item">
              <p>
                <span className="active-filters-wrapper__items-wrapper__item__title">ROI</span>
                <span className="active-filters-wrapper__items-wrapper__item__min">20%</span>
                <span className="active-filters-wrapper__items-wrapper__item__to">to</span>
                <span className="active-filters-wrapper__items-wrapper__item__max">50%</span>
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  filterSearch: get(state, 'supplier.filterSearch'),
});

export default connect(mapStateToProps)(ActiveFilters);
