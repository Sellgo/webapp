import React from 'react';
import { connect } from 'react-redux';
import { Segment, Loader, Checkbox } from 'semantic-ui-react';
import './index.scss';
import _ from 'lodash';
import { Product } from '../../../../interfaces/Product';
import get from 'lodash/get';
import { openSupplierProductDetailModal } from '../../../../actions/Modals';
import {
  fetchSupplierProductTrackerGroup,
  updateProductTrackingStatus,
  setSupplierSinglePageItemsCount,
} from '../../../../actions/Suppliers';
import { findFilterProducts, addTempDataToProducts } from '../../../../constants/Suppliers';
import GenericTable, { Column } from '../../../../components/Table';
import TopSeller from './topSeller';
import ProductDescription from './productDescription';
import DetailButtons from './detailButtons';

interface ProductsTableProps {
  supplierID: any;
  isLoadingSupplierProducts: boolean;
  products: Product[];
  filteredProducts: Product[];
  filterRanges: any;
  productTrackerGroup: any;
  singlePageItemsCount: number;
  fetchProductTrackerGroup: (supplierID: any) => void;
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any
  ) => void;
  openProductDetailModal: (product?: Product) => void;
  setSinglePageItemsCount: (itemsCount: any) => void;
}

interface ProductsTableState {
  checkedItems: { [index: number]: {} };
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedItems: {},
  };

  componentDidMount() {
    const { supplierID, fetchProductTrackerGroup } = this.props;
    fetchProductTrackerGroup(supplierID);
  }

  handleSelectAll = (event: any, isChecked: any) => {
    const { filteredProducts } = this.props;

    let newCheckedItems: any = {};
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

  renderTopSeller = (row: Product) => {
    const { checkedItems } = this.state;
    return (
      <TopSeller item={row} checked={checkedItems[row.id]} onSelectItem={this.handleItemSelect} />
    );
  };
  renderProductInfo = (row: Product) => {
    const { checkedItems } = this.state;
    return <ProductDescription item={row} />;
  };
  renderProfit = (row: Product) => <p className="stat">${row.profit} /item</p>;
  renderMargin = (row: Product) => <p className="stat">${row.margin}%</p>;
  renderUnitSold = (row: Product) => {
    return (
      <>
        <p className="stat">{row.sales_monthly} /mo</p>
        {/*
        <p className="stat mg_botm0">{row.unitSoldPerDay} /day</p>
        <p className="stat fnt12">{row.sales_monthly} /mo</p>
        */}
      </>
    );
  };
  renderProfitMonthly = (row: Product) => <p className="stat">{row.profit_monthly}</p>;
  renderRoi = (row: Product) => <p className="stat">{row.roi}%</p>;
  renderDetailButtons = (row: Product) => {
    const {
      supplierID,
      openProductDetailModal,
      productTrackerGroup,
      updateProductTrackingStatus,
    } = this.props;

    return (
      <DetailButtons
        ratings={row.ratings}
        isTracking={row.tracking_status === 'active'}
        onViewDetails={() => {
          openProductDetailModal({ ...row, ...{ supplierID: supplierID } });
        }}
        onTrack={() => {
          let productTrackerGroupID = 2;
          if (productTrackerGroup.length > 0 && productTrackerGroup[0].id > 0) {
            productTrackerGroupID = productTrackerGroup[0].id;
            if (row.tracking_status !== null) {
              updateProductTrackingStatus(
                row.tracking_status === 'active' ? 'inactive' : 'active',
                undefined,
                row.product_track_id,
                undefined
              );
            } else {
              updateProductTrackingStatus(
                'active',
                row.product_id,
                undefined,
                productTrackerGroupID
              );
            }
          }
        }}
      />
    );
  };

  columns: Column[] = [
    {
      label: '',
      sortable: false,
      show: true,
      render: this.renderTopSeller,
      //render: () => 'Test 1',
    },

    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
      //render: () => 'Test 2',
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
      label: 'Unit Sold',
      dataKey: 'unitSoldPerMonth',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderUnitSold,
    },
    {
      label: 'Profit/Mo',
      dataKey: 'profit_monthly',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderProfitMonthly,
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
      label: 'Other Sort',
      show: true,
      sortable: false,
      render: this.renderDetailButtons,
    },
  ];

  render() {
    const {
      isLoadingSupplierProducts,
      filteredProducts,
      singlePageItemsCount,
      setSinglePageItemsCount,
    } = this.props;

    if (isLoadingSupplierProducts) {
      return (
        <Segment>
          <Loader active={true} inline="centered" size="massive">
            Loading
          </Loader>
        </Segment>
      );
    }

    return (
      <div className="productsTable">
        <GenericTable
          data={filteredProducts}
          columns={this.columns}
          singlePageItemsCount={singlePageItemsCount}
          setSinglePageItemsCount={setSinglePageItemsCount}
          showSelectItemsCounts={true}
        />
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
});

const mapDispatchToProps = {
  fetchProductTrackerGroup: (supplierID: any) => fetchSupplierProductTrackerGroup(supplierID),
  updateProductTrackingStatus: (
    status: string,
    productID?: any,
    productTrackerID?: any,
    productTrackerGroupID?: any
  ) => updateProductTrackingStatus(status, productID, productTrackerID, productTrackerGroupID),
  openProductDetailModal: (product?: Product) => openSupplierProductDetailModal(product),
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable);
