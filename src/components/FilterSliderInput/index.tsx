import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import InputRange from '../InputRange';
import { Range } from '../../interfaces/Generic';

const FilterSliderInput = (props: any) => {
  const {
    dataKey,
    range,
    filterRange,
    handleCompleteChange,
    labelSign,
    minLabel = '',
    maxLabel = '',
  } = props;

  const [filterRangeLocal, setFilterRangeLocal] = useState(props.filterRange);

  useEffect(() => {
    setFilterRangeLocal(props.filterRange);
  }, [props.filterRange]);

  const handleLocalChange = (value: any) => {
    setFilterRangeLocal(value);
  };

  const handleMinInputCompleteChange = (e: any) => {
    let value = e.target.value;
    if (value >= Number(filterRange.max)) {
      value = Number(filterRange.max);
    } else if (!value || value < range.min) {
      value = range.min;
    }
    if (value <= Number(filterRange.max) && value >= range.min) {
      handleCompleteChange(dataKey, { min: value, max: Number(filterRange.max) });
    }
  };

  const handleMaxInputCompleteChange = (e: any) => {
    let value = e.target.value;
    if (!value || value >= range.max) {
      value = range.max;
    } else if (value < Number(filterRange.min)) {
      value = Number(filterRange.min);
    }
    if (value >= Number(filterRange.min) && value <= range.max) {
      handleCompleteChange(dataKey, { max: value, min: Number(filterRange.min) });
    }
  };

  return (
    <div className="range-content">
      <InputRange
        step={
          [
            'avg_rank',
            'rank',
            'customer_reviews',
            'count_30_days',
            'count_90_days',
            'count_12_month',
          ].includes(dataKey)
            ? 1
            : 0.01
        }
        maxValue={filterRangeLocal.max === undefined ? Number.MAX_SAFE_INTEGER : range.max}
        minValue={filterRangeLocal.min === undefined ? Number.MIN_SAFE_INTEGER : range.min}
        value={{
          min: filterRangeLocal.min === undefined ? 0 : Number(filterRangeLocal.min),
          max: filterRangeLocal.max === undefined ? 0 : Number(filterRangeLocal.max),
        }}
        onChange={(value: Range) => handleLocalChange(value)}
        onChangeComplete={(value: Range) => handleCompleteChange(dataKey, value)}
      />

      <div className="min-max-content">
        <div className="min-wrapper">
          {labelSign === '$' && <span className="dollar-sign">{`${labelSign} ${minLabel} `}</span>}
          <Input
            placeholder="Min"
            id="min"
            type="number"
            value={
              filterRangeLocal.min === undefined
                ? filterRangeLocal.min
                : Math.floor(filterRangeLocal.min * 100) / 100
            }
            onChange={e => {
              handleLocalChange({
                min: Number(e.target.value) || undefined,
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
          {labelSign === '%' && <span className="percent-sign">{`${labelSign} ${minLabel} `}</span>}
        </div>

        <div className="max-wrapper">
          {labelSign === '$' && <span className="dollar-sign">{`${labelSign} ${maxLabel} `}</span>}
          <Input
            placeholder="Max"
            id="max"
            type="number"
            value={
              filterRangeLocal.max === undefined
                ? filterRangeLocal.max
                : Math.ceil(filterRangeLocal.max * 100) / 100
            }
            onChange={e => {
              handleLocalChange({
                max: Number(e.target.value) || undefined,
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
          {labelSign === '%' && <span className="percent-sign">{`${labelSign} ${maxLabel} `}</span>}
        </div>
      </div>
    </div>
  );
};

export default FilterSliderInput;
