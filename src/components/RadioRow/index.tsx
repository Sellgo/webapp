import * as React from 'react';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  checked: boolean;
  handleChange: (checked: boolean) => void;
  className?: string;
}

export default (props: Props) => {
  const { children, checked, handleChange, className } = props;

  return (
    <div
      className={`
        ${styles.inputRadioRow} 
        ${checked ? styles.inputRadioRow__selected : ''}
        ${className}
      `}
      onClick={() => handleChange(!checked)}
    >
      <Checkbox radio checked={checked} />
      &nbsp;{children}
    </div>
  );
};
