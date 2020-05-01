import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, Menu, Popup } from 'semantic-ui-react';
import Track from '../../../../assets/images/fingerprint.svg';
import { CheckedRowDictionary } from './index';
import { requestProductBulkTracking } from '../../../../actions/Suppliers';
import { connect } from 'react-redux';
import get from 'lodash/get';

interface ProductCheckBoxHeaderProps {
  currentPage: number;
  currentPageRows: Array<{ [key: string]: any }>;
  checkedRows: CheckedRowDictionary;
  updateCheckedRows: (checkedRows: CheckedRowDictionary) => void;
  requestProductBulkTracking: (products: { product_id: number }[]) => void;
}

const ProductCheckBoxHeader = (props: ProductCheckBoxHeaderProps) => {
  const {
    currentPage,
    currentPageRows,
    checkedRows,
    updateCheckedRows,
    requestProductBulkTracking,
  } = props;
  const [checked, setChecked] = useState(false);
  const [openTrackingPopup, setOpenTrackingPopup] = useState(false);

  useEffect(() => {
    setChecked(false);
    updateCheckedRows({});
  }, [currentPage]);

  useEffect(() => {
    for (const k in checkedRows) {
      if (checkedRows[k] && !openTrackingPopup) {
        setOpenTrackingPopup(true);
        break;
      }
    }
  }, [checkedRows]);

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

  const handleBulkTrackClick = () => {
    const products: any[] = [];
    currentPageRows.forEach(r => {
      if (checkedRows[r.id]) products.push({ product_id: r.product_id });
    });
    requestProductBulkTracking(products);
    updateCheckedRows({});
    setChecked(false);
    setOpenTrackingPopup(false);
  };

  return (
    <>
      <Checkbox checked={checked} onChange={handleCheckBoxClick} />
      <Popup
        basic={true}
        on="click"
        className="tracking-header-popup"
        trigger={<Icon link={true} className="ellipsis vertical" />}
        hideOnScroll={false}
        style={{ padding: 0 }}
        onOpen={() => setOpenTrackingPopup(true)}
        onClose={() => setOpenTrackingPopup(false)}
        open={openTrackingPopup}
      >
        <Menu fluid={true} vertical={true}>
          <Menu.Item className="bulk-track" onClick={handleBulkTrackClick}>
            <img src={Track} alt="Bulk Track" />
            {`Bulk Track`}
          </Menu.Item>
        </Menu>
      </Popup>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  supplierDetails: get(state, 'supplier.details'),
});

const mapDispatchToProps = {
  requestProductBulkTracking,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCheckBoxHeader);
