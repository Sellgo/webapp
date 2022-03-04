import React from 'react';
import { formatNumber, formatDecimal } from '../../../../../../utils/format';
import InputWithSaveOptions from '../../../../../../components/InputWithSaveOptions';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  stat: number;
  secondStat?: number;
  asFloat?: boolean;
  prepend?: string;
  secondPrepend?: string;
  append?: string;
  secondAppend?: string;
  editable?: boolean;
  handleEditSave?: (newValue: string) => void;
}

const StatBox = (props: Props) => {
  const {
    title,
    stat,
    asFloat,
    prepend = '',
    append = '',
    secondStat,
    secondPrepend = '',
    secondAppend = '',
    editable,
    handleEditSave,
  } = props;
  const displayStat = asFloat ? formatDecimal(stat) : formatNumber(stat);
  const secondDisplayStat = asFloat ? formatDecimal(secondStat) : formatNumber(secondStat);

  return (
    <div className={styles.statBox}>
      <p className={styles.title}>{title}</p>
      <p className={styles.stat}>
        {editable && handleEditSave ? (
          <InputWithSaveOptions
            defaultValue={displayStat}
            isNumber
            isPositiveOnly
            size="small"
            handleSave={handleEditSave}
            className={styles.input}
          />
        ) : (
          <span>
            {displayStat && displayStat !== 0 ? prepend : ''}
            {displayStat || '-'}
            {displayStat && displayStat !== 0 ? append : ''}
          </span>
        )}
        {secondStat && (
          <span>
            &nbsp;&nbsp;
            {secondDisplayStat && secondDisplayStat !== 0 ? secondPrepend : ''}
            {secondDisplayStat || '-'}
            {secondDisplayStat && secondDisplayStat !== 0 ? secondAppend : ''}
          </span>
        )}
      </p>
    </div>
  );
};

export default StatBox;
