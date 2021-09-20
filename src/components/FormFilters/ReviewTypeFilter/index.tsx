import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

/* Styling */
import './index.scss';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  label?: string;
  filterOptions: IOption[];
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  userOnboarding: boolean;
  userOnboardingResources: any[];
}

const ReviewTypeFilter = (props: Props) => {
  const {
    label,
    filterOptions,
    placeholder,
    value,
    handleChange,
    disabled,
    loading,
    userOnboardingResources,
    userOnboarding,
  } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className="reviewTypeFilterWrapper">
      <Dropdown
        search
        fluid
        className="reviewType"
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => handleChange(data.value)}
        disabled={disabled}
        loading={loading}
      />
      {label && (
        <p>
          {label}
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
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboarding: getUserOnboarding(state),
    userOnboardingResources: getUserOnboardingResources(state),
  };
};
export default connect(mapStateToProps)(ReviewTypeFilter);
