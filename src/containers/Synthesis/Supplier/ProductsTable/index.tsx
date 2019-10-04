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
import ProductDescriptionWrap from './productDescriptionWrap';
import DetailButtons from './detailButtons';

interface ProductsTableProps {
  supplierID: any;
  products: Product[];
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
  filteredProducts: Product[];
}

class ProductsTable extends React.Component<ProductsTableProps> {
  state: ProductsTableState = {
    checkedItems: {},
    filteredProducts: [],
  };

  componentDidMount() {
    const { supplierID, fetchProductTrackerGroup } = this.props;
    fetchProductTrackerGroup(supplierID);
  }

  componentWillReceiveProps(props: any) {
    console.log('[componentWillReceiveProps]');

    // Do nothing if we have no products or filterRanges
    // This code looks weird, but is copy of existing check in render() method
    if (
      (props.products.length === 1 && props.products[0] === undefined) ||
      props.filterRanges === undefined
    ) {
      return;
    }

    // If products or filterRanges change fetch a new list of products
    if (this.props.products !== props.products || this.props.filterRanges !== props.filterRanges) {
      console.log('[componentWillReceiveProps] refilter');
      let filteredProducts = findFilterProducts(props.products, props.filterRanges);
      // Add hardcoded data to products that new design expects
      filteredProducts = addTempDataToProducts(filteredProducts);
      this.setState({ filteredProducts });
    }
  }

  handleSelectAll = (event: any, isChecked: any) => {
    const { filteredProducts } = this.state;

    let newCheckedItems: any = {};
    filteredProducts.forEach((item: any) => {
      newCheckedItems[item.id] = isChecked;
    });

    this.setState({ checkedItems: newCheckedItems });
  };

  handleItemSelect = (e: any, isChecked: any, itemId: any) => {
    console.log('[handleItemSelect] itemId', itemId);

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
    return <ProductDescriptionWrap item={row} />;
  };
  renderProfit = (row: Product) => `$${row.profit} /item`;
  renderMargin = (row: Product) => `${row.margin}%`;
  renderUnitSold = (row: Product) => {
    return (
      <>
        <p className="mg_botm0">{row.unitSoldPerDay} /day</p>
        <p className="fnt12">{row.unitSoldPerMonth} /mo</p>
      </>
    );
  };
  renderProfitMonthly = (row: Product) => `$${row.profit_monthly}`;
  renderRoi = (row: Product) => `${row.roi}%`;
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
    },

    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
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
    const { filterRanges, singlePageItemsCount, setSinglePageItemsCount } = this.props;
    const { filteredProducts } = this.state;

    if (
      (filteredProducts.length === 1 && filteredProducts[0] === undefined) ||
      filterRanges === undefined
    ) {
      return (
        <Segment>
          <Loader
            hidden={
              filteredProducts.length === 1 && filteredProducts[0] === undefined ? false : true
            }
            active={true}
            inline="centered"
            size="massive"
          >
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => ({
  products: get(state, 'supplier.products'),
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
