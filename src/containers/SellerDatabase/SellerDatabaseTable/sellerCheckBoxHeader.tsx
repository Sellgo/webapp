import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { CheckedRowDictionary } from './index';
// import Thumb from '../../../assets/images/fingerprint-4.svg';
// import SlashThumb from '../../../assets/images/fingerprint-5.svg';
// import _ from 'lodash';

interface Props {
  currentPage: number;
  currentPageRows: Array<{ [key: string]: any }>;
  checkedRows: CheckedRowDictionary;
  updateCheckedRows: (checkedRows: CheckedRowDictionary) => void;
}

const SellerCheckBoxHeader = (props: Props) => {
  console.log(props);
  return (
    <div className="sd-header-action-container">
      <div className="sd-header-checkbox-container">
        <Checkbox className="sd-product-checkbox" checked={false} />
      </div>
    </div>
  );
};

export default SellerCheckBoxHeader;
