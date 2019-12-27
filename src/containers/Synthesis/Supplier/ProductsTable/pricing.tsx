import React from 'react';
import { formatCurrency } from '../../../../utils/format';
//import { Image } from 'semantic-ui-react';
//import AMAZON_IMAGE from '../../../../assets/images/amazon_choice.svg';
//import PRIME_IMAGE from '../../../../assets/images/prime_icon.svg';

const Pricing = (props: any) => {
  const {
    price,
    rank,
    category,
    //prime,
    //amazonChoice
  } = props;
  return (
    <React.Fragment>
      <div className="price-row">
        <span className="price-head">Price: </span>
        <span className="price-rate">{formatCurrency(price)}</span>
      </div>
      <div className="catagory-rank">
        <span>
          #{rank} in {category}
        </span>
      </div>
      {/*
      {(prime || amazonChoice) && (
        <div className="bottom-img">
          {amazonChoice && <Image src={AMAZON_IMAGE} className="amazon_img_size" />}
          {prime && <Image src={PRIME_IMAGE} />}{' '}
        </div>
      )}
      */}
    </React.Fragment>
  );
};

export default Pricing;
