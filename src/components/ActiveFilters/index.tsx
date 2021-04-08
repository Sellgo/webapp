import React, { useState } from 'react';
import './index.scss';
import { Checkbox, Icon, Label, Popup } from 'semantic-ui-react';

interface Props {
  filers: any[];
  resetActiveFilter?: (dataKey: string, type?: string) => Promise<any>;
  onChecked?: () => void;
  onUnchecked?: () => void;
}
const ActiveFilters = (props: Props) => {
  const { filers, onChecked, onUnchecked, resetActiveFilter } = props;

  const [checked, setChecked] = useState(filers.length > 0 ? true : false);

  const handleCheckBoxChange = (e: any, data: any) => {
    const { checked: value } = data;

    if (value) {
      onChecked && onChecked();
      setChecked(true);
    } else {
      onUnchecked && onUnchecked();
      setChecked(false);
    }
  };
  return (
    <div className="active-filters">
      <Checkbox checked={checked} onChange={handleCheckBoxChange} />
      <Popup
        className="filter-box"
        basic
        content={
          filers.length > 0 ? (
            <>
              {checked &&
                filers.map((filter: any) => {
                  return (
                    <Label as="a" key={filter.dataKey}>
                      <div className="filter-name">
                        {filter.filterType === 'slider' &&
                          `${filter.label} ${filter.value.min} to ${filter.value.max} `}
                        {filter.filterType === 'SingleValue' && `${filter.label}`}
                        {filter.filterType === 'list' &&
                          `${filter.label} : (click on column header to view.)`}
                      </div>
                      <Icon
                        name="times circle"
                        onClick={() => {
                          resetActiveFilter && resetActiveFilter(filter.dataKey, filter.filterType);
                          setChecked(false);
                        }}
                      />
                    </Label>
                  );
                })}
            </>
          ) : null
        }
        on="click"
        trigger={
          <span className={`label ${!filers.length ? 'inactive' : 'active'} `}>Active Filters</span>
        }
      />
    </div>
  );
};

export default ActiveFilters;
