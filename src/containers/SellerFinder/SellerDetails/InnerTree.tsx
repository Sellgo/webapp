import React from 'react';
import SortableTree from 'react-sortable-tree';

import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { InventoryProductsHeader, InventoryProductsRow } from './InventoryProducts';
import ProductSellers from './ProductSellers';
const InnerTree = () => {
  const [sellerInventory, setSellerInventory] = React.useState<any>([
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
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
  ]);

  const assignNewHeight = (index: number, height: number) => {
    const tree = document.querySelector('.product-tree');
    if (tree && tree.hasChildNodes()) {
      const element = tree.children.item(index);
      if (element) {
        element.setAttribute('style', `height:${height}px !important`);
      }
    }
  };

  return (
    <div>
      <SortableTree
        treeData={sellerInventory}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        className={'product-tree'}
        onChange={(data: any) => setSellerInventory(data)}
        rowHeight={({ treeIndex, node }) => {
          let height = 50;
          let product = sellerInventory[treeIndex];
          const assignHeight = () => {
            if (product) {
              const [obj] = product.children;
              height = obj.count * 50 + 100;
            }
          };
          if (product && node.expanded) {
            assignHeight();
            assignNewHeight(treeIndex + 1, height);
          }
          if (sellerInventory.length === treeIndex) {
            product = sellerInventory[treeIndex];

            assignHeight();
            assignNewHeight(treeIndex, height);
          }

          if (!node.expanded) {
            assignNewHeight(treeIndex + 1, height);
          }

          return height;
        }}
      />
    </div>
  );
};

export default InnerTree;
