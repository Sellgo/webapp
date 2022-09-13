import React from 'react';

/* Components */
import SelectionFilter from '../../FormFilters/SelectionFilter';
import MarketPlaceFilter from '../../FormFilters/MarketPlaceFilter';

/* Styles */
import styles from './styles.module.scss';

/* Interfaces */
import { DefaultMarket } from '../../../interfaces/PerfectStock/Tpl';
import { Input } from 'semantic-ui-react';

/*Utils */
import {
  isNumber as checkIsNumber,
  isPositive as checkIsPositive,
  isLessThanFiveDecimalPoints,
  isLessThanTwoDecimalPoints,
} from '../../../utils/format';

type IOption = {
  key: string;
  value: string;
  text: string;
};

interface Props {
  id: string;
  value: string;
  label: string;
  placeholder: string;
  options: IOption[];
  fieldType: string;
  onChangeHandler: (id: string, value: string | number) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  isInteger?: boolean;
  isPositiveOnly?: boolean;
  isNumber?: boolean;
  allow5Decimal?: boolean;
  defaultUsMarket: DefaultMarket;
  sellerDbMarketPlace: DefaultMarket[];
  showDollar?: boolean;
}

const FormField = (props: Props) => {
  const {
    options,
    value,
    label,
    placeholder,
    id,
    fieldType,
    disabled,
    onChangeHandler,
    isNumber,
    isPositiveOnly,
    allow5Decimal,
    defaultUsMarket,
    sellerDbMarketPlace,
    showDollar = false,
  } = props;

  const validateInput = (value: string) => {
    if (isNumber && !checkIsNumber(value)) {
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

    return true;
  };

  const renderInput = (type: string) => {
    switch (type) {
      case 'select':
        return (
          <SelectionFilter
            label={label}
            placeholder={placeholder}
            filterOptions={options}
            value={value ? `${value}` : ''}
            disabled={disabled}
            handleChange={(value: string) => onChangeHandler(id, value)}
            className={`
                    ${styles.inputFilter}
            `}
          />
        );
      case 'marketPlace':
        return (
          <MarketPlaceFilter
            label={label}
            marketplaceDetails={defaultUsMarket}
            marketPlaceChoices={sellerDbMarketPlace}
            handleChange={() => null}
            className={styles.marketPlace}
            labelClassName={styles.label}
          />
        );
      default:
        return (
          <>
            <p className={styles.label}>{label}</p>
            {showDollar && (
              <Input
                placeholder={placeholder}
                value={value ? `$${value}` : ''}
                disabled={disabled}
                type="text"
                onChange={(e: any) => {
                  let value = e.target.value;
                  if (value && value.length > 1) {
                    value = value.substring(1);
                  }
                  if (value === '$') {
                    value = '0';
                  }
                  if (validateInput(value)) {
                    onChangeHandler(id, value);
                  }
                }}
                className={`
                    ${styles.inputFilter}
            `}
              />
            )}
            {!showDollar && (
              <Input
                placeholder={placeholder}
                value={value ? value : ''}
                disabled={disabled}
                type="text"
                onChange={(e: any) => {
                  if (validateInput(e.target.value)) {
                    onChangeHandler(id, e.target.value);
                  }
                }}
                className={`
                    ${styles.inputFilter}
            `}
              />
            )}
          </>
        );
    }
  };

  return <div className="form__fields">{renderInput(fieldType)}</div>;
};

export default FormField;
