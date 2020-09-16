import React, { useState, useEffect, useRef } from 'react';
import { Menu, Button, Grid, Dropdown } from 'semantic-ui-react';
import Confirm from './Confirm';
import './index.scss';
import { connect } from 'react-redux';
import { dismiss } from '../../../utils/notifications';
import ReactChipInput from 'react-chip-input';

const AsinSearch = () => {
  const [asinValues, setAsinValues] = useState([]);

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

  const asinRefContainer = useRef(null);
  useEffect(() => {
    const parentRef = (asinRefContainer as any).current.children[0];
    if (parentRef) {
      console.log('input', parentRef.getElementsByClassName('form-control')[0]);
      parentRef
        .getElementsByClassName('form-control')[0]
        .setAttribute('placeholder', 'Insert ASIN or Amazon URL (12 Max)');
    }
  }, []);

  const verifyProduct = () => {
    setOpen(true);
    dismiss();
  };

  const trigger = (
    <span className="AsinSearch__menu__label">
      {selectedMarketPlace.text} <i className={selectedMarketPlace.flag + ' flag'} />
    </span>
  );

  const addChip = (data: string) => {
    console.log('data: ', data);
    const value = data.replace(/[^A-Z0-9]+/gi, '_').split('_') as any;
    console.log('value: ', value);
    const chips = asinValues.concat(value);
    //remove duplicates
    const uniqueChips = Array.from(new Set(chips));
    console.log('add asinValues: ', uniqueChips);
    setAsinValues(uniqueChips);
    focusAsin();
  };

  const removeChip = (index: any) => {
    const chips = asinValues.slice();
    chips.splice(index, 1);
    setAsinValues(chips);
    console.log('rem asinValues: ', chips);
  };

  const focusAsin = () => {
    const parentRef = (asinRefContainer as any).current.children[0];
    parentRef.getElementsByClassName('form-control')[0].focus();
  };

  return (
    <Grid.Row className="AsinSearch__row" disabled={true}>
      <Menu.Menu className="AsinSearch__menu">
        {/* <Input placeholder="Insert ASIN or Amazon URL" value={searchValue} {...bindSearch} /> */}

        <div className="multiple-asin-container" ref={asinRefContainer} onClick={() => focusAsin()}>
          <ReactChipInput
            classes="multiple-asin-container__wrapper"
            chips={asinValues}
            onSubmit={addChip}
            onRemove={removeChip}
          />
        </div>
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
        asinData={asinValues}
        selectedMarketPlace={selectedMarketPlace}
      />
    </Grid.Row>
  );
};

export default connect()(AsinSearch);
