import React, { useState, useEffect, useRef } from 'react';
import { Menu, Button, Grid, Dropdown } from 'semantic-ui-react';
import Confirm from './Confirm';
import './index.scss';
import { connect } from 'react-redux';
import { dismiss } from '../../../utils/notifications';
import ReactChipInput from 'react-chip-input';
import _ from 'lodash';
import ScrollContainer from 'react-indiana-drag-scroll';

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

    if (open) {
      setAsinValues([]);
    }
  }, [open]);

  const verifyProduct = () => {
    setOpen(true);
    dismiss();
  };

  const convertAsinLinks = (data: string) => {
    const regex = RegExp('/(?:dp|o|gp|-)/(B[0-9]{2}[0-9A-Z]{7}|[0-9]{9}(?:X|[0-9]))');
    const asinData = data.split(' ');
    _.each(asinData, (item, index) => {
      const res = item.match(regex);
      if (res) {
        asinData[index] = res[1];
      }
    });
    return asinData.join();
  };

  const trigger = (
    <span className="AsinSearch__menu__label">
      {selectedMarketPlace.text} <i className={selectedMarketPlace.flag + ' flag'} />
    </span>
  );

  const addChip = (data: string) => {
    console.log('data: ', data);
    const converedData = convertAsinLinks(data);
    const removedSpecialsCharacters = converedData.replace(/[^A-Z0-9]+/gi, ' ').split(' ') as any;
    console.log('varemovedSpecialsCharacterslue: ', removedSpecialsCharacters);
    const chips = asinValues.concat(removedSpecialsCharacters);
    //remove duplicates
    const uniqueChips = Array.from(new Set(chips)).filter(item => item);
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
        <div className="multiple-asin-container" ref={asinRefContainer} onClick={() => focusAsin()}>
          <ScrollContainer className="scroll-container" vertical={false}>
            <ReactChipInput
              classes="multiple-asin-container__wrapper"
              chips={asinValues}
              onSubmit={addChip}
              onRemove={removeChip}
            />
          </ScrollContainer>
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
        convertAsinLinks={convertAsinLinks}
      />
    </Grid.Row>
  );
};

export default connect()(AsinSearch);
