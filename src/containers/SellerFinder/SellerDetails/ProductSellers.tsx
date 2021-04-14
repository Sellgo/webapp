import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { SellersProductsHeader, SellersRow } from './InventorySellers';
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

export default ProductSellers;
