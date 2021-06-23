import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, Menu, Popup } from 'semantic-ui-react';
import { CheckedRowDictionary } from './index';
import Thumb from '../../../assets/images/trackAllFingerprint.svg';
import SlashThumb from '../../../assets/images/untrackAllFingerPrint.svg';
import {
  requestProductBulkTracking,
  requestProductBulkUnTracking,
} from '../../../actions/Suppliers';
import { connect } from 'react-redux';
import get from 'lodash/get';
import _ from 'lodash';

interface ProductCheckBoxHeaderProps {
  currentPage: number;
  currentPageRows: Array<{ [key: string]: any }>;
  checkedRows: CheckedRowDictionary;
  updateCheckedRows: (checkedRows: CheckedRowDictionary) => void;
  requestProductBulkTracking: (products: { product_id: number }[]) => void;
  requestProductBulkUnTracking: (products: { product_id: number }[]) => void;
}

const ProductCheckBoxHeader = (props: ProductCheckBoxHeaderProps) => {
  const {
    currentPage,
    currentPageRows,
    checkedRows,
    updateCheckedRows,
    requestProductBulkTracking,
    requestProductBulkUnTracking,
  } = props;
  const [checked, setChecked] = useState(false);
  const [openTrackingPopup, setOpenTrackingPopup] = useState(false);

  useEffect(() => {
    setChecked(false);
    updateCheckedRows({});
  }, [currentPage]);

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

  const handleBulkClick = (type: string) => {
    const products: any[] = [];
    currentPageRows.forEach(r => {
      if (checkedRows[r.id])
        products.push({ product_id: r.product_id, supplier_id: r.supplier_id });
    });
    if (products.length === 0) return;
    if (type === 'track') {
      requestProductBulkTracking(products);
    } else if (type === 'untrack') {
      requestProductBulkUnTracking(products);
    } else {
      // logging error here
    }
    updateCheckedRows({});
    setChecked(false);
    setOpenTrackingPopup(false);
  };

  return (
    <div className="header-action-container">
      <div className="header-checkbox-container">
        <Checkbox className="product-checkbox" checked={checked} onChange={handleCheckBoxClick} />
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
            <span className="track-all-option">
              <img
                className={`fingerprint-track ${(_.isEmpty(checkedRows) ||
                  Object.values(checkedRows).indexOf(true) === -1) &&
                  'disabled'}`}
                src={Thumb}
                onClick={() => handleBulkClick('track')}
              />
              Track All
            </span>
            <span className="untrack-all-option">
              <img
                className={`fingerprint-untrack ${(_.isEmpty(checkedRows) ||
                  Object.values(checkedRows).indexOf(true) === -1) &&
                  'disabled'}`}
                src={SlashThumb}
                onClick={() => handleBulkClick('untrack')}
              />
              Untrack All
            </span>
          </Menu.Item>
        </Menu>
      </Popup>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
});

const mapDispatchToProps = {
  requestProductBulkTracking,
  requestProductBulkUnTracking,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCheckBoxHeader);
