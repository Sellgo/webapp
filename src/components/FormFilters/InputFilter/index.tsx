import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DatePicker } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import './global.scss';
import '../globalReset.scss';

/* Selectors */
import { getUserOnboardingResources } from '../../../selectors/UserOnboarding';
import {
  FALLBACK_ONBOARDING_DETAILS,
  FILTER_KPI_ONBOARDING_INDEX,
} from '../../../constants/UserOnboarding';

/* Components */
import OnboardingTooltip from '../../OnboardingTooltip';

/* Utils */
import { getNumberOfDps, commify } from '../../../utils/format';

interface Props {
  label?: string;
  placeholder: string;
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  userOnboardingResources: any;
  handleOnPaste?: (value: string) => void;
  isInteger?: boolean;
  isPositiveOnly?: boolean;
  isNumber?: boolean;
  allow5Decimal?: boolean;
  isDate?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  thousandSeperate?: boolean;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputFilter: React.FC<Props> = props => {
  const {
    label,
    placeholder,
    value,
    handleChange,
    className,
    userOnboardingResources,
    disabled,
    error,
    thousandSeperate,
    handleOnPaste,
    isNumber,
    isInteger,
    isPositiveOnly,
    isDate,
    onFocus,
    onBlur,
    handleKeyDown,
    handleKeyUp,
    allow5Decimal,
  } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;
  const type = isDate ? 'date' : 'text';

  const format = thousandSeperate ? commify : (v: string) => v;
  const handleChangeWithRules = (value: string) => {
    let valueWithoutCommas = '';
    if (isNumber) {
      /* Remove commas from value */
      valueWithoutCommas = value.replace(',', '');
    }

    if (isNumber && !value) {
      handleChange('');
      return;
    }

    /* Positive integers only */
    if (isNumber && isPositiveOnly && isInteger) {
      if (
        !isNaN(valueWithoutCommas as any) &&
        parseInt(valueWithoutCommas) >= 0 &&
        Number.isInteger(Number(value))
      ) {
        handleChange(format(valueWithoutCommas));
      }
      /* Integers only */
    } else if (isNumber && isInteger) {
      /* Check if is valid integer */
      if (Number.isInteger(Number(valueWithoutCommas))) {
        handleChange(format(valueWithoutCommas));
      }

      /* Positive floats/integers only */
    } else if (isNumber && isPositiveOnly) {
      if (
        parseFloat(valueWithoutCommas) >= 0 &&
        allow5Decimal &&
        getNumberOfDps(valueWithoutCommas) <= 5
      ) {
        handleChange(format(valueWithoutCommas));
      } else if (
        parseFloat(valueWithoutCommas) >= 0 &&
        getNumberOfDps(valueWithoutCommas) <= 2 &&
        !allow5Decimal
      ) {
        handleChange(format(valueWithoutCommas));
      }
      /* Floats */
    } else if (isNumber) {
      /* Check number of dp */
      if (allow5Decimal && getNumberOfDps(valueWithoutCommas) <= 5) {
        handleChange(format(valueWithoutCommas));
      } else if (!allow5Decimal && getNumberOfDps(valueWithoutCommas) <= 2) {
        handleChange(format(valueWithoutCommas));
      }
    } else {
      handleChange(value);
    }
  };

  return (
    <div className={styles.inputFilter}>
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

      {!isDate ? (
        <Input
          className={`${styles.inputWrapper} ${className} textInputFilter`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => handleChangeWithRules(e.target.value)}
          disabled={disabled}
          error={error}
          onPaste={(e: any) => {
            const pastedValue = e.clipboardData;
            const value = pastedValue.getData('Text');
            handleOnPaste ? handleOnPaste(value) : handleChange(value);
            e.clipboardData.setData('text/plain', '');
            e.preventDefault();
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <DatePicker
          defaultValue={value ? new Date(value) : new Date()}
          selected={value ? new Date(value) : new Date()}
          onChange={(date: Date) => {
            handleChangeWithRules(date ? date.toISOString().split('T')[0] : '');
          }}
          disabledDate={(date: Date | undefined) =>
            date ? date.getTime() <= new Date().getTime() : false
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userOnboardingResources: getUserOnboardingResources(state),
  };
};

export default connect(mapStateToProps)(InputFilter);
