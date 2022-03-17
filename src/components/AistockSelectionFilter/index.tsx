import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboardingResources } from '../../selectors/UserOnboarding';

/* Components */
import OnboardingTooltip from '../OnboardingTooltip';

/* Styling */
import './index.scss';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  label?: string;
  className?: string;
  filterOptions: IOption[];
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  userOnboardingResources: any;
  error?: boolean;
}

const AistockSelectionFilter: React.FC<Props> = props => {
  const {
    label,
    filterOptions,
    placeholder,
    value,
    handleChange,
    disabled = false,
    loading = false,
    userOnboardingResources,
    className,
    error,
  } = props;

  const [isFocused, setFocused] = React.useState<boolean>(false);
  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  useEffect(() => {
    const allSelectionDropdown = document.querySelectorAll('.aistockSelectionFilterWrapper');
    if (allSelectionDropdown) {
      allSelectionDropdown.forEach(dropdown => {
        const inputBox = dropdown.querySelector('input.search');
        if (inputBox) {
          inputBox.setAttribute('autocomplete', 'chrome-off');
        }
      });
    }
  }, []);
  return (
    <div className={`aistockSelectionFilterWrapper ${className}`}>
      {label && (
        <p className={`${disabled ? 'disabled' : ''}`}>
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

      <Dropdown
        fluid
        icon="angle down"
        className={isFocused ? 'selectionFilter selectionFilter__focused' : ' selectionFilter'}
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => handleChange(data.value)}
        disabled={disabled}
        loading={loading}
        autoComplete={'chrome-off'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        error={error}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(AistockSelectionFilter);
