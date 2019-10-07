import React from 'react';
import { Image } from 'semantic-ui-react';

import AMAZON_IMAGE from '../../../../assets/images/amazon_choice.svg';
import PRIME_IMAGE from '../../../../assets/images/prime_icon.svg';

const Pricing = (props: any) => {
  const { price, categoryRank, categoryName, prime, amazonChoice } = props;
  return (
    <React.Fragment>
      <div className="price_row">
        <span className="price_head">Price: </span>
        <span className="price_rate">${price}</span>
      </div>
      <div className="catagory_rank">
        <span>
          #{categoryRank} in {categoryName}
        </span>
      </div>
      {(prime || amazonChoice) && (
        <div className="bottom_img">
          {amazonChoice && <Image src={AMAZON_IMAGE} className="amazon_img_size" />}
          {prime && <Image src={PRIME_IMAGE} />}{' '}
        </div>
      )}
    </React.Fragment>
  );
};

export default Pricing;
