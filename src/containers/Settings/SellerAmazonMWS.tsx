import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Grid, Select, Segment, Icon, Confirm } from 'semantic-ui-react';
import { defaultMarketplaces } from '../../constants/Settings';
import { error } from '../../utils/notifications';

const marketplaceOptions = defaultMarketplaces.map(({ name, id, disabled }, key) => {
  return { key, text: name, value: id, disabled };
});

const showMeHow = (showMeHowUrl: any) => {
  if (showMeHowUrl) {
    window.open(showMeHowUrl, '_blank');
  } else {
    error('Please choose a Marketplace!');
  }
};
const defaultMarketplace = {
  id: 'ATVPDKIKX0DER',
  name: 'US',
  link: 'amazon.com',
  code: 'US',
};
const defaultAmazonMWS = {
  id: '',
  amazon_seller_id: '',
  token: '',
  marketplace_id: '',
  marketplaceName: '',
  saved: false,
};
const defaultShowCredentials = {
  amazonSellerID: false,
  authToken: false,
};

const SellerAmazonMWS = (props: any) => {
  const { amazonMWSAuth, updateAmazonMWSAuth, deleteMWSAuth } = props;
  const [marketplaceLocal, setmarketplaceLocal] = useState(defaultMarketplace);
  const [amazonMWSLocal, setamazonMWSLocal] = useState(defaultAmazonMWS);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showCredentials, setShowCredentials] = useState(defaultShowCredentials);

  const handleMarketPlaceLocalChange = (marketplaceID: any) => {
    const updatedMarketplaceLocal =
      defaultMarketplaces.filter(e => e.id === marketplaceID)[0] || defaultMarketplace;
    const dbAmazonMWS =
      amazonMWSAuth.filter((e: any) => e.marketplace_id === updatedMarketplaceLocal.id)[0] ||
      defaultAmazonMWS;
    const updatedAmazonMWSLocal = dbAmazonMWS.id
      ? {
          ...dbAmazonMWS,
          ...{ marketplaceName: updatedMarketplaceLocal.name, saved: true },
        }
      : {
          ...defaultAmazonMWS,
          ...{
            marketplaceName: updatedMarketplaceLocal.name,
            marketplace_id: updatedMarketplaceLocal.id,
          },
        };
    setmarketplaceLocal(updatedMarketplaceLocal);
    setamazonMWSLocal(updatedAmazonMWSLocal);
  };

  useEffect(() => {
    handleMarketPlaceLocalChange(marketplaceLocal.id);
  }, [amazonMWSAuth]);

  // TODO: Resolve eslint dependency warnings from above effect
  // Below would resolve it but the result is that handleMarketPlaceLocalChange
  // is run on every render. I think there is a bigger refactor that needs
  // to happen first.
  /*
  useEffect(() => {
    handleMarketPlaceLocalChange(marketplaceLocal.id);
  }, [handleMarketPlaceLocalChange, marketplaceLocal.id]);
  */

  const handleAmazonMWSLocalChange = (data: any) => {
    setamazonMWSLocal({ ...amazonMWSLocal, ...data });
  };

  const handleShowCredentialsLocalChange = (data: any) => {
    setShowCredentials({
      ...showCredentials,
      ...data,
    });
  };

  const handleAmazonMWSAuthUpdate = () => {
    if (
      amazonMWSLocal.amazon_seller_id &&
      amazonMWSLocal.token &&
      amazonMWSLocal.marketplace_id &&
      !amazonMWSLocal.saved &&
      !amazonMWSLocal.id
    ) {
      updateAmazonMWSAuth(amazonMWSLocal);
    } else {
      error('Please provide valid Amazon Seller Central credentials!');
    }
  };

  const showMeHowUrl = marketplaceLocal.id
    ? `https://sellercentral.${
        marketplaceLocal.link
      }/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=Denverton-${
        marketplaceLocal.code
      }&devMWSAccountId=${'4294-2444-1812'}`
    : '';

  return (
    <Segment basic={true} id="amazon-mws">
      <Container style={{ width: '80%' }}>
        <span className="autho-sub-hear">
          Please grant Amazon MWS and Amazon Seller Central access for each market.
        </span>
        <Form className="autho-form">
          <Grid>
            <Grid.Row columns={3} className="stackable container">
              <Grid.Column width={7}>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Form.Select
                      control={Select}
                      label="Marketplace"
                      options={marketplaceOptions}
                      defaultValue={'ATVPDKIKX0DER'}
                      placeholder="select"
                      name="marketplace_id"
                      onChange={(e: any, field: any) => handleMarketPlaceLocalChange(field.value)}
                    />
                  </Grid.Column>
                  <Grid.Column width={5} verticalAlign="bottom" floated={'right'}>
                    <div
                      onClick={() => {
                        showMeHow(showMeHowUrl);
                      }}
                      style={{
                        cursor: 'pointer',
                        float: 'right',
                      }}
                    >
                      <p style={{ color: '#267DD4' }}> {'Show me how?'}</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={6} />
                  <Grid.Column width={10}>
                    <Form.Input
                      label="Amazon Seller ID"
                      placeholder="A1B23CD4EFG567"
                      value={amazonMWSLocal.amazon_seller_id}
                      type={
                        amazonMWSLocal.saved === showCredentials.amazonSellerID
                          ? 'text'
                          : 'password'
                      }
                      name="amazon_seller_id"
                      onChange={(e, { value }) =>
                        handleAmazonMWSLocalChange({ amazon_seller_id: value })
                      }
                      readOnly={amazonMWSLocal.saved}
                      icon={
                        <Icon
                          link
                          name={
                            amazonMWSLocal.saved === showCredentials.amazonSellerID
                              ? 'eye'
                              : 'eye slash'
                          }
                          onClick={() =>
                            handleShowCredentialsLocalChange({
                              amazonSellerID: !showCredentials.amazonSellerID,
                            })
                          }
                        />
                      }
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Form.Input
                      label="MWS Auth Token"
                      placeholder="amzn.mws.1a2b3c4d-5e6f........"
                      value={amazonMWSLocal.token}
                      type={
                        amazonMWSLocal.saved === showCredentials.authToken ? 'text' : 'password'
                      }
                      name="token"
                      onChange={(e, { value }) => handleAmazonMWSLocalChange({ token: value })}
                      readOnly={amazonMWSLocal.saved}
                      icon={
                        <Icon
                          link
                          name={
                            amazonMWSLocal.saved === showCredentials.authToken ? 'eye' : 'eye slash'
                          }
                          onClick={() =>
                            handleShowCredentialsLocalChange({
                              authToken: !showCredentials.authToken,
                            })
                          }
                        />
                      }
                    />
                    <div className="btns-wrap">
                      <Button
                        disabled={amazonMWSLocal.saved}
                        primary={true}
                        content="Add MWS Token"
                        style={{ borderRadius: '50px' }}
                        onClick={handleAmazonMWSAuthUpdate}
                      />
                      <Button
                        disabled={!amazonMWSLocal.saved}
                        color="red"
                        content="Delete"
                        style={{ borderRadius: '50px' }}
                        onClick={() => setDeleteConfirmation(true)}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
      <Confirm
        content="Do you want to delete Amazon Seller Central credentials?"
        open={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={() => {
          if (amazonMWSLocal.id && amazonMWSLocal.saved) deleteMWSAuth(amazonMWSLocal.id);
          setDeleteConfirmation(false);
        }}
      />
    </Segment>
  );
};

export default SellerAmazonMWS;
