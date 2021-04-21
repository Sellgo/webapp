import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { SellersProductsHeader, SellersRow } from './InventorySellers';
import { loadingProductSellers, productSellers } from '../../../selectors/SellerFinder';
import { connect } from 'react-redux';
interface Props {
  productSellers: any[];
  loadingProductSellers: boolean;
}
const ProductSellers = () => {
  const [productSellers, setProductSellers] = React.useState([
    {
      title: () => (
        <div>
          <SellersProductsHeader />
          <SellersRow />
        </div>
      ),
    },
    {
      title: () => <SellersRow />,
    },
    {
      title: () => <SellersRow />,
    },
    {
      title: () => <SellersRow />,
    },
    {
      title: () => <SellersRow />,
    },
  ]);

  return (
    <div>
      <SortableTree
        treeData={productSellers}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        className={'sellers-tree'}
        onChange={(data: any) => setProductSellers(data)}
        rowHeight={46}
      />
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  productSellers: productSellers(state),
  loadingProductSellers: loadingProductSellers(state),
});
export default connect(mapStateToProps)(ProductSellers);
