import React, { useEffect } from 'react';
import FilterSliderInput from '../FilterSliderInput';
import { Button, Form, Checkbox, Loader, Dimmer } from 'semantic-ui-react';
import './index.scss';

const RangeFilterBox = (props: any) => {
  const {
    cancelFilters,
    applyFilters,
    resetFilters,
    filterType,
    labelSign,
    dataKey,
    name,
    values = [],
    loading,
    ...rest
  } = props;
  const [filter, setFilter] = React.useState({});
  const [minMax, setMinMax] = React.useState({});
  const [localData, setLocalData] = React.useState([]);
  const [range, setFilterRange] = React.useState({});

  const getMinMax = () => {
    let value = {};
    if (!!values && values.length) {
      const [range] = values;
      value = { min: range[`${dataKey}_min`], max: range[`${dataKey}_max`] };
    }
    return value;
  };

  useEffect(() => {
    let saved: any = localStorage.getItem(`${name}:${dataKey}`);
    const value = getMinMax();
    if (saved) {
      saved = JSON.parse(saved);
      if (filterType === 'checkbox') {
        const checks = saved.value ? saved.value.split(',') : [];
        setLocalData(checks);
      }
      if (filterType === 'range') {
        setMinMax(value);
        setFilterRange(saved.value);
      }
    } else {
      if (filterType === 'checkbox') {
        const checks = values.map((c: any) => c.value);
        setLocalData(checks);
      } else {
        setMinMax(value);
        setFilterRange(value);
      }
    }
  }, [values]);

  const resetFiltersValue = () => {
    if (filterType === 'checkbox') {
      setLocalData([]);
      saveFilters({ dataKey, value: '' });
    } else {
      setFilterRange(minMax);
    }
    resetFilters(dataKey);
    if (filterType !== 'checkbox') {
      localStorage.removeItem(`${name}:${dataKey}`);
    }
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

    if (Object.keys(res.value).length && filterType !== 'checkbox') {
      saveFilters(res);
    } else {
      saveFilters(res);
    }
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
              range={minMax}
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
                {values.map((check: any) => (
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
            <Button basic className="cancel-filter-btn" onClick={() => cancelFilters()}>
              Cancel
            </Button>
            <Button basic className="apply-filter-btn" onClick={() => setFilters()}>
              Apply
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default RangeFilterBox;
