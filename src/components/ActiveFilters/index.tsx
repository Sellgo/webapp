import _ from 'lodash';
import get from 'lodash/get';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Icon } from 'semantic-ui-react';
import './index.scss';

const ActiveFilters = (props: any) => {
  const { sortedFiltersData, toggleFilter, resetSingleFilter } = props;

  const activeState = JSON.parse(localStorage.getItem('profitFinderFilterStateActive') || 'false');
  const [filterIsActive, setFilterActive] = React.useState(activeState);

  useEffect(() => {
    if (activeState) {
      setFilterActive(activeState);
    }
  }, [activeState]);
  useEffect(() => {
    if (_.isEmpty(sortedFiltersData)) {
      setFilterActive(false);
      localStorage.removeItem('profitFinderFilterStateActive');
    }
  }, [sortedFiltersData]);

  const activeFilterToggle = () => {
    setFilterActive(!filterIsActive);
    toggleFilter(!filterIsActive);
  };

  return (
    <div className="active-filters-wrapper">
      {sortedFiltersData ? (
        <>
          <Checkbox
            id="active-filters-toggle"
            className="active-filters-wrapper__toggle"
            checked={filterIsActive}
            onChange={() => {
              activeFilterToggle();
            }}
          />
          <label htmlFor="active-filters-toggle">
            <Icon className="active-filters-wrapper__icon" name="filter" />
            <span>Active Filters:</span>
          </label>

          <div className="active-filters-wrapper__items-wrapper">
            {_.map(sortedFiltersData, (filter: any, index: any) => {
              if (filter.type === 'range') {
                return (
                  <div className="active-filters-wrapper__items-wrapper__item" key={index}>
                    <p>
                      <span className="active-filters-wrapper__items-wrapper__item__title">
                        {filter.label}
                      </span>
                      <span className="active-filters-wrapper__items-wrapper__item__min">
                        {filter.range.min}
                      </span>
                      <span className="active-filters-wrapper__items-wrapper__item__to">to</span>
                      <span className="active-filters-wrapper__items-wrapper__item__max">
                        {filter.range.max}
                      </span>
                      <Icon
                        className="active-filters-wrapper__items-wrapper__item__icon"
                        name="times circle"
                        onClick={() => {
                          resetSingleFilter(filter.dataKey, filter.type);
                        }}
                      />
                    </p>
                  </div>
                );
              }
            })}
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
