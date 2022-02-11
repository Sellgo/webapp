import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import GraphDisplay from '../../assets/images/graphImage.png';

interface Props {
  handleClick?: () => void;
}

const GraphDisplayButton = (props: Props) => {
  const { handleClick } = props;

  return (
    <button className={styles.graphDisplayButton} onClick={handleClick}>
      <img src={GraphDisplay} alt="graph-display" />
    </button>
  );
};

export default memo(GraphDisplayButton);
