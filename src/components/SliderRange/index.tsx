import React, { useState } from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import './sliderRange.css';

const SliderRange = (props: any) => {
  const { title, datKey, range, handleChange } = props;
  const [filter, setFilter] = useState({ min: range.min, max: range.max });
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
        value={filter}
        onChange={(value: any) => setFilter(value)}
        onChangeComplete={(value: any) => handleChange(datKey, value)}
      />

      <div className="rangeInput">
        <Input
          placeholder={'Min'}
          id="min"
          min={filter['min']}
          max={filter['max']}
          value={filter['min']}
          onChange={(e, { id, value }) => {
            setFilter({ min: Number(value), max: filter.max });
          }}
        ></Input>
        <Input
          placeholder={'Max'}
          id="max"
          min={filter['min']}
          max={filter['max']}
          type="number"
          value={filter['max']}
          onChange={(e, { id, value }) => {
            setFilter({ max: Number(value), min: filter.min });
          }}
        ></Input>
      </div>
    </Container>
  );
};

export default SliderRange;
