import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import './index.scss';

const SupplierSearch = (props: any) => {
  const { handleChange, filterValue, clearSearch } = props;

  return (
    <Input
      className={_.isEmpty(filterValue) ? 'supplier-search' : 'supplier-search--active '}
      action={{
        icon: 'search',
      }}
      onChange={handleChange}
      value={filterValue}
      placeholder="Search..."
      icon={
        <Icon
          name="cancel"
          circular
          fitted
          inverted
          link
          className="cancel-icon"
          onClick={clearSearch}
        />
      }
    />
  );
};

export default SupplierSearch;
