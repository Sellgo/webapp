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
  filterProducts: (filterData: any) => void;
}

function FilterSection2(props: Props, state: State) {
  const [filterType, setFilterType] = useState('');

  const { filteredProducts, productRanges, supplierDetails, filterProducts, products } = props;

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
  const filterStorage = JSON.parse(localStorage.getItem('filterState') || '{}');

  const initialFilterState: any =
    filterStorage && filterStorage.supplier_id === supplierDetails.supplier_id
      ? filterStorage
      : filterInitialData;

  const [filterState, setFilterState] = React.useState(initialFilterState);
  console.log('products: ', products);
  useEffect(() => {
    filterProducts(filterState);
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
            checked: false,
          },
          {
            label: 'Appliances',
            dataKey: 'appliances',
            checked: false,
          },
          {
            label: 'Automotive',
            dataKey: 'automotive',
            checked: false,
          },
          {
            label: 'Baby',
            dataKey: 'baby',
            checked: false,
          },
          {
            label: 'Beauty & Personal Care',
            dataKey: 'beauty-persona-care',
            checked: false,
          },
          {
            label: 'Books',
            dataKey: 'books',
            checked: false,
          },
          {
            label: 'Camera & Photo',
            dataKey: 'camera-photo',
            checked: false,
          },
          {
            label: 'CDs & Vynil',
            dataKey: 'cds-vynil',
            checked: false,
          },
          {
            label: 'Cell Phones & Accessories',
            dataKey: 'cellphones-accessories',
            checked: false,
          },
          {
            label: 'Clothing, Shoes & Jewelry',
            dataKey: 'clothing-shoes-jewelry',
            checked: false,
          },
          {
            label: 'Collectible & Fine Arts',
            dataKey: 'collectible-fine-arts',
            checked: false,
          },
          {
            label: 'Computers & Accessories',
            dataKey: 'computers-accessories',
            checked: false,
          },
          {
            label: 'Electronics',
            dataKey: 'electronics',
            checked: false,
          },
          {
            label: 'Grocery & Gourmet Food',
            dataKey: 'grocery-gourmet-food',
            checked: false,
          },
          {
            label: 'Handmade Products',
            dataKey: 'handmade-products',
            checked: false,
          },
          {
            label: 'Health & Household',
            dataKey: 'health-household',
            checked: false,
          },
          {
            label: 'Home & Kitchen',
            dataKey: 'home-kitchen',
            checked: false,
          },
          {
            label: 'Industrial & Scientific',
            dataKey: 'industrial-scientific',
            checked: false,
          },
          {
            label: 'Kindle store',
            dataKey: 'kindle-store',
            checked: false,
          },
          {
            label: 'Kitchen & Dining',
            dataKey: 'kithcen-dining',
            checked: false,
          },
          {
            label: 'Lock Picking & Theft Devices',
            dataKey: 'lock-picking-theft-devices',
            checked: false,
          },
          {
            label: 'Luggage & Travel',
            dataKey: 'luggage-travel',
            checked: false,
          },
          {
            label: 'Magazine Subscription',
            dataKey: 'magazine-subscription',
            checked: false,
          },
          {
            label: 'Medical Devices & Accessories',
            dataKey: 'medical-devices-accessories',
            checked: false,
          },
          {
            label: 'Musical Instruments',
            dataKey: 'musical-instruments',
            checked: false,
          },
          {
            label: 'Office Products',
            dataKey: 'office-products',
            checked: false,
          },
          {
            label: 'Outdoors',
            dataKey: 'outdoors',
            checked: false,
          },
          {
            label: 'Patio, Lawn & Garden',
            dataKey: 'patio-lawn-garden',
            checked: false,
          },
          {
            label: 'Pet Supplies',
            dataKey: 'pet-supplies',
            checked: false,
          },
          {
            label: 'Software',
            dataKey: 'software',
            checked: false,
          },
          {
            label: 'Sports & Outdoors',
            dataKey: 'sports-outdoors',
            checked: false,
          },
          {
            label: 'Tools & Home Improvement',
            dataKey: 'tools-home-improvement',
            checked: false,
          },
          {
            label: 'Toys & Games',
            dataKey: 'toys-games',
            checked: false,
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
        label: 'Price $',
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
        label: 'Margin %',
        dataKey: 'margin',
        minPlaceholder: 'Min %',
        maxPlaceholder: 'Max %',
        range: productRanges.margin,
        filterRange: filterState.margin,
        sign: '%',
      },
      {
        label: 'ROI/ Return On Investment',
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
    filterProducts(filterState);
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
        <hr />
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
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
  products: supplierProductsSelector(state),
  filteredProducts: get(state, 'supplier.filteredProducts'),
});

const mapDispatchToProps = {
  filterProducts: (filterData: any) => filterSupplierProducts(filterData),
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection2);
