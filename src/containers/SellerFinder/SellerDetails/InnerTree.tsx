import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { InventoryProductsHeader, InventoryProductsRow } from './InventoryProducts';
const InnerTree = () => {
  const [sellerInventory, setSellerInventory] = React.useState([
    {
      title: () => (
        <div>
          <InventoryProductsHeader />
          <InventoryProductsRow />
        </div>
      ),
      className: 'first-node',
      children: [
        {
          title: () => <div>Seller Products</div>,
        },
        {
          title: () => <div>Seller Products</div>,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <div>Seller Products</div>,
        },
        {
          title: () => <div>Seller Products</div>,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <div>Seller Products</div>,
        },
        {
          title: () => <div>Seller Products</div>,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <div>Seller Products</div>,
        },
        {
          title: () => <div>Seller Products</div>,
        },
      ],
    },
  ]);

  return (
    <div>
      <SortableTree
        treeData={sellerInventory}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        className={'product-tree'}
        onChange={(data: any) => setSellerInventory(data)}
      />
    </div>
  );
};

export default InnerTree;
