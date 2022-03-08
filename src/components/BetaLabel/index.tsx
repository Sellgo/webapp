import * as React from 'react';
import { Label } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  isNav?: boolean;
  className?: string;
}

export default (props: Props) => {
  const { isNav, className } = props;

  const classes = `${isNav ? styles.betaLabelNav : styles.betaLabel} ${className}`;

  return <Label className={classes}>Beta</Label>;
};
