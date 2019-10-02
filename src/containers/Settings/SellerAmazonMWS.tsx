import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Grid, Select, Segment, Icon } from 'semantic-ui-react';
import { defaultMarketplaces } from '../../constants/Settings';
import { error } from '../../utils/notifications';

const marketplaceOptions = defaultMarketplaces.map((opt, key) => {
  return { key, text: opt.name, value: opt.id };
});

const showMeHow = (showMeHowUrl: any) => {
  if (showMeHowUrl) {
    window.open(showMeHowUrl, '_blank');
  } else {
    error('Please choose a Marketplace');
  }
};
const defaultMarketplace = {
  id: '',
  name: '',
  link: '',
  code: '',
};
const defaultAmazonMWS = {
  id: '',
  amazon_seller_id: '',
  token: '',
  marketplace_id: '',
  marketplaceName: '',
  saved: false,
};

const SellerAmazonMWS = (props: any) => {
  const { amazonMWSAuth, updateAmazonMWSAuth, deleteMWSAuth } = props;
  const [marketplaceLocal, setmarketplaceLocal] = useState(defaultMarketplace);
  const [amazonMWSLocal, setamazonMWSLocal] = useState(defaultAmazonMWS);
  const [showAmazonAuthInfo, setShowAmazonAuthInfo] = useState(false);

  useEffect(() => {
    handleMarketPlaceLocalChange(marketplaceLocal.id);
  }, [amazonMWSAuth]);

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
    setShowAmazonAuthInfo(false);
  };

  const handleAmazonMWSLocalChange = (data: any) => {
    setamazonMWSLocal({ ...amazonMWSLocal, ...data });
  };

  const handleAmazonMWSAuthUpdate = () => {
    if (
      amazonMWSLocal.amazon_seller_id &&
      amazonMWSLocal.token &&
      amazonMWSLocal.marketplace_id &&
      !amazonMWSLocal.saved
    ) {
      updateAmazonMWSAuth(amazonMWSLocal);
    } else {
      error('Please provide valid Amazon MWS Credentials');
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
            <Grid.Row columns={3}>
              <Grid.Column width={7}>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Form.Select
                      control={Select}
                      label="Marketplace"
                      options={marketplaceOptions}
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
                      placeholder="Amazon Seller ID"
                      value={amazonMWSLocal ? amazonMWSLocal.amazon_seller_id : ''}
                      name="amazon_seller_id"
                      onChange={(e, { value }) =>
                        handleAmazonMWSLocalChange({ amazon_seller_id: value })
                      }
                      readOnly={amazonMWSLocal.saved}
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Form.Input
                      label="MWS Auth Token"
                      placeholder="MWS Auth Token"
                      value={amazonMWSLocal ? amazonMWSLocal.token : ''}
                      name="token"
                      onChange={(e, { value }) => handleAmazonMWSLocalChange({ token: value })}
                      readOnly={amazonMWSLocal.saved}
                    />
                    <Button
                      disabled={amazonMWSLocal ? amazonMWSLocal.saved : false}
                      primary={true}
                      content="Add MWS Token"
                      style={{ borderRadius: '50px' }}
                      onClick={handleAmazonMWSAuthUpdate}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              {amazonMWSLocal.saved ? (
                <Grid.Column
                  width={1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div onClick={() => setShowAmazonAuthInfo(!showAmazonAuthInfo)}>
                    <Icon
                      size={'big'}
                      color={'blue'}
                      name={showAmazonAuthInfo ? 'chevron circle left' : 'chevron circle right'}
                      style={{ color: 'black', display: 'inline-block' }}
                    />
                    <p style={{ color: '#267DD4' }}>{'info'}</p>
                  </div>
                </Grid.Column>
              ) : null}
              {amazonMWSLocal.saved ? (
                <Grid.Column
                  width={8}
                  style={{
                    visibility: showAmazonAuthInfo ? 'visible' : 'hidden',
                    opacity: 'showAmazonAuthInfo' ? 1 : 0,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      height: 150,
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        float: 'right',
                      }}
                    >
                      <div
                        onClick={() => deleteMWSAuth(amazonMWSLocal.id)}
                        style={{
                          borderRadius: '5px',
                          color: '#ffffff',
                          backgroundColor: '#ff0300',
                          width: 34,
                          height: 34,
                          display: 'flex',
                          paddingLeft: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name={'trash'} size={'large'} style={{ textAlign: 'center' }} />
                      </div>
                    </div>
                    <div
                      style={{
                        overflow: 'hidden',
                        marginRight: 70,
                        backgroundColor: '#f0f0f0',
                        marginBottom: 5,
                        padding: 7,
                      }}
                    >
                      <h4 style={{ float: 'left', marginBottom: 0 }}>{'Amazon Seller ID:'}</h4>
                      <p
                        style={{
                          marginBottom: 0,
                          marginLeft: 15,
                          float: 'left',
                        }}
                      >
                        {amazonMWSLocal.amazon_seller_id}
                      </p>
                    </div>
                    <div
                      style={{
                        overflow: 'hidden',
                        marginRight: 70,
                        backgroundColor: '#f0f0f0',
                        marginBottom: 5,
                        padding: 7,
                      }}
                    >
                      <h4 style={{ float: 'left', marginBottom: 0 }}>{'MWS Auth Token:'}</h4>
                      <p
                        style={{
                          marginBottom: 0,
                          marginLeft: 15,
                          float: 'left',
                        }}
                      >
                        {amazonMWSLocal.token}
                      </p>
                    </div>
                    <div
                      style={{
                        overflow: 'hidden',
                        marginRight: 70,
                        backgroundColor: '#f0f0f0',
                        marginBottom: 5,
                        padding: 7,
                      }}
                    >
                      <h4 style={{ float: 'left', marginBottom: 0 }}>{'Marketplace ID:'}</h4>
                      <p
                        style={{
                          marginBottom: 0,
                          marginLeft: 15,
                          float: 'left',
                        }}
                      >
                        {amazonMWSLocal.marketplace_id}
                      </p>
                    </div>
                    <div
                      style={{
                        overflow: 'hidden',
                        marginRight: 70,
                        backgroundColor: '#f0f0f0',
                        marginBottom: 5,
                        padding: 7,
                      }}
                    >
                      <h4 style={{ float: 'left', marginBottom: 0 }}>{'Marketplace Name:'}</h4>
                      <p
                        style={{
                          marginBottom: 0,
                          marginLeft: 15,
                          float: 'left',
                        }}
                      >
                        {amazonMWSLocal.marketplaceName}
                      </p>
                    </div>
                  </div>
                </Grid.Column>
              ) : null}
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    </Segment>
  );
};

export default SellerAmazonMWS;
