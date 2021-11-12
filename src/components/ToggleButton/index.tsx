import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  className?: string;
  isToggled: boolean;
  handleChange: () => void;
  options: [string, string];
}

const ToggleButton: React.FC<Props> = props => {
  const { className, isToggled, handleChange, options } = props;

  const leftToggleTextClass = `${styles.priceToggleText} ${
    !isToggled ? styles.priceToggleText__Active : ''
  }`;

  const rightToggleTextClass = `${styles.priceToggleText} ${
    isToggled ? styles.priceToggleText__Active : ''
  }`;

  return (
    <div
      className={`${styles.pricePlanToggleWrapper} ${className}`}
      role="button"
      onClick={handleChange}
      tabIndex={0}
    >
      <div className={leftToggleTextClass}>
        <p>{options[0]}</p>
      </div>

      <div className={rightToggleTextClass}>
        <p>{options[1]}</p>
      </div>
    </div>
  );
};

ToggleButton.defaultProps = {
  className: '',
};

export default ToggleButton;
