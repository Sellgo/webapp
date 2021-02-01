import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import './index.scss';

interface Props {
  setPreset: (data?: any) => void;
  filterState: any;
  applyFilter: (isPreset?: boolean) => void;
}

const MultipackVariationsFilterPreset = (props: Props) => {
  const { filterState, setPreset, applyFilter } = props;

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

  return (
    <Button.Group
      className={`profitability-preset ${filterState.multipackPreset.active ? 'blue' : 'basic'}`}
      onClick={() => {
        setPreset();
        applyFilter(true);
      }}
    >
      <Button className="multipack-variation-preset-btn">
        {filterState.multipackPreset.value}
      </Button>
      <Dropdown
        className="button"
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
    </Button.Group>
  );
};

export default MultipackVariationsFilterPreset;
