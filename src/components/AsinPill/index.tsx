import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { isValidAsin } from '../../constants';

/* Asets */
import ThinCrossIcon from '../../components/Icons/ThinCrossIcon';

interface Props {
  asin: string;
  handleRemove?: (asin: string) => void;
}

const AsinPill = (props: Props) => {
  const { asin, handleRemove } = props;

  const isValid = isValidAsin(asin);

  return (
    <span className={styles.pillWrapper}>
      <span className={isValid ? styles.validAsinPill : styles.inValidAsinPill}>
        {asin.toUpperCase()}
      </span>
      <span
        className={isValid ? styles.validIconWrapper : styles.inValidIconWrapper}
        onClick={() => handleRemove && handleRemove(asin)}
      >
        <ThinCrossIcon className={styles.removeIcon} />
      </span>
    </span>
  );
};

export default memo(AsinPill);
