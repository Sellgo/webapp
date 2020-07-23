import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import { setIsScroll } from '../../actions/Suppliers';
import _ from 'lodash';

interface AllFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  filterData: ProductTrackerFilterInterface;
  initialFilterState: ProductTrackerFilterState;
  resetPreset: () => void;
  setRadioFilter: (filterDataKey: string, label: string) => void;
  toggleAmazonPresetCheckbox: (filterDataKey: string) => void;
}

const AllFilter = (props: AllFilterProps) => {
  const {
    applyFilter,
    filterData,
    initialFilterState,
    setRadioFilter,
    resetPreset,
    toggleAmazonPresetCheckbox,
  } = props;

  return (
    <div className={'pt-filter-content__preset-filter'}>
      <div className="pt-filter-content__preset-filter__header">
        <span className="pt-filter-content__preset-filter__header__filter-name">Quick Preset</span>
        <div className="pt-filter-content__preset-filter__header__preset-reset">
          <p onClick={() => resetPreset()}>x Reset</p>
        </div>
      </div>
      {_.map(filterData.presets, (filter, key) => {
        return (
          <div className={`pt-filter-content__preset-filter__content ${filter.dataKey}`} key={key}>
            {filter.dataKey === 'profitability-preset' && (
              <>
                <span className="pt-filter-content__preset-filter__content__filter-name">
                  {filter.label}
                </span>
                {_.map(filter.data, (filterData, dataKey) => {
                  return (
                    <div className={`ui radio checkbox ${filter.checkedValue}`} key={dataKey}>
                      <input
                        id={filterData.dataKey}
                        checked={initialFilterState.profitability === filterData.label}
                        onChange={() => {
                          setRadioFilter(filterData.dataKey, filterData.label);
                          applyFilter(true);
                        }}
                        type="radio"
                      />
                      <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                    </div>
                  );
                })}
              </>
            )}
            {filter.dataKey === 'amazon-choice-preset' && (
              <>
                <span className="pt-filter-content__preset-filter__content__filter-name">
                  {filter.label}
                </span>
                {_.map(filter.data, (filterData, dataKey) => {
                  return (
                    <div className={`ui checkbox`} key={dataKey}>
                      <input
                        id={filterData.dataKey}
                        checked={initialFilterState.amazonChoice.indexOf(filterData.dataKey) !== -1}
                        onChange={() => {
                          toggleAmazonPresetCheckbox(filterData.dataKey);
                        }}
                        type="checkbox"
                      />
                      <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isScrollSelector: get(state, 'supplier.setIsScroll'),
    scrollTop: get(state, 'supplier.setScrollTop'),
  };
};

const mapDispatchToProps = {
  setIsScroll: (value: boolean) => setIsScroll(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(AllFilter);
