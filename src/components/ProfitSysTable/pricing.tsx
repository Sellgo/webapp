import React from 'react';
import { Rating, Image } from 'semantic-ui-react';

const Pricing = (props: any) => {
  const { starRatings, totalReviews, price, category, amazonSrc, primeSrc } = props;
  return (
    <React.Fragment>
      <div className="price_row">
        <span className="price_head">Price: </span>
        <span className="price_rate">${price}</span>
      </div>
      <div className="catogy_toy">
        <span>#{category} in Toys & Games</span>
      </div>
      <div className="bottm_img">
        <Image src={amazonSrc} className="amaon_img_size" />
        <Image src={primeSrc} />
      </div>
    </React.Fragment>
  );
};

export default Pricing;
