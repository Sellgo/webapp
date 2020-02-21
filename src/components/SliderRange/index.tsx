import React, { useState, useEffect } from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import InputRange from '../InputRange';
import { Range } from '../../interfaces/Generic';
import './index.scss';

const SliderRange = (props: any) => {
  const [filterRangeLocal, setFilterRangeLocal] = useState(props.filterRange);

  useEffect(() => {
    setFilterRangeLocal(props.filterRange);
  }, [props.filterRange]);

  const handleLocalChange = (value: any) => {
    setFilterRangeLocal(value);
  };

  const { title, dataKey, range, filterRange, showInputs, handleCompleteChange } = props;

  const handleMinInputCompleteChange = (e: any) => {
    let value = e.target.value;
    if (value >= filterRange.max) {
      value = filterRange.max;
    } else if (!value || value < range.min) {
      value = range.min;
    }
    if (value <= filterRange.max && value >= range.min) {
      handleCompleteChange(dataKey, { min: value, max: filterRange.max });
    }
  };

  const handleMaxInputCompleteChange = (e: any) => {
    let value = e.target.value;
    if (!value || value >= range.max) {
      value = range.max;
    } else if (value < filterRange.min) {
      value = filterRange.min;
    }
    if (value >= filterRange.min && value <= range.max) {
      handleCompleteChange(dataKey, { max: value, min: filterRange.min });
    }
  };

  return (
    <Container className="slider-range">
      <div className="range-title">
        <p>
          {title}
          <Popup
            className="add-supplier-popup"
            trigger={<Icon name="question circle" size="small" color="grey" />}
            position="top left"
            size="tiny"
          />
        </p>
      </div>
      <InputRange
        step={0.01}
        maxValue={filterRangeLocal.max === '' ? Number.MAX_SAFE_INTEGER : range.max}
        minValue={filterRangeLocal.min === '' ? Number.MIN_SAFE_INTEGER : range.min}
        value={{
          min: filterRangeLocal.min === '' ? 0 : Number(filterRangeLocal.min),
          max: filterRangeLocal.max === '' ? 0 : Number(filterRangeLocal.max),
        }}
        onChange={(value: Range) => handleLocalChange(value)}
        onChangeComplete={(value: Range) => handleCompleteChange(dataKey, value)}
      />

      {showInputs && (
        <div className="range-input">
          <Input
            placeholder="Min"
            id="min"
            type="number"
            value={
              filterRangeLocal.min === ''
                ? filterRangeLocal.min
                : Math.floor(filterRangeLocal.min * 100) / 100
            }
            onChange={e => {
              handleLocalChange({
                min: Number(e.target.value) || '',
                max: filterRangeLocal.max,
              });
            }}
            onBlur={handleMinInputCompleteChange}
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                handleMinInputCompleteChange(e);
                e.target.blur();
              }
            }}
          />
          <Input
            placeholder="Max"
            id="max"
            type="number"
            value={
              filterRangeLocal.max === ''
                ? filterRangeLocal.max
                : Math.ceil(filterRangeLocal.max * 100) / 100
            }
            onChange={e => {
              handleLocalChange({
                max: Number(e.target.value) || '',
                min: filterRangeLocal.min,
              });
            }}
            onBlur={handleMaxInputCompleteChange}
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                handleMaxInputCompleteChange(e);
                e.target.blur();
              }
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default SliderRange;
