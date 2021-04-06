import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import './index.scss';

interface Props {
  setProfitability: (data?: any) => void;
  filterState: any;
  applyFilter: (isPreset?: boolean) => void;
}

const ProfitabilityFilterPreset = (props: Props) => {
  const { filterState, setProfitability, applyFilter } = props;

  const profitablePresetOptions = [
    { key: 'profitability', text: 'Profitable Products', value: 'Profitable' },
    {
      key: 'non-profitable-products',
      text: 'Non-Profitable Products',
      value: 'Non-Profitable Products',
    },
  ];
  return (
    <Button.Group
      className={`profitability-preset ${
        filterState.profitabilityFilter.active ? 'blue' : 'basic'
      }`}
      onClick={() => {
        setProfitability();
        applyFilter(true);
      }}
    >
      <Button className="btn">
        {filterState.profitabilityFilter.value === 'Profitable' ? 'Profitable' : 'Non-Profitable'}
      </Button>
      <Dropdown
        className="button"
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
    </Button.Group>
  );
};

export default ProfitabilityFilterPreset;
