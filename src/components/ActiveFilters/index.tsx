import React, { useState } from 'react';
import './index.scss';
import { Icon, Label } from 'semantic-ui-react';
interface Props {
  filers: any[];
  resetActiveFilter?: (dataKey: string) => void;
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
      {/*<Icon name={'filter'} size={'large'} />*/}
      <span className="label">Active Filters: </span>
      {filers.map((filter: any) => {
        if (filter.filterType === 'slider') {
          return (
            <Label as="a" key={filter.dataKey}>
              <div className="filter-name">
                {filter.label} {filter.value.min} to {filter.value.max}
              </div>
              <Icon
                name="times circle"
                onClick={() => resetActiveFilter && resetActiveFilter(filter.dataKey)}
              />
            </Label>
          );
        }
        return <p key={filter.dataKey} />;
      })}
    </div>
  );
};

export default ActiveFilters;
