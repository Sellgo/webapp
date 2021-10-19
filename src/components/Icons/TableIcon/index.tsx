import React from 'react';
import { Icon } from 'semantic-ui-react';

import styles from './index.module.scss';

interface Props {
  name: 'ellipsis vertical';
  className?: string;
  onClick?: (e: any) => void;
}

const TableIcon: React.FC<Props> = props => {
  const { name, className, onClick } = props;
  return <Icon name={name} className={`${styles.tableIcon} ${className}`} onClick={onClick} />;
};

export default TableIcon;
