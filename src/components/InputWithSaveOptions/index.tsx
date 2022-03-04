import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

import InputFilter from '../FormFilters/InputFilter';
import SaveCancelOptions from '../SaveCancelOptions';
import { Popup } from 'semantic-ui-react';

interface Props {
  isNumber?: boolean;
  isInteger?: boolean;
  isPositiveOnly?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'large' | 'small';

  handleSave: (value: string) => void;
  defaultValue: string | number;
}

const InputWithSaveOptions = (props: Props) => {
  const {
    handleSave,
    defaultValue,
    isNumber,
    isInteger,
    isPositiveOnly,
    label,
    placeholder,
    disabled,
    className,
    size = 'small',
  } = props;

  const [updatedValue, setUpdatedValue] = React.useState<string>(
    defaultValue ? defaultValue.toString() : ''
  );
  const [isEditingValue, setIsEditingValue] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (defaultValue) {
      setUpdatedValue(defaultValue.toString());
    }
  }, [defaultValue]);

  const handleDiscardChanges = () => {
    setIsEditingValue(false);
    setUpdatedValue(defaultValue.toString());
  };

  const handleSaveAndClose = () => {
    handleSave(updatedValue);
    setIsEditingValue(false);
  };

  const handleValueChange = (value: string) => {
    if (isNumber && !value) {
      setUpdatedValue('0');
    }

    /* Positive integers only */
    if (isNumber && isPositiveOnly && isInteger) {
      if (parseInt(value) >= 0) {
        setUpdatedValue(parseFloat(value).toString());
      }
      /* Integers only */
    } else if (isNumber && isInteger) {
      setUpdatedValue(parseInt(value).toString());

      /* Positive floats/integers only */
    } else if (isNumber && isPositiveOnly) {
      if (parseFloat(value) >= 0) {
        setUpdatedValue(parseFloat(value).toString());
      }
    } else {
      setUpdatedValue(value);
    }
  };

  React.useEffect(() => {
    const newDefaultValue = defaultValue ? defaultValue.toString() : '';
    if (newDefaultValue !== updatedValue) {
      setIsEditingValue(true);
    } else {
      setIsEditingValue(false);
    }
  }, [updatedValue, defaultValue]);

  return (
    <Popup
      className={`
        ${styles.inputWithSaveOptions} 
        ${
          size === 'large' ? styles.inputWithSaveOptions__large : styles.inputWithSaveOptions__small
        }  
      `}
      open={isEditingValue}
      basic
      position="bottom left"
      trigger={
        <InputFilter
          placeholder={placeholder || ''}
          value={updatedValue}
          handleChange={handleValueChange}
          isNumber={isNumber}
          label={label}
          disabled={disabled}
          className={`
            ${styles.textInput}
            ${className}
            ${size === 'large' ? styles.textInput__large : styles.textInput__small}  
          `}
        />
      }
      content={
        <SaveCancelOptions handleSave={handleSaveAndClose} handleCancel={handleDiscardChanges} />
      }
    />
  );
};

export default memo(InputWithSaveOptions);
