import React, { useEffect } from 'react';
import SortableTree from 'react-sortable-tree';

import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { InventoryProductsHeader, InventoryProductsRow } from './InventoryProducts';
import ProductSellers from './ProductSellers';
import {
  loadingProductSellers,
  loadingSellerProducts,
  productSellers,
  sellerProducts,
  sellerProductsError,
} from '../../../selectors/SellerFinder';
import { connect } from 'react-redux';
import PageLoader from '../../../components/PageLoader';
import { fetchProductSellers, ProductSellersPayload } from '../../../actions/SellerFinder';

interface Props {
  sellerProducts: any[];
  loadingSellerProducts: boolean;
  fetchProductSellers: (payload: ProductSellersPayload) => void;
}

const InnerTree = ({ sellerProducts, loadingSellerProducts }: Props) => {
  const getTreeData = () => {
    const rows = sellerProducts.map((rowData: any, index: number) => {
      let row: any = {
        title: () => <InventoryProductsRow row={rowData} />,
        index,
        children: [
          {
            title: () => <ProductSellers />,
            count: 5,
          },
        ],
      };
      if (index === 0) {
        row = {
          title: () => (
            <div>
              <InventoryProductsHeader />
              <InventoryProductsRow row={rowData} />
            </div>
          ),
          className: 'first-node',
          index,
          children: [
            {
              title: () => <ProductSellers />,
              count: 5,
            },
          ],
        };
      }
      return row;
    });
    return rows;
  };
  const [sellerInventory, setSellerInventory] = React.useState<any>([]);
  useEffect(() => {
    setSellerInventory([
      ...getTreeData(),
      {
        index: sellerProducts.length + 1,
        title: () => <div />,
      },
    ]);
  }, [sellerProducts]);
  const assignNewHeight = (index: number, height: number) => {
    const tree = document.querySelector('.product-tree');
    if (tree && tree.hasChildNodes()) {
      const element = tree.children.item(index + 1);
      if (element) {
        element.setAttribute('style', `height:${height}px !important`);
      }
    }
  };

  const updateParentHeight = (height: number, set: boolean) => {
    const details = document.querySelector('.seller-details');
    if (details) {
      details.setAttribute(
        'style',
        `height: ${set ? details.clientHeight + height : details.clientHeight - height}px`
      );
    }
  };
  const getHeight = (product: any): number => {
    let height = 50;
    if (product && product.children) {
      const [obj] = product.children;
      height = obj.count * 50 + 100;
    }
    return height;
  };
  return (
    <div>
      {loadingSellerProducts ? (
        <PageLoader pageLoading={true} />
      ) : (
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
            console.log(node);
            if (node.expanded) {
              updateParentHeight(getHeight(node), true);
            } else {
              updateParentHeight(getHeight(node), false);
            }

            setSellerInventory(data);
            console.log(sellerInventory);
          }}
          rowHeight={({ treeIndex, node }) => {
            const height = 50;
            const product = sellerInventory[treeIndex];
            if (product && node.expanded) {
              assignNewHeight(node.index, getHeight(product));
            } else {
              assignNewHeight(treeIndex, height);
            }
            return height;
          }}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  sellerProducts: sellerProducts(state),
  loadingSellerProducts: loadingSellerProducts(state),
  error: sellerProductsError(state),
  productSellers: productSellers(state),
  loadingProductSellers: loadingProductSellers(state),
});
const mapDispatchToProps = {
  fetchProductSellers: (payload: ProductSellersPayload) => fetchProductSellers(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(InnerTree);
