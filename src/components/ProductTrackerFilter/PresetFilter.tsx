import React, { useEffect } from 'react';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import { NewFilterModel } from '../../interfaces/Filters';
import { presetsFilterData } from '../../constants/Tracker';

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

  const [amazonValues, setAmazonValues] = React.useState(presetsFilterData.amazon.data);
  const [customizableValues, setCustomizableValues] = React.useState(
    presetsFilterData.customizable.data
  );

  useEffect(() => {
    setAmazonValues(presetsFilterData.amazon.data);
  }, [presetsFilterData.amazon.data]);
  useEffect(() => {
    setCustomizableValues(presetsFilterData.customizable.data);
  }, [presetsFilterData.customizable.data]);

  useEffect(() => {
    const data = filterData.filter((filter: any) => filter.type === 'preset');
    if (data.length <= 0) {
      reset();
    } else {
      const amazonPresetUpdate = amazonValues.map((filterData: any) => {
        for (const filter of data) {
          if (filterData.dataKey === filter.dataKey) {
            filterData.isActive = filter.isActive;
          }
        }
        return filterData;
      });

      const customizablePresetUpdate = customizableValues.map((filterData: any) => {
        for (const filter of data) {
          if (filterData.dataKey === filter.dataKey) {
            filterData.value = filter.value;
            filterData.operation = filter.operation;
            filterData.isActive = filter.isActive;
          }
        }
        return filterData;
      });

      setAmazonValues(amazonPresetUpdate);
      setCustomizableValues(customizablePresetUpdate);
    }
  }, [filterData]);

  const reset = () => {
    const amazonValuesResult = amazonValues.map((filter: any) => {
      filter.isActive = false;
      return filter;
    });
    const customizableValuesResult = customizableValues.map((filter: any) => {
      filter.value = filter.defaultValue;
      filter.operation = filter.defaultOperation;
      filter.isActive = false;
      return filter;
    });
    setAmazonValues(amazonValuesResult);
    setCustomizableValues(customizableValuesResult);
  };

  const isPresetChecked = (dataKey: any) => {
    const data = filterData.filter((filter: any) => filter.type === 'preset');
    const index = data.findIndex((filter: any) => filter.dataKey === dataKey && filter.isActive);
    return index !== -1 ? true : false;
  };

  const setCustomizableValuesData = (dataKey: string, type: string, value?: any) => {
    const filters: NewFilterModel[] = _.cloneDeep(customizableValues);
    const filterMap = _.map(filters, data => {
      data.presetKey = customizableValues.dataKey;
      if (data.dataKey === dataKey) {
        if (type === 'operation') {
          data.operation = value;
        } else if (type === 'filter-value') {
          data.value = data.value !== undefined || data.value !== '' ? value : 0;
        } else if (type === 'toggle') {
          if (data.isActive) {
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
    setCustomizableValues(filterMap);
  };

  const setAmazonValuesData = (dataKey: string) => {
    const filters: NewFilterModel[] = _.cloneDeep(amazonValues);
    const filterMap = _.map(filters, data => {
      if (data.dataKey === dataKey) {
        if (data.isActive) {
          data.isActive = false;
          resetSingleFilter(dataKey, 'preset');
        } else {
          data.isActive = true;
          applyFilter(data);
        }
      }
      return data;
    });
    setAmazonValues(filterMap);
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
        <>
          <span className="presets-filter-content-wrapper__content__filter-name">
            {presetsFilterData.amazon.label}
          </span>

          {_.map(amazonValues, (filter, dataKey) => {
            return (
              <div className={`ui checkbox normal-checkbox`} key={dataKey}>
                <input
                  id={filter.dataKey}
                  checked={isPresetChecked(filter.dataKey)}
                  onChange={() => {
                    setAmazonValuesData(filter.dataKey);
                  }}
                  type="checkbox"
                />
                <label htmlFor={filter.dataKey}> {filter.label}</label>
              </div>
            );
          })}
        </>
        <>
          <span className="presets-filter-content-wrapper__content__filter-name">
            {presetsFilterData.customizable.label}
          </span>
          {_.map(customizableValues, (filter, index) => {
            return (
              <div className="presets-filter-content-wrapper__content__filter-item" key={index}>
                <div className={`ui checkbox customizable-checkbox`}>
                  <input
                    id={filter.dataKey}
                    checked={isPresetChecked(filter.dataKey)}
                    onChange={() => {
                      setCustomizableValuesData(filter.dataKey, 'toggle');
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
                          setCustomizableValuesData(filter.dataKey, 'operation', '≤');
                        }}
                      />
                      <Dropdown.Item
                        text="="
                        onClick={() => {
                          setCustomizableValuesData(filter.dataKey, 'operation', '=');
                        }}
                      />
                      <Dropdown.Item
                        text="≥"
                        onClick={() => {
                          setCustomizableValuesData(filter.dataKey, 'operation', '≥');
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
                            setCustomizableValuesData(
                              filter.dataKey,
                              'filter-value',
                              filter.defaultValue
                            );
                          }
                        }
                      }}
                      onChange={evt => {
                        setCustomizableValuesData(filter.dataKey, 'filter-value', evt.target.value);
                      }}
                    />
                  </div>
                  {filter.targetValue !== undefined && filter.targetValue}
                </div>
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default PresetFilter;
