import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  placeholder: string;
}
const InputFilter: React.FC<Props> = props => {
  const { label, placeholder } = props;

  return (
    <div className={styles.inputFilter}>
      {label && <p>{label}</p>}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};
export default InputFilter;
