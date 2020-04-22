import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import InputRange from '../InputRange';
import { Range } from '../../interfaces/Generic';

const FilterSliderInput = (props: any) => {
  const { dataKey, range, filterRange, handleCompleteChange, labelSign } = props;
  const [filterRangeLocal, setFilterRangeLocal] = useState(props.filterRange);

  useEffect(() => {
    console.log('dataKey: ', dataKey);
    setFilterRangeLocal(props.filterRange);
  }, [props.filterRange]);

  const handleLocalChange = (value: any) => {
    setFilterRangeLocal(value);
  };

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
    <div className="range-content">
      <InputRange
        step={dataKey === 'avg_rank' || dataKey === 'customer_reviews' ? 1 : 0.01}
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
          {labelSign === '$' && <span className="dollar-sign">{labelSign}</span>}
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
          {labelSign === '%' && <span className="percent-sign">{labelSign}</span>}
        </div>

        <div className="max-wrapper">
          {labelSign === '$' && <span className="dollar-sign">{labelSign}</span>}
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
          {labelSign === '%' && <span className="percent-sign">{labelSign}</span>}
        </div>
      </div>
    </div>
  );
};

export default FilterSliderInput;
