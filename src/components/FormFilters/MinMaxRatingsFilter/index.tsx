import React, { memo } from 'react';
import Rating from 'react-rating';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';
import { Icon } from 'semantic-ui-react';

interface Props {
  label?: string;
  minValue: string;
  maxValue: string;
  handleChange: (type: string, value: string) => void;
}

const MinMaxRatingsFilter: React.FC<Props> = props => {
  const { label, minValue, maxValue, handleChange } = props;

  const isError = React.useMemo(() => {
    return Boolean(
      minValue && maxValue && Number.parseFloat(minValue) > Number.parseFloat(maxValue)
    );
  }, [minValue, maxValue]);

  return (
    <div className={styles.minMaxRatingsFilter}>
      {label && <p>{label}</p>}
      <div className={styles.inputWrapper}>
        <Rating
          className={styles.ratingsSelector}
          initialRating={Number(minValue) || 0}
          emptySymbol={
            <Icon
              name="star outline"
              color={'grey'}
              className={isError ? 'minMaxErrorRatings' : ''}
            />
          }
          fullSymbol={
            <Icon name="star" color={'grey'} className={isError ? 'minMaxErrorRatings' : ''} />
          }
          placeholderSymbol={
            <Icon name="star" color={'grey'} className={isError ? 'minMaxErrorRatings' : ''} />
          }
          onChange={(value: number) => {
            handleChange && handleChange('min', String(value));
          }}
        />
        <FilterRightArrow />
        <Rating
          className={styles.ratingsSelector}
          initialRating={Number(maxValue) || 0}
          emptySymbol={
            <Icon
              name="star outline"
              color={'grey'}
              className={isError ? 'minMaxErrorRatings' : ''}
            />
          }
          fullSymbol={
            <Icon name="star" color={'grey'} className={isError ? 'minMaxErrorRatings' : ''} />
          }
          placeholderSymbol={
            <Icon name="star" color={'grey'} className={isError ? 'minMaxErrorRatings' : ''} />
          }
          onChange={(value: number) => {
            handleChange && handleChange('max', String(value));
          }}
        />
      </div>
    </div>
  );
};

export default memo(MinMaxRatingsFilter);
