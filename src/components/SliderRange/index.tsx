import React, { useState, useEffect } from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import InputRange from '../InputRange';
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
        maxValue={range.max}
        minValue={range.min}
        value={{
          min: filterRangeLocal.min === '' ? 0 : Number(filterRangeLocal.min),
          max: filterRangeLocal.max === '' ? 0 : Number(filterRangeLocal.max),
        }}
        onChange={(value: any) => handleLocalChange(value)}
        onChangeComplete={(value: any) => handleCompleteChange(dataKey, value)}
      />

      {showInputs && (
        <div className="range-input">
          <Input
            placeholder="Min"
            id="min"
            type="number"
            value={filterRangeLocal['min']}
            onChange={(e, { id, value }) => {
              if (value < filterRange.max && value >= range.min) {
                handleCompleteChange(dataKey, { min: value, max: filterRange.max });
              }
            }}
            /*
          onBlur={(e: any) => {
            const value = e.target.value;
            if (value < filterRange.max && value >= range.min) {
              handleCompleteChange(dataKey, { min: value, max: filterRange.max });
            }
          }}
          */
          ></Input>
          <Input
            placeholder="Max"
            id="max"
            type="number"
            value={filterRangeLocal['max']}
            onChange={(e, { id, value }) => {
              if (value > filterRange.min && value <= range.max) {
                handleCompleteChange(dataKey, { max: value, min: filterRange.min });
              }
            }}
            /*
          onBlur={(e: any) => {
            const value = e.target.value;
            if (value > filterRange.min && value <= range.max) {
              handleCompleteChange(dataKey, { max: value, min: filterRange.min });
            }
          }}
          */
          ></Input>
        </div>
      )}
    </Container>
  );
};

export default SliderRange;
