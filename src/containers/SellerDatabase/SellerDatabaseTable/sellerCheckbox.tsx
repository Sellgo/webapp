import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const SellerCheckBox = (props: any) => {
  const { item, checked, onClick } = props;

  const handleCheckBoxClick = (e: any) => {
    const newChecked = !checked;
    onClick(e, newChecked, item.id);
  };

  return <Checkbox className="seller-checkbox" checked={checked} onChange={handleCheckBoxClick} />;
};

export default SellerCheckBox;
