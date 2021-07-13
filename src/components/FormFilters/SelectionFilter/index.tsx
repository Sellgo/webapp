import React from 'react';
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
}

const SelectionFilter: React.FC<Props> = props => {
  const { label, filterOptions, placeholder } = props;

  return (
    <div className="selectionFilterWrapper">
      {label && <p>{label}</p>}
      <Dropdown
        floating
        className="selectionFilter"
        options={filterOptions}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectionFilter;
