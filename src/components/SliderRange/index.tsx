import React, { useState } from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import './sliderRange.css';

const SliderRange = (props: any) => {
  const { title, dataKey, range, filterRange, handleChange, handleCompleteChange } = props;
  return (
    <Container>
      <div className={'rangeSlider'}>
        <p>
          {title}
          <Popup
            className={'addSupplierPopup'}
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </p>
      </div>
      <InputRange
        maxValue={range.max}
        minValue={range.min}
        value={{
          min: filterRange.min === '' ? 0 : Number(filterRange.min),
          max: filterRange.max === '' ? 0 : Number(filterRange.max),
        }}
        onChange={(value: any) => handleChange(dataKey, value)}
        onChangeComplete={(value: any) => handleCompleteChange(dataKey, value)}
      />

      <div className="rangeInput">
        <Input
          placeholder={'Min'}
          id="min"
          type="number"
          value={filterRange['min']}
          onChange={(e, { id, value }) => {
            if (value < filterRange.max && value >= range.min) {
              handleChange(dataKey, { min: value, max: filterRange.max });
            }
          }}
          onBlur={(e: any) => {
            const value = e.target.value;
            if (value < filterRange.max && value >= range.min) {
              handleChange(dataKey, { min: value, max: filterRange.max });
            }
          }}
        ></Input>
        <Input
          placeholder={'Max'}
          id="max"
          type="number"
          value={filterRange['max']}
          onChange={(e, { id, value }) => {
            if (value > filterRange.min && value <= range.max) {
              handleChange(dataKey, { max: value, min: filterRange.min });
            }
          }}
          onBlur={(e: any) => {
            const value = e.target.value;
            if (value > filterRange.min && value <= range.max) {
              handleChange(dataKey, { max: value, min: filterRange.min });
            }
          }}
        ></Input>
      </div>
    </Container>
  );
};

export default SliderRange;
