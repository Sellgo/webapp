/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';

import './index.scss';

type ChargesFilterInput = {
  inBoundShipping: string;
  outBoundShipping: string;
  taxPercent: string;
  multiPack: boolean;
};

interface Props {
  applyFilter: () => void;
  closeFilter: () => void;
}

const ChargesInputFilter: React.FC<Props> = props => {
  const { applyFilter, closeFilter } = props;

  const [chargesFilter, setChargesFilter] = useState<ChargesFilterInput>({
    inBoundShipping: '',
    outBoundShipping: '',
    taxPercent: '',
    multiPack: false,
  });

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

  const { inBoundShipping, outBoundShipping, taxPercent, multiPack } = chargesFilter;
  return (
    <div className="charges-input-filter">
      <div className="charges-input-filter__content">
        <div className="filter-input-wrapper">
          <label htmlFor="inboundShipping" className="filterLabel">
            Inbound Shipping Per Item :
          </label>
          <Input
            icon="dollar"
            id="inBoundShipping"
            className="filterInput"
            value={inBoundShipping}
            onChange={handleInputChange}
          />
        </div>

        <div className="filter-input-wrapper">
          <label htmlFor="outBoundShipping" className="filterLabel">
            Outbound Shipping Per Item :
          </label>
          <Input
            icon="dollar"
            id="outBoundShipping"
            className="filterInput"
            value={outBoundShipping}
            onChange={handleInputChange}
          />
        </div>

        <div className="filter-input-wrapper">
          <label htmlFor="taxPercent" className="filterLabel">
            Tax % on sourcing :
          </label>
          <Input
            icon="percent"
            id="taxPercent"
            className="filterInput"
            onChange={handleInputChange}
            value={taxPercent}
          />
        </div>

        {/* Checbox */}
        <div className="filter-input-wrapper">
          <label htmlFor="multiPack" className="filterLabel">
            Calculate Multi Pack :
          </label>
          <Input
            id="multiPack"
            type="checkbox"
            className="filterCheckbox"
            checked={multiPack}
            onChange={handleInputChange}
          />
        </div>
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
