import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Input, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';
import '../globalReset.scss';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

interface Props {
  label?: string;
  filterOptions: any[];
  selectedValues: string[];
  handleChange: (value: any) => void;
  userOnboardingResources: any;
  userOnboarding: boolean;
}

const CheckboxDropdown: React.FC<Props> = props => {
  const {
    label,
    handleChange,
    filterOptions,
    selectedValues,
    userOnboardingResources,
    userOnboarding,
  } = props;

  const handleCheckboxTick = (e: any, data: any) => {
    let newSelectedValues = selectedValues;
    if (data.checked) {
      newSelectedValues.push(data.value);
    } else {
      newSelectedValues = newSelectedValues.filter(f => f !== data.value);
    }
    handleChange(newSelectedValues);
  };

  const trigger = (
    <button className={styles.buttonWrapper}>
      <Input
        className={`${styles.inputWrapper} textInputFilter`}
        type="text"
        placeholder={label}
        value={selectedValues && selectedValues.join(', ')}
        icon={{
          name: 'dropdown',
          className: styles.dropdownArrow,
        }}
      />
    </button>
  );

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.checkBoxDropdownFilters}>
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

      <Popup
        className="popup"
        on="click"
        position="bottom left"
        basic
        trigger={trigger}
        /* Dropdown content */
        content={
          <div className={styles.dropdownWrapper}>
            <div className={styles.checkboxListWrapper}>
              {filterOptions.map(f => {
                return (
                  <Checkbox
                    className={styles.checkboxOption}
                    key={f.key}
                    label={f.text}
                    value={f.value}
                    onChange={handleCheckboxTick}
                    checked={selectedValues.includes(f.value)}
                  />
                );
              })}
            </div>
          </div>
        }
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

export default connect(mapStateToProps)(CheckboxDropdown);
