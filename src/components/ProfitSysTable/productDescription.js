import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProductDescription = ({ seller, sections, productId, productImg }) => {
  return (
    <div>
      <p className="seller_name">
        {' '}
        by <Link to="">{seller}</Link>
      </p>
      <Breadcrumb className="cstm_breadcum" icon="right angle" sections={sections} />
      <div className="flag_row">
        <img src={productImg} alt="product_img" />
        <span>{productId}</span>
      </div>
    </div>
  );
};

export default ProductDescription;
