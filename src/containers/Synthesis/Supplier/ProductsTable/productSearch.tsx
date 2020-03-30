import React, { useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useInput } from '../../../../hooks/useInput';
import _ from 'lodash';

const ProductSearch = (props: any) => {
  const { searchProfitFinderProduct, searchFilterValue, setCurrentPage } = props;
  const { value: searchValue, bind: bindSearch, setValue: setSearch } = useInput(searchFilterValue);

  useEffect(() => {
    setSearch(searchFilterValue);
  }, [searchFilterValue]);

  return (
    <Input
      className={_.isEmpty(searchFilterValue) ? 'product-search' : 'active product-search'}
      action={{
        icon: 'search',
        onClick: () => {
          setCurrentPage(1);
          searchProfitFinderProduct(searchValue);
        },
      }}
      onKeyPress={(e: any) => {
        if (e.key === 'Enter') {
          setCurrentPage(1);
          searchProfitFinderProduct(searchValue);
        }
      }}
      {...bindSearch}
      placeholder="Search Product Name/UPC/ASIN"
    />
  );
};

export default ProductSearch;
