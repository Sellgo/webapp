import * as React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  isPurple?: boolean;
  borderless?: boolean;
  className?: string;
}

export default (props: Props) => {
  const { options, selectedOption, setSelectedOption, className, isPurple, borderless } = props;

  return (
    <div className={`${styles.inputTabSelection} ${className}`}>
      {options.map(option => (
        <button
          className={`
            ${styles.option}
            ${borderless ? styles.option__borderless : ''}
            ${selectedOption === option && !isPurple ? styles.option__selected : ''}
            ${selectedOption === option && isPurple ? styles.option__selectedPurple : ''}
          `}
          key={option}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
