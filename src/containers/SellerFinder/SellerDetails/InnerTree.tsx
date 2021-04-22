import React, { useEffect, useState } from 'react';
import SortableTree from 'react-sortable-tree';

import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { InventoryProductsHeader, InventoryProductsRow } from './InventoryProducts';
import ProductSellers from './ProductSellers';
import {
  activeProduct,
  loadingProductSellers,
  loadingSellerProducts,
  productSellers,
  sellerProducts,
  sellerProductsCount,
  sellerProductsError,
  sellerProductsPageCount,
  sellerProductsPageNo,
  sellerProductsPageSize,
} from '../../../selectors/SellerFinder';
import { connect } from 'react-redux';
import PageLoader from '../../../components/PageLoader';
import { fetchProductSellers, ProductSellersPayload } from '../../../actions/SellerFinder';
import Pagination from '../../../components/Pagination';
import { selectItemsCountList } from '../../../constants/SellerFinder';

interface Props {
  sellerProducts: any[];
  loadingSellerProducts: boolean;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  fetchProductSellers: (payload: ProductSellersPayload) => void;
  onPagination: (payload: any) => void;
  productSellers: any[];
  activeProduct: any;
  loadingProductSellers: boolean;
}

const InnerTree = ({
  sellerProducts,
  loadingSellerProducts,
  loadingProductSellers,
  pageNo,
  pageSize,
  totalPages,
  totalRecords,
  onPagination,
  productSellers,
  fetchProductSellers,
}: Props) => {
  const [activeNode, setActiveNode] = useState<any>({});
  const getTreeData = () => {
    const rows = sellerProducts.map((rowData: any, index: number) => {
      let row: any = {
        title: () => <InventoryProductsRow row={rowData} />,
        index,
        children: [
          {
            title: () => <ProductSellers />,
            count: productSellers.length,
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
              count: productSellers.length,
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

  const updateProductHeight = (newHeight: number) => {
    const products = document.querySelector('.product-tree');
    const height = newHeight > 0 ? newHeight : productSellers.length * 50 + 100;
    if (products) {
      const element = products.children.item(activeNode.index + 1);
      console.log({ element, height });
      if (element) {
        element.setAttribute('style', `height: ${height}px !important`);
      }
    }
  };

  useEffect(() => {
    updateProductHeight(0);
  }, [productSellers]);

  useEffect(() => {
    if (loadingProductSellers) {
      updateProductHeight(100);
    }
  }, [loadingProductSellers]);

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
            const data = treeData.map(n => {
              if (n.index !== node.index) {
                n = { ...n, expanded: false };
              }
              return n;
            });
            const height = getHeight(node);
            const product = data[node.index];
            if (product.expanded) {
              if (activeNode.index !== node.index) {
                const oldHeight = getHeight(activeNode);
                updateParentHeight(oldHeight, false);
              }
              const payload = sellerProducts[node.index];
              fetchProductSellers({
                asin: payload.asin,
                merchantId: payload.merchant_id,
                enableLoader: true,
              });
              updateParentHeight(height, true);
              setActiveNode(node);
            } else {
              updateParentHeight(height, false);
            }

            setSellerInventory(data);
          }}
          rowHeight={({ treeIndex, node }) => {
            const height = 50;
            if (!node.expanded) {
              assignNewHeight(treeIndex, 50);
            }
            return height;
          }}
        />
      )}
      {totalRecords > 0 && (
        <div className="seller-products-pagination">
          <Pagination
            currentPage={pageNo}
            pageSize={pageSize}
            totalPages={totalPages}
            onNextPage={page => {
              onPagination({
                pageSize,
                pageNo: page,
              });
            }}
            onPrevPage={page => {
              onPagination({
                pageSize,
                pageNo: page,
              });
            }}
            onPageSizeSelect={pageSize => {
              onPagination({
                pageNo,
                pageSize,
              });
            }}
            onPageNumberUpdate={page => {
              onPagination({
                pageSize,
                pageNo: page,
              });
            }}
            loading={loadingSellerProducts}
            totalRecords={totalRecords}
            showPageSize
            pageSizeList={selectItemsCountList}
          />
        </div>
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
  pageNo: sellerProductsPageNo(state),
  pageSize: sellerProductsPageSize(state),
  totalPages: sellerProductsPageCount(state),
  totalRecords: sellerProductsCount(state),
  activeProduct: activeProduct(state),
});
const mapDispatchToProps = {
  fetchProductSellers: (payload: ProductSellersPayload) => fetchProductSellers(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(InnerTree);
