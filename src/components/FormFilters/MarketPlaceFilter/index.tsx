import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import '../globalReset.scss';

/* Constanta */
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Interface */
import { MarketplaceOption } from '../../../interfaces/SellerResearch/SellerDatabase';

interface Props {
  label: string;
  marketplaceDetails: MarketplaceOption;
  marketPlaceChoices: MarketplaceOption[];
  handleChange: (option: MarketplaceOption) => void;
  userOnboardingResources: any;
  className?: string;
  labelClassName?: string;
}

const MarketPlaceFilter = (props: Props) => {
  const {
    label,
    marketplaceDetails,
    marketPlaceChoices,
    handleChange,
    userOnboardingResources,
    className,
    labelClassName,
  } = props;

  const trigger = (
    <>
      <div className={styles.marketPlaceDropdownTrigger}>
        <img
          src={require(`../../../assets/flags/${marketplaceDetails.code}.png`)}
          alt={marketplaceDetails.text}
        />
        <span>{marketplaceDetails.text}</span>
      </div>
    </>
  );

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;

  return (
    <div className={styles.marketplaceFilter}>
      <p className={labelClassName}>
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

      <Dropdown
        className={`${styles.marketplaceDropdown} ${className}`}
        floating
        scrolling
        trigger={trigger}
      >
        <Dropdown.Menu className={styles.marketplaceMenu}>
          {marketPlaceChoices.map(option => {
            return (
              <Dropdown.Item
                key={option.value}
                value={option.value}
                className={styles.marketplaceItem}
                onClick={() => {
                  handleChange(option);
                }}
                disabled={option.disabled}
              >
                <img src={require(`../../../assets/flags/${option.code}.png`)} alt={option.text} />
                <span>{option.text}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(MarketPlaceFilter);
