import React, { useState } from 'react';
import COUNTRY_IMAGE from '../../../assets/images/flag_icon.svg';
import _ from 'lodash';
import AMAZON_IMAGE from '../../../assets/images/amazon_choice.svg';
import { PRODUCT_ID_TYPES } from '../../../constants/UploadSupplier';
import bestSellerImage from '../../../assets/images/best-seller.png';
import { copyToClipboard } from '../../../utils/file';
import { Icon } from 'semantic-ui-react';

const ProductDescription = (props: any) => {
  const { item } = props;

  const [copied, setCopied] = useState(false);

  const pidInfo =
    PRODUCT_ID_TYPES.filter(pidType => pidType !== 'ASIN')
      .filter(pidType => pidType.toLowerCase() in item)
      .map(pidType => item[pidType.toLowerCase()])[0] || '';

  const copyText = (text: string) => {
    copyToClipboard(text).then(() => setCopied(true));
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="inner-product-info">
      <div className="product-tracker-description" title={item.title}>
        <div className="product-image" style={{ backgroundImage: `url(${item.image_url})` }} />
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
                <span className="asin-content">
                  ASIN:{item.asin}
                  <span>
                    {!copied ? (
                      <Icon
                        name="copy outline"
                        data-title="Copy"
                        className="tooltipIcon"
                        onClick={() => copyText(item.asin)}
                      />
                    ) : (
                      <Icon
                        name="check circle"
                        className="tooltipIcon"
                        color="green"
                        data-title="Copied"
                      />
                    )}
                  </span>
                </span>

                <span className="pid-content">{pidInfo ? `UPC: ${pidInfo}` : null}</span>
              </div>
              <div className="product-labels-container">
                {!_.isEmpty(item.best_seller) && <img src={bestSellerImage} alt="best_seller" />}
                {!_.isEmpty(item.amazon_choice) && <img src={AMAZON_IMAGE} alt="amazon_choice" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
