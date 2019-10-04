import React from 'react';
import { Image } from 'semantic-ui-react';

import PRIME_IMAGE from '../../../../assets/images/prime_icon.svg';

const Pricing = (props: any) => {
  const { price, categoryRank, categoryName, amazonImg } = props;
  return (
    <React.Fragment>
      <div className="price_row">
        <span className="price_head">Price: </span>
        <span className="price_rate">${price}</span>
      </div>
      <div className="catogy_toy">
        <span>
          #{categoryRank} in {categoryName}
        </span>
      </div>
      <div className="bottm_img">
        <Image src={amazonImg} className="amaon_img_size" />
        <Image src={PRIME_IMAGE} />
      </div>
    </React.Fragment>
  );
};

export default Pricing;
