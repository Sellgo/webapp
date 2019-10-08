import React from 'react';
import { connect } from 'react-redux';
import ProductData from './ProductData';
import ProductCharts from './ProductCharts';
import { resetSupplierProductDetails } from '../../../../actions/Products';

const ProductDetails = (props: any) => {
  const { resetProductDetails } = props;
  resetProductDetails();
  return (
    <div>
      <ProductData />
      <ProductCharts />
    </div>
  );
};

const mapStateToProps = (state: {}) => ({});

const mapDispatchToProps = {
  resetProductDetails: () => resetSupplierProductDetails(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
