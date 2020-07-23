import React, { useState } from 'react';
import './index.scss';
import { Modal } from 'semantic-ui-react';
import _ from 'lodash';
import { SupplierFilter, FilterState } from '../../interfaces/Filters';
import { Range } from '../../interfaces/Generic';
import AllFilter from './AllFilter';
import PresetFilter from './PresetFillter';

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
        <AllFilter
          applyFilter={applyFilter}
          resetFilter={resetFilter}
          filterData={filterData}
          handleCompleteChange={handleCompleteChange}
          resetSingleFilter={resetSingleFilter}
          initialFilterState={initialFilterState}
          toggleNegative={toggleNegative}
          filterCategory={filterCategory}
        />
      )}

      {filterType === 'more-filter' && (
        <PresetFilter
          applyFilter={applyFilter}
          initialFilterState={initialFilterState}
          filterData={filterData}
          setRadioFilter={setRadioFilter}
          resetPreset={resetPreset}
        />
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
