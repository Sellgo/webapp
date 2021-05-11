import React from 'react';
import { Checkbox } from 'semantic-ui-react';
// import { CheckedRowDictionary } from './index';
// import Thumb from '../../../assets/images/fingerprint-4.svg';
// import SlashThumb from '../../../assets/images/fingerprint-5.svg';
// import _ from 'lodash';

// interface ProductCheckBoxHeaderProps {
//   currentPage: number;
//   currentPageRows: Array<{ [key: string]: any }>;
//   checkedRows: CheckedRowDictionary;
//   updateCheckedRows: (checkedRows: CheckedRowDictionary) => void;
//   requestProductBulkTracking: (products: { product_id: number }[]) => void;
//   requestProductBulkUnTracking: (products: { product_id: number }[]) => void;
// }

const SellerCheckBoxHeader = () => {
  return (
    <div className="header-action-container">
      <div className="header-checkbox-container">
        <Checkbox className="product-checkbox" checked={false} />
      </div>
    </div>
  );
};

export default SellerCheckBoxHeader;
