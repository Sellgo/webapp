import React, { memo } from 'react';
import { Input } from 'semantic-ui-react';

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
}
const InputFilter: React.FC<Props> = props => {
  const { label, placeholder, value, handleChange, ...otherProps } = props;

  return (
    <div className={styles.inputFilter}>
      {label && <p>{label}</p>}
      <Input
        className={`${styles.inputWrapper} textInputFilter`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => handleChange(e.target.value)}
        {...otherProps}
      />
    </div>
  );
};
export default memo(InputFilter);
