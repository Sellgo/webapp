import React, { useState, useEffect } from 'react';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import FilterContainer from '../FilterContainer';
import { FilterData, SupplierFilter } from '../../interfaces/Filters';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Product } from '../../interfaces/Product';
import { supplierProductsSelector } from '../../selectors/Supplier';
import { Range } from '../../interfaces/Generic';

interface FilterObject {
  label: string;
  dataKey: string;
}

interface State {
  filterTitle: FilterObject[];
}

interface Props {
  products: Product[];
  filteredProducts: Product[];
  productRanges: any;
}

function FilterSection2(props: Props, state: State) {
  const [filterType, setFilterType] = useState('');

  const { filteredProducts, productRanges, products } = props;

  state = {
    filterTitle: [
      {
        label: 'Price',
        dataKey: 'price-filter',
      },
      {
        label: 'Profit/ ROI',
        dataKey: 'profit-roi-filter',
      },
      {
        label: 'Ranks/ Unit Sold',
        dataKey: 'ranks-units-sold-filter',
      },
    ],
  };

  const filterDataState: SupplierFilter = {
    allFilter: [
      {
        label: 'Sellers',
        dataKey: 'seller',
        radio: false,
        data: [
          {
            label: 'Amazon',
            dataKey: 'amazon',
            checked: true,
          },
          {
            label: 'FBA',
            dataKey: 'fba',
            checked: false,
          },
          {
            label: 'FBM',
            dataKey: 'fbm',
            checked: false,
          },
        ],
      },
      {
        label: 'Product Category',
        dataKey: 'product-category',
        radio: false,
        data: [
          {
            label: 'All',
            dataKey: 'all-products',
            checked: true,
          },
          {
            label: 'Appliances',
            dataKey: 'appliances',
            checked: false,
          },
          {
            label: 'Arts, Craft and Sewing',
            dataKey: 'arts-craft-sewing',
            checked: false,
          },
          {
            label: 'Baby',
            dataKey: 'baby',
            checked: false,
          },
          {
            label: 'Books',
            dataKey: 'books',
            checked: false,
          },
        ],
      },
      {
        label: 'Product Size Tiers',
        dataKey: 'product-size-tiers',
        checkedValue: 'small-standard-size',
        radio: true,
        data: [
          {
            label: 'All size',
            dataKey: 'all-size',
          },
          {
            label: 'Small stadard-size',
            dataKey: 'small-standard-size',
          },
          {
            label: 'Large stadard-size',
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
    price: {
      dataKey: 'price',
      range: productRanges.price,
    },
    profitRoi: {
      profit: {
        dataKey: 'profit',
        range: productRanges.profit,
      },
      roi: {
        dataKey: 'roi',
        range: productRanges.profit,
      },
    },
    rankUnitSold: {
      unitSold: {
        dataKey: 'unit-sold',
        range: productRanges.unitSold,
      },
      rank: {
        dataKey: 'rank',
        range: productRanges.rank,
      },
    },
  };

  const [filterData, setFilterData] = React.useState(filterDataState);
  const [allFilter, setAllFilter] = React.useState(filterDataState.allFilter);
  const [priceRange, setPriceRange] = React.useState(filterDataState.price.range);
  const [profitRange, setProfitRange] = React.useState(filterDataState.profitRoi.profit.range);
  const [roiRange, setRoiRange] = React.useState(filterDataState.profitRoi.roi.range);
  const [unitSoldRange, setUnitSoldRange] = React.useState(
    filterDataState.rankUnitSold.unitSold.range
  );
  const [rankRange, setRankRange] = React.useState(filterDataState.rankUnitSold.rank.range);

  const setRadioFilter = (filterType: string, value: string) => {
    const data = _.map(allFilter, filter => {
      if (filter.dataKey === filterType) {
        filter.checkedValue = value;
      }
      return filter;
    });
    setAllFilter(data);
  };

  const toggleCheckboxFilter = (filterType: string, filterDataKey: string) => {
    const data = filterData;
    _.map(data.allFilter, filter => {
      if (filter.dataKey === filterType) {
        const filterData = _.map(filter.data, filterData => {
          if (filterData.dataKey === filterDataKey) {
            filterData.checked = !filterData.checked;
          }
        });
      }
      return filter;
    });
    setFilterData(data);
  };

  const handlePrice = (range: Range) => {
    filterData.price.range = range;
    setPriceRange(range);
  };

  const handleProfit = (range: Range) => {
    filterData.profitRoi.profit.range = range;
    setProfitRange(range);
  };

  const handleRoi = (range: Range) => {
    filterData.profitRoi.roi.range = range;
    setRoiRange(range);
  };
  const handleUnitSold = (range: Range) => {
    filterData.rankUnitSold.unitSold.range = range;
    setUnitSoldRange(range);
  };
  const handleRank = (range: Range) => {
    filterData.rankUnitSold.rank.range = range;
    setRankRange(range);
  };
  const resetFilter = (datakey: string) => {
    console.log('datakey: ', datakey);
    console.log('filteredProducts: ', filteredProducts);
    console.log('productRanges: ', productRanges);
  };

  const applyFilter = () => {
    console.log('filterData: ', filterData);
  };

  return (
    <div className="filter-section">
      <div className="filter-header">
        <Button
          basic
          icon
          labelPosition="left"
          className={filterType == 'all-filter' ? 'active all-filter' : 'all-filter'}
          onClick={() => setFilterType('all-filter')}
        >
          <span className="filter-name">All</span>
          <span className="filter-count">1</span>
          <Icon className="slider" name="sliders horizontal" />
        </Button>
        {_.map(state.filterTitle, filter => {
          return (
            <Button
              basic
              icon
              labelPosition="left"
              className={filterType == filter.dataKey ? `active ${filter.dataKey}` : filter.dataKey}
              key={filter.dataKey}
              onClick={() => setFilterType(filter.dataKey)}
            >
              <span className="filter-name">{filter.label}</span>
              <span className="filter-arrow-down">
                <Icon color="black" name="caret down" />
              </span>
              <Icon className="filter-left-icon" name="ellipsis vertical" />
            </Button>
          );
        })}
      </div>
      <div className="filter-wrapper">
        <hr />
        <FilterContainer
          filterType={filterType}
          applyFilter={applyFilter}
          setRadioFilter={setRadioFilter}
          toggleCheckboxFilter={toggleCheckboxFilter}
          resetFilter={resetFilter}
          filterData={filterData}
          range={productRanges}
          handlePrice={handlePrice}
          handleProfit={handleProfit}
          handleRoi={handleRoi}
          handleUnitSold={handleUnitSold}
          handleRank={handleRank}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
  products: supplierProductsSelector(state),
  filteredProducts: get(state, 'supplier.filteredProducts'),
});

export default connect(mapStateToProps)(FilterSection2);
