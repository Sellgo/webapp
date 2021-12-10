import React, { useEffect } from 'react';
import './index.scss';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Product } from '../../../interfaces/Product';
import { findMinMax, supplierDataKeys } from '../../../constants/Suppliers';
import { SupplierFilter, ChargesInputFilterDataType } from '../../../interfaces/Filters';
import { supplierProductsSelector, presetFiltersState } from '../../../selectors/Supplier';
import { setSupplierPageNumber, setLeadsTracker, setIsScroll } from '../../../actions/Suppliers';
import _ from 'lodash';
import ProfitabilityFilterPreset from '../../../components/ProfitabilityFilterPreset';
import PresetFilter from '../../../components/FilterContainer/PresetFilter';
import ExportResultAs from '../../../components/ExportResultAs';
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../constants/Products';
import {
  exportResults,
  fetchActiveExportFiles,
  setFileDownloaded,
} from '../../../actions/Products';

import ChargesInputFilter from '../../../components/FilterContainer/ChargesInputFilter';
import MultipackVariationsFilterPreset from '../../../components/MulitipackVariationsFilterPreset';
import { ReactComponent as FilterImage } from '../../../assets/images/sliders-v-square-solid.svg';
import { timeout } from '../../../utils/timeout';
import { activeExportFiles } from '../../../selectors/Products';

import { toggleNotification } from '../../../actions/Notification';
import { selectIsNotificationOpen } from '../../../selectors/Notification';
import { FileExport } from '../../../interfaces/FileExport';

interface Props {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  supplierDetails: any;
  products: Product[];
  filteredProducts: Product[];
  filterSearch: string;
  setPageNumber: (pageNumber: number) => void;
  setLeadsTracker: (sellerId: number, supplierId: number) => void;
  setIsScroll: (value: boolean) => void;
  subscriptionType: string;
  isScrollSelector: boolean;
  scrollTop: boolean;
  subscriptionPlan: any;
  fetchActiveExportFiles: (status: boolean) => void;
  exportFilters: any;
  onFilterChange: (filterState: any) => void;
  presetFilterState: any;
  activeExportFiles: FileExport[];
  setFileDownloaded: (payload: any) => void;
  toggleNotification: (toggleState: boolean) => void;
  isNotificationOpen: boolean;
}

function ProfitFinderFilterSection(props: Props) {
  const { supplierDetails, products, setPageNumber, onFilterChange, presetFilterState } = props;

  const filterStorage = JSON.parse(
    typeof localStorage.filterState === 'undefined' ? null : localStorage.filterState
  );
  const [openPresetFilter, togglePresetFilter] = React.useState(false);

  /* State for toggle charges filter popup */
  const [showChargesFilter, setShowChargesFilter] = React.useState<boolean>(false);

  const filteredRanges = findMinMax(products);

  const rangeData: any = _.cloneDeep(filteredRanges);

  const filterInitialData = {
    supplierID: supplierDetails.supplier_id,
    allFilter: [],
    sizeTierFilter: [
      'Small standard-size',
      'Large standard-size',
      'Small oversize',
      'Medium oversize',
      'Large oversize',
      'Special oversize',
      'Others',
    ],
    profitability: 'All Products',
    profitabilityFilter: {
      value: 'Profitable',
      active: false,
    },
    removeNegative: [],
    price: filteredRanges.price,
    profit: filteredRanges.profit,
    margin: filteredRanges.margin,
    roi: filteredRanges.roi,
    sales_monthly: filteredRanges.sales_monthly,
    rank: filteredRanges.rank,
    categories: [
      'Amazon Launchpad',
      'Appliances',
      'Apps & Games',
      'Arts, Crafts & Sewing',
      'Audio & Video Connectors & Adapters',
      'Automotive',
      'Baby',
      'Beauty & Personal Care',
      'Books',
      'Camera & Photo',
      'CDs & Vinyl',
      'Cell Phones & Accessories',
      'Clothing, Shoes & Jewelry',
      'Collectible & Fine Arts',
      'Computers & Accessories',
      'Earbud & In-Ear Headphones',
      'Electronics',
      'Grocery & Gourmet Food',
      'Handmade Products',
      'Health & Household',
      'Home & Kitchen',
      'Industrial & Scientific',
      'Kindle store',
      'Kitchen & Dining',
      'Lock Picking & Theft Devices',
      'Luggage & Travel',
      'Magazine Subscription',
      'Medical Devices & Accessories',
      'Movies & TV',
      'Musical Instruments',
      'Office Products',
      'Outdoors',
      'Patio, Lawn & Garden',
      'Pet Supplies',
      'Software',
      'Sports & Outdoors',
      'Tools & Home Improvement',
      'Toys & Games',
      'Video Games',
    ],
    customizable: [
      {
        dataKey: 'monthly_revenue',
        operation: '≤',
        value: 1200,
        active: false,
        label: 'Monthly Revenue',
      },
      {
        dataKey: 'multipack_profit',
        operation: '≤',
        value: 250,
        active: false,
        label: 'Multipack Profit',
      },
      {
        dataKey: 'multipack_margin',
        operation: '≤',
        value: 15,
        active: false,
        label: 'Multipack Margin',
      },
      {
        dataKey: 'price',
        operation: '≤',
        value: 20,
        active: false,
        label: 'Price',
      },
      {
        dataKey: 'sales_monthly',
        operation: '≥',
        value: 90,
        active: false,
        label: 'Sales Monthly',
      },
      {
        dataKey: 'customer_reviews',
        operation: '≤',
        value: 25,
        active: false,
        label: 'Reviews',
      },
    ],
    multipackPreset: {
      value: 'Variation',
      active: false,
    },
    charges: [],
  };

  const initialFilterState: any = filterStorage ? filterStorage : filterInitialData;

  if (initialFilterState.categories !== filterInitialData.categories) {
    initialFilterState.categories = filterInitialData.categories;
  }

  const [filterState, setFilterState] = React.useState(initialFilterState);

  useEffect(() => {
    localStorage.setItem('filterState', JSON.stringify(filterState));
  }, [setFilterState]);

  useEffect(() => {
    if (presetFilterState) {
      setFilterState(initialFilterState);
    }
  }, [presetFilterState]);

  if (filterState.profitabilityFilter === undefined) {
    filterState.profitabilityFilter = filterInitialData.profitabilityFilter;
  }
  if (filterState.multipackPreset === undefined) {
    filterState.multipackPreset = filterInitialData.multipackPreset;
  }

  useEffect(() => {
    if (filterState.customizable.length !== filterInitialData.customizable.length) {
      filterState.customizable = _.map(filterInitialData.customizable, (item: any) => {
        const item2 = _.findKey(filterState.customizable, { dataKey: item.dataKey });

        return _.extend(item, item2);
      });
    }
  }, [filterState]);

  const filterDataState: SupplierFilter = {
    filterRanges: [
      {
        label: 'Buy Box Price $',
        dataKey: 'price',
        minPlaceholder: 'Min',
        maxPlaceholder: 'Max',
        range: rangeData.price,
        filterRange: filterState.price,
        sign: '$',
      },
      {
        label: 'Profit $',
        dataKey: 'profit',
        minPlaceholder: '$ Min',
        maxPlaceholder: '$ Max',
        range:
          filterState.removeNegative.indexOf('profit') !== -1
            ? {
                min: rangeData.profit.min < 0 ? 0 : rangeData.profit.min,
                max: rangeData.profit.max < 0 ? 0 : rangeData.profit.max,
              }
            : rangeData.profit,
        filterRange: filterState.profit,
        removeNegative: false,
        sign: '$',
      },
      {
        label: 'Profit Margin %',
        dataKey: 'margin',
        minPlaceholder: 'Min %',
        maxPlaceholder: 'Max %',
        range:
          filterState.removeNegative.indexOf('margin') !== -1
            ? {
                min: rangeData.margin.min < 0 ? 0 : rangeData.margin.min,
                max: rangeData.margin.max < 0 ? 0 : rangeData.margin.max,
              }
            : rangeData.margin,
        filterRange: filterState.margin,
        removeNegative: false,
        sign: '%',
      },
      {
        label: 'ROI/ Return On Investment %',
        dataKey: 'roi',
        minPlaceholder: 'Min %',
        maxPlaceholder: 'Max %',
        range:
          filterState.removeNegative.indexOf('roi') !== -1
            ? {
                min: rangeData.roi.min < 0 ? 0 : rangeData.roi.min,
                max: rangeData.roi.max < 0 ? 0 : rangeData.roi.max,
              }
            : rangeData.roi,
        filterRange: filterState.roi,
        removeNegative: false,
        sign: '%',
      },
      {
        label: 'Unit Sold',
        dataKey: 'sales_monthly',
        minPlaceholder: 'Min sold',
        maxPlaceholder: 'Max sold ',
        range: rangeData.sales_monthly,
        filterRange: filterState.sales_monthly,
      },
      {
        label: 'Rank',
        dataKey: 'rank',
        minPlaceholder: 'Min rank',
        maxPlaceholder: 'Max rank ',
        range: rangeData.rank,
        filterRange: filterState.rank,
      },
    ],
    presets: [
      {
        label: 'Customizable',
        dataKey: 'customizable-preset',
        radio: false,
        data: [
          {
            label: 'Listing generates',
            dataKey: 'monthly_revenue',
            targetValue: '$/month',
          },
          {
            label: 'Profit is',
            dataKey: 'multipack_profit',
            targetValue: '$/month',
          },
          {
            label: 'Profit Margin is',
            dataKey: 'multipack_margin',
            targetValue: '%',
          },
          {
            label: 'Amazon price is',
            dataKey: 'price',
            targetValue: '$',
          },
          {
            label: 'Estimated Sales Volume is',
            dataKey: 'sales_monthly',
            targetValue: '/month',
          },
          {
            label: 'Product review is',
            dataKey: 'customer_reviews',
            targetValue: 'reviews',
          },
        ],
      },
    ],
    charges: [],
  };

  const chargesInputFilterDataState: Array<ChargesInputFilterDataType> = [
    {
      label: 'Inbound Shipping Per Item',
      key: 'inbound_shipping',
      type: 'text',
      icon: 'dollar',
    },
    {
      label: 'Outbound Shipping Per Item',
      key: 'outbound_shipping',
      type: 'text',
      icon: 'dollar',
    },
    {
      label: 'Prep Fee per Item',
      key: 'prep_fee',
      type: 'text',
      icon: 'dollar',
    },
    {
      label: 'Tax % on Sourcing',
      key: 'sourcing_tax',
      type: 'text',
      icon: 'percent',
    },
    {
      label: 'VAT Registered',
      key: 'vat_registered',
      type: 'checkbox',
      icon: '',
    },
    {
      label: 'VAT % deducted from Sell Price',
      key: 'vat_perc',
      type: 'text',
      icon: 'percent',
    },
    {
      label: 'Custom Change',
      key: 'custom_charge',
      type: 'text',
      icon: 'dollar',
    },
    {
      label: 'Custom Discount',
      key: 'custom_discount',
      type: 'text',
      icon: 'percent',
    },
  ];

  const [filterRanges, setFilterRanges] = React.useState(filterDataState.filterRanges);
  const [exportResult, setExportResult] = React.useState(false);
  const [exportResultLoading, setExportResultLoading] = React.useState(false);

  const customizeFilterChange = (dataKey: string, type: string, value?: any) => {
    _.map(filterState.customizable, customizableData => {
      if (customizableData.dataKey === dataKey) {
        if (type === 'operation') {
          customizableData.operation = value;
        } else if (type === 'filter-value') {
          customizableData.value = value;
        } else if (type === 'toggle') {
          customizableData.active = !customizableData.active;
          if (!customizableData.active && filterState[dataKey]) {
            filterState[dataKey] = rangeData[dataKey];
          }
        }
      }
      return customizableData;
    });
    setFilterState(filterState);
    customizableFilterWithSlider(dataKey);
    //resets negative filter on slider based on custom filter key
    toggleNegative(dataKey, true);
    if (type === 'toggle') {
      applyFilter(true);
    }
  };

  const toggleOffCustomFilter = (dataKey: string) => {
    const filterData = filterState;
    _.map(filterData.customizable, filter => {
      if (filter.dataKey === dataKey && filter.active) {
        filter.active = false;
      }
      return filter;
    });
    setFilterState(filterData);
  };

  const resetCustomizableFilter = () => {
    const filterData = filterState;
    for (const key of supplierDataKeys) {
      for (const filter of filterData.customizable) {
        if (key === filter.dataKey && filter.active) {
          filterState[key] = filteredRanges[key];
        }
      }
    }
    filterData.customizable = filterInitialData.customizable;
    setFilterState(filterData);
    applyFilter(true);
  };

  const customizableFilterWithSlider = (dataKey: string) => {
    const filterData = filterState;
    _.map(filterData.customizable, filter => {
      if (filter.dataKey === dataKey && filter.active && filterData[dataKey] !== undefined) {
        switch (filter.operation) {
          case '≤':
            filterData[dataKey].min = rangeData[dataKey].min;
            filterData[dataKey].max =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            break;
          case '≥':
            filterData[dataKey].min =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            filterData[dataKey].max = rangeData[dataKey].max;
            break;
          case '=':
            filterData[dataKey].min =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            filterData[dataKey].max =
              Number(filter.value) < rangeData[dataKey].min
                ? rangeData[dataKey].min
                : Number(filter.value) > rangeData[dataKey].max
                ? rangeData[dataKey].max
                : Number(filter.value);
            break;
          default:
            return null;
        }
      }
    });
    setFilterState(filterData);
  };

  const setProfitability = (value?: any) => {
    const filterValue = filterState;
    const objData = {
      value: value ? value : filterValue.profitabilityFilter.value,
      active: value ? true : !filterValue.profitabilityFilter.active,
    };
    filterValue.profitabilityFilter = objData;

    if (filterValue.profitabilityFilter.active) {
      if (filterValue.profitabilityFilter.value === 'Profitable') {
        filterValue.profit.min = 0.01;
        filterValue.profit.max = rangeData.profit.max;
      } else if (filterValue.profitabilityFilter.value === 'Non-Profitable Products') {
        filterValue.profit.min = rangeData.profit.min;
        filterValue.profit.max = 0;
      }
    } else {
      filterValue.profit = rangeData.profit;
    }
    setFilterState(filterValue);
  };

  const setMultipack = (value?: any) => {
    const filterValue = filterState;
    const objData = {
      value: value ? value : filterValue.multipackPreset.value,
      active: value ? true : !filterValue.multipackPreset.active,
    };
    filterValue.multipackPreset = objData;
    setFilterState(filterValue);
  };

  const resetPreset = () => {
    resetCustomizableFilter();
    applyFilter(true);
  };

  const applyFilter = (isPreset?: boolean) => {
    setPageNumber(1);
    if (
      !isPreset &&
      JSON.stringify(initialFilterState.profit) !== JSON.stringify(filterState.profit)
    ) {
      filterState.profitabilityFilter.active = false;
      toggleOffCustomFilter('profit');
    }
    if (!isPreset) {
      checkCustomizePresetChange();
    }
    localStorage.setItem('filterState', JSON.stringify(filterState));
    onFilterChange(filterState);
  };

  const applyChargesFilters = async (charges: any) => {
    setPageNumber(1);

    const filterValues = chargesInputFilterDataState
      .filter((f: ChargesInputFilterDataType) => !!charges[f.key])
      .map((f: ChargesInputFilterDataType) => ({
        ...f,
        value: charges[f.key],
        [f.key]: charges[f.key],
      }));
    initialFilterState.customizable = filterState.customizable;
    const filters = { ...filterStorage, charges: filterValues };
    localStorage.setItem('filterState', JSON.stringify(filters));
    await setFilterState(filters);
    onFilterChange(filters);
  };

  const checkCustomizePresetChange = () => {
    const filterStorage =
      typeof localStorage.filterState === 'undefined'
        ? null
        : _.cloneDeep(JSON.parse(localStorage.filterState));
    if (filterStorage) {
      for (const key of supplierDataKeys) {
        if (JSON.stringify(filterStorage[key]) !== JSON.stringify(filterState[key])) {
          toggleOffCustomFilter(key);
        }
      }
    }
  };

  const toggleNegative = (datakey: string, isPreset?: boolean) => {
    const data = filterState;
    const filterDetails = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        if (isPreset) {
          if (data.removeNegative.indexOf(datakey) !== -1) {
            //only toggle negative slider if change is from preset
            data.removeNegative.splice(data.removeNegative.indexOf(datakey), 1);
            filter.filterRange = rangeData[datakey];
          }
        } else {
          if (data.removeNegative.indexOf(datakey) !== -1) {
            data.removeNegative.splice(data.removeNegative.indexOf(datakey), 1);
            filter.range = rangeData[datakey];
            filter.filterRange = rangeData[datakey];
            data[datakey] = rangeData[datakey];
          } else {
            data.removeNegative.push(datakey);
            filter.range = {
              min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
              max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
            };
            filter.filterRange = {
              min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
              max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
            };
            data[filter.dataKey] = {
              min: rangeData[datakey].min < 0 ? 0 : rangeData[datakey].min,
              max: rangeData[datakey].max < 0 ? 0 : rangeData[datakey].max,
            };
          }
        }
      }
      return filter;
    });

    //resets custom filter based on slider
    if (!isPreset) {
      toggleOffCustomFilter(datakey);
    }

    setFilterRanges(filterDetails);
    setFilterState(data);
  };

  const renderExportButtons = () => {
    return (
      <div onClick={() => setExportResult(true)} className="export-button">
        <Icon name="download" />
        <span>Export</span>
      </div>
    );
  };

  const renderChargesFilter = () => {
    return (
      <Popup
        on="click"
        open={showChargesFilter}
        onOpen={() => setShowChargesFilter(true)}
        onClose={() => setShowChargesFilter(false)}
        position="bottom left"
        offset={'500px'}
        className="charges-filter-popup"
        basic={true}
        trigger={
          <div
            className={`charges-filter-btn`}
            onClick={() => {
              setShowChargesFilter(!showChargesFilter);
            }}
          >
            <FilterImage className="filterImage" />
            <p className="charges">Charges</p>
          </div>
        }
        content={
          <ChargesInputFilter
            closeFilter={() => setShowChargesFilter(false)}
            applyFilter={applyChargesFilters}
            values={chargesValues || []}
            filterDataState={chargesInputFilterDataState}
          />
        }
      />
    );
  };

  const onExportResults = async (value: any) => {
    try {
      const { supplierDetails, fetchActiveExportFiles, exportFilters } = props;

      // for filtered exports
      if (value.data === 'filtered') {
        const file_format = value.format;

        const synthesis_file_id = supplierDetails.synthesis_file_id;
        setExportResultLoading(true);
        await exportResults(
          { filters: exportFilters, file_format, synthesis_file_id },
          supplierDetails.supplier_id
        );
        await setExportResult(false);
        await setExportResultLoading(false);
        await fetchActiveExportFiles(true);
      } else {
        const url =
          value.format === 'csv' ? supplierDetails.report_url_csv : supplierDetails.report_url;
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        //close the popup after delay of 2.0s
        await timeout(2000);
        setExportResult(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isScrollTop = props.scrollTopSelector ? 'scroll-top' : '';
  const isStickyChartActive = props.stickyChartSelector ? 'sticky-chart-active' : '';
  // const leadsStatus =
  //   props.supplierDetails.leads_tracker_status === null ||
  //   props.supplierDetails.leads_tracker_status === 'inactive';
  // const isToggle = leadsStatus ? false : true;
  let chargesValues = {};
  const values =
    filterStorage && filterStorage.charges && !!filterStorage.charges.length
      ? filterStorage.charges
      : filterState.charges;
  values.forEach((f: any) => {
    chargesValues = { ...chargesValues, [f.key]: f.value };
  });

  return (
    <div className={`filter-section ${isStickyChartActive} ${isScrollTop}`}>
      <div className="filter-header">
        <div className="filter-header__options">
          <Popup
            on="click"
            open={openPresetFilter}
            onOpen={() => togglePresetFilter(true)}
            onClose={() => togglePresetFilter(false)}
            position="bottom left"
            className="pf-preset-filter-popup"
            basic={true}
            trigger={
              <Button
                basic
                icon
                labelPosition="left"
                className={`more-filter`}
                onClick={() => {
                  togglePresetFilter(!openPresetFilter);
                }}
              >
                <span className="filter-name">More</span>
                <Icon name="angle down" />
              </Button>
            }
            content={
              <PresetFilter
                togglePresetFilter={togglePresetFilter}
                applyFilter={applyFilter}
                filterState={filterState}
                filterData={filterDataState}
                filterInitialData={filterInitialData}
                resetPreset={resetPreset}
                customizeFilterChange={customizeFilterChange}
              />
            }
          />

          <ProfitabilityFilterPreset
            setProfitability={setProfitability}
            applyFilter={applyFilter}
            filterState={filterState}
          />
          <MultipackVariationsFilterPreset
            setMultipack={setMultipack}
            filterState={filterState}
            applyFilter={applyFilter}
          />
        </div>

        <div className="leads-export-wrapper">
          {/* <p className={`${!isPlanEnterprise(subscriptionType) && 'hidden'}`}>Leads Tracking</p>
          {isPlanEnterprise(props.subscriptionPlan) && (
            <LeadsTrackerToggle
              setLeadsTracker={props.setLeadsTracker}
              seller_id={props.supplierDetails.seller_id}
              supplier_id={props.supplierDetails.supplier_id}
              isToggle={isToggle}
            />
          )} */}
          {renderChargesFilter()}
          {renderExportButtons()}
        </div>
      </div>
      <ExportResultAs
        open={exportResult}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        onClose={() => setExportResult(false)}
        loading={exportResultLoading}
        onExport={onExportResults}
        format={'csv'}
      />
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  products: supplierProductsSelector(state),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterSearch: get(state, 'supplier.filterSearch'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  subscriptionType: get(state, 'subscription.subscriptionType'),
  subscriptionPlan: get(state, 'subscription.plan'),
  isScrollSelector: get(state, 'supplier.setIsScroll'),
  scrollTop: get(state, 'supplier.setScrollTop'),
  presetFilterState: presetFiltersState(state),
  activeExportFiles: activeExportFiles(state),
  isNotificationOpen: selectIsNotificationOpen(state),
});

const mapDispatchToProps = {
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  setLeadsTracker: (sellerId: number, supplierId: number) => setLeadsTracker(sellerId, supplierId),
  setIsScroll: (value: boolean) => setIsScroll(value),
  fetchActiveExportFiles,
  setFileDownloaded,
  toggleNotification: (toggleState: boolean) => toggleNotification(toggleState),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitFinderFilterSection);
