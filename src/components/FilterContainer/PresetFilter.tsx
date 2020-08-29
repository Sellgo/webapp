import React from 'react';
import { FilterState, SupplierFilter } from '../../interfaces/Filters';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';

interface PresetFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  filterData: SupplierFilter;
  initialFilterState: FilterState;
  resetPreset: () => void;
}

const PresetFilter = (props: PresetFilterProps) => {
  const { applyFilter, filterData, initialFilterState, resetPreset } = props;

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
                {_.map(filter.data, (filterData, dataKey) => {
                  const customizableData = _.filter(initialFilterState.customizable, data => {
                    console.log('data: ', data);
                    console.log('filterData: ', filterData);
                    return data.dataKey === filterData.dataKey;
                  });
                  console.log('customizableData: ', customizableData);

                  return (
                    <div
                      className="presets-filter-content-wrapper__content__filter-item"
                      key={dataKey}
                    >
                      <div className={`ui checkbox customizable-checkbox`} key={dataKey}>
                        <input
                          id={filterData.dataKey}
                          checked={initialFilterState.allFilter.indexOf(filterData.label) !== -1}
                          onChange={() => {
                            // toggleCheckboxFilter(filterData.dataKey, filterData.label);
                          }}
                          type="checkbox"
                        />
                        <label htmlFor={filterData.dataKey}>{filterData.label}</label>
                        <Dropdown
                          text={customizableData[0] && customizableData[0].operation}
                          icon={'caret down'}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Item text="≤" />
                            <Dropdown.Item text="=" />
                            <Dropdown.Item text="≥" />
                          </Dropdown.Menu>
                        </Dropdown>
                        <div className="ui input">
                          <input
                            type="number"
                            value={filterData.value}
                            // onChange={this.handlePasswordChange}
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
