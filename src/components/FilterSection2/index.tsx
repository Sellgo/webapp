import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import FilterContainer from '../FilterContainer';
import { SupplierFilter, FilterState } from '../../interfaces/Filters';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Product } from '../../interfaces/Product';
import { supplierProductsSelector } from '../../selectors/Supplier';
import { Range } from '../../interfaces/Generic';
import { findMinMaxRange2 } from '../../constants/Suppliers';
import { filterSupplierProducts } from '../../actions/Suppliers';

interface FilterObject {
  label: string;
  dataKey: string;
}

interface State {
  filterTitle: FilterObject[];
}

interface Props {
  supplierDetails: any;
  products: Product[];
  filteredProducts: Product[];
  productRanges: any;
  filterSearch: string;
  filterProducts: (value: string, filterData: any) => void;
}

function FilterSection2(props: Props, state: State) {
  const { filteredProducts, productRanges, supplierDetails, filterProducts, filterSearch } = props;

  const filterStorage = JSON.parse(
    typeof localStorage.filterState == 'undefined' ? null : localStorage.filterState
  );
  const selectAllStorage = JSON.parse(
    typeof localStorage.filterSelectAll == 'undefined' ||
      !filterStorage ||
      filterStorage.supplier_id !== supplierDetails.supplier_id
      ? true
      : localStorage.filterSelectAll
  );
  const [filterType, setFilterType] = useState('');
  const [isSelectAll, setSelectAll] = useState(selectAllStorage);

  const filteredRanges = findMinMaxRange2(filteredProducts);
  const filterInitialData = {
    supplier_id: supplierDetails.supplier_id,
    allFilter: [],
    productSize: 'All size',
    price: filteredRanges.price,
    profit: filteredRanges.profit,
    margin: filteredRanges.margin,
    roi: filteredRanges.roi,
    sales_monthly: filteredRanges.sales_monthly,
    rank: filteredRanges.rank,
  };
  const initialFilterState: any =
    filterStorage && filterStorage.supplier_id === supplierDetails.supplier_id
      ? filterStorage
      : filterInitialData;

  const [filterState, setFilterState] = React.useState(initialFilterState);

  useEffect(() => {
    if (isSelectAll || !filterStorage) {
      selectAll(true);
    }
    filterProducts(filterSearch, filterState);
  }, [filterState]);

  const filterDataState: SupplierFilter = {
    allFilter: [
      {
        label: 'Product Category',
        dataKey: 'product-category',
        radio: false,
        data: [
          {
            label: 'Apps & Games',
            dataKey: 'apps-games',
            checked: true,
          },
          {
            label: 'Appliances',
            dataKey: 'appliances',
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
            dataKey: 'beauty-persona-care',
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
            label: 'CDs & Vynil',
            dataKey: 'cds-vynil',
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
            label: 'Electronics',
            dataKey: 'electronics',
            checked: true,
          },
          {
            label: 'Grocery & Gourmet Food',
            dataKey: 'grocery-gourmet-food',
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
            dataKey: 'kithcen-dining',
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
            label: 'Toys & Games',
            dataKey: 'toys-games',
            checked: true,
          },
          {
            label: 'Others',
            dataKey: 'others',
            checked: true,
          },
        ],
      },
      {
        label: 'Product Size Tiers',
        dataKey: 'product-size-tiers',
        checkedValue: 'Small standard-size',
        radio: true,
        data: [
          {
            label: 'All size',
            dataKey: 'all-size',
          },
          {
            label: 'Small standard-size',
            dataKey: 'small-standard-size',
          },
          {
            label: 'Large standard-size',
            dataKey: 'large-standard-size',
          },
          {
            label: 'Small oversize',
            dataKey: 'small-oversize',
          },
          {
            label: 'Medium oversize',
            dataKey: 'medium-oversize',
          },
          {
            label: 'Over oversize',
            dataKey: 'over-oversize',
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
        range: productRanges.price,
        filterRange: filterState.price,
        sign: '$',
      },
      {
        label: 'Profit $',
        dataKey: 'profit',
        minPlaceholder: '$ Min',
        maxPlaceholder: '$ Max',
        range: productRanges.profit,
        filterRange: filterState.profit,
        sign: '$',
      },
      {
        label: 'Profit Margin %',
        dataKey: 'margin',
        minPlaceholder: 'Min %',
        maxPlaceholder: 'Max %',
        range: productRanges.margin,
        filterRange: filterState.margin,
        sign: '%',
      },
      {
        label: 'ROI/ Return On Investment %',
        dataKey: 'roi',
        minPlaceholder: 'Min %',
        maxPlaceholder: 'Max %',
        range: productRanges.roi,
        filterRange: filterState.roi,
        sign: '%',
      },
      {
        label: 'Unit Sold',
        dataKey: 'sales_monthly',
        minPlaceholder: 'Min sold',
        maxPlaceholder: 'Max sold ',
        range: productRanges.sales_monthly,
        filterRange: filterState.sales_monthly,
      },
      {
        label: 'Rank',
        dataKey: 'rank',
        minPlaceholder: 'Min rank',
        maxPlaceholder: 'Max rank ',
        range: productRanges.rank,
        filterRange: filterState.rank,
      },
    ],
  };

  const [filterData, setFilterData] = React.useState(filterDataState);
  const [allFilter, setAllFilter] = React.useState(filterDataState.allFilter);
  const [filterRanges, setFilterRanges] = React.useState(filterData.filterRanges);

  const setRadioFilter = (filterType: string, value: string) => {
    const data = _.map(allFilter, filter => {
      if (filter.dataKey === filterType) {
        filter.checkedValue = value;
      }
      return filter;
    });
    const filterValue = filterState;
    filterState.productSize = value;

    setAllFilter(data);
    setFilterState(filterValue);
  };

  const toggleCheckboxFilter = (filterDataKey: string, label: string) => {
    const data = filterState;

    setSelectAll(false);
    const allFilter = _.map(filterData.allFilter, filter => {
      if (!filter.radio) {
        _.map(filter.data, allFilterData => {
          allFilterData.checked = data.allFilter.indexOf(filterDataKey) !== -1;
          return allFilterData;
        });
      }
      return filter;
    });
    setAllFilter(allFilter);
    if (data.allFilter.indexOf(label) !== -1) {
      data.allFilter.splice(data.allFilter.indexOf(label), 1);
    } else {
      data.allFilter.push(label);
    }
    setFilterState(data);
  };

  const toggleSellectAll = () => {
    setSelectAll(!isSelectAll);
    const data = filterState;
    if (!isSelectAll) {
      selectAll();
    } else {
      localStorage.setItem('filterSelectAll', JSON.stringify(false));
      data.allFilter = [];
      setFilterState(data);
    }
  };

  const selectAll = (firstLoad?: boolean) => {
    if (!firstLoad) {
      localStorage.setItem('filterSelectAll', JSON.stringify(true));
    }

    setSelectAll(true);
    const data = filterState;
    _.map(filterData.allFilter, filter => {
      if (!filter.radio) {
        _.map(filter.data, allFilterData => {
          if (data.allFilter.indexOf(allFilterData.label) == -1) {
            data.allFilter.push(allFilterData.label);
          }
          return allFilterData;
        });
      }
      return filter;
    });

    setFilterState(data);
  };

  const handleCompleteChange = (datakey: string, range: Range) => {
    const filterData: any = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey == datakey) {
        filter.filterRange = range;
      }
      return filter;
    });
    filterData[datakey] = range;
    setFilterState(filterData);
    setFilterRanges(data);
  };

  const resetSingleFilter = (datakey: string) => {
    const filterData = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = filter.range;
        filterData[datakey] = filter.range;
      }
      return filter;
    });
    setFilterRanges(data);
    setFilterState(filterData);
  };

  const applyFilter = () => {
    if (isSelectAll) {
      selectAll();
    }
    filterProducts(filterSearch, filterState);
    localStorage.setItem('filterState', JSON.stringify(filterState));
  };

  const resetFilter = () => {
    const data = filterState;
    data.supplier_id = filterState.supplier_id;
    data.allFilter = [];
    data.productSize = 'All size';
    data.price = productRanges.price;
    data.profit = productRanges.profit;
    data.roi = productRanges.roi;
    data.sales_monthly = productRanges.sales_monthly;
    data.rank = productRanges.rank;

    selectAll();
    const filterRangeKeys = Object.keys(productRanges);
    _.each(filterRangeKeys, key => {
      const filterRanges = _.map(filterData.filterRanges, filter => {
        if (filter.dataKey === key) {
          filter.filterRange = filter.range;
        }
        return filter;
      });
      setFilterRanges(filterRanges);
    });
    setFilterState(data);
  };

  const handleFilterType = (type: string) => {
    if (filterType === type) {
      setFilterType('');
      return;
    }
    setFilterType(type);
  };
  return (
    <div className="filter-section">
      <div className="filter-header">
        <Button
          basic
          icon
          labelPosition="left"
          className={filterType == 'all-filter' ? 'active all-filter' : 'all-filter'}
          onClick={() => handleFilterType('all-filter')}
        >
          <span className="filter-name">All</span>
          <Icon className="slider" name="sliders horizontal" />
        </Button>
      </div>
      <div className="filter-wrapper">
        <FilterContainer
          filterType={filterType}
          applyFilter={applyFilter}
          resetSingleFilter={resetSingleFilter}
          toggleCheckboxFilter={toggleCheckboxFilter}
          resetFilter={resetFilter}
          filterData={filterData}
          handleCompleteChange={handleCompleteChange}
          initialFilterState={filterState}
          setRadioFilter={setRadioFilter}
          toggleSellectAll={toggleSellectAll}
          isSelectAll={isSelectAll}
          selectAll={selectAll}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  products: supplierProductsSelector(state),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterSearch: get(state, 'supplier.filterSearch'),
});

const mapDispatchToProps = {
  filterProducts: (value: string, filterData: any) => filterSupplierProducts(value, filterData),
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection2);
