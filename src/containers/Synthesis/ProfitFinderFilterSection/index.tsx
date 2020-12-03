import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Product } from '../../../interfaces/Product';
import { findMinMax, supplierDataKeys } from '../../../constants/Suppliers';
import { SupplierFilter } from '../../../interfaces/Filters';
import { supplierProductsSelector } from '../../../selectors/Supplier';
import {
  filterSupplierProducts,
  setSupplierPageNumber,
  setLeadsTracker,
  setIsScroll,
} from '../../../actions/Suppliers';
import { Range } from '../../../interfaces/Generic';
import _ from 'lodash';
import FilterContainer from '../../../components/FilterContainer';
import LeadsTrackerToggle from '../../../components/LeadsTrackerToggle';
import ProfitabilityFilterPreset from '../../../components/ProfitabilityFilterPreset';
import PresetFilter from '../../../components/FilterContainer/PresetFilter';
import { isPlanEnterprise } from '../../../utils/subscriptions';
import ExportResultAs from '../../../components/ExportResultAs';
import { EXPORT_DATA, EXPORT_FORMATS } from '../../../constants/Products';
import { exportResults } from '../../../actions/Products';
interface Props {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  supplierDetails: any;
  products: Product[];
  filteredProducts: Product[];
  filterSearch: string;
  filterProducts: (value: string, filterData: any) => void;
  setPageNumber: (pageNumber: number) => void;
  setLeadsTracker: (sellerId: number, supplierId: number) => void;
  setIsScroll: (value: boolean) => void;
  subscriptionType: string;
  isScrollSelector: boolean;
  scrollTop: boolean;
  subscriptionPlan: any;
}

function ProfitFinderFilterSection(props: Props) {
  const {
    supplierDetails,
    filterProducts,
    filterSearch,
    products,
    setPageNumber,
    subscriptionType,
    filteredProducts,
  } = props;

  const filterStorage = JSON.parse(
    typeof localStorage.filterState === 'undefined' ? null : localStorage.filterState
  );
  const selectAllCategoriesStorage = JSON.parse(
    typeof localStorage.filterSelectAllCategories === 'undefined' ||
      !filterStorage ||
      filterStorage.supplierID !== supplierDetails.supplier_id
      ? true
      : localStorage.filterSelectAllCategories
  );
  const selectAllSizeStorage = JSON.parse(
    typeof localStorage.filterSelectAllSize === 'undefined' ||
      !filterStorage ||
      filterStorage.supplierID !== supplierDetails.supplier_id
      ? true
      : localStorage.filterSelectAllSize
  );
  const [filterType, setFilterType] = useState('');
  const [isSelectAllCategories, setSelectCategories] = useState(selectAllCategoriesStorage);
  const [isSelectAllSize, setSelectAllSize] = useState(selectAllSizeStorage);
  const [hasAllFilter, setHasAllFilter] = React.useState(false);
  const [openPresetFilter, togglePresetFilter] = React.useState(false);

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
        dataKey: 'listing-monthly',
        operation: '≤',
        value: 1200,
        active: false,
      },
      {
        dataKey: 'profit-monthly',
        operation: '≤',
        value: 250,
        active: false,
      },
      {
        dataKey: 'margin',
        operation: '≤',
        value: 15,
        active: false,
      },
      {
        dataKey: 'price',
        operation: '≤',
        value: 20,
        active: false,
      },
      {
        dataKey: 'sales_monthly',
        operation: '≥',
        value: 90,
        active: false,
      },
      {
        dataKey: 'customer_reviews',
        operation: '≤',
        value: 25,
        active: false,
      },
    ],
  };
  const initialFilterState: any =
    filterStorage && filterStorage.supplierID === supplierDetails.supplier_id
      ? filterStorage
      : filterInitialData;

  if (initialFilterState.categories !== filterInitialData.categories) {
    initialFilterState.categories = filterInitialData.categories;
  }

  const [filterState, setFilterState] = React.useState(initialFilterState);

  if (filterState.profitabilityFilter === undefined) {
    filterState.profitabilityFilter = filterInitialData.profitabilityFilter;
  }
  useEffect(() => {
    if (isSelectAllCategories || !filterStorage) {
      selectAllCategories(true);
    }
    if (isSelectAllSize || !filterStorage) {
      selectAllSize(true);
    }
    if (filterState.customizable.length !== filterInitialData.customizable.length) {
      filterState.customizable = _.map(filterInitialData.customizable, (item: any) => {
        const item2 = _.findKey(filterState.customizable, { dataKey: item.dataKey });

        return _.extend(item, item2);
      });
    }
    filterProducts(filterSearch, filterState);
    setHasAllFilter(isFilterUse());
  }, [filterState]);

  const filterDataState: SupplierFilter = {
    allFilter: [
      {
        label: 'Product Category',
        dataKey: 'product-category',
        radio: false,
        data: [
          {
            label: 'Amazon Launchpad',
            dataKey: 'amazon-launchpad',
            checked: true,
          },
          {
            label: 'Appliances',
            dataKey: 'appliances',
            checked: true,
          },
          {
            label: 'Apps & Games',
            dataKey: 'apps-games',
            checked: true,
          },
          {
            label: 'Arts, Crafts & Sewing',
            dataKey: 'arts-crafts-sewing',
            checked: true,
          },
          {
            label: 'Audio & Video Connectors & Adapters',
            dataKey: 'aduio-video-connectors-adapters',
            checked: true,
          },
          {
            label: 'Automotive',
            dataKey: 'automotive',
            checked: true,
          },
          {
            label: 'Baby',
            dataKey: 'baby',
            checked: true,
          },
          {
            label: 'Beauty & Personal Care',
            dataKey: 'beauty-personal-care',
            checked: true,
          },
          {
            label: 'Books',
            dataKey: 'books',
            checked: true,
          },
          {
            label: 'Camera & Photo',
            dataKey: 'camera-photo',
            checked: true,
          },
          {
            label: 'CDs & Vinyl',
            dataKey: 'cds-vinyl',
            checked: true,
          },
          {
            label: 'Cell Phones & Accessories',
            dataKey: 'cellphones-accessories',
            checked: true,
          },
          {
            label: 'Clothing, Shoes & Jewelry',
            dataKey: 'clothing-shoes-jewelry',
            checked: true,
          },
          {
            label: 'Collectible & Fine Arts',
            dataKey: 'collectible-fine-arts',
            checked: true,
          },
          {
            label: 'Computers & Accessories',
            dataKey: 'computers-accessories',
            checked: true,
          },
          {
            label: 'Earbud & In-Ear Headphones',
            dataKey: 'earbud-headphones',
            checked: true,
          },
          {
            label: 'Electronics',
            dataKey: 'electronics',
            checked: true,
          },
          {
            label: 'Grocery & Gourmet Food',
            dataKey: 'groceries-gourmet-food',
            checked: true,
          },
          {
            label: 'Handmade Products',
            dataKey: 'handmade-products',
            checked: true,
          },
          {
            label: 'Health & Household',
            dataKey: 'health-household',
            checked: true,
          },
          {
            label: 'Home & Kitchen',
            dataKey: 'home-kitchen',
            checked: true,
          },
          {
            label: 'Industrial & Scientific',
            dataKey: 'industrial-scientific',
            checked: true,
          },
          {
            label: 'Kindle store',
            dataKey: 'kindle-store',
            checked: true,
          },
          {
            label: 'Kitchen & Dining',
            dataKey: 'kitchen-dining',
            checked: true,
          },
          {
            label: 'Lock Picking & Theft Devices',
            dataKey: 'lock-picking-theft-devices',
            checked: true,
          },
          {
            label: 'Luggage & Travel',
            dataKey: 'luggage-travel',
            checked: true,
          },
          {
            label: 'Magazine Subscription',
            dataKey: 'magazine-subscription',
            checked: true,
          },
          {
            label: 'Medical Devices & Accessories',
            dataKey: 'medical-devices-accessories',
            checked: true,
          },
          {
            label: 'Movies & TV',
            dataKey: 'movies-tV',
            checked: true,
          },
          {
            label: 'Musical Instruments',
            dataKey: 'musical-instruments',
            checked: true,
          },
          {
            label: 'Office Products',
            dataKey: 'office-products',
            checked: true,
          },
          {
            label: 'Outdoors',
            dataKey: 'outdoors',
            checked: true,
          },
          {
            label: 'Patio, Lawn & Garden',
            dataKey: 'patio-lawn-garden',
            checked: true,
          },
          {
            label: 'Pet Supplies',
            dataKey: 'pet-supplies',
            checked: true,
          },
          {
            label: 'Software',
            dataKey: 'software',
            checked: true,
          },
          {
            label: 'Sports & Outdoors',
            dataKey: 'sports-outdoors',
            checked: true,
          },
          {
            label: 'Tools & Home Improvement',
            dataKey: 'tools-home-improvement',
            checked: true,
          },
          {
            label: 'Toys & Games',
            dataKey: 'toys-games',
            checked: true,
          },
          {
            label: 'Video Games',
            dataKey: 'video-games',
            checked: true,
          },
          {
            label: 'Others',
            dataKey: 'others-category',
            checked: true,
          },
        ],
      },
      {
        label: 'Product Size Tiers',
        dataKey: 'product-size-tiers',
        radio: false,
        data: [
          {
            label: 'Small standard-size',
            dataKey: 'small-standard-size',
            checked: true,
          },
          {
            label: 'Large standard-size',
            dataKey: 'large-standard-size',
            checked: true,
          },
          {
            label: 'Small oversize',
            dataKey: 'small-oversize',
            checked: true,
          },
          {
            label: 'Medium oversize',
            dataKey: 'medium-oversize',
            checked: true,
          },
          {
            label: 'Large oversize',
            dataKey: 'large-oversize',
            checked: true,
          },
          {
            label: 'Special oversize',
            dataKey: 'special-oversize',
            checked: true,
          },
          {
            label: 'Others',
            dataKey: 'others-size-tiers',
            checked: true,
          },
        ],
      },
    ],
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
            dataKey: 'listing-monthly',
            targetValue: '$/month',
          },
          {
            label: 'Profit is',
            dataKey: 'profit-monthly',
            targetValue: '$/month',
          },
          {
            label: 'Profit Margin is',
            dataKey: 'margin',
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
  };

  const [allFilter, setAllFilter] = React.useState(filterDataState.allFilter);
  const [filterRanges, setFilterRanges] = React.useState(filterDataState.filterRanges);
  const [exportResult, setExportResult] = React.useState(false);
  const [exportResultLoading, setExportResultLoading] = React.useState(false);

  const toggleSizeTierFilter = (filterDataKey: string, label: string) => {
    const data = filterState;

    setSelectAllSize(false);

    if (data.sizeTierFilter.indexOf(label) !== -1) {
      data.sizeTierFilter.splice(data.sizeTierFilter.indexOf(label), 1);
    } else {
      data.sizeTierFilter.push(label);
    }
    setFilterState(data);

    localStorage.setItem('filterSelectAllSize', JSON.stringify(false));
    const allData = _.map(allFilter, filter => {
      if (filter.dataKey === 'product-size-tiers') {
        if (data.sizeTierFilter.length === filter.data.length) {
          selectAllSize();
        }
        _.map(filter.data, allSizeTierFilterData => {
          allSizeTierFilterData.checked = data.sizeTierFilter.indexOf(filterDataKey) !== -1;
          return allSizeTierFilterData;
        });
      }
      return filter;
    });
    setAllFilter(allData);
  };

  const toggleCheckboxFilter = (filterDataKey: string, label: string) => {
    const data = filterState;

    setSelectCategories(false);

    if (data.allFilter.indexOf(label) !== -1) {
      data.allFilter.splice(data.allFilter.indexOf(label), 1);
    } else {
      data.allFilter.push(label);
    }
    setFilterState(data);

    localStorage.setItem('filterSelectAllCategories', JSON.stringify(false));
    const allData = _.map(allFilter, filter => {
      if (filter.dataKey === 'product-category') {
        if (data.allFilter.length === filter.data.length) {
          selectAllCategories();
        }
        _.map(filter.data, allFilterData => {
          allFilterData.checked = data.allFilter.indexOf(filterDataKey) !== -1;
          return allFilterData;
        });
      }
      return filter;
    });
    setAllFilter(allData);
  };

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
    applyFilter(true);
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

  const selectAllCategories = (firstLoad?: boolean) => {
    if (!firstLoad) {
      localStorage.setItem('filterSelectAllCategories', JSON.stringify(true));
    }

    setSelectCategories(true);
    const data = filterState;
    _.map(allFilter, filter => {
      if (filter.dataKey === 'product-category') {
        _.map(filter.data, allFilterData => {
          if (data.allFilter.indexOf(allFilterData.label) === -1) {
            data.allFilter.push(allFilterData.label);
          }
          return allFilterData;
        });
      }
      return filter;
    });

    setFilterState(data);
  };

  const toggleSelectAllCategories = () => {
    setSelectCategories(!isSelectAllCategories);
    const data = filterState;
    if (!isSelectAllCategories) {
      selectAllCategories();
    } else {
      localStorage.setItem('filterSelectAllCategories', JSON.stringify(false));
      data.allFilter = [];
      setFilterState(data);
    }
  };

  const toggleSelectAllSize = () => {
    setSelectAllSize(!isSelectAllSize);
    const data = filterState;
    if (!isSelectAllSize) {
      selectAllSize();
    } else {
      localStorage.setItem('filterSelectAllSize', JSON.stringify(false));
      data.sizeTierFilter = [];
      setFilterState(data);
    }
  };

  const selectAllSize = (firstLoad?: boolean) => {
    if (!firstLoad) {
      localStorage.setItem('filterSelectAllSize', JSON.stringify(true));
    }

    setSelectAllSize(true);
    const data = filterState;
    _.map(allFilter, filter => {
      if (filter.dataKey === 'product-size-tiers') {
        _.map(filter.data, allFilterData => {
          if (data.sizeTierFilter.indexOf(allFilterData.label) === -1) {
            data.sizeTierFilter.push(allFilterData.label);
          }
          return allFilterData;
        });
      }
      return filter;
    });

    setFilterState(data);
  };
  const handleCompleteChange = (datakey: string, range: Range) => {
    const filterDetails: any = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = range;
      }
      return filter;
    });
    filterDetails[datakey] = range;
    setFilterState(filterDetails);
    setFilterRanges(data);
    toggleOffCustomFilter(datakey);
  };

  const resetSingleFilter = (datakey: string) => {
    const filterDetails = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = rangeData[datakey];
        filterDetails[datakey] = rangeData[datakey];
        if (filterDetails.removeNegative.indexOf(datakey) !== -1) {
          filterDetails.removeNegative.splice(filterDetails.removeNegative.indexOf(datakey), 1);
          filter.range = rangeData[datakey];
          filter.filterRange = rangeData[datakey];
          filterDetails[datakey] = rangeData[datakey];
        }
      }
      return filter;
    });
    toggleOffCustomFilter(datakey);
    setFilterRanges(data);
    setFilterState(filterDetails);
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

  const resetPreset = () => {
    resetCustomizableFilter();
    applyFilter(true);
  };

  const applyFilter = (isPreset?: boolean) => {
    setPageNumber(1);
    setHasAllFilter(isFilterUse());
    if (isSelectAllCategories) {
      selectAllCategories();
    }
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
    filterProducts(filterSearch, filterState);
    localStorage.setItem('filterState', JSON.stringify(filterState));
    if (!isPreset) {
      setFilterType('');
      setFilterModalOpen(false);
    }
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

  const resetFilter = () => {
    checkCustomizePresetChange();
    const data = filterState;
    data.supplierID = filterState.supplierID;
    data.allFilter = [];
    data.price = rangeData.price;
    data.profit = rangeData.profit;
    data.margin = rangeData.margin;
    data.roi = rangeData.roi;
    data.sales_monthly = rangeData.sales_monthly;
    data.rank = rangeData.rank;
    data.removeNegative = [];
    selectAllCategories();
    selectAllSize();
    const filterRangeKeys = Object.keys(rangeData);
    _.each(filterRangeKeys, key => {
      const filterRanges = _.map(filterDataState.filterRanges, filter => {
        if (filter.dataKey === key) {
          filter.filterRange = filter.range;
        }
        return filter;
      });
      setFilterRanges(filterRanges);
    });
    setFilterState(data);
    applyFilter();
    setFilterType('');
    setFilterModalOpen(false);
  };

  const handleFilterType = (type: string) => {
    if (filterType === type) {
      setFilterType('');
      return;
    }
    setFilterType(type);
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

  const isFilterUse = () => {
    if (JSON.stringify(rangeData.sales_monthly) !== JSON.stringify(filterState.sales_monthly))
      return true;
    if (JSON.stringify(rangeData.profit) !== JSON.stringify(filterState.profit)) return true;
    if (JSON.stringify(rangeData.margin) !== JSON.stringify(filterState.margin)) return true;
    if (JSON.stringify(rangeData.price) !== JSON.stringify(filterState.price)) return true;
    if (JSON.stringify(rangeData.rank) !== JSON.stringify(filterState.rank)) return true;
    if (JSON.stringify(rangeData.roi) !== JSON.stringify(filterState.roi)) return true;
    if (!isSelectAllSize) return true;
    if (!isSelectAllCategories) return true;

    return false;
  };

  const renderExportButtons = () => {
    return (
      <Button basic color="blue" onClick={() => setExportResult(true)}>
        Export As
      </Button>
    );
  };

  const onExportResults = async (value: any) => {
    try {
      const { filteredProducts, supplierDetails, products } = props;
      const psd_ids =
        value.data === 'filtered'
          ? filteredProducts.map((p: Product) => p.id)
          : products.map((p: Product) => p.id);
      const file_format = value.format;
      const synthesis_file_id = supplierDetails.synthesis_file_id;
      setExportResultLoading(true);
      const blob = await exportResults(
        { psd_ids, file_format, synthesis_file_id },
        supplierDetails.supplier_id
      );
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${supplierDetails.search}-${value.data}.${value.format}`;

      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setExportResultLoading(false);
      await setExportResult(false);
    } catch (e) {
      console.log(e);
    }
  };

  const isScrollTop = props.scrollTopSelector ? 'scroll-top' : '';
  const isStickyChartActive = props.stickyChartSelector ? 'sticky-chart-active' : '';
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const leadsStatus =
    props.supplierDetails.leads_tracker_status === null ||
    props.supplierDetails.leads_tracker_status === 'inactive';
  const isToggle = leadsStatus ? false : true;

  return (
    <div className={`filter-section ${isStickyChartActive} ${isScrollTop}`}>
      <div className="filter-header">
        <div className="filter-header__options">
          <Button
            basic
            icon
            labelPosition="left"
            className={
              (filterType === 'all-filter' ? 'active all-filter' : 'all-filter') +
              (!hasAllFilter && _.isEmpty(filteredProducts) ? ' disabled' : '')
            }
            onClick={() => {
              handleFilterType('all-filter');
              setFilterModalOpen(true);
            }}
          >
            <Icon className="slider" name="sliders horizontal" />
            <span className="filter-name">All</span>
            <Icon name="filter" className={` ${hasAllFilter ? 'blue' : 'grey'} `} />
          </Button>
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
        </div>

        <div className="leads-export-wrapper">
          <p className={`${!isPlanEnterprise(subscriptionType) && 'hidden'}`}>Leads Tracking</p>
          {isPlanEnterprise(props.subscriptionPlan) && (
            <LeadsTrackerToggle
              setLeadsTracker={props.setLeadsTracker}
              seller_id={props.supplierDetails.seller_id}
              supplier_id={props.supplierDetails.supplier_id}
              isToggle={isToggle}
            />
          )}
          {renderExportButtons()}
        </div>
      </div>
      <Modal
        className={
          filterType === 'all-filter'
            ? `FilterContainer__show-filter`
            : filterType === 'more-filter'
            ? `FilterContainer__presets`
            : ''
        }
        open={isFilterModalOpen}
        onClose={() => {
          setFilterModalOpen(!isFilterModalOpen);
          setFilterType('');
        }}
      >
        <i
          className="fas fa-times"
          onClick={() => {
            setFilterModalOpen(!isFilterModalOpen);
            setFilterType('');
          }}
        />
        <Modal.Content>
          <FilterContainer
            filterType={filterType}
            applyFilter={applyFilter}
            resetSingleFilter={resetSingleFilter}
            toggleCheckboxFilter={toggleCheckboxFilter}
            toggleSizeTierFilter={toggleSizeTierFilter}
            resetFilter={resetFilter}
            filterData={filterDataState}
            handleCompleteChange={handleCompleteChange}
            filterState={filterState}
            toggleSelectAllCategories={toggleSelectAllCategories}
            isSelectAllCategories={isSelectAllCategories}
            selectAllCategories={selectAllCategories}
            toggleNegative={toggleNegative}
            toggleSelectAllSize={toggleSelectAllSize}
            isSelectAllSize={isSelectAllSize}
          />
        </Modal.Content>
      </Modal>
      <ExportResultAs
        open={exportResult}
        formats={EXPORT_FORMATS}
        data={EXPORT_DATA}
        onClose={() => setExportResult(false)}
        loading={exportResultLoading}
        onExport={onExportResults}
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
});

const mapDispatchToProps = {
  filterProducts: (value: string, filterData: any) => filterSupplierProducts(value, filterData),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  setLeadsTracker: (sellerId: number, supplierId: number) => setLeadsTracker(sellerId, supplierId),
  setIsScroll: (value: boolean) => setIsScroll(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitFinderFilterSection);
