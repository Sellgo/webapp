import React, { memo } from 'react';
import { TextArea } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './global.scss';

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const TextAreaInput = (props: Props) => {
  const { label, placeholder, value, handleChange, disabled, error, className } = props;

  return (
    <div
      className={`${styles.inputFilter} ${className} textAreaInput ${disabled &&
        'disabled'} ${error && 'error'}`}
    >
      {label && <p>{label}</p>}
      <TextArea
        className={styles.textAreaWrapper}
        placeholder={placeholder}
        value={value}
        onChange={(e, data) => {
          if (disabled) {
            return null;
          }
          handleChange(String(data.value));
        }}
      />
    </div>
  );
};
export default memo(TextAreaInput);
