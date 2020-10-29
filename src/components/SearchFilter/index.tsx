import React from 'react';
import { Input } from 'semantic-ui-react';
import _ from 'lodash';
import './index.scss';

const SupplierSearch = (props: any) => {
  const { handleChange, filterValue } = props;
  return (
    <Input
      className={_.isEmpty(filterValue) ? 'supplier-search' : 'supplier-search--active '}
      action={{
        icon: 'search',
      }}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
};

export default SupplierSearch;
