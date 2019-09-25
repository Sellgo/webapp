import * as React from 'react';
import { Popup, Icon, Button } from 'semantic-ui-react';
import InputRange from 'react-input-range';
import './rangeSlider.css';

const RangeSlider = (props: any) => {
  const { title } = props;
  return (
    <>
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
        maxValue={20}
        minValue={0}
        formatLabel={value => `${value}`}
        value={{ min: 5, max: 10 }}
        onChange={value => console.log(value)}
        onChangeComplete={value => console.log(value)}
      />
      <Button basic color="grey" content="Grey">
        Min
      </Button>
      <Button basic color="grey" content="Grey">
        Max
      </Button>
    </>
  );
};

export default RangeSlider;
