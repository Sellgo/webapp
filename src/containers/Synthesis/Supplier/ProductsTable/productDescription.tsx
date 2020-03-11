import React from 'react';
import COUNTRY_IMAGE from '../../../../assets/images/flag_icon.svg';

const ProductDescription = (props: any) => {
  const { item } = props;
  return (
    <div className="product-description">
      <img src={COUNTRY_IMAGE} alt="product_img" className="flag-img" />
      <a href={item.amazon_url} target="_blank" rel="noopener noreferrer">
        <span className="description-text">{item.title}</span>
      </a>
    </div>
  );
};

export default ProductDescription;
