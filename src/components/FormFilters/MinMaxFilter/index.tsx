import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';
import '../globalReset.scss';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';

interface Props {
  label?: string;
  minValue: string;
  maxValue: string;
  handleChange: (type: string, value: string) => void;
  userOnboardingResources: any;
  appendWith?: string;
  prependWith?: string;
}

const MinMaxFilter: React.FC<Props> = props => {
  const {
    label,
    minValue,
    maxValue,
    handleChange,
    userOnboardingResources,
    appendWith,
    prependWith,
  } = props;

  const isError = React.useMemo(() => {
    return Boolean(
      minValue && maxValue && Number.parseFloat(minValue) > Number.parseFloat(maxValue)
    );
  }, [minValue, maxValue]);

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.minMaxFilter}>
      {label && (
        <p>
          {label}

          {/* Youtube On boarding Icon */}
          {enableFilterOnboarding && tooltipText && (
            <OnboardingTooltip
              youtubeLink={''}
              tooltipMessage={tooltipText}
              infoIconClassName="infoOnboardingIcon"
              youtubeIconClassName="youtubeOnboarding"
            />
          )}
        </p>
      )}

      <div className={styles.inputWrapper}>
        {prependWith && <span className={styles.append}>{prependWith}</span>}
        <Input
          type="text"
          placeholder="Min"
          value={minValue}
          data-filter="min"
          className="minMaxFilters"
          onChange={(e: any) => {
            if (!isNaN(e.target.value) && (parseFloat(e.target.value) >= 0 || !e.target.value)) {
              handleChange && handleChange('min', e.target.value);
            }
          }}
          error={isError}
        />
        <FilterRightArrow />
        <Input
          type="text"
          placeholder="Max"
          value={maxValue}
          data-filter="max"
          className="minMaxFilters"
          onChange={(e: any) => {
            if (!isNaN(e.target.value) && (parseFloat(e.target.value) >= 0 || !e.target.value)) {
              handleChange && handleChange('max', e.target.value);
            }
          }}
          error={isError}
        />
        {appendWith && <span className={styles.prepend}>{appendWith}</span>}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(MinMaxFilter);
