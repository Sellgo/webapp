import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Grid, Select } from 'semantic-ui-react';
import TrackIconWhite from '../../../../assets/images/fingerprint-2.svg';
import './index.scss';
import { connect } from 'react-redux';
import {
  confirmTrackProduct,
  setMenuItem,
  checkTrackProduct,
} from '../../../../actions/ProductTracker';
import get from 'lodash/get';
import _ from 'lodash';
import { DEFAULT_PERIOD } from '../../../../constants/Tracker';
import ReactChipInput from 'react-chip-input';

interface GroupOption {
  key: number;
  text: string;
  value: number;
}

interface Props {
  open: boolean;
  openModal: Function;
  confirmTrackProduct: (
    value: string,
    marketplace: string,
    period: number,
    groupID?: number
  ) => void;
  asinData: any;
  trackGroups: any;
  selectedMarketPlace: any;
  filterData: any;
  setMenuItem: (item: any) => void;
  checkProduct: (asin: string) => void;
  checkedProductsData: any;
  verifyingProduct: boolean;
  convertAsinLinks: (data: string) => string;
}
const Confirm = (props: Props) => {
  const {
    asinData,
    open,
    openModal,
    trackGroups,
    confirmTrackProduct,
    selectedMarketPlace,
    filterData,
    checkProduct,
    verifyingProduct,
    checkedProductsData,
    convertAsinLinks,
  } = props;
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [asinValues, setAsinValues] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [asinHasTracked, setAsinHasTracked] = useState(false);
  const [asinError, setAsinError] = useState('');
  const asinRefContainer = useRef(null);

  useEffect(() => {
    if (asinRefContainer.current) {
      const parentRef = (asinRefContainer as any).current.children[0];
      parentRef
        .getElementsByClassName('form-control')[0]
        .setAttribute('placeholder', 'Insert ASIN or Amazon URL (12 Max)');
    }
    if (open && !_.isEmpty(asinData)) {
      setAsinValues(asinData);
      checkProduct(asinData.join());
    }
  }, [open, asinData]);

  const checkTracked = (product: any) => {
    return product.is_tracked;
  };

  useEffect(() => {
    const sortedProducts = _.cloneDeep(checkedProductsData).sort(
      (a: any, b: any) => a.position - b.position
    );
    setCheckedProducts(sortedProducts);

    if (asinRefContainer.current) {
      const parentRef = (asinRefContainer as any).current.children[0];

      parentRef
        .getElementsByClassName('form-control')[0]
        .setAttribute('placeholder', 'Insert ASIN or Amazon URL (12 Max)');
      if (!_.isEmpty(sortedProducts)) {
        setAsinHasTracked(checkTracked(sortedProducts));
        _.each(sortedProducts, (product, index) => {
          if (
            product.is_tracked ||
            product.message === 'This does not look like a valid ASIN' ||
            product.message === 'This ASIN was not found on Amazon'
          ) {
            parentRef.getElementsByClassName('col-auto')[index].classList.add('error');
            setAsinError('Invalid ASIN is marked with red color');
            if (sortedProducts.length > 12) {
              setAsinError('Invalid ASIN is marked with red color and reached max amount of items');
            }
          } else if (sortedProducts.length > 12) {
            setAsinError('Reached max amount of ASIN or URL');
          } else {
            parentRef.getElementsByClassName('col-auto')[index].classList.remove('error');
          }
        });
        focusAsin();
      }
    }
  }, [checkedProductsData]);

  const getValidProducts = () => {
    const sortedProducts = _.cloneDeep(checkedProductsData).sort(
      (a: any, b: any) => a.position - b.position
    );
    const validProducts: any = [];
    _.each(sortedProducts, product => {
      if (product.is_tracked === false) {
        validProducts.push(product.asin);
      }
    });
    return validProducts.join();
  };

  const trackProduct = () => {
    const validProducts = getValidProducts();
    const period = _.isEmpty(filterData) ? DEFAULT_PERIOD : filterData.period;
    confirmTrackProduct(validProducts, selectedMarketPlace.value, period, selectedGroup);
    openModal(false);
    emptyData();
  };

  const emptyData = () => {
    setAsinError('');
    setCheckedProducts([]);
    setAsinValues([]);
    setAsinHasTracked(false);
    setSelectedGroup(0);
  };

  const groupOptions = () => {
    const value: any = [];
    _.map(trackGroups, (group, key) => {
      const data: GroupOption = {
        key: 0,
        text: '',
        value: 0,
      };
      data.key = Number(key) + 1;
      data.text = group.name;
      data.value = group.id;
      value.push(data);
    });

    const ungroup: GroupOption = {
      key: 0,
      text: 'Ungrouped',
      value: 0,
    };
    value.unshift(ungroup);
    return value;
  };

  const handleGroupSelection = (data: any) => {
    setSelectedGroup(data);
  };

  const addChip = (data: string) => {
    const converedData = convertAsinLinks(data);
    const removedSpecialsCharacters = converedData.replace(/[^A-Z0-9]+/gi, ' ').split(' ') as any;
    const chips = asinValues.concat(removedSpecialsCharacters);
    //remove duplicates
    const uniqueChips = Array.from(new Set(chips)).filter(item => item);
    setAsinValues(uniqueChips);
    checkProduct(uniqueChips.join());
    focusAsin();
  };

  const removeChip = (index: any) => {
    const chips = asinValues.slice();
    chips.splice(index, 1);
    setAsinError('');
    setAsinHasTracked(false);
    setAsinValues(chips);
    if (!_.isEmpty(chips)) {
      checkProduct(chips.join());
    } else {
      setCheckedProducts([]);
    }
  };

  const focusAsin = () => {
    const parentRef = (asinRefContainer as any).current.children[0];
    parentRef.getElementsByClassName('form-control')[0].focus();
  };

  const triggerBySpaceOrComma = (e: any) => {
    const parentRef = (asinRefContainer as any).current.children[0];
    const inputValue = parentRef.getElementsByClassName('form-control')[0].value;
    if (e.keyCode === 188 || e.keyCode === 32) {
      // comma or space
      addChip(inputValue);
    }
  };

  const triggerByPaste = (e: any) => {
    const pastedValue = e.clipboardData;
    addChip(pastedValue.getData('Text'));
    e.clipboardData.setData('text/plain', '');
    e.preventDefault();
  };
  return (
    <>
      <Modal open={open} className="Confirm__grouping-asin">
        <Modal.Header className="header-container">Insert ASIN</Modal.Header>
        <Modal.Content className="Confirm__content">
          <Grid.Row columns={2}>
            <Grid.Column>Select Group: </Grid.Column>
            <Grid.Column>
              <Select
                placeholder="Select Group"
                value={selectedGroup}
                options={groupOptions()}
                onChange={(e, data) => {
                  handleGroupSelection(data.value);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} className="multiple-asin-container">
            <Grid.Column
              className={`multiple-asin-container__title ${(asinError !== '' || asinHasTracked) &&
                'error'}`}
            >
              Insert ASIN or Amazon URL (Up to 12):
            </Grid.Column>
            <Grid.Column>
              {' '}
              <div
                className={`multiple-asin-container ${verifyingProduct && 'disabled'}`}
                ref={asinRefContainer}
                key={asinValues.join()}
                onKeyUp={triggerBySpaceOrComma}
                onPaste={triggerByPaste}
              >
                <ReactChipInput
                  classes={`multiple-asin-container__wrapper ${(asinError !== '' ||
                    asinHasTracked) &&
                    'error-wrapper'}`}
                  chips={asinValues}
                  onSubmit={addChip}
                  onRemove={removeChip}
                />
              </div>
            </Grid.Column>
            <Grid.Column className="multiple-asin-container__error-container">
              <div className="multiple-asin-container__error-container__message">{asinError}</div>
            </Grid.Column>
          </Grid.Row>
          {!_.isEmpty(checkedProducts) && (
            <Grid.Row columns={1} className="multiple-asin-container">
              <Grid.Column className="multiple-asin-container__title">Added ASIN:</Grid.Column>
              <Grid.Column className="added-asin-container">
                <div className="added-asin-container__wrapper">
                  {_.map(checkedProducts, (product: any, index) => {
                    return (
                      <div
                        key={index}
                        className="added-asin-container__wrapper__item"
                        title={product.title}
                      >
                        {product.image_url ? (
                          <div
                            className="added-asin-container__wrapper__item__image"
                            style={{ backgroundImage: `url(${product.image_url})` }}
                          />
                        ) : (
                          <div className="added-asin-container__wrapper__item__no-image">
                            No Image
                          </div>
                        )}
                        <div className="added-asin-container__wrapper__item__descriptions">
                          <h2
                            className={`added-asin-container__wrapper__item__descriptions__title ${
                              !product.title ? 'error' : product.is_tracked ? 'is-tracked' : ''
                            }`}
                          >
                            {product.title ? product.title : 'Invalid ASIN or URL'}
                          </h2>
                          <span
                            className={`added-asin-container__wrapper__item__descriptions__asin ${
                              !product.title ? 'error' : product.is_tracked ? 'is-tracked' : ''
                            }`}
                          >
                            {product.asin}
                          </span>
                          {product.is_tracked && (
                            <span className="added-asin-container__wrapper__item__descriptions__already-tracked  ">
                              (Already Tracked)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <div className="Confirm__btn">
                <Button
                  content="Cancel"
                  onClick={() => {
                    emptyData();
                    openModal(false);
                  }}
                />
                <Button
                  disabled={_.isEmpty(getValidProducts())}
                  icon
                  labelPosition="left"
                  onClick={() => {
                    trackProduct();
                  }}
                >
                  <img src={TrackIconWhite} />
                  Track Now
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Modal.Content>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  trackGroups: get(state, 'productTracker.trackerGroup'),
  filterData: get(state, 'productTracker.filterData'),
  verifyingProduct: get(state, 'productTracker.verifyingProduct'),
  checkedProductsData: get(state, 'productTracker.checkedProductsData'),
});

const mapDispatchToProps = {
  confirmTrackProduct: (value: string, marketplace: string, period: number, groupID?: number) =>
    confirmTrackProduct(value, marketplace, period, groupID),
  setMenuItem: (item: any) => setMenuItem(item),
  checkProduct: (asin: string) => checkTrackProduct(asin),
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
