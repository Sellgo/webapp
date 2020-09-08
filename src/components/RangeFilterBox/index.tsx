import React from 'react';
import FilterSliderInput from '../FilterSliderInput';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import './index.scss';

const RangeFilterBox = (props: any) => {
  const {
    resetFilters,
    cancelFilters,
    applyFilters,
    filterType,
    labelSign,
    checkboxFilters = [
      { name: 'test', id: 1 },
      { name: 'test 2', id: 2 },
    ],
  } = props;
  const [filter, setFilter] = React.useState({});
  return (
    <div className="column-range-filter">
      <p className="filter-label">{`${props.label} ${labelSign}`}</p>
      <div className="reset-filters" onClick={() => resetFilters()}>
        <p>X Reset</p>
      </div>
      {filterType === 'range' && (
        <FilterSliderInput
          {...props}
          minLabel={'Min'}
          labelSign={labelSign}
          maxLabel={'Max'}
          handleCompleteChange={(dataKey: any, value: any) => setFilter({ dataKey, value })}
        />
      )}
      {filterType === 'checkbox' && (
        <div className="checkbox-filters-list">
          <Form>
            {checkboxFilters.map((check: any) => (
              <Form.Field key={check.id}>
                <Checkbox label={check.name} className="checkbox-filter" />
              </Form.Field>
            ))}
          </Form>
        </div>
      )}

      <div className="button-wrapper">
        <Button basic className="apply-filter-btn" onClick={() => applyFilters(filter)}>
          Apply
        </Button>
        <Button basic className="cancel-filter-btn" onClick={() => cancelFilters()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default RangeFilterBox;
