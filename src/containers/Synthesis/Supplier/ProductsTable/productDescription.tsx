import React from 'react';
//import { Breadcrumb } from 'semantic-ui-react';
//import { Link } from 'react-router-dom';
import Pricing from './pricing';
//import Ratings from './ratings';
import COUNTRY_IMAGE from '../../../../assets/images/flag_icon.svg';
import { formatNumber } from '../../../../utils/format';

const ProductDescription = (props: any) => {
  const { item } = props;
  return (
    <div className="product-description">
      {/* <h2>{item.title}</h2> */}
      <a href={item.amazon_url} target="_blank">
        <span className="description-text">{item.title}</span>
      </a>
      {/* <div className="wrap-prod-information">
        <div>
          <div className="categories">
            <p className="brand">
              by <strong>{item.brand}</strong> in <strong>{item.amazon_category_name}</strong>
            </p>

            <Breadcrumb className="cstm_breadcum" icon="right angle" sections={item.sections} />
          </div>

          <div className="flag-row">
            <img src={COUNTRY_IMAGE} alt="product_img" />
            <a href={item.amazon_url} target="_blank">
              <span>{item.asin}</span>
            </a>
          </div>
        </div>

        <div className="rgt-prod">
          <Ratings totalReviews={item.totalReviews} starRatings={item.starRatings} />
          <Pricing
            price={item.price}
            rank={formatNumber(item.rank)}
            category={item.amazon_category_name}
            amazonChoice={item.amazonChoice}
            prime={item.prime}
          />
        </div>
      </div> */}
    </div>
  );
};

export default ProductDescription;
