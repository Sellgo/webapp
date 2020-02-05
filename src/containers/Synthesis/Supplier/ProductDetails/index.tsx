import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import ProductData from './ProductData';
import ProductCharts from './ProductCharts';
import { resetSupplierProductDetails } from '../../../../actions/Products';

const ProductDetails = (props: any) => {
  const { product, resetProductDetails } = props;
  resetProductDetails();
  return (
    <div>
      <ProductData product={product} />
      <ProductCharts product={product} />
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  product: get(state, 'modals.supplierProductDetail.meta'),
});

const mapDispatchToProps = {
  resetProductDetails: () => resetSupplierProductDetails(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
