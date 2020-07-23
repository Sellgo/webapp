import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon, Image, Modal, Popup, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Product } from '../../../interfaces/Product';
import { findMinMax } from '../../../constants/Suppliers';
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
import msExcelIcon from '../../../assets/images/microsoft-excel.png';
import csvIcon from '../../../assets/images/csv.svg';
import { isSubscriptionFree } from '../../../utils/subscriptions';

interface Props {
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  supplierDetails: any;
  products: Product[];
  filteredProducts: Product[];
  productRanges: any;
  filterSearch: string;
  filterProducts: (value: string, filterData: any) => void;
  setPageNumber: (pageNumber: number) => void;
  setLeadsTracker: (sellerId: number, supplierId: number) => void;
  setIsScroll: (value: boolean) => void;
  subscriptionType: string;
  isScrollSelector: boolean;
  scrollTop: boolean;
  sellerSubscription: any;
}

function ProfitFinderFilterSection(props: Props) {
  const {
    productRanges,
    supplierDetails,
    filterProducts,
    filterSearch,
    products,
    setPageNumber,
    subscriptionType,
    filteredProducts,
    sellerSubscription,
  } = props;

  const filterStorage = JSON.parse(
    typeof localStorage.filterState === 'undefined' ? null : localStorage.filterState
  );
  const selectAllCategoriesStorage = JSON.parse(
    typeof localStorage.filterSelectAllCategories === 'undefined' ||
      !filterStorage ||
      filterStorage.supplier_id !== supplierDetails.supplier_id
      ? true
      : localStorage.filterSelectAllCategories
  );
  const selectAllSizeStorage = JSON.parse(
    typeof localStorage.filterSelectAllSize === 'undefined' ||
      !filterStorage ||
      filterStorage.supplier_id !== supplierDetails.supplier_id
      ? true
      : localStorage.filterSelectAllSize
  );
  const [filterType, setFilterType] = useState('');
  const [isSelectAllCategories, setSelectCategories] = useState(selectAllCategoriesStorage);
  const [isSelectAllSize, setSelectAllSize] = useState(selectAllSizeStorage);
  const [hasFilter, setHasFilter] = React.useState(false);

  const filteredRanges = findMinMax(products);

  const rangeData: any = _.cloneDeep(filteredRanges);
  const filterInitialData = {
    supplier_id: supplierDetails.supplier_id,
    allFilter: [],
    sizeTierFilter: [
      'Small standard-size',
      'Large standard-size',
      'Small oversize',
      'Medium oversize',
      'Over oversize',
      'Others',
    ],
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
  };
  const initialFilterState: any =
    filterStorage && filterStorage.supplier_id === supplierDetails.supplier_id
      ? filterStorage
      : filterInitialData;

  if (initialFilterState.categories !== filterInitialData.categories) {
    initialFilterState.categories = filterInitialData.categories;
  }

  const [filterState, setFilterState] = React.useState(initialFilterState);

  useEffect(() => {
    if (isSelectAllCategories || !filterStorage) {
      selectAllCategories(true);
    }
    if (isSelectAllSize || !filterStorage) {
      selectAllSize(true);
    }
    filterProducts(filterSearch, filterState);
    setHasFilter(isFilterUse());
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
            label: 'Over oversize',
            dataKey: 'over-oversize',
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
  };

  const [allFilter, setAllFilter] = React.useState(filterDataState.allFilter);
  const [filterRanges, setFilterRanges] = React.useState(filterDataState.filterRanges);

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
  };

  const resetSingleFilter = (datakey: string) => {
    const filterDetails = filterState;
    const data = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
        filter.filterRange = filter.range;
        filterDetails[datakey] = filter.range;
        if (filterDetails.removeNegative.indexOf(datakey) !== -1) {
          filterDetails.removeNegative.splice(filterDetails.removeNegative.indexOf(datakey), 1);
          filter.range = rangeData[datakey];
          filter.filterRange = rangeData[datakey];
          filterDetails[datakey] = rangeData[datakey];
        }
      }
      return filter;
    });
    setFilterRanges(data);
    setFilterState(filterDetails);
  };

  const applyFilter = () => {
    setPageNumber(1);
    setHasFilter(isFilterUse());
    if (isSelectAllCategories) {
      selectAllCategories();
    }
    filterProducts(filterSearch, filterState);
    localStorage.setItem('filterState', JSON.stringify(filterState));
  };

  const resetFilter = () => {
    const data = filterState;
    data.supplier_id = filterState.supplier_id;
    data.allFilter = [];
    data.price = productRanges.price;
    data.profit = productRanges.profit;
    data.margin = productRanges.margin;
    data.roi = productRanges.roi;
    data.sales_monthly = productRanges.sales_monthly;
    data.rank = productRanges.rank;
    data.removeNegative = [];
    selectAllCategories();
    selectAllSize();
    const filterRangeKeys = Object.keys(productRanges);
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
  };

  const handleFilterType = (type: string) => {
    if (filterType === type) {
      setFilterType('');
      return;
    }
    setFilterType(type);
  };

  const toggleNegative = (datakey: string) => {
    const data = filterState;
    const filterDetails = _.map(filterRanges, filter => {
      if (filter.dataKey === datakey) {
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
      return filter;
    });
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
      <Popup
        className="export__list"
        trigger={
          <Button
            className={`selection export-wrapper__dropdown`}
            content={<Image src={csvIcon} wrapped={true} />}
            icon="caret down"
          />
        }
        content={
          <List divided>
            <List.Item disabled={_.isEmpty(supplierDetails.report_url_csv)}>
              <a href={supplierDetails.report_url}>
                <Image src={csvIcon} wrapped={true} />
                <span>{`.CSV`}</span>
              </a>
            </List.Item>
            <List.Item disabled={_.isEmpty(supplierDetails.report_url)}>
              <a href={supplierDetails.report_url}>
                <Image src={msExcelIcon} wrapped={true} />
                <span>{`.XSLS`}</span>
              </a>
            </List.Item>
          </List>
        }
        disabled={isSubscriptionFree(subscriptionType)}
        position="bottom center"
        on="click"
        basic
        hideOnScroll
      />
    );
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
        <Button
          basic
          icon
          labelPosition="left"
          className={
            (filterType === 'all-filter' ? 'active all-filter' : 'all-filter') +
            (!isFilterUse() && _.isEmpty(filteredProducts) ? ' disabled' : '')
          }
          onClick={() => {
            handleFilterType('all-filter');
            setFilterModalOpen(true);
          }}
        >
          <Icon className="slider" name="sliders horizontal" />
          <span className="filter-name">All</span>
          <Icon name="filter" className={` ${hasFilter ? 'blue' : 'grey'} `} />
        </Button>
        <span>
          <p className={`${!(sellerSubscription.subscription_id === 3) && 'hidden'}`}>
            Leads Tracking
          </p>
          <LeadsTrackerToggle
            setLeadsTracker={props.setLeadsTracker}
            seller_id={props.supplierDetails.seller_id}
            supplier_id={props.supplierDetails.supplier_id}
            isToggle={isToggle}
          />
          {renderExportButtons()}
        </span>
      </div>
      <Modal
        className="FilterContainer__show-filter"
        open={isFilterModalOpen}
        onClose={() => setFilterModalOpen(!isFilterModalOpen)}
      >
        <i className="fas fa-times" onClick={() => setFilterModalOpen(!isFilterModalOpen)} />
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
            initialFilterState={filterState}
            toggleSelectAllCategories={toggleSelectAllCategories}
            isSelectAllCategories={isSelectAllCategories}
            selectAllCategories={selectAllCategories}
            toggleNegative={toggleNegative}
            toggleSelectAllSize={toggleSelectAllSize}
            isSelectAllSize={isSelectAllSize}
          />
        </Modal.Content>
      </Modal>
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
  isScrollSelector: get(state, 'supplier.setIsScroll'),
  scrollTop: get(state, 'supplier.setScrollTop'),
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
});

const mapDispatchToProps = {
  filterProducts: (value: string, filterData: any) => filterSupplierProducts(value, filterData),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
  setLeadsTracker: (sellerId: number, supplierId: number) => setLeadsTracker(sellerId, supplierId),
  setIsScroll: (value: boolean) => setIsScroll(value),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitFinderFilterSection);
