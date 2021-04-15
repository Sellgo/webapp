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
      index: 0,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      index: 1,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      index: 2,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      index: 3,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      title: () => <InventoryProductsRow />,
      index: 4,
      children: [
        {
          title: () => <ProductSellers />,
          count: 5,
        },
      ],
    },
    {
      index: 5,
      title: () => <div />,
    },
  ]);
  const assignNewHeight = (index: number, height: number) => {
    const tree = document.querySelector('.product-tree');
    if (tree && tree.hasChildNodes()) {
      const element = tree.children.item(index + 1);
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
        onChange={(data: any) => {
          setSellerInventory(data);
        }}
        onVisibilityToggle={({ treeData, node }) => {
          console.log(node);
          const data = treeData.map(n => {
            if (n.index !== node.index) {
              n = { ...n, expanded: false };
            }
            return n;
          });
          setSellerInventory(data);
          console.log(sellerInventory);
        }}
        rowHeight={({ treeIndex, node }) => {
          let height = 50;
          const product = sellerInventory[treeIndex];
          const assignHeight = () => {
            if (product && product.children) {
              const [obj] = product.children;
              height = obj.count * 50 + 100;
            }
          };
          if (product && node.expanded) {
            assignHeight();
            assignNewHeight(node.index, height);
          } else {
            assignNewHeight(treeIndex, height);
          }
          // if (sellerInventory.length === treeIndex) {
          //   product = sellerInventory[treeIndex];
          //
          //   assignHeight();
          //   assignNewHeight(treeIndex, height);
          // }
          //
          // if (!node.expanded) {
          // }

          return height;
        }}
      />
    </div>
  );
};

export default InnerTree;
