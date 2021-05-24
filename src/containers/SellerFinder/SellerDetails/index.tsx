import React from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import SellerInformation from './SellerInformation';
import InnerTree from './InnerTree';
import {
  activeProductIndex,
  activeProductSellerStatus,
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
import { Icon } from 'semantic-ui-react';

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
  onProductsExport: () => void;
  activeProductSellerStatus?: any;
  activeProductIndex: number;
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
    onProductsExport,
    activeProductIndex,
  } = props;
  const noInventory = showNAIfZeroOrNull(details.inventory_count, details.inventory_count) === '-';
  const [treeData, setTreeData] = React.useState([
    {
      title: () => (
        <>
          <div className={`export-container`}>
            <p
              className={`export-products ${noInventory ? 'export-products-disabled' : ''}`}
              onClick={!noInventory ? onProductsExport : undefined}
            >
              <Icon name="download" /> {'Export Products'}
            </p>
          </div>
          <SellerInformation details={props.details} onCheckInventory={onCheckInventory} />
        </>
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
          const add = activeProductIndex > -1 ? 550 : 400;
          if (node.expanded) {
            let multiplier = 60;
            if (productsPageSize === 50) {
              multiplier = 55;
            } else if (productsPageSize === 100) {
              multiplier = 52;
            } else {
              multiplier = 60;
            }

            let newHeight = sellerProducts.length ? multiplier * sellerProducts.length + add : 450;
            if (sellerProducts.length > 10) {
              newHeight = newHeight - 150;
            }
            updateHeight(newHeight);
          }
          return treeIndex === 0 ? 75 : 450;
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
  activeProductSellerStatus: activeProductSellerStatus(state),
  activeProductIndex: activeProductIndex(state),
});

const mapDispatchToProps = {
  fetchSellerProducts: (payload: SellersProductsPayload) => fetchSellerProducts(payload),
  setActiveSellerIndex: (index: number) => setSellerIndex(index),
  setActiveProductIndex: (index: number) => setProductIndex(index),
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerDetails);
