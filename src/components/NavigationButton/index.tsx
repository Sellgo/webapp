import React, { memo } from 'react';
import { Loader } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

type Variant = 'primary' | 'secondary' | 'reset';
type Type = 'orange' | 'blue' | 'purpleGradient' | 'black' | 'grey';
type Size = 'md' | 'small';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const ActionButton = (props: Props) => {
  const { children, className, onClick, disabled = false, loading } = props;

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.navigationButton} ${className}`}
      disabled={disabled || loading}
    >
      {!loading ? children : <Loader active inline size="tiny" />}
    </button>
  );
};

export default memo(ActionButton);
