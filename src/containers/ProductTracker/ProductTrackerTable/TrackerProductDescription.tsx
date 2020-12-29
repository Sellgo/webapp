import React from 'react';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import _ from 'lodash';
import AMAZON_IMAGE from '../../../assets/images/amazon_choice.svg';
import { PRODUCT_ID_TYPES } from '../../../constants/UploadSupplier';
import { WithoutCostUpload } from '../../../components/WithoutCostUpload';

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
                  {PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN')
                    .filter(pidType => pidType.toLowerCase() in item)
                    .map(pidType => item[pidType.toLowerCase()])[0] || ''}
                </span>
              </div>
              {!_.isEmpty(item.amazon_choice) && <img src={AMAZON_IMAGE} alt="amazon_choice" />}
            </div>
            {!item.product_cost && (
              <span>
                <WithoutCostUpload />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
