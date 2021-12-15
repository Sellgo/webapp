import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
}

const HeaderDateCell = (props: Props) => {
  const { title } = props;
  return <div className={styles.headerDateCell}>{title}</div>;
};

export default HeaderDateCell;
