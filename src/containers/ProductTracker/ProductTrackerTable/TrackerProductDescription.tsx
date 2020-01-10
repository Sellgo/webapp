import React from 'react';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import { Icon } from 'semantic-ui-react';

const ProductDescription = (props: any) => {
  const { item } = props;

  return (
    <div className="product-tracker-description">
      <img src={item.image_url} />
      <div>
        <div className="description-text">
          <a href={item.amazon_url} target="_blank">
            <h2>{item.title}</h2>
          </a>
        </div>
        <div className="wrap-prod-information">
          <div className="information">
            <img src={COUNTRY_IMAGE} alt="product_img" />
            <span>{item.asin}</span>
            <div className="table-icon">
              <i className="fas fa-skull-crossbones" />
              <Icon className="lock" />
              <Icon className="list" />
              <Icon className="cubes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
