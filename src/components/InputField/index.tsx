import React from 'react';
import {
  Form,
  Input as InputComponent,
  Radio as RadioComponent,
  Checkbox as CheckboxComponent,
  Select as SelectComponent,
  TextArea as TextAreaComponent,
  Dropdown as DropdownComponent,
  Label,
} from 'semantic-ui-react';

interface InputProps {
  checked?: boolean;
  name: string;
  onBlur: (eventOrValue: Event | any) => void;
  onChange: (eventOrValue: Event | any) => void;
  onDrop: (eventOrValue: Event | any) => void;
  onDragStart: (eventOrValue: Event | any) => void;
  onFocus: (eventOrValue: Event | any) => void;
  value: any;
}

interface FieldProps {
  input: InputProps;
  name: string;
  meta: {
    error?: any;
    touched: boolean;
  };
  required?: boolean;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
  label?: string;
  inline?: boolean;
  defaultChecked?: boolean;
  placeholder?: string;
}

export const InputField = ({
  input,
  label,
  required,
  width,
  inline,
  meta: { touched, error },
  ...rest
}: FieldProps) => {
  return (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
      {label && <label>{label}</label>}
      <InputComponent required={required} {...input} {...rest} />
      {touched && error ? (
        <Label basic={true} color="red" pointing={true}>
          {error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
