import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Pricing from './pricing';
import Ratings from './ratings';

const ProductDescription = (props: any) => {
  const { item } = props;
  return (
    <div className="productDescription">
      <h2>{item.title}</h2>
      <div className="wrap_prod_information">
        <div>
          <div className="categories">
            <p className="seller_name">
              {' '}
              by {item.seller} in {item.amazon_category_name}
            </p>

            {/*<Breadcrumb className="cstm_breadcum" icon="right angle" sections={item.sections} />*/}
          </div>

          <div className="flag_row">
            <img src={item.countryImg} alt="product_img" />
            <span>{item.asin}</span>
          </div>
        </div>

        <div className="rgt_prod">
          {/*<Ratings totalReviews={item.totalReviews} starRatings={item.starRatings} />*/}
          <Pricing
            price={item.price}
            categoryRank={item.categoryRank}
            categoryName={item.amazon_category_name}
            amazonChoice={item.amazonChoice}
            prime={item.prime}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
