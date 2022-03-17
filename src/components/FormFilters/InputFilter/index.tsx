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
import { getNumberOfDps } from '../../../utils/format';

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
  const type = isNumber ? 'number' : isDate ? 'date' : 'text';

  const handleChangeWithRules = (value: string) => {
    if (isNumber && !value) {
      handleChange('0');
      return;
    }

    /* Positive integers only */
    if (isNumber && isPositiveOnly && isInteger) {
      if (!isNaN(value as any) && parseInt(value) >= 0 && Number.isInteger(Number(value))) {
        handleChange(value);
      }
      /* Integers only */
    } else if (isNumber && isInteger) {
      /* Check if is valid integer */
      if (Number.isInteger(Number(value))) {
        handleChange(value);
      }

      /* Positive floats/integers only */
    } else if (isNumber && isPositiveOnly) {
      if (parseFloat(value) >= 0 && allow5Decimal && getNumberOfDps(value) <= 5) {
        handleChange(value);
      } else if (parseFloat(value) >= 0 && getNumberOfDps(value) <= 2 && !allow5Decimal) {
        handleChange(value);
      }
      /* Floats */
    } else if (isNumber) {
      /* Check number of dp */
      if (allow5Decimal && getNumberOfDps(value) <= 5) {
        handleChange(value);
      } else if (!allow5Decimal && getNumberOfDps(value) <= 2) {
        handleChange(value);
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
