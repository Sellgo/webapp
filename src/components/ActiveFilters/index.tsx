import React from 'react';
import './index.scss';
import { Checkbox, Icon, Label } from 'semantic-ui-react';
const ActiveFilters = () => {
  return (
    <div className="active-filters">
      <Checkbox />
      <Icon name={'filter'} size={'large'} />
      <span className="label">Active Filters</span>
      <Label as="a">
        <span className="filter-name">Tag</span>
        <Icon name="delete" />
      </Label>
    </div>
  );
};

export default ActiveFilters;
