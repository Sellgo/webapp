import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

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
  value: any[];
  handleChange: (value: any[]) => void;
  disabled?: boolean;
  loading?: boolean;
  userOnboardingResources: any;
}

const SelectionMultipleFilter: React.FC<Props> = props => {
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
  } = props;

  const [isFocused, setFocused] = React.useState<boolean>(false);
  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  useEffect(() => {
    const allSelectionDropdown = document.querySelectorAll('.selectionFilterWrapper');
    if (allSelectionDropdown) {
      allSelectionDropdown.forEach(dropdown => {
        const inputBox = dropdown.querySelector('input.search');
        if (inputBox) {
          inputBox.setAttribute('autocomplete', 'chrome-off');
        }
      });
    }
  }, []);

  const renderLabel = (label: any) => {
    return { content: label.key };
  };
  return (
    <div className={`selectionFilterMultipleWrapper ${className}`}>
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

      <Dropdown
        fluid
        search
        multiple
        className={isFocused ? 'selectionFilter selectionFilter__focused' : ' selectionFilter'}
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => {
          handleChange(data.value);
        }}
        disabled={disabled}
        loading={loading}
        autoComplete={'chrome-off'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        renderLabel={renderLabel}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(SelectionMultipleFilter);
