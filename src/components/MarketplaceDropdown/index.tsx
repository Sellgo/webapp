import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/* Constants */
import { DEFAULT_US_MARKETPLACE, MARKETPLACE_DROPDOWN_OPTIONS } from '../../constants/Settings';

/* Styling */
import './index.scss';

const MarketplaceDropdown = () => {
  return (
    <Dropdown
      className={'marketPlaceDropdown'}
      floating
      scrolling
      options={MARKETPLACE_DROPDOWN_OPTIONS}
      defaultValue={DEFAULT_US_MARKETPLACE}
    />
  );
};

export default MarketplaceDropdown;
