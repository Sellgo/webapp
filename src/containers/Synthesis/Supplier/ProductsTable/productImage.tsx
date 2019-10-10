import React from 'react';
import {
  //Label,
  //Checkbox,
  Image,
} from 'semantic-ui-react';
//import { TOP_SELLER } from '../../../../utils/constants';
//import CROWN_IMAGE from '../../../../assets/images/crown_icon.svg';

const ProductImage = (props: any) => {
  const {
    item,
    //checked,
    //onSelectItem
  } = props;
  return (
    <div className="productImage">
      {/*
      {item.topSeller && (
        <Label>
          <span>
            <img src={CROWN_IMAGE} alt="" />
          </span>
          {TOP_SELLER}
        </Label>
      )}
      */}
      <div className="imageWrapper">
        {/*
        <span>
          <Checkbox
            onChange={(e, data) => onSelectItem(e, data.checked, item.id)}
            checked={checked}
          />
        </span>
        */}
        <Image src={item.image_url} />
      </div>
    </div>
  );
};

export default ProductImage;
