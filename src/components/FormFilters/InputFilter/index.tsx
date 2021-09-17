import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import './global.scss';
import '../globalReset.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  userOnboardingResources: any;
  userOnboarding: boolean;
}

const InputFilter: React.FC<Props> = props => {
  const {
    label,
    placeholder,
    value,
    handleChange,
    className,
    userOnboardingResources,
    userOnboarding,
    disabled,
    error,
  } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.inputFilter}>
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

      <Input
        className={`${styles.inputWrapper} ${className} textInputFilter`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => handleChange(e.target.value)}
        disabled={disabled}
        error={error}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
    userOnboarding: getUserOnboarding(state),
  };
};

export default connect(mapStateToProps)(InputFilter);
