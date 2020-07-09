import React, { useState, useEffect } from 'react';
import { Menu, Input, Button, Grid, Dropdown } from 'semantic-ui-react';
import Confirm from './Confirm';
import { useInput } from '../../../hooks';
import './index.scss';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { checkTrackProduct } from '../../../actions/ProductTracker';
import { AsinSearchWarning } from '../../../components/ToastMessages';
import { warn, dismiss } from '../../../utils/notifications';

interface Props {
  checkProduct: (asin: string) => void;
  verifyingProductTracked: { value: boolean; productExist: boolean };
  verifyingProduct: boolean;
}

const AsinSearch = (props: Props) => {
  const { checkProduct, verifyingProductTracked, verifyingProduct } = props;

  const { value: searchValue, bind: bindSearch, setValue: setSearch } = useInput('');
  const [searchDetails, setSearchDetails] = useState('');

  const [selectedMarketPlace, setSelectedMarketPlace] = useState({
    key: 1,
    text: `United States `,
    flag: 'us',
    value: 'ATVPDKIKX0DER',
  });

  const marketPlaceOptions = [
    { key: 1, text: `United States `, flag: 'us', value: 'ATVPDKIKX0DER' },
  ];

  const [open, setOpen] = useState(false);

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

    return warn(<AsinSearchWarning header={header} subheader={subHeader} />);
  };
  useEffect(() => {
    if (searchValue && !verifyingProduct) {
      if (verifyingProductTracked.value && !verifyingProductTracked.productExist) {
        handleWarning(false);
      } else if (verifyingProductTracked.value && verifyingProductTracked.productExist) {
        handleWarning(true);
      } else if (!verifyingProductTracked.value && verifyingProductTracked.productExist) {
        setOpen(true);
        dismiss();
      }
    } else {
      setOpen(false);
    }
  }, [verifyingProduct]);

  const verifyProduct = () => {
    const search = searchValue.trim();
    const regex = RegExp('/(?:dp|o|gp|-)/(B[0-9]{2}[0-9A-Z]{7}|[0-9]{9}(?:X|[0-9]))');
    const m = search.match(regex);
    if (m) {
      setSearchDetails(m[1]);
      checkProduct(m[1]);
    } else {
      setSearchDetails(search);
      checkProduct(search);
    }
  };

  const trigger = (
    <span className="AsinSearch__menu__label">
      {selectedMarketPlace.text} <i className={selectedMarketPlace.flag + ' flag'} />
    </span>
  );

  return (
    <Grid.Row className="AsinSearch__row" disabled={true}>
      <Menu.Menu className="AsinSearch__menu">
        <Input placeholder="Insert ASIN or Amazon URL" value={searchValue} {...bindSearch} />
        <Dropdown className="selection" openOnFocus trigger={trigger}>
          <Dropdown.Menu>
            {marketPlaceOptions.map((option, key) => {
              return (
                <Dropdown.Item
                  key={key}
                  text={option.text}
                  flag={option.flag}
                  value={option.value}
                  className={'flag-right'}
                  onClick={() => {
                    handleMarketSelection(option);
                  }}
                />
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
      <Button basic onClick={() => verifyProduct()}>
        Add Product
      </Button>
      <Confirm
        open={open}
        openModal={setOpen}
        searchValue={searchDetails}
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
  checkProduct: (asin: string) => checkTrackProduct(asin),
};

export default connect(mapStateToProps, mapDispatchToProps)(AsinSearch);
