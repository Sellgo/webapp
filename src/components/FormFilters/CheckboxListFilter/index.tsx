import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import '../globalReset.scss';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Contants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

interface Props {
  label?: string;
  options: any[];
  selectedOptions: any;
  handleChange: (value: any) => void;
  userOnboardingResources: any;
}

const CheckboxListFilter: React.FC<Props> = props => {
  const { label, handleChange, options, selectedOptions, userOnboardingResources } = props;

  const handleCheckboxTick = (e: any, data: any) => {
    if (data.checked) {
      handleChange({
        ...selectedOptions,
        [data.value]: true,
      });
    } else {
      handleChange({
        ...selectedOptions,
        [data.value]: false,
      });
    }
  };

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.checkBoxFilters}>
      {label && (
        <p>
          {label}

          {/* Onboarding */}
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

      <div className={styles.checkboxWrapper}>
        {options.map(f => {
          return (
            <Checkbox
              className={styles.checkboxOption}
              key={f.key}
              label={f.text}
              value={f.value}
              onChange={handleCheckboxTick}
              checked={selectedOptions[f.key] === true}
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

export default connect(mapStateToProps)(CheckboxListFilter);
