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
}

const ReviewTypeFilter = (props: Props) => {
  const { label, filterOptions, placeholder, value, handleChange, ...otherProps } = props;

  return (
    <div className="reviewTypeFilterWrapper">
      <Dropdown
        search
        fluid
        className="reviewType"
        options={filterOptions}
        placeholder={placeholder}
        scrolling
        value={value}
        onChange={(e: any, data: any) => handleChange(data.value)}
        {...otherProps}
      />
      <p>{label}</p>
    </div>
  );
};

export default memo(ReviewTypeFilter);
