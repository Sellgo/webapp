import * as React from 'react';
import { Popup, Icon, Checkbox, Container } from 'semantic-ui-react';
import InputRange from '../../../../components/InputRange';
import './index.scss';

const CheckboxRangeSlider = (props: any) => {
  const { title } = props;
  return (
    <Container className="checkboxRangeSlider">
      <div className="checkboxContainer">
        <span className="wrapCheckbox">
          <Checkbox />
          <span>{title}</span>
          <Popup
            className="addSupplierPopup"
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </span>
      </div>

      <div className="wrapCheckRange">
        <span>Min</span>
        <div className="wrapCheckRangeContainer">
          <InputRange
            maxValue={20}
            minValue={0}
            formatLabel={(value: any) => `${value}`}
            value={5}
            onChange={(value: any) => console.log(value)}
            onChangeComplete={(value: any) => console.log(value)}
          />
        </div>
        <span>Max</span>
      </div>
    </Container>
  );
};

export default CheckboxRangeSlider;
