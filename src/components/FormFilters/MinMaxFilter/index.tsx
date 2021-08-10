import React, { memo } from 'react';
import { Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';

interface Props {
  label?: string;
  minValue: string;
  maxValue: string;
  handleChange: (type: string, value: string) => void;
}

const MinMaxFilter: React.FC<Props> = props => {
  const { label, minValue, maxValue, handleChange } = props;

  const isError = React.useMemo(() => {
    return Boolean(
      minValue && maxValue && Number.parseFloat(minValue) > Number.parseFloat(maxValue)
    );
  }, [minValue, maxValue]);

  return (
    <div className={styles.minMaxFilter}>
      {label && <p>{label}</p>}
      <div className={styles.inputWrapper}>
        <Input
          type="number"
          placeholder="Min"
          value={minValue}
          data-filter="min"
          className="minMaxFilters"
          onChange={(e: any) => {
            handleChange && handleChange('min', e.target.value);
          }}
          error={isError}
        />
        <FilterRightArrow />
        <Input
          type="number"
          placeholder="Max"
          value={maxValue}
          data-filter="max"
          className="minMaxFilters"
          onChange={(e: any) => {
            handleChange && handleChange('max', e.target.value);
          }}
          error={isError}
        />
      </div>
    </div>
  );
};

export default memo(MinMaxFilter);
