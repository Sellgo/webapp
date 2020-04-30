import React, { useState } from 'react';
import { Button, Modal, Header, Divider, Grid, Select } from 'semantic-ui-react';
import { warn } from '../../../../utils/notifications';
import { Asin } from '../../../../components/ToastMessages';
import TrackIconWhite from '../../../../assets/images/fingerprint-2.svg';
import './index.scss';

interface Props {
  open: boolean;
  openModal: Function;
}

const Confirm = (props: Props) => {
  const [openConfirm, setOpenConfirm] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [group, setGroup] = useState(false);

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
  ];

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

  if (addProduct) {
    return (
      <>
        <Modal open={props.open && addProduct} className="Confirm__grouping-asin">
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
                      props.openModal(false);
                      setOpenConfirm(!openConfirm);
                      setAddProduct(!addProduct);
                    }}
                  />
                  <Button
                    icon
                    labelPosition="left"
                    onClick={() => {
                      handleWarning(true);
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
                  <Button icon onClick={() => handleWarning(true)} labelPosition="left">
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
      <Modal open={props.open && openConfirm} className="Confirm__add-product">
        <Modal.Content>
          <div>
            <Header as="h4" icon>
              <span>B01G0X56YU</span> isn't being tracked right now.
              <Header.Subheader>Would you like to add it to product tracker?</Header.Subheader>
            </Header>
          </div>
        </Modal.Content>
        <Divider clearing />
        <div className="Confirm__btn">
          <Button content="Cancel" onClick={() => props.openModal(false)} />
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

export default Confirm;
