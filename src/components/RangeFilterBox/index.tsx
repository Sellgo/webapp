import React, { useEffect } from 'react';
import FilterSliderInput from '../FilterSliderInput';
import { Button, Form, Checkbox, Loader, Dimmer } from 'semantic-ui-react';
import './index.scss';

const RangeFilterBox = (props: any) => {
  const {
    cancelFilters,
    applyFilters,
    filterType,
    labelSign,
    dataKey,
    name,
    values = [],
    loading,
    ...rest
  } = props;
  const [filter, setFilter] = React.useState({});
  const [min_max, setMinMax] = React.useState({});
  const [localData, setLocalData] = React.useState([]);
  const [range, setFilterRange] = React.useState({});

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
    } else {
      if (filterType === 'checkbox') {
        setLocalData(values);
      } else {
        if (!!values && values.length) {
          const [range] = values;
          const value = { min: range[`${dataKey}_min`], max: range[`${dataKey}_max`] };
          setMinMax(value);
          setFilterRange(value);
        }
      }
    }
  }, [values]);

  const resetFiltersValue = () => {
    if (filterType === 'checkbox') {
      setLocalData([]);
    } else {
      setFilterRange(min_max);
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
  console.log(loading);

  return (
    <div className="column-range-filter">
      <p className="filter-label">{`${props.label} ${labelSign}`}</p>
      <div className="reset-filters" onClick={() => resetFiltersValue()}>
        <p>X Reset</p>
      </div>
      {loading ? (
        <Dimmer active={loading} inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
      ) : (
        <React.Fragment>
          {filterType === 'range' && (
            <FilterSliderInput
              filterRange={range}
              dataKey={dataKey}
              range={min_max}
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
                {localData.map((check: any) => (
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
        </React.Fragment>
      )}
    </div>
  );
};

export default RangeFilterBox;
