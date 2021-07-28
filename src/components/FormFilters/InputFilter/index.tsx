import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
}
const InputFilter: React.FC<Props> = props => {
  const { label, placeholder, value, handleChange } = props;

  return (
    <div className={styles.inputFilter}>
      {label && <p>{label}</p>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => handleChange(e.target.value)}
      />
    </div>
  );
};
export default InputFilter;
