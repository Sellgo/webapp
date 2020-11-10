import _ from 'lodash';
import get from 'lodash/get';
import React, { useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect } from 'react-redux';
import { Checkbox, Icon } from 'semantic-ui-react';
import { formatNumber, formatPercent } from '../../utils/format';
import './index.scss';

const ActiveFilters = (props: any) => {
  const { filtersData, toggleFilter, resetSingleFilter } = props;

  const activeState = JSON.parse(localStorage.getItem('profitFinderFilterStateActive') || 'false');
  const [isShadow, setShadow] = React.useState(false);
  const [filterIsActive, setFilterActive] = React.useState(activeState);

  const activeFilterRef = useRef(null);

  useEffect(() => {
    if (activeState) {
      setFilterActive(activeState);
    }
  }, [activeState]);
  useEffect(() => {
    if (_.isEmpty(filtersData)) {
      setFilterActive(false);
      localStorage.removeItem('profitFinderFilterStateActive');
    }
    handleShadow();
  }, [filtersData]);

  const activeFilterToggle = () => {
    setFilterActive(!filterIsActive);
    toggleFilter(!filterIsActive);
  };

  const handleShadow = () => {
    const parentRef = (activeFilterRef as any).current;
    if (
      parentRef &&
      parentRef.container.current.scrollWidth > parentRef.container.current.clientWidth
    ) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  const isOverflown = () => {
    return isShadow;
  };

  return (
    <div className={`active-filters-wrapper ${isOverflown() && 'shadow'}`}>
      {filtersData ? (
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
            <span>Active Filters:</span>
          </label>

          <div className={`active-filters-wrapper__items-wrapper `}>
            <ScrollContainer
              ref={activeFilterRef}
              className="scroll-container"
              vertical={false}
              // ignoreElements={'.custom-form-control'}
            >
              {_.map(filtersData, (filter: any, index: any) => {
                if (filter.type === 'range') {
                  return (
                    <div className="active-filters-wrapper__items-wrapper__item" key={index}>
                      <p className="active-filters-wrapper__items-wrapper__item__title">
                        {filter.label}
                      </p>
                      <p className="active-filters-wrapper__items-wrapper__item__min">
                        {filter.sign === '$' && filter.sign}
                        {filter.sign === '$'
                          ? formatNumber(filter.range.min)
                          : filter.sign === '%'
                          ? formatPercent(filter.range.min)
                          : filter.range.min}
                      </p>
                      <p className="active-filters-wrapper__items-wrapper__item__to">to</p>
                      <p className="active-filters-wrapper__items-wrapper__item__max">
                        {filter.sign === '$' && filter.sign}
                        {filter.sign === '$'
                          ? formatNumber(filter.range.max)
                          : filter.sign === '%'
                          ? formatPercent(filter.range.max)
                          : filter.range.max}
                      </p>
                      <Icon
                        className="active-filters-wrapper__items-wrapper__item__icon"
                        name="times circle"
                        onClick={() => {
                          resetSingleFilter(filter.dataKey, filter.type);
                        }}
                      />
                    </div>
                  );
                }
              })}
            </ScrollContainer>
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
