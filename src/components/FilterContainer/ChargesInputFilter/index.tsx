import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { ChargesInputFilterDataType } from '../../../interfaces/Filters';

import './index.scss';

interface Props {
  applyFilter: () => void;
  closeFilter: () => void;
  filterDataState: Array<ChargesInputFilterDataType>;
}

const ChargesInputFilter: React.FC<Props> = props => {
  const { applyFilter, closeFilter, filterDataState } = props;

  const [chargesFilter, setChargesFilter] = useState<any>({});

  const handleInputChange = (e: any, data: any) => {
    const { id, value, type, checked } = data;
    // For input values
    if (type === 'text') {
      setChargesFilter((prevState: any) => {
        return {
          ...prevState,
          [id]: value,
        };
      });
    }

    if (type === 'checkbox') {
      setChargesFilter((prevState: any) => {
        return {
          ...prevState,
          [id]: !checked,
        };
      });
    }
  };

  return (
    <div className="charges-input-filter">
      <div className="charges-input-filter__content">
        {filterDataState.map((filter: ChargesInputFilterDataType) => {
          const { label, type, key, icon } = filter;
          let element = undefined;
          if (type === 'text') {
            element = (
              <div className="filter-input-wrapper">
                <label htmlFor={key} className="filterLabel">
                  {label}
                </label>
                <Input
                  icon={icon.length > 0 ? icon : ''}
                  id={key}
                  className={'filterInput'}
                  value={chargesFilter[key]}
                  onChange={handleInputChange}
                />
              </div>
            );
          }
          if (type === 'checkbox') {
            element = (
              <div className="filter-input-wrapper">
                <label htmlFor={key} className="filterLabel">
                  {label}
                </label>
                <Input
                  id={key}
                  type="checkbox"
                  className="filterCheckbox"
                  checked={chargesFilter[key]}
                  onChange={handleInputChange}
                />
              </div>
            );
          }
          return element;
        })}
      </div>

      <div className="charges-input-filter__btnContainer">
        <Button
          basic
          className="apply-charges-filter-btn"
          onClick={() => {
            console.log(chargesFilter);
            applyFilter();
            closeFilter();
          }}
        >
          Apply
        </Button>
        <Button basic className="cancel-charges-filter-btn" onClick={closeFilter}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChargesInputFilter;
