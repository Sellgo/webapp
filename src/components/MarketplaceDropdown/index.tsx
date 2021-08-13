import React, { useState } from 'react';

import { Dropdown } from 'semantic-ui-react';

/* Constants */
import { DEFAULT_US_MARKETPLACE, MARKETPLACE_DROPDOWN_OPTIONS } from '../../constants/Settings';

/* Styling */
import './index.scss';

const MarketplaceDropdown = () => {
  const [marketPlaceDetails, setMarketPlaceDetails] = useState(DEFAULT_US_MARKETPLACE);

  const trigger = (
    <>
      <div className="marketPlaceDropdownTrigger">
        <img
          src={require(`../../assets/flags/${marketPlaceDetails.code}.png`)}
          alt={marketPlaceDetails.text}
        />
        <span>{marketPlaceDetails.text}</span>
      </div>
    </>
  );

  return (
    <Dropdown className={'marketPlaceDropdown'} floating scrolling trigger={trigger}>
      <Dropdown.Menu>
        {MARKETPLACE_DROPDOWN_OPTIONS.map(option => {
          return (
            <Dropdown.Item
              key={option.value}
              value={option.value}
              className="marketPlaceDropdownItem"
              onClick={() => {
                setMarketPlaceDetails(option);
              }}
              disabled={option.disabled}
            >
              <img src={require(`../../assets/flags/${option.code}.png`)} alt={option.text} />
              <span>{option.text}</span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MarketplaceDropdown;
