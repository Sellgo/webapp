import React from 'react';
import './index.scss';
import { Product } from '../../../interfaces/Product';
import TrackerMenu from './TrackerMenu';
import GenericTable, { Column } from '../../../components/Table';
import AddProduct from './AddProduct';
import ProductDescription from './TrackerProductDescription';
import { filterRanges, filteredProducts } from '../../../utils/dummy';
import { formatNumber } from '../../../utils/format';

import { tableKeys } from '../../../constants';
import { Checkbox, Icon } from 'semantic-ui-react';
import OtherSort from './OtherSort';
import ProductCharts from '../../Synthesis/Supplier/ProductDetails/ProductCharts';

class ProductTrackerTable extends React.Component {
  renderCheckbox = (row: Product) => {
    return <Checkbox />;
  };
  renderProductInfo = (row: Product) => {
    return <ProductDescription item={row} />;
  };

  renderAvgPrice = (row: Product) => <p className="stat">{row.price}</p>;
  renderAvgMargin = (row: Product) => {
    return <p className="stat">{row.margin}%</p>;
  };
  renderAvgUnitSold = (row: Product) => {
    return (
      <>
        <p className="stat">{formatNumber(row.sales_monthly)}</p>
      </>
    );
  };
  renderIcons = (row: Product) => {
    return <OtherSort />;
  };

  columns: Column[] = [
    {
      check: true,
      sortable: false,
      show: true,
      render: this.renderCheckbox,
    },

    {
      label: 'PRODUCT INFORMATION',
      sortable: false,
      show: true,
      render: this.renderProductInfo,
    },

    {
      label: 'KPI',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderProfit,
    },
    {
      label: 'Avg Price',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgPrice,
    },
    {
      label: 'Avg Profit',
      type: 'number',
      sortable: true,
      show: true,
      // render: this.renderUnitSold,
    },
    {
      label: 'Avg Margin',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgMargin,
    },

    {
      label: 'Avg Daily Unit Sold',
      type: 'number',
      sortable: true,
      show: true,
      render: this.renderAvgUnitSold,
    },

    {
      label: 'Avg Daily Revenue',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Avg ROI',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Avg Daily Rank',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Reviews',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Rating',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      label: 'Dimensions',
      type: 'number',
      show: true,
      sortable: true,
      // render: this.renderDetailButtons,
    },
    {
      icon: 'ellipsis horizontal',
      show: true,
      render: this.renderIcons,
    },
  ];

  render() {
    return (
      <div className="tracker-table">
        <div className="tracker-menu">
          <TrackerMenu />
        </div>
        <AddProduct />
        <GenericTable
          key={`${JSON.stringify(filterRanges)}`}
          tableKey={tableKeys.PRODUCTS}
          data={filteredProducts}
          columns={this.columns}
          extendedInfo={(product: any) => <ProductCharts product={product} />}
          // singlePageItemsCount={10}
          // setSinglePageItemsCount={}
        />
      </div>
    );
  }
}

export default ProductTrackerTable;
