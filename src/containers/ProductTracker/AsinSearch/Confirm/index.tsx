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
    checkedProductsData,
  } = props;
  const [openConfirm, setOpenConfirm] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const [asinValues, setAsinValues] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const asinRefContainer = useRef(null);

  useEffect(() => {
    if (asinRefContainer.current) {
      const parentRef = (asinRefContainer as any).current.children[0];
      // parentRef.children[0].children[0].classList.add('error');
      console.log('refContainer: ', parentRef.getElementsByClassName('form-control')[0]);
      parentRef
        .getElementsByClassName('form-control')[0]
        .setAttribute('placeholder', 'Insert ASIN or Amazon URL (12 Max)');
    }
    console.log('b4 open: ', open, asinData);
    if (open && !_.isEmpty(asinData)) {
      setAsinValues(asinData);
      console.log('asinValues: ', asinValues, asinData);
      checkProduct(asinData.join());
    }
  }, [open, asinData]);

  useEffect(() => {
    console.log('checkedProductsData: ', checkedProductsData);
    setCheckedProducts(checkedProductsData);
  }, [checkedProductsData]);
  const trackProduct = () => {
    const period = _.isEmpty(filterData) ? DEFAULT_PERIOD : filterData.period;
    confirmTrackProduct(asinValues.join(), selectedMarketPlace.value, period, selectedGroup);
    openModal(false);
    setOpenConfirm(!openConfirm);
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
    console.log('data: ', data);
    const value = data.replace(/[^A-Z0-9]+/gi, '_').split('_') as any;
    console.log('value: ', value);
    const chips = asinValues.concat(value);
    //remove duplicates
    const uniqueChips = Array.from(new Set(chips));
    console.log('add asinValues: ', uniqueChips);
    setAsinValues(uniqueChips);
    checkProduct(uniqueChips.join());
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
    <>
      <Modal open={open} className="Confirm__grouping-asin">
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
            <Grid.Column className="multiple-asin-container__title">
              Insert Asin or Amazon URL (Up to 12):{' '}
            </Grid.Column>
            <Grid.Column>
              {' '}
              <div className="multiple-asin-container" ref={asinRefContainer}>
                <ReactChipInput
                  classes="multiple-asin-container__wrapper"
                  chips={asinValues}
                  onSubmit={addChip}
                  onRemove={removeChip}
                />
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1} className="multiple-asin-container">
            <Grid.Column className="multiple-asin-container__title">Added Asin:</Grid.Column>
            <Grid.Column>
              <div className="added-asin-container">
                {_.map(checkedProducts, (product: any, index) => {
                  return (
                    <div key={index} className="added-asin-container__item" title={product.title}>
                      {product.image_url ? (
                        <div
                          className="added-asin-container__item__image"
                          style={{ backgroundImage: `url(${product.image_url})` }}
                        />
                      ) : (
                        <div className="added-asin-container__item__no-image">No Image</div>
                      )}
                      <div className="added-asin-container__item__descriptions">
                        <h2
                          className={`added-asin-container__item__descriptions__title ${
                            product.title ? '' : 'error'
                          }`}
                        >
                          {product.title ? product.title : 'Invalid ASIN or URL'}
                        </h2>
                        <span
                          className={`added-asin-container__item__descriptions__asin ${
                            product.title ? '' : 'error'
                          }`}
                        >
                          {product.asin}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column />
            <Grid.Column>
              <div className="Confirm__btn">
                <Button
                  content="Cancel"
                  onClick={() => {
                    openModal(false);
                    setOpenConfirm(!openConfirm);
                  }}
                />
                <Button
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
  checkedProductsData: get(state, 'productTracker.checkedProductsData'),
});

const mapDispatchToProps = {
  confirmTrackProduct: (value: string, marketplace: string, period: number, groupID?: number) =>
    confirmTrackProduct(value, marketplace, period, groupID),
  setMenuItem: (item: any) => setMenuItem(item),
  checkProduct: (asin: string) => checkTrackProduct(asin),
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
