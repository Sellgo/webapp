import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const ProductCheckBox = (props: any) => {
  const { item, checked, onClick } = props;

  const handleCheckBoxClick = (e: any) => {
    const newChecked = !checked;
    onClick(e, newChecked, item.id);
  };

  return (
    <Checkbox className={'product-checkbox'} checked={checked} onChange={handleCheckBoxClick} />
  );
};

export default ProductCheckBox;
