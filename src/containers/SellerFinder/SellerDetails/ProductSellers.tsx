import React, { useEffect } from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { SellersProductsHeader, SellersRow } from './InventorySellers';
import { loadingProductSellers, productSellers } from '../../../selectors/SellerFinder';
import { connect } from 'react-redux';
import PageLoader from '../../../components/PageLoader';

interface Props {
  productSellers: any[];
  loadingProductSellers: boolean;
}
const ProductSellers = (props: Props) => {
  const { productSellers } = props;
  console.log(productSellers);
  const getSellersData = () => {
    return productSellers.map((seller: any, index: number) => {
      let row = {
        title: () => <SellersRow row={seller} />,
      };
      if (index === 0) {
        row = {
          title: () => (
            <div>
              <SellersProductsHeader />
              <SellersRow row={seller} />
            </div>
          ),
        };
      }
      return row;
    });
  };
  const [sellers, setSellers] = React.useState<any>([]);
  useEffect(() => {
    setSellers(getSellersData());
  }, [productSellers]);

  return (
    <div>
      {props.loadingProductSellers ? (
        <PageLoader pageLoading={true} />
      ) : (
        <SortableTree
          treeData={sellers}
          theme={CustomTreeRenderer}
          canDrag={false}
          isVirtualized={false}
          className={'sellers-tree'}
          onChange={(data: any) => setSellers(data)}
          rowHeight={46}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  productSellers: productSellers(state),
  loadingProductSellers: loadingProductSellers(state),
});
export default connect(mapStateToProps)(ProductSellers);
