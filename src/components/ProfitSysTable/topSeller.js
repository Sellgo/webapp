import React from 'react';
import { Label, Checkbox, Image } from 'semantic-ui-react';
import { TOP_SELLER } from '../../utils/constants';

const Topseller = ({ crownSrc, topSellerImg, index, checked, onSelectItem }) => {
  return (
    <div className="top_seller_col">
      <Label>
        <span>
          <img src={crownSrc} alt="" />
        </span>
        {TOP_SELLER}
      </Label>
      <div className="dsp_flex prod_img">
        <span>
          <Checkbox
            onChange={(e, data) => onSelectItem(e, data.checked, index)}
            checked={checked}
          />
        </span>
        <Image src={topSellerImg} />
      </div>
    </div>
  );
};

export default Topseller;
