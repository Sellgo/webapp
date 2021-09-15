import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import './globals.scss';
import '../globalReset.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Assets */
import { ReactComponent as FilterRightArrow } from '../../../assets/images/filterRightArrow.svg';
import { ReactComponent as YoutubeLogo } from '../../../assets/images/youtubeLogo.svg';

interface Props {
  label?: string;
  minValue: string;
  maxValue: string;
  handleChange: (type: string, value: string) => void;
  userOnboardingResources: any;
  userOnboarding: boolean;
}

const MinMaxFilter: React.FC<Props> = props => {
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

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.minMaxFilter}>
      {label && (
        <p>
          {label}

          {/* Youtube On boarding Icon */}
          {enableFilterOnboarding && (youtubeLink || tooltipText) && (
            <OnboardingTooltip
              trigger={
                youtubeLink ? (
                  <YoutubeLogo
                    className={'youtubeOnboarding'}
                    onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(youtubeLink, '_blank');
                    }}
                  />
                ) : (
                  <Icon name="info circle" className={'infoOnboardingIcon'} />
                )
              }
              tooltipMessage={tooltipText}
            />
          )}
        </p>
      )}

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

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
    userOnboarding: getUserOnboarding(state),
  };
};

export default connect(mapStateToProps)(MinMaxFilter);
