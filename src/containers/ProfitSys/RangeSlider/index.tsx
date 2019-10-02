import * as React from 'react';
import { Popup, Icon, Input, Container } from 'semantic-ui-react';
import InputRange from '../../../components/InputRange';
import './index.scss';

const RangeSlider = (props: any) => {
  const { title } = props;
  return (
    <Container className="rangeSlider">
      <div className="rangeTitle">
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
        maxValue={20}
        minValue={0}
        formatLabel={(value: any) => `${value}`}
        value={{ min: 5, max: 10 }}
        onChange={(value: any) => console.log(value)}
        onChangeComplete={(value: any) => console.log(value)}
      />

      <div className="rangeInput">
        <Input placeholder={'Min'}></Input>
        <Input placeholder={'Max'}></Input>
      </div>
    </Container>
  );
};

export default RangeSlider;
