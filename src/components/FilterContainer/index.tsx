import React, { useState } from 'react';
import './index.scss';
import { Checkbox, Button, Divider, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import { SupplierFilter, FilterState } from '../../interfaces/Filters';
import FilterSliderInput from '../FilterSliderInput';
import { Range } from '../../interfaces/Generic';

interface Props {
  filterType: string;
  toggleCheckboxFilter: (filterDataKey: string, label: string) => void;
  toggleSizeTierFilter: (filterDataKey: string, label: string) => void;
  setRadioFilter: (filterDataKey: string, label: string) => void;
  applyFilter: (isPreset?: boolean) => void;
  resetFilter: () => void;
  resetPreset: () => void;
  toggleSelectAllCategories: () => void;
  toggleSelectAllSize: () => void;
  selectAllCategories: () => void;
  resetSingleFilter: (datakey: string) => void;
  toggleNegative: (datakey: string) => void;
  filterData: SupplierFilter;
  handleCompleteChange: (dataKey: string, range: Range) => void;
  initialFilterState: FilterState;
  isSelectAllCategories: boolean;
  isSelectAllSize: boolean;
}

function FilterContainer(props: Props) {
  const {
    applyFilter,
    toggleSizeTierFilter,
    toggleCheckboxFilter,
    resetFilter,
    resetPreset,
    filterData,
    handleCompleteChange,
    resetSingleFilter,
    initialFilterState,
    toggleSelectAllCategories,
    toggleSelectAllSize,
    isSelectAllCategories,
    selectAllCategories,
    isSelectAllSize,
    toggleNegative,
    filterType,
    setRadioFilter,
  } = props;

  const [isShowMore, setShowMore] = useState(false);

  const filterCategory = (
    <div className={'all-filter-content-wrapper'}>
      {_.map(filterData.allFilter, (filter, key) => {
        return (
          <div className={`all-filter-content ${filter.dataKey}`} key={key}>
            <div className="content-header">
              <span className="filter-name">{filter.label}</span>
              {filter.dataKey === 'product-category' && (
                <span className="reset category-list" onClick={() => selectAllCategories()}>
                  x Reset
                </span>
              )}
            </div>
            <div className={'filter-list'}>
              {filter.dataKey === 'product-category' && (
                <div className="ui checkbox select-all">
                  <input
                    id="select-all"
                    checked={isSelectAllCategories}
                    onChange={() => {
                      toggleSelectAllCategories();
                    }}
                    type="checkbox"
                  />
                  <label htmlFor="select-all"> Select all</label>
                </div>
              )}
              {filter.dataKey === 'product-size-tiers' && (
                <div className="ui checkbox all-size">
                  <input
                    id="all-size"
                    checked={isSelectAllSize}
                    onChange={() => {
                      toggleSelectAllSize();
                    }}
                    type="checkbox"
                  />
                  <label htmlFor="all-size"> All size</label>
                </div>
              )}
              {_.map(filter.data, (filterData, dataKey) => {
                if (filter.dataKey === 'product-size-tiers') {
                  return (
                    <div className="ui checkbox" key={dataKey}>
                      <input
                        id={filterData.dataKey}
                        checked={initialFilterState.sizeTierFilter.indexOf(filterData.label) !== -1}
                        onChange={() => {
                          toggleSizeTierFilter(filterData.dataKey, filterData.label);
                        }}
                        type="checkbox"
                      />
                      <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                    </div>
                  );
                } else {
                  return (
                    <div className={`ui checkbox ${dataKey > 3 ? 'more' : 'less'}`} key={dataKey}>
                      <input
                        id={filterData.dataKey}
                        checked={initialFilterState.allFilter.indexOf(filterData.label) !== -1}
                        onChange={() => {
                          toggleCheckboxFilter(filterData.dataKey, filterData.label);
                        }}
                        type="checkbox"
                      />
                      <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                    </div>
                  );
                }
              })}
            </div>
            {filter.dataKey === 'product-category' && (
              <div key={filter.dataKey} className="toggle-see-all">
                <span
                  className="FilterContainer__btn show-more"
                  onClick={() => {
                    setShowMore(!isShowMore);
                  }}
                >
                  Show more
                </span>
                <span
                  className="FilterContainer__btn show-less"
                  onClick={() => {
                    setShowMore(!isShowMore);
                  }}
                >
                  Show less
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="filter-container">
      {filterType === 'all-filter' && (
        <>
          {filterCategory}
          <Divider className="middle-divider" />
          <div className="slider-filters">
            <div className="slider-wrapper">
              {_.map(filterData.filterRanges, filter => {
                return (
                  <div className="range-container" key={filter.dataKey}>
                    <div className="range-label">{filter.label}</div>
                    <span className="reset" onClick={() => resetSingleFilter(`${filter.dataKey}`)}>
                      x Reset
                    </span>
                    <FilterSliderInput
                      dataKey={filter.dataKey}
                      range={filter.range}
                      filterRange={filter.filterRange}
                      handleCompleteChange={handleCompleteChange}
                      labelSign={filter.sign}
                    />
                    {filter.removeNegative !== undefined && (
                      <div className="remove-negative">
                        <Checkbox
                          label="Remove Negative Values"
                          key={filter.dataKey}
                          onChange={() => {
                            toggleNegative(filter.dataKey);
                          }}
                          checked={initialFilterState.removeNegative.indexOf(filter.dataKey) !== -1}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="button-wrapper">
              <Button basic className="reset-filter-btn" onClick={() => resetFilter()}>
                Reset
              </Button>
              <Button basic className="apply-filter-btn" onClick={() => applyFilter()}>
                Apply
              </Button>
            </div>
          </div>
        </>
      )}

      {filterType === 'more-filter' && (
        <>
          <div className={'presets-filter-content-wrapper'}>
            <div className="presets-filter-content-wrapper__header">
              <span className="presets-filter-content-wrapper__header__filter-name">
                Quick Preset
              </span>
              <div className="presets-filter-content-wrapper__header__preset-reset">
                <p onClick={() => resetPreset()}>x Reset</p>
              </div>
            </div>
            {_.map(filterData.presets, (filter, key) => {
              return (
                <div
                  className={`presets-filter-content-wrapper__content ${filter.dataKey}`}
                  key={key}
                >
                  {filter.dataKey === 'profitability-preset' && (
                    <>
                      <span className="presets-filter-content-wrapper__content__filter-name">
                        {filter.label}
                      </span>
                      {_.map(filter.data, (filterData, dataKey) => {
                        return (
                          <div className={`ui radio checkbox ${filter.checkedValue}`} key={dataKey}>
                            <input
                              id={filterData.dataKey}
                              checked={initialFilterState.profitability === filterData.label}
                              onChange={() => {
                                setRadioFilter(filterData.dataKey, filterData.label);
                                applyFilter(true);
                              }}
                              type="radio"
                            />
                            <label htmlFor={filterData.dataKey}> {filterData.label}</label>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      <Modal
        className="FilterContainer__show-more"
        open={isShowMore}
        onClose={() => setShowMore(!isShowMore)}
      >
        <i className="fas fa-times" onClick={() => setShowMore(!isShowMore)} />
        <Modal.Header>Product Category</Modal.Header>
        <Modal.Content>{filterCategory}</Modal.Content>
      </Modal>
    </div>
  );
}

export default FilterContainer;
