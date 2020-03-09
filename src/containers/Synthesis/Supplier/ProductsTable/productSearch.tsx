import React from 'react';
import { Input } from 'semantic-ui-react';
import { useInput } from '../../../../hooks/useInput';

const ProductSearch = (props: any) => {
  const { value: searchValue, bind: bindSearch } = useInput('');
  const { searchProduct, onChange } = props;
  return (
    <Input
      action={{
        icon: 'search',
        onClick: (e: any) => {
          searchProduct(searchValue);
        },
      }}
      {...bindSearch}
      placeholder="Search Product Name/UPC/ASIN"
    />
  );
};

export default ProductSearch;
