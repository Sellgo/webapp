import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import './index.scss';

interface Props {
  setProfitability: (data?: any) => void;
  filterState: any;
  applyFilter: (isPreset?: boolean) => void;
}

const profitablePresetOptions = [
  { key: 'profitability', text: 'Profitable Products', value: 'Profitable' },
  {
    key: 'non-profitable-products',
    text: 'Non-Profitable Products',
    value: 'Non-Profitable Products',
  },
];

const ProfitabilityFilterPreset = (props: Props) => {
  const { filterState, setProfitability, applyFilter } = props;

  const handleClick = (e: any) => {
    e.preventDefault();
    setProfitability();
    applyFilter(true);
  };

  const { active: isFilterActive } = filterState.profitabilityFilter;

  return (
    <div className={`profitable-preset-filter ${isFilterActive ? 'active' : ''}`}>
      <Button className="profitable-preset-filter__btn" onClick={handleClick}>
        <span className="filter-name">
          {filterState.profitabilityFilter.value === 'Profitable' ? 'Profitable' : 'Non-Profitable'}
        </span>
      </Button>
      <Dropdown
        className="profitable-preset-filter__dropdown"
        icon="angle down"
        floating
        options={profitablePresetOptions}
        trigger={<></>}
        selectOnBlur={false}
        onChange={(e, data) => {
          setProfitability(data.value);
          applyFilter(true);
        }}
      />
    </div>
  );
};

export default ProfitabilityFilterPreset;
