import * as React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './index.scss';

const InputRangeCustom = (props: any) => {
  return (
    <div className="inputRangeCustom">
      <InputRange {...props} />
    </div>
  );
};

export default InputRangeCustom;
