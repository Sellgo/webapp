import React from 'react';
import './index.scss';
import { Divider } from 'semantic-ui-react';
import _ from 'lodash';

interface Props {
  filterData: string;
}

function FilterContainer(props: Props) {
  return (
    <div className="filter-container">
      <hr />
    </div>
  );
}

export default FilterContainer;
