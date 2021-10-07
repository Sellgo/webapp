import React, { memo } from 'react';
import { Dropdown } from 'semantic-ui-react';

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
  className?: string;
}

const PeriodFilter: React.FC<Props> = props => {
  const {
    label,
    filterOptions,
    placeholder,
    value,
    className,
    handleChange,
    ...otherProps
  } = props;
  const [isFocused, setFocused] = React.useState<boolean>(false);

  return (
    <div className={`periodFilterWrapper ${className}`}>
      <p>{label}</p>
      <Dropdown
        search
        fluid
        className={isFocused ? 'periodFilter periodFilter__focused' : 'periodFilter'}
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => handleChange && handleChange(data.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...otherProps}
      />
    </div>
  );
};

export default memo(PeriodFilter);
