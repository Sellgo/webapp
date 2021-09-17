import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

/* Constants */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboarding, getUserOnboardingResources } from '../../../selectors/UserOnboarding';

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
  filterOptions: IOption[];
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  userOnboardingResources: any;
  userOnboarding: boolean;
}

const SelectionFilter: React.FC<Props> = props => {
  const {
    label,
    filterOptions,
    placeholder,
    value,
    handleChange,
    userOnboardingResources,
    userOnboarding,
    ...otherProps
  } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = userOnboarding && Object.keys(filterOnboarding).length > 0;

  const { youtubeLink, tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className="selectionFilterWrapper">
      {label && (
        <p>
          {label}
          {/* Youtube On boarding Icon */}
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

      <Dropdown
        search
        fluid
        className="selectionFilter"
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => handleChange && handleChange(data.value)}
        {...otherProps}
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

export default connect(mapStateToProps)(SelectionFilter);
