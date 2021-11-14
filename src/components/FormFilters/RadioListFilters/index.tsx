import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

type IFilterOptions = {
  label: string;
  value: any;
};

interface Props {
  label?: string;
  filterOptions: IFilterOptions[];
  value: string;
  handleChange: (value: any) => void;
  userOnboardingResources: any[];
}

const RadioListFilters: React.FC<Props> = props => {
  const { label, filterOptions, value, handleChange, userOnboardingResources } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.radioBoxFilters}>
      {label && (
        <p>
          {label}
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
      <div className={styles.radioboxWrapper} data-count={filterOptions.length}>
        {filterOptions.map((option: IFilterOptions) => {
          return (
            <Checkbox
              radio
              className={styles.checkbox}
              label={option.label}
              checked={option.value === value}
              key={option.label}
              onChange={() => handleChange(option.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};
export default connect(mapStateToProps)(RadioListFilters);
