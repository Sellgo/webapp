import React from 'react';
import { Input } from 'semantic-ui-react';
import { useInput } from '../../../../hooks/useInput';

const ProductSearch = (props: any) => {
  const { value: searchValue, bind: bindSearch } = useInput('');
  const { searchProfitFinderProduct, onChange } = props;
  return (
    <Input
      className="product-search"
      action={{
        icon: 'search',
        onClick: (e: any) => {
          searchProfitFinderProduct(searchValue);
        },
      }}
      value={searchValue}
      {...bindSearch}
      placeholder="Search Product Name/UPC/ASIN"
    />
  );
};

export default ProductSearch;
