import React from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';
import { countryOptions } from '../../../utils/dummy';

const AddProduct = () => {
  return (
    <div className="add-product">
      <div className="add-drop">
        <Input placeholder="Enter ASIN or Amazon URL" />
        <Dropdown
          placeholder="United States"
          defaultSelectedLabel="United States"
          fluid
          selection
          options={countryOptions}
        />
      </div>
      <Button> Add Product</Button>
    </div>
  );
};

export default AddProduct;
