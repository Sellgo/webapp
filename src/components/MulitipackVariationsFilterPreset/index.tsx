import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

import './index.scss';

interface Props {
  setPreset: (data?: any) => void;
  filterState: any;
  applyFilter: (isPreset?: boolean) => void;
}

const multipackPresetOptions = [
  { key: 'is_variation', text: 'Variation', value: 'Variation' },
  {
    key: 'original-upc',
    text: 'Original UPC',
    value: 'Original UPC',
  },
  {
    key: 'not-found',
    text: 'Not Found',
    value: 'Not Found',
  },
  {
    key: 'multipack',
    text: 'Multipack',
    value: 'Multipack',
  },
];

const MultipackVariationsFilterPreset = (props: Props) => {
  const { filterState, setPreset, applyFilter } = props;

  const { active: isFilterActive } = filterState.multipackPreset;

  const handleClick = (e: any) => {
    e.preventDefault();
    setPreset();
    applyFilter(true);
  };
  return (
    <div className="multipack-variation-filter">
      <Button
        className={`multipack-variation-filter__btn ${isFilterActive ? 'active' : ''}`}
        onClick={handleClick}
      >
        <span className="filter-name">{filterState.multipackPreset.value}</span>
      </Button>
      <Dropdown
        className="multipack-variation-filter__dropdown"
        icon="angle down"
        floating
        options={multipackPresetOptions}
        trigger={<></>}
        selectOnBlur={false}
        onChange={(e, data) => {
          setPreset(data.value);
          applyFilter(true);
        }}
      />
    </div>
  );
};

export default MultipackVariationsFilterPreset;
