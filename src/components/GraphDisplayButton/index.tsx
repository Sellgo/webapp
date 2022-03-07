import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import GraphDisplay from '../../assets/images/graphImage.png';

interface Props {
  handleClick?: () => void;
  disabled?: boolean;
}

const GraphDisplayButton = (props: Props) => {
  const { handleClick, disabled } = props;
  return (
    <button className={styles.graphDisplayButton} onClick={handleClick} disabled={disabled}>
      <img src={GraphDisplay} alt="graph-display" />
    </button>
  );
};

export default memo(GraphDisplayButton);
