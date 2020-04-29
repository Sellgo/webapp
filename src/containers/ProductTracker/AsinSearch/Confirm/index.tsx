import React, { useState, useEffect } from 'react';
import { Button, Modal, Header, Divider, Grid, Select } from 'semantic-ui-react';
import TrackIconWhite from '../../../../assets/images/fingerprint-2.svg';
import './index.scss';
import { connect } from 'react-redux';
import { isProductTracked, confirmTrackProduct } from '../../../../actions/ProductTracker';
import get from 'lodash/get';
import _ from 'lodash';

interface GroupOption {
  key: number;
  text: string;
  value: number;
}

interface Props {
  open: boolean;
  openModal: Function;
  verifyProduct: (value: boolean, productExist: boolean) => void;
  confirmTrackProduct: (value: string, marketplace: string, groupID: number) => void;
  searchValue: string;
  trackGroups: any;
  selectedMarket: any;
}
const Confirm = (props: Props) => {
  const {
    searchValue,
    open,
    openModal,
    verifyProduct,
    trackGroups,
    selectedMarket,
    confirmTrackProduct,
  } = props;
  const [openConfirm, setOpenConfirm] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedMarketPlace, setSelectedMarketPlace] = useState(selectedMarket);

  useEffect(() => {
    setSelectedMarketPlace(selectedMarket);
  }, [selectedMarket]);

  const trackProduct = () => {
    console.log('trackProduct: ', searchValue, selectedGroup, selectedMarketPlace);
    confirmTrackProduct(searchValue, selectedMarketPlace, selectedGroup);
  };

  const countryOptions = () => {
    const value: any = [];
    _.map(trackGroups, (group, key) => {
      const data: GroupOption = {
        key: 0,
        text: '',
        value: 0,
      };
      data.key = Number(key);
      data.text = group.name;
      data.value = group.id;
      value.push(data);
    });
    return value;
  };

  const handleMarketSelection = (data: any) => {
    setSelectedMarketPlace(data);
  };

  const handleGroupSelection = (data: any) => {
    setSelectedGroup(data);
  };

  const marketPlaceOptions = [
    { key: 1, text: 'United States', flag: 'us', value: 'US' },
    { key: 2, text: 'Philippines', flag: 'ph', value: 'PH' },
  ];

  if (addProduct) {
    return (
      <>
        <Modal open={open && addProduct} className="Confirm__grouping-asin">
          <Modal.Content className="Confirm__content">
            <div>
              <Header as="h4" icon>
                ASIN: <span>{searchValue.toUpperCase()}</span>
              </Header>
            </div>
            <Grid.Row columns={2}>
              <Grid.Column>Select Group: </Grid.Column>
              <Grid.Column>
                <Select
                  placeholder="Select Group"
                  value={selectedGroup}
                  options={countryOptions()}
                  onChange={(e, data) => {
                    handleGroupSelection(data.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            {addProduct ? (
              <Grid.Row columns={2}>
                <Grid.Column>Marketplace: </Grid.Column>
                <Grid.Column>
                  <Select
                    placeholder="Marketplace"
                    value={selectedMarketPlace}
                    options={marketPlaceOptions}
                    onChange={(e, data) => {
                      handleMarketSelection(data.value);
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
            ) : null}
            <Grid.Row columns={2}>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <div className="Confirm__btn">
                  <Button
                    content="Cancel"
                    onClick={() => {
                      openModal(false);
                      setOpenConfirm(!openConfirm);
                      setAddProduct(!addProduct);
                      verifyProduct(false, false);
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
  }

  return (
    <>
      <Modal open={open && openConfirm} className="Confirm__add-product">
        <Modal.Content>
          <div>
            <Header as="h4" icon>
              <span>{searchValue.toUpperCase()}</span> isn't being tracked right now.
              <Header.Subheader>Would you like to add it to product tracker?</Header.Subheader>
            </Header>
          </div>
        </Modal.Content>
        <Divider clearing />
        <div className="Confirm__btn">
          <Button content="Cancel" onClick={() => openModal(false)} />
          <Button
            icon
            onClick={() => {
              setOpenConfirm(!openConfirm);
              setAddProduct(!addProduct);
            }}
            labelPosition="left"
          >
            <img src={TrackIconWhite} />
            Track Now
          </Button>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: {}) => ({
  trackGroups: get(state, 'productTracker.trackerGroup'),
});

const mapDispatchToProps = {
  verifyProduct: (value: boolean, productExist: boolean) => isProductTracked(value, productExist),
  confirmTrackProduct: (value: string, marketplace: string, groupID: number) =>
    confirmTrackProduct(value, marketplace, groupID),
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
