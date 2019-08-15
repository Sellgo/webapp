import { useState } from 'react';

interface InputControls {
  value: any;
  setValue: (newValue: any) => void;
  reset: () => void;
  bind: {
    value: any;
    onChange: (event: any) => void;
  };
}

export const useInput = (initialValue: any): InputControls => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      },
    },
  };
};
