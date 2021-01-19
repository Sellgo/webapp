import React, { useEffect } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import { useInput } from '../../hooks';
import './index.scss';
import { PRODUCT_ID_TYPES } from '../../constants/UploadSupplier';

const ProductSearch = (props: any) => {
  const { searchFilteredProduct, searchFilterValue, setCurrentPage } = props;
  const { value: searchValue, bind: bindSearch, setValue: setSearch } = useInput(searchFilterValue);

  /* Clear Product Search Value */
  const clearSearchValue = () => {
    setSearch('');
  };

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
      placeholder={'Search Product Name/' + PRODUCT_ID_TYPES.join('/')}
      icon={
        <Icon
          name="cancel"
          circular
          fitted
          inverted
          link
          className="cancel-icon"
          onClick={clearSearchValue}
        />
      }
    />
  );
};

export default ProductSearch;
