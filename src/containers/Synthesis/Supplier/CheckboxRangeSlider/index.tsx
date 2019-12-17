import * as React from 'react';
import { Popup, Icon, Checkbox, Container } from 'semantic-ui-react';
import InputRange from '../../../../components/InputRange';
import './index.scss';

const CheckboxRangeSlider = (props: any) => {
  const { title } = props;
  return (
    <Container className="checkbox-range-slider">
      <div className="checkbox-container">
        <span className="wrap-checkbox">
          <Checkbox />
          <span>{title}</span>
          <Popup
            className="add-supplier-popup"
            trigger={<Icon name="question circle" size={'small'} color={'grey'} />}
            position="top left"
            size="tiny"
          />
        </span>
      </div>

      <div className="wrap-check-range">
        <span>Min</span>
        <div className="wrap-check-range-container">
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
