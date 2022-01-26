import React, { memo } from 'react';
import { Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

type Variant = 'primary' | 'secondary' | 'reset';
type Type = 'orange' | 'blue' | 'purpleGradient' | 'black' | 'grey';
type Size = 'md' | 'small';

interface Props {
  variant: Variant;
  type?: Type;
  children: React.ReactNode;
  disabled?: boolean;
  size: Size;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const ActionButton = (props: Props) => {
  const {
    children,
    variant,
    className,
    size = 'md',
    type,
    onClick,
    disabled = false,
    loading,
  } = props;

  const typeClass = `${type ? styles[type] : ''}`;

  const variantWithType = styles[`${variant}__${type}`];

  const variantClass = `${typeClass ? variantWithType : styles[variant]}`;

  const sizeClass = styles[size];

  const btnClass = `${variantClass} ${sizeClass} ${className ? className : ''} ${
    disabled ? styles.disabled : ''
  }`;

  const isBorderedGradient = variant === 'secondary' && type === 'purpleGradient';

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  };

  if (isBorderedGradient) {
    return (
      <div className={`${btnClass}`}>
        <button onClick={handleClick} className={styles.innerButton} disabled={disabled || loading}>
          {!loading ? children : <Loader active inline size="tiny" />}
        </button>
      </div>
    );
  }
  return (
    <button onClick={handleClick} className={btnClass} disabled={disabled || loading}>
      {!loading ? children : <Loader active inline size="tiny" />}
    </button>
  );
};

export default memo(ActionButton);
