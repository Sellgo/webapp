import React, { memo } from 'react';
import { Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import InputFilter from '../FormFilters/InputFilter';
import SaveCancelOptions from '../SaveCancelOptions';

/* Utils */
import { commify } from '../../utils/format';

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
      setUpdatedValue(commify(defaultValue.toString()));
    }
  }, [defaultValue]);

  const handleDiscardChanges = () => {
    setIsEditingValue(false);
    if (defaultValue) {
      setUpdatedValue(isNumber ? commify(defaultValue.toString()) : defaultValue.toString());
    } else {
      setUpdatedValue('');
    }
  };

  const handleSaveAndClose = () => {
    if (isNumber) {
      const numberWithoutCommas = updatedValue.replace(',', '');
      handleSave(numberWithoutCommas);
    } else {
      handleSave(updatedValue);
    }
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
    const updatedValueWithoutCommas = updatedValue.replace(',', '');
    const newDefaultValue = defaultValue ? defaultValue.toString() : '';
    if (newDefaultValue !== updatedValueWithoutCommas) {
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
          thousandSeperate
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
