import React, { useEffect } from 'react';
import FilterSliderInput from '../FilterSliderInput';
import { Button, Form, Checkbox } from 'semantic-ui-react';
import './index.scss';

const RangeFilterBox = (props: any) => {
  const {
    cancelFilters,
    applyFilters,
    filterType,
    labelSign,
    checkboxData = [],
    dataKey,
    filterRange,
    name,
    ...rest
  } = props;
  const [filter, setFilter] = React.useState({});
  const [localData, setLocalData] = React.useState([]);
  const [range, setFilterRange] = React.useState(filterRange);

  useEffect(() => {
    let saved: any = localStorage.getItem(`${name}:${dataKey}`);
    if (saved) {
      saved = JSON.parse(saved);
      if (filterType === 'checkbox') {
        const checks = saved.value.split(',');
        setLocalData(checks);
      }
      if (filterType === 'range') {
        setFilterRange(saved.value);
      }
    }
  }, []);

  const resetFiltersValue = () => {
    if (filterType === 'checkbox') {
      setLocalData([]);
    } else {
      setFilterRange(filterRange);
    }
    localStorage.removeItem(`${name}:${dataKey}`);
  };

  const setCheck = (value: any) => {
    let check: any = localData;
    if (hasChecked(value)) {
      check = check.filter((c: any) => c !== value);
    } else {
      check = [...check, ...[value]];
    }
    setLocalData(check);
  };

  // @ts-ignore
  const hasChecked = (value: any) => localData.includes(value);

  const setFilters = () => {
    let res: any;
    if (filterType === 'checkbox') {
      res = { dataKey, value: localData.join(',') };
    } else {
      res = { ...filter, value: range, dataKey };
    }
    applyFilters(res);
    saveFilters(res);
  };

  const saveFilters = (filter: any) => {
    localStorage.setItem(`${name}:${dataKey}`, JSON.stringify(filter));
  };

  const onRangeChange = (dataKey: string, value: any) => {
    setFilter({ dataKey, value });
    setFilterRange(value);
  };

  return (
    <div className="column-range-filter">
      <p className="filter-label">{`${props.label} ${labelSign}`}</p>
      <div className="reset-filters" onClick={() => resetFiltersValue()}>
        <p>X Reset</p>
      </div>
      {filterType === 'range' && (
        <FilterSliderInput
          filterRange={range}
          dataKey={dataKey}
          {...rest}
          minLabel={'Min'}
          labelSign={labelSign}
          maxLabel={'Max'}
          handleCompleteChange={onRangeChange}
        />
      )}
      {filterType === 'checkbox' && (
        <div className="checkbox-filters-list">
          <Form>
            {checkboxData.map((check: any) => (
              <Form.Field key={check.value}>
                <Checkbox
                  label={check.value}
                  className="checkbox-filter"
                  checked={hasChecked(check.value)}
                  onClick={() => setCheck(check.value)}
                />
              </Form.Field>
            ))}
          </Form>
        </div>
      )}

      <div className="button-wrapper">
        <Button basic className="apply-filter-btn" onClick={() => setFilters()}>
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
