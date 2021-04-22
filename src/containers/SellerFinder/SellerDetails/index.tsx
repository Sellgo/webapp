import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
import InnerTree from './InnerTree';
import {
  loadingSellerProducts,
  sellerProducts,
  sellerProductsError,
  sellerProductsPageNo,
  sellerProductsPageSize,
} from '../../../selectors/SellerFinder';
import { fetchSellerProducts, SellersProductsPayload } from '../../../actions/SellerFinder';
import { connect } from 'react-redux';
import { showNAIfZeroOrNull } from '../../../utils/format';

interface SellerDetailsProps {
  details: any;
  onCheckInventory: (data: any) => void;
  fetchSellerProducts: (payload: SellersProductsPayload) => void;
  sellerProducts: any;
  loadingSellerProducts: any;
  productsPageNo: number;
  productsPageSize: number;
  onPagination: (payload: any) => void;
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
  } = props;
  const [treeData, setTreeData] = React.useState([
    {
      title: () => (
        <SellerInformation details={props.details} onCheckInventory={onCheckInventory} />
      ),
      className: 'card',
      children: [
        {
          title: () => <InnerTree onPagination={onPagination} />,
          className: 'inner-tree',
        },
      ],
    },
  ]);

  const updateHeight = (height: number) => {
    const details = document.querySelector('.seller-details');
    if (details) {
      details.setAttribute('style', `height: ${height}px`);
    }
  };

  return (
    <div
      className={`seller-details ${
        showNAIfZeroOrNull(details.inventory_count, details.inventory_count) === '-'
          ? 'disable-products'
          : ''
      } 
     
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
          if (!node.expanded) {
            updateHeight(250);
          }
        }}
        onChange={(data: any) => setTreeData(data)}
        rowHeight={({ treeIndex, node }) => {
          if (node.expanded) {
            const newHeight = sellerProducts.length ? 65 * sellerProducts.length : 400;
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
});

const mapDispatchToProps = {
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerDetails);
