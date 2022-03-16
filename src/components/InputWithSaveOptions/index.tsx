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

  /* Save when user presses enter */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveAndClose();
    }
  };

  /* Cancel when user presses escapes */
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleDiscardChanges();
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
          handleChange={setUpdatedValue}
          isNumber={isNumber}
          isPositiveOnly={isPositiveOnly}
          isInteger={isInteger}
          label={label}
          disabled={disabled}
          className={`
              ${styles.textInput}
              ${className}
              ${size === 'large' ? styles.textInput__large : styles.textInput__small}  
            `}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
        />
      }
      content={
        <SaveCancelOptions handleSave={handleSaveAndClose} handleCancel={handleDiscardChanges} />
      }
    />
  );
};

export default memo(InputWithSaveOptions);
