import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Styling */
import styles from './index.module.scss';

interface Props {
  label?: string;
  checked: boolean;
  handleChange: (value: boolean) => void;
  checkboxLabel: string;
  userOnboardingResources: any[];
}

const CheckboxFilter = (props: Props) => {
  const { label, checked, handleChange, checkboxLabel, userOnboardingResources } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.checkboxFilter}>
      {label && (
        <p>
          {label} {/* Onboarding */}
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
      <Checkbox
        readOnly={false}
        label={checkboxLabel}
        checked={checked}
        onChange={(e: any, data: any) => {
          handleChange(data.checked);
        }}
        className={styles.checkbox}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(CheckboxFilter);
