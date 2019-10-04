import React from 'react';
import ProductDescription from './productDescription';
import Pricing from './pricing';
import Ratings from './ratings';

const ProductDescriptionWrap = (props: any) => {
  const { item } = props;
  return (
    <>
      <h2>{item.title}</h2>
      <div className="wrap_prod_information">
        <ProductDescription
          seller={item.seller}
          asin={item.asin}
          countryImg={item.countryImg}
          sections={item.sections}
        />
        <div className="rgt_prod">
          <Ratings totalReviews={item.totalReviews} starRatings={item.starRatings} />
          <Pricing
            price={item.price}
            categoryRank={item.categoryRank}
            categoryName={item.amazon_category_name}
            amazonImg={item.amazonImg}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionWrap;
