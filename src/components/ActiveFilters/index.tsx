import React from 'react';
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

  const areFiltersActive = filers.length > 0;

  console.log(filers, areFiltersActive);

  const handleCheckBoxChange = async (e: any, data: any) => {
    const { checked: value } = data;
    console.log(value);

    if (value) {
      onChecked && onChecked();
    } else {
      console.log('Triggering this');
      onUnchecked && onUnchecked();
    }
  };

  return (
    <div className="active-filters">
      <Checkbox
        checked={areFiltersActive}
        onChange={handleCheckBoxChange}
        disabled={!areFiltersActive}
      />
      <Popup
        className="filter-box"
        basic
        content={
          areFiltersActive ? (
            <>
              {filers.map((filter: any) => {
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
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        resetActiveFilter && resetActiveFilter(filter.dataKey, filter.filterType);
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
