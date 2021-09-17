import React from 'react';
import Rating from 'react-rating';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';
import '../globalReset.scss';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

interface Props {
  label?: string;
  minValue: string;
  maxValue: string;
  handleChange: (type: string, value: string) => void;
  userOnboardingResources: any;
  userOnboarding: boolean;
}

const MinMaxRatingsFilter: React.FC<Props> = props => {
  const {
    label,
    minValue,
    maxValue,
    handleChange,
    userOnboardingResources,
    userOnboarding,
  } = props;

  const isError = React.useMemo(() => {
    return Boolean(
      minValue && maxValue && Number.parseFloat(minValue) > Number.parseFloat(maxValue)
    );
  }, [minValue, maxValue]);

  const iconClassName = `ratingsIconFilter ${isError ? 'minMaxErrorRatings' : ''}`;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.minMaxRatingsFilter}>
      {label && (
        <p>
          {label}

          {/* Onboarding */}
          {enableFilterOnboarding && (youtubeLink || tooltipText) && (
            <OnboardingTooltip
              youtubeLink={youtubeLink}
              tooltipMessage={tooltipText}
              infoIconClassName="infoOnboardingIcon"
              youtubeIconClassName="youtubeOnboarding"
            />
          )}
        </p>
      )}

      <div className={styles.inputWrapper}>
        <Rating
          className={styles.ratingsSelector}
          initialRating={Number(minValue) || 0}
          emptySymbol={<Icon name="star outline" className={iconClassName} />}
          fullSymbol={<Icon name="star" className={iconClassName} />}
          placeholderSymbol={<Icon name="star" className={iconClassName} />}
          onChange={(value: number) => {
            handleChange && handleChange('min', String(value));
          }}
        />
        <FilterRightArrow />
        <Rating
          className={styles.ratingsSelector}
          initialRating={Number(maxValue) || 0}
          emptySymbol={<Icon name="star outline" className={iconClassName} />}
          fullSymbol={<Icon name="star" className={iconClassName} />}
          placeholderSymbol={<Icon name="star" className={iconClassName} />}
          onChange={(value: number) => {
            handleChange && handleChange('max', String(value));
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
    userOnboarding: getUserOnboarding(state),
  };
};

export default connect(mapStateToProps)(MinMaxRatingsFilter);
