import React, { useState } from 'react';
import { Button, Modal, Header, Grid, Select } from 'semantic-ui-react';
import TrackIconWhite from '../../../../assets/images/fingerprint-2.svg';
import './index.scss';
import { connect } from 'react-redux';
import {
  isProductTracked,
  confirmTrackProduct,
  setMenuItem,
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
  verifyProduct: (value: boolean, productExist: boolean) => void;
  confirmTrackProduct: (
    value: string,
    marketplace: string,
    period: number,
    groupID?: number
  ) => void;
  searchValue: string;
  trackGroups: any;
  selectedMarketPlace: any;
  filterData: any;
  setMenuItem: (item: any) => void;
  setSearch: any;
}
const Confirm = (props: Props) => {
  const {
    searchValue,
    open,
    openModal,
    verifyProduct,
    trackGroups,
    confirmTrackProduct,
    selectedMarketPlace,
    filterData,
    setSearch,
  } = props;
  const [openConfirm, setOpenConfirm] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const [asinValues, setAsinValues] = useState([]);

  const trackProduct = () => {
    const period = _.isEmpty(filterData) ? DEFAULT_PERIOD : filterData.period;
    confirmTrackProduct(searchValue, selectedMarketPlace.value, period, selectedGroup);
    openModal(false);
    setOpenConfirm(!openConfirm);
    setSearch('');
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
  // const asinChange = (chips: any) => {
  //   console.log("chips: ", chips)
  //   setAsinValues(chips)
  // }

  const addChip = (data: string) => {
    console.log('data: ', data);
    const value = data.replace(/[^A-Z0-9]+/gi, '_').split('_') as any;
    console.log('value: ', value);
    const chips = asinValues.concat(value);

    //remove duplicates
    const uniqueChips = Array.from(new Set(chips));

    console.log('add asinValues: ', uniqueChips);
    setAsinValues(uniqueChips);
    // this.setState({ chips });
  };
  const removeChip = (index: any) => {
    const chips = asinValues.slice();
    chips.splice(index, 1);
    setAsinValues(chips);
    console.log('rem asinValues: ', chips);
  };
  return (
    <>
      <Modal open={open} className="Confirm__grouping-asin">
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
              <ReactChipInput
                classes="multiple-asin-container__wrapper"
                chips={asinValues}
                onSubmit={addChip}
                onRemove={removeChip}
              />
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
};

const mapStateToProps = (state: {}) => ({
  trackGroups: get(state, 'productTracker.trackerGroup'),
  filterData: get(state, 'productTracker.filterData'),
});

const mapDispatchToProps = {
  verifyProduct: (value: boolean, productExist: boolean) => isProductTracked(value, productExist),
  confirmTrackProduct: (value: string, marketplace: string, period: number, groupID?: number) =>
    confirmTrackProduct(value, marketplace, period, groupID),
  setMenuItem: (item: any) => setMenuItem(item),
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
