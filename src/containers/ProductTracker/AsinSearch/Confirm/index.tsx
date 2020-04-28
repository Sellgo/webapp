import React, { useState } from 'react';
import { Button, Modal, Header, Divider, Grid, Select } from 'semantic-ui-react';
import TrackIconWhite from '../../../../assets/images/fingerprint-2.svg';
import './index.scss';
import { connect } from 'react-redux';
import { isProductTracked } from '../../../../actions/ProductTracker';

interface Props {
  open: boolean;
  openModal: Function;
  verifyProduct: (value: boolean, productExist: boolean) => void;
  searchValue: string;
}
const Confirm = (props: Props) => {
  const { searchValue, open, openModal, verifyProduct } = props;
  const [openConfirm, setOpenConfirm] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [group, setGroup] = useState(false);

  const trackProduct = () => {
    console.log('searchValue: ', searchValue);
  };

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
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
                <Select placeholder="Select Group" options={countryOptions} />
              </Grid.Column>
            </Grid.Row>
            {addProduct ? (
              <Grid.Row columns={2}>
                <Grid.Column>Marketplace: </Grid.Column>
                <Grid.Column>
                  <Select placeholder="Marketplace" options={countryOptions} />
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
                      setGroup(!group);
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

  if (group) {
    return (
      <>
        <Modal open={false} className="Confirm__group">
          <Modal.Content className="Confirm__content">
            <div>
              <Header as="h4" icon>
                ASIN: <span>B01G0X56YU</span>
              </Header>
            </div>
            <Grid.Row columns={2}>
              <Grid.Column>Select Group: </Grid.Column>
              <Grid.Column>
                <Select placeholder="Select Group" options={countryOptions} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <div className="Confirm__btn">
                  <Button content="Cancel" />
                  <Button icon onClick={() => trackProduct()} labelPosition="left">
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

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  verifyProduct: (value: boolean, productExist: boolean) => isProductTracked(value, productExist),
};
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
