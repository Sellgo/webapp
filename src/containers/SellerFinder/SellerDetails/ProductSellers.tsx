import React, { useEffect } from 'react';
import SortableTree from 'react-sortable-tree';
import CustomTreeRenderer from './CustomTreeRenderer';
import 'react-sortable-tree/style.css';
import './index.scss';
import { SellersProductsHeader, SellersRow } from './InventorySellers';
import { loadingProductSellers, productSellers } from '../../../selectors/SellerFinder';
import PageLoader from '../../../components/PageLoader';
import { connect } from 'react-redux';

interface Props {
  productSellers: any[];
  loadingProductSellers: boolean;
}
const ProductSellers = (props: Props) => {
  const { productSellers } = props;
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
        <>
          {productSellers.length > 0 ? (
            <SortableTree
              treeData={sellers}
              theme={CustomTreeRenderer}
              canDrag={false}
              isVirtualized={false}
              className={'sellers-tree'}
              onChange={(data: any) => setSellers(data)}
              rowHeight={46}
            />
          ) : (
            <p className="text-center">Sellers Not Found!</p>
          )}
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state: {}) => ({
  productSellers: productSellers(state),
  loadingProductSellers: loadingProductSellers(state),
});
export default connect(mapStateToProps)(ProductSellers);
