import React, { useState } from 'react';
import { Checkbox, Icon, Menu, Popup } from 'semantic-ui-react';
import { CheckedRowDictionary } from './index';
import _ from 'lodash';
import Thumb from '../../../assets/images/fingerprint-4.svg';
import SlashThumb from '../../../assets/images/fingerprint-5.svg';
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
  const { checkedRows, currentPageRows, updateCheckedRows } = props;
  const [checked, setChecked] = useState(false);
  const [openTrackingPopup, setOpenTrackingPopup] = useState(false);

  // const handleBulkClick = (type: string) => {
  //   const products: any[] = [];
  //   currentPageRows.forEach(r => {
  //     if (checkedRows[r.id])
  //       products.push({ product_id: r.product_id, supplier_id: r.supplier_id });
  //   });
  //   if (products.length === 0) return;
  //   if (type === 'track') {
  //     // requestProductBulkTracking(products);
  //   } else if (type === 'untrack') {
  //     // requestProductBulkUnTracking(products);
  //   } else {
  //     // logging error here
  //   }
  //   updateCheckedRows({});
  //   setChecked(false);
  //   setOpenTrackingPopup(false);
  // };

  const handleCheckBoxClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    const newCheckedData: { [index: number]: boolean } = {};
    for (const k in currentPageRows) {
      const r = currentPageRows[k];
      newCheckedData[r.id] = newChecked;
    }

    updateCheckedRows(newCheckedData);
  };
  return (
    <div className="sd-header-action-container">
      <div className="sd-header-checkbox-container">
        <Checkbox
          className="sd-product-checkbox"
          checked={checked}
          onChange={handleCheckBoxClick}
        />
      </div>
      <Popup
        pinned
        basic={true}
        on="click"
        className="tracking-header-popup"
        position="bottom left"
        trigger={<Icon link={true} className="ellipsis vertical checkbox-select" />}
        hideOnScroll={false}
        onOpen={() => setOpenTrackingPopup(true)}
        onClose={() => setOpenTrackingPopup(false)}
        open={openTrackingPopup}
        style={{
          padding: 0,
        }}
      >
        <Menu fluid={true} vertical={true} className="header-checkbox-menu">
          <Menu.Item className="checkbox-menu-item">
            <img
              className={`fingerprint-track ${(_.isEmpty(checkedRows) ||
                Object.values(checkedRows).indexOf(true) === -1) &&
                'disabled'}`}
              src={Thumb}
              onClick={() => console.log('track')}
            />
            <img
              className={`fingerprint-untrack ${(_.isEmpty(checkedRows) ||
                Object.values(checkedRows).indexOf(true) === -1) &&
                'disabled'}`}
              src={SlashThumb}
              onClick={() => console.log('untrack')}
            />
          </Menu.Item>
        </Menu>
      </Popup>
    </div>
  );
};

export default SellerCheckBoxHeader;
