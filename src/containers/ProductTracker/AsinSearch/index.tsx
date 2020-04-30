import React, { useState, useEffect } from 'react';
import { Menu, Input, Button, Grid, Dropdown } from 'semantic-ui-react';
import Confirm from './Confirm';
import { useInput } from '../../../hooks';
import './index.scss';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { checkMWSProduct } from '../../../actions/ProductTracker';
import { Asin } from '../../../components/ToastMessages';
import { warn, dismiss } from '../../../utils/notifications';

interface Props {
  checkProduct: (asin: string) => void;
  verifyingProductTracked: any;
  verifyingProduct: boolean;
}

const AsinSearch = (props: Props) => {
  const { checkProduct, verifyingProductTracked, verifyingProduct } = props;

  const { value: searchValue, bind: bindSearch, setValue: setSearch } = useInput('');
  const [selectedMarketPlace, setSelectedMarketPlace] = useState('ATVPDKIKX0DER');

  const marketPlaceOptions = [
    { key: 1, text: 'United States', flag: 'us', value: 'ATVPDKIKX0DER' },
    { key: 2, text: 'Japan', flag: 'jp', value: 'A1VC38T7YXB528' },
    { key: 3, text: 'United Kingdom', flag: 'uk', value: 'A1F83G8C2ARO7P' },
  ];

  const [open, setOpen] = useState(false);

  const openModal = (val: boolean) => setOpen(val);

  const handleMarketSelection = (data: any) => {
    setSelectedMarketPlace(data);
  };

  const handleWarning = (exist: boolean) => {
    let header = '';
    let subHeader = '';
    if (exist) {
      header = 'ASIN is already in Product Tracker';
      subHeader = 'You have already added that ASIN into the Product Tracker';
    } else {
      header = "ASIN can't be found on Amazon";
      subHeader = "The ASIN of the product can't be found in Amazon's database";
    }

    return warn(<Asin header={header} subheader={subHeader} />);
  };
  useEffect(() => {
    if (searchValue && !verifyingProduct) {
      if (verifyingProductTracked.value === true && !verifyingProductTracked.productExist) {
        handleWarning(false);
      } else if (verifyingProductTracked.value === true && verifyingProductTracked.productExist) {
        handleWarning(true);
      } else {
        setOpen(true);
        dismiss();
      }
    }
  }, [verifyingProduct]);

  const verifyProduct = () => {
    checkProduct(searchValue);
  };

  return (
    <Grid.Row className="AsinSearch__row">
      <Menu.Menu className="AsinSearch__menu">
        <Input placeholder="Insert ASIN " value={searchValue} {...bindSearch} />
        <Dropdown
          placeholder="Select Marketplace"
          options={marketPlaceOptions}
          openOnFocus
          selection
          value={selectedMarketPlace}
          onChange={(e, data) => {
            handleMarketSelection(data.value);
          }}
        />
      </Menu.Menu>
      <Button basic onClick={() => verifyProduct()}>
        Add Product
      </Button>
      <Confirm
        open={open}
        openModal={openModal}
        searchValue={searchValue}
        selectedMarketPlace={selectedMarketPlace}
        setSearch={setSearch}
      />
    </Grid.Row>
  );
};

const mapStateToProps = (state: {}) => ({
  verifyingProductTracked: get(state, 'productTracker.verifyingProductTracked'),
  verifyingProduct: get(state, 'productTracker.verifyingProduct'),
});

const mapDispatchToProps = {
  checkProduct: (asin: string) => checkMWSProduct(asin),
};

export default connect(mapStateToProps, mapDispatchToProps)(AsinSearch);
