import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
import InnerTree from './InnerTree';
import {
  activeSellerIndex,
  loadingSellerProducts,
  sellerProducts,
  sellerProductsError,
  sellerProductsPageNo,
  sellerProductsPageSize,
} from '../../../selectors/SellerFinder';
import {
  fetchSellerProducts,
  SellersProductsPayload,
  setProductIndex,
  setSellerIndex,
} from '../../../actions/SellerFinder';
import { connect } from 'react-redux';
import { showNAIfZeroOrNull } from '../../../utils/format';

export const updateHeight = (height: number) => {
  const details = document.querySelector('.seller-details');
  if (details) {
    details.setAttribute('style', `height: ${height}px`);
  }
};
interface SellerDetailsProps {
  details: any;
  onCheckInventory: (data: any) => void;
  fetchSellerProducts: (payload: SellersProductsPayload) => void;
  sellerProducts: any;
  loadingSellerProducts: any;
  productsPageNo: number;
  productsPageSize: number;
  onPagination: (payload: any) => void;
  setActiveSellerIndex: (index: number) => void;
  activeSellerIndex: number;
  setActiveProductIndex: (index: number) => void;
}

const SellerDetails = (props: SellerDetailsProps) => {
  const {
    onCheckInventory,
    fetchSellerProducts,
    sellerProducts,
    productsPageNo,
    productsPageSize,
    details,
    onPagination,
    setActiveSellerIndex,
    activeSellerIndex,
    setActiveProductIndex,
  } = props;
  const [treeData, setTreeData] = React.useState([
    {
      title: () => (
        <SellerInformation details={props.details} onCheckInventory={onCheckInventory} />
      ),
      className: 'card',
      expanded: details.id === activeSellerIndex,
      children: [
        {
          title: () => <InnerTree onPagination={onPagination} />,
          className: 'inner-tree',
        },
      ],
    },
  ]);

  return (
    <div
      className={`seller-details ${
        showNAIfZeroOrNull(details.inventory_count, details.inventory_count) === '-'
          ? 'disable-products'
          : ''
      }
      ${!sellerProducts.length ? 'zero-products' : ''}
      `}
    >
      <SortableTree
        treeData={treeData}
        theme={CustomTreeRenderer}
        canDrag={false}
        isVirtualized={false}
        onVisibilityToggle={node => {
          fetchSellerProducts({
            merchantId: details.id,
            enableLoader: true,
            pageSize: productsPageSize,
            pageNo: productsPageNo,
          });
          setActiveSellerIndex(details.id);
          if (!node.expanded) {
            updateHeight(250);
          }
          setActiveProductIndex(-1);
        }}
        onChange={(data: any) => setTreeData(data)}
        rowHeight={({ treeIndex, node }) => {
          const add = 350;
          if (node.expanded) {
            let newHeight = sellerProducts.length ? 60 * sellerProducts.length + add : 400;
            if (sellerProducts.length > 10) {
              newHeight = newHeight - 150;
            }
            updateHeight(newHeight);
          }
          return treeIndex === 0 ? 75 : 400;
        }}
      />
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  sellerProducts: sellerProducts(state),
  loadingSellerProducts: loadingSellerProducts(state),
  error: sellerProductsError(state),
  productsPageNo: sellerProductsPageNo(state),
  productsPageSize: sellerProductsPageSize(state),
  activeSellerIndex: activeSellerIndex(state),
});

const mapDispatchToProps = {
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
  setActiveSellerIndex: (index: number) => setSellerIndex(index),
  setActiveProductIndex: (index: number) => setProductIndex(index),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerDetails);
