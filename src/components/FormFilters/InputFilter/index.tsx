import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DatePicker } from 'rsuite';
import { debounce } from 'lodash';

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
import {
  commify,
  isNumber as checkIsNumber,
  checkIsInteger,
  isPositive as checkIsPositive,
  isLessThanFiveDecimalPoints,
  isLessThanTwoDecimalPoints,
  stringToNumber,
  isThousandSeperated,
} from '../../../utils/format';

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
  maxValue?: number;
  isDate?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  thousandSeperate?: boolean;
  handleKeyDown?: (e: any) => void;
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
    maxValue,
  } = props;

  /* Onboarding logic */
  const filterOnboarding = userOnboardingResources[FILTER_KPI_ONBOARDING_INDEX] || {};
  const enableFilterOnboarding = Object.keys(filterOnboarding).length > 0;

  const { tooltipText } = filterOnboarding[label || ''] || FALLBACK_ONBOARDING_DETAILS;
  const type = isDate ? 'date' : 'text';
  const [currentValue, setCurrentValue] = React.useState(value);

  const format = thousandSeperate ? commify : (v: string) => v;

  const validateInput = (value: string) => {
    if (isNumber && !checkIsNumber(value)) {
      return false;
    }

    if (isInteger && !checkIsInteger(value)) {
      return false;
    }

    if (isPositiveOnly && !checkIsPositive(value)) {
      return false;
    }

    /* Default float, allow 2 DPs */
    if (isNumber && !allow5Decimal && !isLessThanTwoDecimalPoints(value)) {
      return false;
    }

    /* Default float, allow 5 DPs */
    if (isNumber && allow5Decimal && !isLessThanFiveDecimalPoints(value)) {
      return false;
    }

    if (isNumber && maxValue && Number(value) > maxValue) {
      return false;
    }

    return true;
  };

  React.useEffect(() => {
    if (currentValue && thousandSeperate && isNumber && !isThousandSeperated(currentValue)) {
      setCurrentValue(format(currentValue));
    }
  }, [currentValue]);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleDebounceChange = React.useCallback(
    debounce(async (value: string) => {
      if (isNumber) {
        handleChange(stringToNumber(value).toString());
      } else {
        handleChange(value);
      }
    }, 500),
    []
  );

  const handleOnChange = (value: string) => {
    if (validateInput(value)) {
      setCurrentValue(value);
      handleDebounceChange(value);
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
          value={currentValue}
          onChange={(e: any) => handleOnChange(e.target.value)}
          disabled={disabled}
          error={error}
          onPaste={(e: any) => {
            const pastedValue = e.clipboardData;
            const value = pastedValue.getData('Text');
            handleOnPaste ? handleOnPaste(value) : handleChange(value);
            handleOnChange(value);
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
          oneTap
          defaultValue={value ? new Date(value) : undefined}
          selected={value ? new Date(value) : undefined}
          className={error ? styles.dateError : ''}
          onChange={(date: Date) => {
            handleChange(date ? date.toISOString().split('T')[0] : '');
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
