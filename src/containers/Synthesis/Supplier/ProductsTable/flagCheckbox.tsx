import React from 'react';
import COUNTRY_IMAGE from '../../../../assets/images/flag_icon.svg';
import { Checkbox } from 'semantic-ui-react';

const flagCheckbox = (props: any) => {
  return (
    <div className="checkbox-flag d-flex">
      <Checkbox />
      <div className="flag-row">
        <img src={COUNTRY_IMAGE} alt="product_img" />
      </div>
    </div>
  );
};

export default flagCheckbox;
