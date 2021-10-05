import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { isValidAsin } from '../../constants';

/* Asets */
import { ReactComponent as ThinCrossIcon } from '.././../assets/images/thinCrossIcon.svg';

interface Props {
  asin: string;
  handleRemove?: (asin: string) => void;
}

const AsinPill = (props: Props) => {
  const { asin, handleRemove } = props;

  const isValid = isValidAsin(asin);

  return (
    <span className={isValid ? styles.validAsinPill : styles.inValidAsinPill}>
      {asin.toUpperCase()}
      <ThinCrossIcon
        className={styles.removeIcon}
        onClick={() => handleRemove && handleRemove(asin)}
      />
    </span>
  );
};

export default memo(AsinPill);
