import React, { useEffect } from 'react';
import FilterSliderInput from '../FilterSliderInput';
import { Button, Form, Checkbox, Loader, Dimmer } from 'semantic-ui-react';
import './index.scss';
import _ from 'lodash';

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
    filterLabel,
    filterNegativeCheckbox,
    ...rest
  } = props;
  const [filter, setFilter] = React.useState({});
  const [minMax, setMinMax] = React.useState({});
  const [localData, setLocalData] = React.useState([]);
  const [range, setFilterRange] = React.useState({});
  const [isNegative, setNegative] = React.useState(false);

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
    const value = name !== 'leads-tracker' ? _.cloneDeep(values) : getMinMax();
    console.log('value: ', value);
    if (saved) {
      saved = JSON.parse(saved);
      if (filterType === 'checkbox') {
        const checks = saved.value ? saved.value.split(',') : [];
        setLocalData(checks);
      }
      if (filterType === 'range') {
        if (filterNegativeCheckbox && saved.isNegative) {
          if (saved.isNegative) {
            let tmpValue = {};
            tmpValue = {
              min: value.min < 0 ? 0 : value.min,
              max: value.max < 0 ? 0 : value.max,
            };
            setMinMax(tmpValue);
            setFilterRange(saved.value);
            setNegative(saved.isNegative);
          }
        } else {
          setMinMax(value);
          setFilterRange(saved.value);
        }
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
      const checks = values.map((c: any) => c.value);
      setLocalData(checks);
      saveFilters({ dataKey, value: checks.join(',') });
    } else {
      setFilterRange(minMax);
    }
    resetFilters(filterType === 'checkbox' ? 'checkbox' : dataKey);
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

  const negativeChecked = () => {
    return isNegative;
  };

  const toggleNegative = () => {
    const temptMinMax: any = _.cloneDeep(values);
    if (!isNegative) {
      let value = {};
      value = {
        min: Number(temptMinMax.min) < 0 ? 0 : Number(temptMinMax.min),
        max: Number(temptMinMax.max) < 0 ? 0 : Number(temptMinMax.max),
      };
      setMinMax(value);
      setFilterRange(value);
    } else {
      setMinMax(temptMinMax);
      setFilterRange(temptMinMax);
    }
    setNegative(!isNegative);
  };

  const setFilters = () => {
    let res: any;
    if (filterType === 'checkbox') {
      res = { dataKey, value: localData.length ? localData.join(',') : '' };
    } else {
      res = {
        ...filter,
        value: range,
        dataKey,
        label: filterLabel,
        isActive: true,
        type: filterType,
        dateModified: Date.now(),
        isNegative,
      };
    }
    saveFilters(res);
    applyFilters(res);
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
      <p className="filter-label">{`${filterLabel || props.label} ${labelSign}`}</p>
      <div className="reset-filters" onClick={() => resetFiltersValue()}>
        <p>X Reset</p>
      </div>
      {loading ? (
        <Dimmer.Inner active={loading} inverted className={'ltr-filter-popup curved'}>
          <Loader size="medium">Loading</Loader>
        </Dimmer.Inner>
      ) : (
        <React.Fragment>
          {filterType === 'range' && (
            <>
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
              {filterNegativeCheckbox && (
                <>
                  <div className="remove-negative-content">
                    <Checkbox
                      label="Remove Negative Values"
                      key={dataKey}
                      onChange={() => {
                        toggleNegative();
                      }}
                      checked={negativeChecked()}
                    />
                  </div>
                </>
              )}
            </>
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
