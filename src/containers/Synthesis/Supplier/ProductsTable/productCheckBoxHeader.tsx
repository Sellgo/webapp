import React, { useEffect, useState } from 'react';
import { Checkbox, Icon, Menu, Popup } from 'semantic-ui-react';
import Track from '../../../../assets/images/fingerprint.svg';
import { CheckedRowDictionary } from './index';

interface ProductCheckBoxHeaderProps {
  currentPage: number;
  currentPageRows: Array<{ [key: string]: any }>;
  checkedRows: CheckedRowDictionary;
  updateCheckedRows: (checkedRows: CheckedRowDictionary) => void;
}

const ProductCheckBoxHeader = (props: ProductCheckBoxHeaderProps) => {
  const { currentPage, currentPageRows, updateCheckedRows } = props;
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

  return (
    <>
      <Checkbox checked={checked} onChange={handleCheckBoxClick} />
      <Popup
        basic={true}
        on="click"
        className="tracking-header-popup"
        trigger={<Icon link={true} className="ellipsis vertical" />}
        hideOnScroll={true}
        style={{ padding: 0 }}
        onOpen={() => setOpenTrackingPopup(true)}
        onClose={() => setOpenTrackingPopup(false)}
        open={openTrackingPopup}
      >
        <Menu fluid={true} vertical={true}>
          <Menu.Item
            className="bulk-track"
            // style={{ color: 'red' }}
            onClick={() => {
              // this.setOtherOptionsOpen(false);
              // handleConfirmMessage(row);
            }}
          >
            <img src={Track} alt="Bulk Track" />
            {`Bulk Track`}
          </Menu.Item>
        </Menu>
      </Popup>
    </>
  );
};

export default ProductCheckBoxHeader;
