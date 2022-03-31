import React from 'react';
import { formatNumber, formatDecimal, showNAIfZeroOrNull } from '../../../../../../utils/format';
import InputWithSaveOptions from '../../../../../../components/InputWithSaveOptions';

/* Styling */
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';

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
  autoCalculate?: boolean;
  handleAutoCalculate?: () => void;
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
    autoCalculate,
    handleAutoCalculate,
  } = props;
  const displayStat = showNAIfZeroOrNull(stat, asFloat ? formatDecimal(stat) : formatNumber(stat));
  const secondDisplayStat = showNAIfZeroOrNull(
    secondStat,
    asFloat ? formatDecimal(secondStat) : formatNumber(secondStat)
  );
  // console.log(secondStat);
  console.log(secondDisplayStat);

  return (
    <div className={styles.statBox}>
      <p className={styles.title}>{title}</p>
      <div className={styles.statWrapper}>
        <div className={styles.stat}>
          {editable && handleEditSave ? (
            <span className={styles.inputWrapper}>
              {prepend}
              &nbsp;
              <InputWithSaveOptions
                defaultValue={stat}
                isNumber
                isPositiveOnly
                size="small"
                handleSave={handleEditSave}
                className={styles.input}
              />
              {append}
            </span>
          ) : (
            <span>
              {stat && stat !== 0 ? prepend : ''}
              {displayStat}
              {stat && stat !== 0 ? append : ''}
            </span>
          )}
          {(secondStat || secondStat !== 0) && (
            <span>
              {secondStat && secondStat !== 0 ? secondPrepend : ''}
              {secondDisplayStat}
              {secondStat && secondStat !== 0 ? secondAppend : ''}
            </span>
          )}
        </div>
        {autoCalculate && handleAutoCalculate && (
          <div className={styles.autoCalculate}>
            <Icon name="calculator" onClick={handleAutoCalculate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatBox;
