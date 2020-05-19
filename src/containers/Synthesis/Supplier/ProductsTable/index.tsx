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
  updateProfitFinderProducts,
} from '../../../../actions/Suppliers';
import { PaginatedTable, Column } from '../../../../components/Table';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  showNAIfZeroOrNull,
} from '../../../../utils/format';
import { tableKeys } from '../../../../constants';
import { initialFilterRanges, findMinMax } from '../../../../constants/Suppliers';
import ProfitFinderFilterSection from '../../ProfitFinderFilterSection';
import ProductCheckBox from './productCheckBox';

interface ProductsTableProps {
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterData: any;
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
  updateProfitFinderProducts: (data: any) => void;
}

export interface CheckedRowDictionary {
  [index: number]: boolean;
}

interface ProductsTableState {
  checkedRows: CheckedRowDictionary;
  searchValue: string;
  productRanges: any;
  filteredRanges: any;
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedRows: {},
    searchValue: '',
    productRanges: initialFilterRanges,
    filteredRanges: [],
  };

  UNSAFE_componentWillReceiveProps(props: any) {
    if (props.products && props.products !== this.props.products) {
      // Get min and max range for each filter setting based on all products
      const productRanges = findMinMax(props.products);
      this.setState({ productRanges });
    }
  }

  updateCheckedRows = (checkedRows: CheckedRowDictionary) => {
    this.setState({ checkedRows });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    const { checkedRows } = this.state;
    const newCheckedRows = {
      ...checkedRows,
      [itemId]: isChecked,
    };

    this.setState({ checkedRows: newCheckedRows });
  };

  renderCheckBox = (row: Product) => {
    const { checkedRows } = this.state;
    let checked = false;
    if (checkedRows[row.id] !== undefined) {
      checked = checkedRows[row.id];
    }
    return <ProductCheckBox item={row} checked={checked} onClick={this.handleItemSelect} />;
  };
  renderProductInfo = (row: Product) => <ProductDescription item={row} />;
  renderPrice = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.price, formatCurrency(row.price))}</p>
  );
  renderProfit = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.profit, formatCurrency(row.profit))}</p>
  );
  renderMargin = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.margin, formatPercent(row.margin))}</p>
  );
  renderFee = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.fees, formatCurrency(row.fees))}</p>
  );
  renderMonthlyRevenue = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(row.monthly_revenue, '$' + formatNumber(row.monthly_revenue))}
    </p>
  );
  renderRoi = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.roi, formatPercent(row.roi))}</p>
  );
  renderRank = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.rank, '#' + formatNumber(row.rank))}</p>
  );
  renderMonthlySalesEst = (row: Product) => (
    <p className="stat">
      {showNAIfZeroOrNull(formatNumber(row.sales_monthly), formatNumber(row.sales_monthly))}
    </p>
  );
  renderCategory = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.amazon_category_name, row.amazon_category_name)}</p>
  );
  renderSizeTiers = (row: Product) => (
    <p className="stat">{showNAIfZeroOrNull(row.size_tier, row.size_tier)}</p>
  );

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
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: this.renderCheckBox,
    },
    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
    },
    {
      label: 'Price',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderPrice,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderProfit,
    },
    {
      label: 'Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMargin,
    },
    {
      label: 'Fees',
      dataKey: 'fees',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderFee,
    },
    {
      label: 'Monthly\nRevenue',
      dataKey: 'monthly_revenue',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMonthlyRevenue,
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
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderRank,
    },
    {
      label: 'Sales \nEst',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderMonthlySalesEst,
    },
    {
      label: 'Category',
      dataKey: 'amazon_category_name',
      type: 'string',
      sortable: true,
      show: true,
      render: this.renderCategory,
    },
    {
      label: 'Size Tier',
      dataKey: 'size_tier',
      type: 'string',
      show: true,
      sortable: true,
      render: this.renderSizeTiers,
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
      updateProfitFinderProducts,
    } = this.props;
    const { searchValue, productRanges, checkedRows } = this.state;
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
            tableKey={tableKeys.PRODUCTS}
            data={filteredProducts}
            columns={this.columns}
            searchFilterValue={searchValue}
            showProductFinderSearch={true}
            searchFilteredProduct={this.searchFilteredProduct}
            updateProfitFinderProducts={updateProfitFinderProducts}
            singlePageItemsCount={singlePageItemsCount}
            setSinglePageItemsCount={setSinglePageItemsCount}
            name={'products'}
            showFilter={true}
            checkedRows={checkedRows}
            updateCheckedRows={this.updateCheckedRows}
            renderFilterSectionComponent={() => (
              <ProfitFinderFilterSection productRanges={productRanges} />
            )}
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
  updateProfitFinderProducts: (data: any) => updateProfitFinderProducts(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTable);
