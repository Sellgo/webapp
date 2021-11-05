import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  className?: string;
  isToggled: boolean;
  handleChange: () => void;
}

const ToggleButton: React.FC<Props> = props => {
  const { className, isToggled, handleChange } = props;

  const leftToggleTextClass = `${styles.priceToggleText} ${
    isToggled ? styles.priceToggleText__Active : ''
  }`;

  const rightToggleTextClass = `${styles.priceToggleText} ${
    !isToggled ? styles.priceToggleText__Active : ''
  }`;

  return (
    <div
      className={`${styles.pricePlanToggleWrapper} ${className}`}
      role="button"
      onClick={handleChange}
      tabIndex={0}
    >
      <div className={leftToggleTextClass}>
        <p>Pay Monthly</p>
        {/* <small>Commit Monthly</small> */}
      </div>

      <div className={rightToggleTextClass}>
        <p>Pay Annually</p>
        {/* <small>Commit Anually</small> */}
      </div>
    </div>
  );
};

ToggleButton.defaultProps = {
  className: '',
};

export default ToggleButton;
