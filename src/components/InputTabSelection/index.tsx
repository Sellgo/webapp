import * as React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  className?: string;
}

export default (props: Props) => {
  const { options, selectedOption, setSelectedOption, className } = props;

  return (
    <div className={`${styles.inputTabSelection} ${className}`}>
      {options.map(option => (
        <button
          className={`
            ${styles.option} 
            ${selectedOption === option ? styles.option__selected : ''}
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
