import React, { useState } from 'react';
import './index.scss';
import { Icon, Label, Popup } from 'semantic-ui-react';
interface Props {
  filers: any[];
  resetActiveFilter?: (dataKey: string, type?: string) => Promise<any>;
  onChecked?: () => void;
  onUnchecked?: () => void;
}
const ActiveFilters = (props: Props) => {
  const { filers, onChecked, onUnchecked, resetActiveFilter } = props;
  const [checked, setChecked] = useState(true);
  return (
    <div className="active-filters">
      {checked ? (
        <Icon
          name={'check square'}
          className={'checkbox'}
          onClick={() => {
            setChecked(false);
            onUnchecked && onUnchecked();
          }}
        />
      ) : (
        <Icon
          name={'square outline'}
          className={'checkbox'}
          onClick={() => {
            setChecked(true);
            onChecked && onChecked();
          }}
        />
      )}
      <Popup
        className="filter-box"
        basic
        content={
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
                      onClick={() =>
                        resetActiveFilter && resetActiveFilter(filter.dataKey, filter.filterType)
                      }
                    />
                  </Label>
                );
              })}
          </>
        }
        on="click"
        trigger={<span className="label">Active Filters</span>}
      />
    </div>
  );
};

export default ActiveFilters;
