import * as React from 'react';
import { Popup, Icon, Checkbox } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import './checkboxRangeSlider.css';

const CheckboxRangeSlider = (props: any) => {
  const { title } = props;
  return (
    <>
      <div className={'checkRangeSlider'}>
        <p>
          <Checkbox />
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
        maxValue={20}
        minValue={0}
        formatLabel={value => `${value}`}
        value={5}
        onChange={value => console.log(value)}
        onChangeComplete={value => console.log(value)}
      />
    </>
  );
};

export default CheckboxRangeSlider;
