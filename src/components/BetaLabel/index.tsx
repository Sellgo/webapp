import * as React from 'react';
import { Label } from 'semantic-ui-react';
import styles from './index.module.scss';

interface Props {
  isNav?: boolean;
}

export default (props: Props) => (
  <Label className={props.isNav ? styles.betaLabelNav : styles.betaLabel}>BETA</Label>
);
