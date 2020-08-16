import React, { useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import _ from 'lodash';
import { useInput } from '../../hooks';
import './index.scss';

const ProductSearch = (props: any) => {
  const { searchFilteredProduct, searchFilterValue, setCurrentPage } = props;
  const { value: searchValue, bind: bindSearch, setValue: setSearch } = useInput(searchFilterValue);

  useEffect(() => {
    setSearch(searchFilterValue);
  }, [searchFilterValue]);

  return (
    <Input
      className={_.isEmpty(searchFilterValue) ? 'product-search' : 'product-search--active '}
      action={{
        icon: 'search',
        onClick: () => {
          setCurrentPage(1);
          searchFilteredProduct(searchValue);
        },
      }}
      onKeyUp={(e: any) => {
        if (e.key === 'Enter') {
          setCurrentPage(1);
          searchFilteredProduct(e.target.value);
        }
      }}
      {...bindSearch}
      placeholder="Search Product Name/UPC/ASIN/EAN"
    />
  );
};

export default ProductSearch;
