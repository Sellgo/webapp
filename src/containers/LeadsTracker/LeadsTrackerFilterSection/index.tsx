import React, { useState } from 'react';
import './index.scss';
import _ from 'lodash';
import { filterPeriods } from '../../../constants/LeadsTracker';

interface Props {
  onPeriodSelect: (data: any) => void;
  defaultPeriod: number;
}

function LeadsTrackerFilterSection(props: Props) {
  const filterDataState: any = {
    period: filterPeriods,
  };
  const { defaultPeriod, onPeriodSelect } = props;

  const filterInitialData: any = {
    period: defaultPeriod,
  };
  const [filterState, setFilterState] = useState(filterInitialData);

  const setPeriod = (value: number) => {
    setFilterState({ period: value });
    onPeriodSelect(value);
  };

  return (
    <div className="tracker-filter-section leads-tracker-filters">
      <div className="tracker-filter-section__header__period-container">
        {_.map(filterDataState.period.data, filterData => {
          return (
            <div
              className={`tracker-filter-section__header__period-container__period-items ${filterData.value ===
                filterState.period && 'active'}`}
              key={filterData.dataKey}
            >
              <span
                onClick={() => {
                  setPeriod(filterData.value || 1);
                }}
              >
                {filterData.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeadsTrackerFilterSection;
