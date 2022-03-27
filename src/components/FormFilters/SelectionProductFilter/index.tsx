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
import Product from './Product';

/* Styling */
import './index.scss';
import { truncateString } from '../../../utils/format';

type ProductOption = {
  id: string;
  productName: string;
  asin: string;
  img: string;
  skuName?: string;
  activePurchaseOrders?: number;
  fulfillmentChannel?: string;
  skuStatus?: string;
};

interface Props {
  label?: string;
  className?: string;
  filterOptions: ProductOption[];
  placeholder: string;
  value: any;
  handleChange: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
  isSingleSelect?: boolean;
  userOnboardingResources: any;
}

const SelectionProductFilter: React.FC<Props> = props => {
  const {
    label,
    filterOptions,
    placeholder,
    value,
    handleChange,
    disabled = false,
    loading = false,
    isSingleSelect = false,
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
    const skuName = filterOptions.find((option: any) => option.id.toString() === label.value)
      ?.skuName;
    const displayText = skuName ? `${skuName}` : label.text;
    return { content: truncateString(displayText, 15) };
  };

  const renderOptions = filterOptions.map(option => {
    return {
      key: option.id,
      value: option.id,
      text: option.productName,
      content: (
        <Product
          productName={option.productName}
          asin={option.asin}
          img={option.img}
          skuName={option.skuName}
          activePurchaseOrders={option.activePurchaseOrders}
          fulfillmentChannel={option.fulfillmentChannel}
          skuStatus={option.skuStatus}
        />
      ),
    };
  });

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
        multiple={!isSingleSelect}
        className={isFocused ? 'selectionFilter selectionFilter__focused' : ' selectionFilter'}
        options={renderOptions}
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

export default connect(mapStateToProps)(SelectionProductFilter);
