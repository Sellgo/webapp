import React from 'react';
import COUNTRY_IMAGE from '../../../../assets/images/flag_icon.svg';
import { WithoutCostUpload } from '../../../../components/WithoutCostUpload';

const ProductDescription = (props: any) => {
  const { item } = props;

  const renderTitle = item.product_id ? (
    <a href={item.amazon_url} target="_blank" rel="noopener noreferrer">
      <span className="description-text">{item.title}</span>
    </a>
  ) : (
    <span className="description-text" style={{ color: 'black' }}>
      {item.title}
    </span>
  );

  return (
    <div className="product-description" title={item.title}>
      <img src={COUNTRY_IMAGE} alt="product_img" className="flag-img" />
      {renderTitle}
      {item.product_id && !item.product_cost && <WithoutCostUpload />}
    </div>
  );
};

export default ProductDescription;
