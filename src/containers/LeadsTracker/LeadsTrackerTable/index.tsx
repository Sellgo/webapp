import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

import { GenericTable, Column } from '../../../components/Table';
import { tableKeys } from '../../../constants';
import { supplierPageNumberSelector } from '../../../selectors/Supplier';
import get from 'lodash/get';

import { setSupplierPageNumber, setSupplierSinglePageItemsCount } from '../../../actions/Suppliers';
import { Product } from '../../../interfaces/Product';
import ProductCheckBox from '../../Synthesis/Supplier/ProductsTable/productCheckBox';
export interface CheckedRowDictionary {
  [index: number]: boolean;
}
class LeadsTracker extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: this.columns,
    };
  }

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

  updateCheckedRows = (checkedRows: CheckedRowDictionary) => {
    this.setState({ checkedRows });
  };

  handleClick = () => {
    const { ColumnFilterBox } = this.state;
    this.setState({
      ColumnFilterBox: !ColumnFilterBox,
    });
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
      label: 'Product Information',
      dataKey: 'title',
      type: 'string',
      sortable: true,
      show: true,
    },
    {
      label: 'Search File',
      dataKey: 'price',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Cost',
      dataKey: 'product_cost',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Fees',
      dataKey: 'fees',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Profit',
      dataKey: 'profit',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Margin',
      dataKey: 'margin',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Monthly\nRevenue',
      dataKey: 'monthly_revenue',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'ROI',
      dataKey: 'roi',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Rank',
      dataKey: 'rank',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Monthly \nSales Est',
      dataKey: 'sales_monthly',
      type: 'number',
      sortable: true,
      show: true,
    },
    {
      label: 'Category',
      dataKey: 'amazon_category_name',
      type: 'string',
      sortable: true,
      show: true,
    },
    {
      label: 'Size Tier',
      dataKey: 'size_tier',
      type: 'string',
      show: true,
      sortable: true,
    },
    {
      label: 'FBA Fee',
      dataKey: 'fba_fee',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Referral\nFee',
      dataKey: 'referral_fee',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Variable\nClosing Fee',
      dataKey: 'variable_closing_fee',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Num New\nFBA Offers',
      dataKey: 'num_new_fba_offers',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Num New\nFBM Offers',
      dataKey: 'num_new_fbm_offers',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Low New\nFBA Price',
      dataKey: 'low_new_fba_price',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Low New\nFBM Price',
      dataKey: 'low_new_fbm_price',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: 'Tracking / Scoring',
      dataKey: 'sellgo_score',
      type: 'number',
      show: true,
      sortable: true,
    },
    {
      label: '',
      icon: 'ellipsis horizontal ellipsis-ic',
      dataKey: 'ellipsis horizontal',
      show: true,
      // render: this.renderSyncButtons,
      popUp: true,
    },
  ];

  render() {
    const { currentActiveColumn, setSinglePageItemsCount, setPageNumber } = this.props;
    const { checkedRows, columns, ColumnFilterBox } = this.state;

    return (
      <div className="products-table">
        <GenericTable
          currentActiveColumn={currentActiveColumn}
          scrollTopSelector={false}
          tableKey={tableKeys.LEADS}
          columns={columns}
          data={[]}
          // searchFilterValue={searchValue}
          // showProductFinderSearch={true}
          // searchFilteredProduct={this.searchFilteredProduct}
          // updateProfitFinderProducts={updateProfitFinderProducts}
          singlePageItemsCount={50}
          setSinglePageItemsCount={setSinglePageItemsCount}
          currentPage={1}
          setPage={setPageNumber}
          name={'products'}
          showFilter={true}
          // columnFilterBox={ColumnFilterBox}
          checkedRows={checkedRows}
          updateCheckedRows={this.updateCheckedRows}
          // handleColumnChange={this.handleColumnChange}
          toggleColumnCheckbox={this.handleClick}
          // columnFilterData={this.state.columnFilterData}
          middleScroll={true}
          // renderFilterSectionComponent={() => (
          //   <ProfitFinderFilterSection productRanges={productRanges} />
          // )}
          // handleColumnDrop={this.handleColumnDrop}
          // reorderColumns={this.reorderColumns}
          columnFilterBox={ColumnFilterBox}
          columnDnD={true}
          stickyChartSelector
        />
      </div>
    );
  }
}
const mapStateToProps = (state: {}) => ({
  singlePageItemsCount: get(state, 'supplier.singlePageItemsCount'),
  stickyChartSelector: get(state, 'supplier.singlePageItemsCount'),
  pageNumber: supplierPageNumberSelector(state),
});

const mapDispatchToProps = {
  setSinglePageItemsCount: (itemsCount: number) => setSupplierSinglePageItemsCount(itemsCount),
  setPageNumber: (pageNumber: number) => setSupplierPageNumber(pageNumber),
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadsTracker);
