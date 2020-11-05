import React, { useEffect } from 'react';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import { customizablePresetData } from '../../constants/Suppliers';
import { NewFilterModel } from '../../interfaces/Filters';

interface PresetFilterProps {
  applyFilter: (data?: any) => void;
  filterData: any;
  resetPreset: () => void;
  togglePresetFilter: (value: boolean) => void;
  resetSingleFilter: (dataKey: any, type: any) => void;
}

const PresetFilter = (props: PresetFilterProps) => {
  const {
    applyFilter,
    filterData = [],
    resetPreset,
    togglePresetFilter,
    resetSingleFilter,
  } = props;
  const [localValues, setLocalValues] = React.useState(customizablePresetData);

  useEffect(() => {
    const data = filterData.filter((filter: any) => filter.type === 'preset');
    console.log('preset data: ', data);
    if (data.length <= 0) {
      reset();
    } else {
      const result = localValues.map((filter: any) => {
        for (const filter2 of data) {
          if (filter.dataKey === filter2.dataKey) {
            filter.value = filter2.value;
            filter.operation = filter2.operation;
            filter.isActive = filter2.isActive;
          }
        }
        return filter;
      });
      setLocalValues(result);
    }
  }, [filterData]);

  const reset = () => {
    const result = localValues.map((filter: any) => {
      filter.value = filter.defaultValue;
      filter.operation = filter.defaultOperation;
      filter.isActive = false;
      return filter;
    });
    setLocalValues(result);
  };

  const isPresetChecked = (dataKey: any) => {
    const data = filterData.filter((filter: any) => filter.type === 'preset');
    const index = data.findIndex((filter: any) => filter.dataKey === dataKey && filter.isActive);
    return index !== -1 ? true : false;
  };

  const setLocalData = (dataKey: string, type: string, value?: any) => {
    const filters: NewFilterModel[] = _.cloneDeep(localValues);
    console.log('setLocalData filters: ', filters);
    const filterMap = _.map(filters, data => {
      if (data.dataKey === dataKey) {
        if (type === 'operation') {
          data.operation = value;
        } else if (type === 'filter-value') {
          data.value = data.value !== undefined || data.value !== '' ? value : 0;
        } else if (type === 'toggle') {
          if (data.isActive) {
            console.log('setLocalData data: ', data, data.isActive);
            data.isActive = false;
            resetSingleFilter(dataKey, 'preset');
          } else {
            data.value = data.value || data.defaultValue;
            data.operation = data.operation || data.defaultOperation;
            data.isActive = true;
            applyFilter(data);
          }
        }

        if (data.isActive && type !== 'toggle') {
          applyFilter(data);
        }
      }
      return data;
    });
    setLocalValues(filterMap);
  };

  return (
    <div className={'presets-filter-content-wrapper'}>
      <div className="presets-filter-content-wrapper__header">
        <div className="presets-filter-content-wrapper__header__options">
          <span className="presets-filter-content-wrapper__header__options__filter-name">
            Quick Preset
          </span>
          <span
            className="presets-filter-content-wrapper__header__options__close-btn"
            onClick={() => togglePresetFilter(false)}
          >
            x
          </span>
        </div>
        <div className="presets-filter-content-wrapper__header__preset-reset">
          <p
            onClick={() => {
              resetPreset();
              reset();
            }}
          >
            x Reset
          </p>
        </div>
      </div>
      <div className={`presets-filter-content-wrapper__content `}>
        <span className="presets-filter-content-wrapper__content__filter-name">Customizable</span>
        {_.map(localValues, (filter, index) => {
          return (
            <div className="presets-filter-content-wrapper__content__filter-item" key={index}>
              <div className={`ui checkbox customizable-checkbox`} key={index}>
                <input
                  id={filter.dataKey}
                  checked={isPresetChecked(filter.dataKey)}
                  onChange={() => {
                    setLocalData(filter.dataKey, 'toggle');
                  }}
                  type="checkbox"
                />
                <label className="customizable-checkbox__label" htmlFor={filter.dataKey}>
                  {filter.label}
                </label>
                <Dropdown text={filter.operation || filter.defaultOperation} icon={'caret down'}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="≤"
                      onClick={() => {
                        setLocalData(filter.dataKey, 'operation', '≤');
                      }}
                    />
                    <Dropdown.Item
                      text="="
                      onClick={() => {
                        setLocalData(filter.dataKey, 'operation', '=');
                      }}
                    />
                    <Dropdown.Item
                      text="≥"
                      onClick={() => {
                        setLocalData(filter.dataKey, 'operation', '≥');
                      }}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                {filter.currency !== undefined && filter.currency}
                <div className="ui input">
                  <input
                    type="number"
                    value={filter.value === undefined ? filter.defaultValue : filter.value}
                    onBlur={evt => {
                      if (!evt.target.value) {
                        {
                          setLocalData(filter.dataKey, 'filter-value', filter.defaultValue);
                        }
                      }
                    }}
                    onChange={evt => {
                      setLocalData(filter.dataKey, 'filter-value', evt.target.value);
                    }}
                  />
                </div>
                {filter.targetValue !== undefined && filter.targetValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PresetFilter;
