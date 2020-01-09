import React from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';

const AddProduct = () => {
  return (
    <div className="add-product">
      <Input placeholder="Enter ASIN or Amazon URL" />
      <Dropdown
        placeholder="Select Country"
        fluid
        selection
        // options={countryOptions}
      />
      <Button> Add Product</Button>
    </div>
  );
};

export default AddProduct;
