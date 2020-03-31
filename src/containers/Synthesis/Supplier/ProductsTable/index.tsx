import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Icon } from 'semantic-ui-react';
import './index.scss';
import { Product } from '../../../../interfaces/Product';
import get from 'lodash/get';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
  searchSupplierProducts,
  filterSupplierProducts,
} from '../../../../actions/Suppliers';
import { PaginatedTable, Column } from '../../../../components/Table';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';
import { formatCurrency, formatNumber } from '../../../../utils/format';
import { tableKeys } from '../../../../constants';
import _ from 'lodash';
import { initialFilterRanges, findMinMaxRange2 } from '../../../../constants/Suppliers';

interface ProductsTableProps {
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterData: any;
  filterRanges: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    type?: string,
    supplierID?: any
  ) => void;
  openProductDetailModal: (product?: Product) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
  searchProducts: (value: string, filterData: any) => void;
}

interface ProductsTableState {
  checkedItems: { [index: number]: {} };
  searchValue: string;
  productRanges: any;
  filteredRanges: any;
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedItems: {},
    searchValue: '',
    productRanges: initialFilterRanges,
    filteredRanges: [],
  };

  UNSAFE_componentWillReceiveProps(props: any) {
    if (props.products && props.products !== this.props.products) {
      // Get min and max range for each filter setting based on all products
      const productRanges = findMinMaxRange2(props.products);
      this.setState({ productRanges });
    }
  }

  handleSelectAll = (event: any, isChecked: any) => {
    const { filteredProducts } = this.props;

    const newCheckedItems: any = {};
    filteredProducts.forEach((item: any) => {
      newCheckedItems[item.id] = isChecked;
    });

    this.setState({ checkedItems: newCheckedItems });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    const { checkedItems } = this.state;
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: isChecked,
    };

    this.setState({ checkedItems: newCheckedItems });
  };

  renderProductInfo = (row: Product) => {
    return <ProductDescription item={row} />;
  };
  renderPrice = (row: Product) => <p className="stat">{row.price}</p>;
  renderProfit = (row: Product) => <p className="stat">{formatCurrency(row.profit)}</p>;
  renderMargin = (row: Product) => <p className="stat">{row.margin}%</p>;
  renderRank = (row: Product) => <p className="stat">{row.rank}</p>;
  renderDailyUnitSold = (row: Product) => {
    return (
      <>
        <p className="stat">{formatNumber(row.sales_monthly)}</p>
      </>
    );
  };
  renderDailyProfit = (row: Product) => (
    <p className="stat"> {formatCurrency(row.profit_monthly)}</p>
  );
  renderRoi = (row: Product) => <p className="stat">{row.roi}%</p>;
  renderCategory = (row: Product) => <p className="stat">{row.amazon_category_name}</p>;
  renderDimension = (row: Product) => <p className="stat">{row.dimension}</p>;
  renderWeight = (row: Product) => <p className="stat">{row.weight} lbs</p>;

  renderDetailButtons = (row: Product) => {
    const { updateProductTrackingStatus, supplierID } = this.props;
    return (
      <DetailButtons
        score={row.sellgo_score}
        isTracking={row.tracking_status === 'active'}
        onTrack={() => {
          if (row.tracking_status !== null) {
            updateProductTrackingStatus(
              row.tracking_status === 'active' ? 'inactive' : 'active',
              undefined,
              row.product_track_id,
              undefined,
              'supplier',
              supplierID
            );
          } else {
            updateProductTrackingStatus(
              'active',
              row.product_id,
              undefined,
              undefined,
              'supplier',
              supplierID
            );
          }
        }}
      />
    );
  };
  renderSyncButtons = () => {
    return (
      <div>
        <Icon name="sync alternate" style={{ color: '#98aec9' }} />
      </div>
    );
  };

  searchFilteredProduct = (value: string) => {
    const {
      searchProducts,
      setSinglePageItemsCount,
      singlePageItemsCount,
      filterData,
    } = this.props;
    this.setState({
      searchValue: value,
    });
    searchProducts(value, filterData);
    setSinglePageItemsCount(singlePageItemsCount);
  };

  columns: Column[] = [
    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
    },
    {
      label: 'Price $',
      dataKey: 'price',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderPrice,
    },
    {
      label: 'Profit $',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderProfit,
    },
    {
      label: 'Margin %',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMargin,
    },
    {
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderRank,
    },
    {
      label: 'Daily\nUnit Sold',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderDailyUnitSold,
    },
    {
      label: 'Daily Profit',
      dataKey: 'profit_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderDailyProfit,
    },
    {
      label: 'ROI',
      dataKey: 'roi',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderRoi,
    },
    {
      label: 'Category',
      dataKey: 'category',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderCategory,
    },
    {
      label: 'Dimension',
      dataKey: 'dimension',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderDimension,
    },
    {
      label: 'Weight',
      dataKey: 'weight',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderWeight,
    },
    {
      label: 'Tracking / Rating',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: true,
      render: this.renderDetailButtons,
    },
  ];
  render() {
    const {
      isLoadingSupplierProducts,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
      filterRanges,
    } = this.props;
    const { searchValue, productRanges, filteredRanges } = this.state;
    return (
      <div className="products-table">
        {isLoadingSupplierProducts ? (
          <Segment>
            <Loader active={true} inline="centered" size="massive">
              Loading
            </Loader>
          </Segment>
        ) : (
          <PaginatedTable
            /* 
                      key change forced table to remount and set page back to 1
                      if any data changes that would affect number of displayed items
                      otherwise we can end up on a page that shows no results because it's
                      past the end of the total number of items.
                      This can be done in a less hacky way once we move pagination server-side.
                    */
            key={`${JSON.stringify(filterRanges)}-${singlePageItemsCount}`}
            tableKey={tableKeys.PRODUCTS}
            data={filteredProducts}
            columns={this.columns}
            searchFilterValue={searchValue}
            showProductFinderSearch={true}
            searchFilteredProduct={this.searchFilteredProduct}
            singlePageItemsCount={singlePageItemsCount}
            setSinglePageItemsCount={setSinglePageItemsCount}
            name={'products'}
            showFilter={true}
            productRanges={productRanges}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  isLoadingSupplierProducts: get(state, 'supplier.isLoadingSupplierProducts'),
  products: get(state, 'supplier.products'),
  filteredProducts: get(state, 'supplier.filteredProducts'),
  filterRanges: get(state, 'supplier.filterRanges'),
  productTrackerGroup: get(state, 'supplier.productTrackerGroup'),
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  filterData: get(state, 'supplier.filterData'),
});

const mapDispatchToProps = {
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any,
    name?: string,
    supplierID?: any
  ) =>
    updateProductTrackingStatus(
      status,
      productID,
      productTrackerID,
      productTrackerGroupID,
      name,
      supplierID
    ),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  searchProducts: (value: string, productData: any) => searchSupplierProducts(value, productData),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
