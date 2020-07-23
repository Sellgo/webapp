import React from 'react';
import { FilterState, SupplierFilter } from '../../interfaces/Filters';
import _ from 'lodash';

interface PresetFilterProps {
  applyFilter: (isPreset?: boolean) => void;
  filterData: SupplierFilter;
  initialFilterState: FilterState;
  resetPreset: () => void;
  setRadioFilter: (filterDataKey: string, label: string) => void;
}

const PresetFilter = (props: PresetFilterProps) => {
  const { applyFilter, filterData, initialFilterState, setRadioFilter, resetPreset } = props;

  return (
    <div className={'presets-filter-content-wrapper'}>
      <div className="presets-filter-content-wrapper__header">
        <span className="presets-filter-content-wrapper__header__filter-name">Quick Preset</span>
        <div className="presets-filter-content-wrapper__header__preset-reset">
          <p onClick={() => resetPreset()}>x Reset</p>
        </div>
      </div>
      {_.map(filterData.presets, (filter, key) => {
        return (
          <div className={`presets-filter-content-wrapper__content ${filter.dataKey}`} key={key}>
            {filter.dataKey === 'profitability-preset' && (
              <>
                <span className="presets-filter-content-wrapper__content__filter-name">
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
          </div>
        );
      })}
    </div>
  );
};

export default PresetFilter;
