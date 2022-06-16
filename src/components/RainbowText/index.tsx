import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  children: any;
  className?: string;
  type:
    | 'purple_blue_gradient'
    | 'purple_orange_gradient'
    | 'orange_purple_gradient'
    | 'pink_purple_blue_gradient'
    | 'pink_blue_gradient';
}

const RainbowText: React.FC<Props> = props => {
  const { children, className, type } = props;
  return <span className={`${styles[type]} ${className}`}>{children}</span>;
};

RainbowText.defaultProps = {
  className: '',
};

export default RainbowText;
