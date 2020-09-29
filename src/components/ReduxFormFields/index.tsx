import React from 'react';
import {
  Form,
  Input as InputComponent,
  Select as SelectComponent,
  Label,
  TextArea as TextAreaComponent,
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
  inputProps: object;
  setFieldToBeFocused: (ref: any) => void;
}

export const InputField = ({
  input,
  label,
  required,
  width,
  inline,
  meta: { touched, error },
  inputProps,
  setFieldToBeFocused,
  ...rest
}: FieldProps) => {
  return (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
      {label && <label>{label}</label>}
      <InputComponent
        required={required}
        {...input}
        {...rest}
        {...inputProps}
        ref={setFieldToBeFocused}
      />
      {touched && error ? (
        <Label basic={true} color="red" pointing={true}>
          {error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

interface OptionsFieldProps extends FieldProps {
  options: Array<{
    text: string;
    value: string | number;
  }>;
}

export const SelectField = ({
  input,
  label,
  required,
  width,
  inline,
  options,
  meta: { touched, error },
  ...custom
}: OptionsFieldProps) => (
  <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
    {label && <label>{label}</label>}
    <SelectComponent
      search={true}
      value={input.value}
      required={required}
      options={options}
      onChange={(event, data) => input.onChange(data.value)}
      {...custom}
    />
    {touched && error ? (
      <Label basic={true} color="red" pointing={true}>
        {error}
      </Label>
    ) : null}
  </Form.Field>
);

export const TextAreaField = ({
  input,
  required,
  meta: { touched, error },
  label,
  width,
  inline,
  ...rest
}: FieldProps) => {
  return (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
      {label && <label>{label}</label>}
      <TextAreaComponent
        required={required}
        {...input}
        value={input.value === 'null' ? '' : input.value}
        {...rest}
      />
      {touched && error ? (
        <Label basic={true} color="red" pointing={true}>
          {error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
