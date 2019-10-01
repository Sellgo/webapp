import * as React from 'react';
import { Popup, Icon, Checkbox, Container } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import './checkboxRangeSlider.css';

const CheckboxRangeSlider = (props: any) => {
  const { title } = props;
  return (
    <Container>
      <div className={'checkRangeSlider'}>
        <span className="wrapCheckbox">
          <Checkbox />
          <span>{title}</span>
          <Popup
            className={'addSupplierPopup'}
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </span>
      </div>

      <div className="wrapCheckRange">
        <span>Min</span>
        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => `${value}`}
          value={5}
          onChange={value => console.log(value)}
          onChangeComplete={value => console.log(value)}
        />
        <span>Max</span>
      </div>
    </Container>
  );
};

export default CheckboxRangeSlider;
