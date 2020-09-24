import React from 'react';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import _ from 'lodash';
import AMAZON_IMAGE from '../../../assets/images/amazon_choice.svg';

const ProductDescription = (props: any) => {
  const { item } = props;

  return (
    <div className="inner-product-info">
      <div className="product-tracker-description" title={item.title}>
        <div className="product-image" style={{ backgroundImage: `url(${item.image_url})` }}>
          {' '}
        </div>
        <div>
          <div className="description-text">
            <a href={item.amazon_url} target="_blank" rel="noopener noreferrer">
              <h2>{item.title}</h2>
            </a>
          </div>
          <div className="wrap-prod-information">
            <div className="information">
              <img className="flag-img" src={COUNTRY_IMAGE} alt="product_img" />
              <div className="asin-pid-wrapper">
                <span className="asin-content">{item.asin}</span>
                <span className="pid-content">
                  {item.upc ? item.upc : item.ean ? item.ean : ''}
                </span>
              </div>
              {!_.isEmpty(item.amazon_choice) && <img src={AMAZON_IMAGE} alt="amazon_choice" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
