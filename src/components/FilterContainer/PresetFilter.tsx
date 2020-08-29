import React from 'react';
import { FilterState, SupplierFilter } from '../../interfaces/Filters';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';

interface PresetFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  filterData: SupplierFilter;
  initialFilterState: FilterState;
  resetPreset: () => void;
  customizeFilterChange: (dataKey: string, type: string, value?: any) => void;
}

const PresetFilter = (props: PresetFilterProps) => {
  const { applyFilter, filterData, initialFilterState, resetPreset, customizeFilterChange } = props;

  return (
    <div className={'presets-filter-content-wrapper'}>
      <div className="presets-filter-content-wrapper__header">
        <span className="presets-filter-content-wrapper__header__filter-name">Quick Preset</span>
        <div className="presets-filter-content-wrapper__header__preset-reset">
          <p
            onClick={() => {
              resetPreset();
              applyFilter();
            }}
          >
            x Reset
          </p>
        </div>
      </div>
      {_.map(filterData.presets, (filter, key) => {
        return (
          <div className={`presets-filter-content-wrapper__content ${filter.dataKey}`} key={key}>
            {filter.dataKey === 'customizable-preset' && (
              <>
                <span className="presets-filter-content-wrapper__content__filter-name">
                  {filter.label}
                </span>
                {_.map(filter.data, (filterData, index) => {
                  return (
                    <div
                      className="presets-filter-content-wrapper__content__filter-item"
                      key={index}
                    >
                      <div className={`ui checkbox customizable-checkbox`} key={index}>
                        <input
                          id={filterData.dataKey}
                          checked={
                            initialFilterState.customizable[index] &&
                            initialFilterState.customizable[index].active
                          }
                          onChange={() => {
                            customizeFilterChange(filterData.dataKey, 'toggle');
                            // toggleCheckboxFilter(filterData.dataKey, filterData.label);
                          }}
                          type="checkbox"
                        />
                        <label htmlFor={filterData.dataKey}>{filterData.label}</label>
                        <Dropdown
                          text={
                            initialFilterState.customizable[index] &&
                            initialFilterState.customizable[index].operation
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
                              initialFilterState.customizable[index] &&
                              initialFilterState.customizable[index].value
                            }
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

export default PresetFilter;
