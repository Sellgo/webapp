import _ from 'lodash';
import React, { useEffect } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import './index.scss';

interface Props {
  setProfitability: (data?: any) => void;
  filterData: any;
  filteredRanges: any;
}

const ProfitabilityFilterPreset = (props: Props) => {
  const { filterData, setProfitability, filteredRanges } = props;
  const profitablePresetOptions = [
    { key: 'profitability', text: 'Profitable Products', value: 'Profitable' },
    {
      key: 'non-profitable-products',
      text: 'Non-Profitable Products',
      value: 'Non-Profitable Products',
    },
    {
      key: 'not-found-on-amazon',
      text: 'Not found on Amazon',
      value: 'Not found on Amazon',
    },
  ];

  const [isActive, setActive] = React.useState(false);
  const [currentData, setData] = React.useState('Profitable');

  useEffect(() => {
    if (isActive) {
      setData(currentData);
      handleSet(currentData);
    }
  }, [currentData]);

  useEffect(() => {
    if (!_.isEmpty(filteredRanges)) {
      if (!_.isEmpty(filterData)) {
        const index = filterData.findIndex((filter: any) => filter.type === 'profitability-preset');
        if (index !== -1) {
          const data = filterData.filter(
            (filter: any) => filter.type === 'profitability-preset'
          )[0];
          if (!isActivated()) {
            setData(data.value);
            handleSet(data.value);
          }
          setActive(true);
        } else {
          setActive(false);
        }
      } else {
        setActive(false);
      }
    }
  }, [filterData, filteredRanges]);

  const isActivated = () => {
    return isActive;
  };

  const handleClick = () => {
    setActive(!isActive);
    if (isActivated()) {
      setProfitability('');
    } else {
      handleSet(currentData);
    }
  };

  const handleSet = (data: any) => {
    if (data === '') setProfitability('');
    else {
      const objData = {
        value: data || data.value,
        dataKey: 'profitability-preset',
        type: 'profitability-preset',
        isActive: true,
        dateModified: Date.now(),
      };
      setProfitability(objData);
    }
  };

  const handleOnChange = (data: any) => {
    setData(data);
    setActive(true);
  };

  return (
    <Button.Group
      className={`profitability-preset ${isActivated() ? 'blue' : 'basic'}`}
      onClick={() => {
        handleClick();
      }}
    >
      <Button className="profitability-preset-btn">{currentData}</Button>
      <Dropdown
        className="button"
        icon="angle down"
        floating
        options={profitablePresetOptions}
        trigger={<></>}
        selectOnBlur={false}
        onChange={(e, data) => {
          handleOnChange(data.value);
        }}
      />
    </Button.Group>
  );
};

export default ProfitabilityFilterPreset;
