import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProductDescription = (props: any) => {
  const { seller, sections, asin, countryImg } = props;
  return (
    <div>
      <p className="seller_name">
        {' '}
        by <Link to="">{seller}</Link>
      </p>
      <Breadcrumb className="cstm_breadcum" icon="right angle" sections={sections} />
      <div className="flag_row">
        <img src={countryImg} alt="product_img" />
        <span>{asin}</span>
      </div>
    </div>
  );
};

export default ProductDescription;
