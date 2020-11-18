import React from 'react';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import BARCODE_IMAGE from '../../../assets/images/barcode-read-light.svg';
import { Popup } from 'semantic-ui-react';

const ProductDescription = (props: any) => {
  const { item } = props;
  return (
    <div className="product-description" title={item.title}>
      <Popup
        content={
          <div className="ltr-product-popup">
            <p>
              <span className="ltr-product-popup-label">Search File:&nbsp;</span>
              <span className="ltr-product-info-value">{item.search}</span>
            </p>
            <p>
              <span className="ltr-product-popup-label">Product ID:&nbsp;</span>
              <span className="ltr-product-info-value">{item.identifier}</span>
            </p>
            <p>
              <span className="ltr-product-popup-label">Asin:&nbsp;</span>
              <span className="ltr-product-info-value">{item.asin}</span>
            </p>
          </div>
        }
        on="click"
        position={'bottom left'}
        basic={true}
        trigger={<img src={BARCODE_IMAGE} alt="barcode" className="barcode-img" />}
      />

      <img src={COUNTRY_IMAGE} alt="product_img" className="flag-img" />
      <a href={item.amazon_url} target="_blank" rel="noopener noreferrer">
        <span className="lt-description-text">{item.title}</span>
      </a>
    </div>
  );
};

export default ProductDescription;
