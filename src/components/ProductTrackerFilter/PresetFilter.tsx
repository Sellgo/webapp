import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { ProductTrackerFilterInterface, ProductTrackerFilterState } from '../../interfaces/Filters';
import { setIsScroll } from '../../actions/Suppliers';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';

interface PresetFilterProps {
  filterData: ProductTrackerFilterInterface;
  filterState: ProductTrackerFilterState;
  initialFilterState: ProductTrackerFilterState;
  resetPreset: () => void;
  toggleAmazonPresetCheckbox: (filterDataKey: string) => void;
  customizeFilterChange: (dataKey: string, type: string, value?: any) => void;
}

const PresetFilter = (props: PresetFilterProps) => {
  const {
    filterData,
    initialFilterState,
    resetPreset,
    toggleAmazonPresetCheckbox,
    customizeFilterChange,
    filterState,
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
                        checked={filterState.amazonChoice.indexOf(filterData.dataKey) !== -1}
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
            {filter.dataKey === 'customizable-preset' && (
              <>
                <span className="pt-filter-content__preset-filter__content__filter-name">
                  {filter.label}
                </span>
                {_.map(filter.data, (filterData, index) => {
                  return (
                    <div
                      className="pt-filter-content__preset-filter__content__filter-item"
                      key={index}
                    >
                      <div className={`ui checkbox customizable-checkbox`} key={index}>
                        <input
                          id={filterData.dataKey}
                          checked={
                            filterState.customizable[index] &&
                            filterState.customizable[index].active
                          }
                          onChange={() => {
                            customizeFilterChange(filterData.dataKey, 'toggle');
                          }}
                          type="checkbox"
                        />
                        <label htmlFor={filterData.dataKey}>{filterData.label}</label>
                        <Dropdown
                          text={
                            filterState.customizable[index] &&
                            filterState.customizable[index].operation
                          }
                          icon={'caret down'}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item
                              text="≤"
                              onClick={() =>
                                customizeFilterChange(filterData.dataKey, 'operation', '≤')
                              }
                            />
                            <Dropdown.Item
                              text="="
                              onClick={() =>
                                customizeFilterChange(filterData.dataKey, 'operation', '=')
                              }
                            />
                            <Dropdown.Item
                              text="≥"
                              onClick={() =>
                                customizeFilterChange(filterData.dataKey, 'operation', '≥')
                              }
                            />
                          </Dropdown.Menu>
                        </Dropdown>
                        <div className="ui input">
                          <input
                            type="number"
                            value={
                              filterState.customizable[index] &&
                              filterState.customizable[index].value
                            }
                            onBlur={evt => {
                              if (!evt.target.value) {
                                customizeFilterChange(
                                  filterData.dataKey,
                                  'filter-value',
                                  initialFilterState.customizable[index].value
                                );
                              }
                            }}
                            onChange={evt =>
                              customizeFilterChange(
                                filterData.dataKey,
                                'filter-value',
                                evt.target.value
                              )
                            }
                          />
                        </div>
                        {filterData.targetValue}
                      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PresetFilter);
