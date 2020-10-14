import React, { useState, useEffect } from 'react';
import { Form, Grid, Segment, Icon, Confirm, List, Header, Popup } from 'semantic-ui-react';
import { defaultMarketplaces } from '../../constants/Settings';
import { error } from '../../utils/notifications';
import { isFreeAccountWithoutHistory, isSubscriptionFree } from '../../utils/subscriptions';
import { connect } from 'react-redux';
import { AppConfig } from '../../config';

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
  const {
    amazonMWSAuth,
    updateAmazonMWSAuth,
    deleteMWSAuth,
    subscriptionType,
    sellerSubscription,
  } = props;
  const [marketplaceLocal, setmarketplaceLocal] = useState(defaultMarketplace);
  const [amazonMWSLocal, setamazonMWSLocal] = useState(defaultAmazonMWS);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showCredentials, setShowCredentials] = useState(defaultShowCredentials);
  const [showConfirmToken, setConfirmToken] = useState(false);

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

  useEffect(() => {
    // retrigger the scroll to hash after component is mounted
    if (isSubscriptionFree(subscriptionType)) {
      window.location.hash = '#amazon-mws';
    }

    const hash = window.location.hash;
    window.location.hash = '';
    window.location.hash = hash;

    //empty account type for redirecting page here on first load
    localStorage.setItem('accountType', '');
  }, []);

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
    ? `https://sellercentral.${marketplaceLocal.link}/gp/mws/registration/register.html?signInPageDisplayed=1\
&developerName=Sellgo&devMWSAccountId=${AppConfig.DEVELOPER_ID}`
    : '';

  const isHashMWS = () => {
    return window.location.hash === '#amazon-mws';
  };

  return (
    <>
      <Grid.Column width={16} id="amazon-mws">
        <Form>
          <Header.Subheader>
            Please grant Amazon MWS and Amazon Seller Central access for each market.
          </Header.Subheader>
          <Form.Group className="marketplace-field" unstackable widths={2}>
            <label className="field-title">
              <span>Marketplace &nbsp;</span>
              <Popup
                basic
                className="pop-market"
                trigger={<i className="far fa-question-circle" />}
                content={
                  <p>
                    Marketplace: <br />
                    Which Amazon region do you sell at
                  </p>
                }
              />
            </label>
            <Form.Select
              options={marketplaceOptions}
              placeholder="Marketplace"
              defaultValue={'ATVPDKIKX0DER'}
              name="marketplace_id"
              onChange={(e: any, field: any) => handleMarketPlaceLocalChange(field.value)}
            />
          </Form.Group>
          <Form.Input
            className="seller-field"
            label={
              <>
                <span>Amazon Seller ID &nbsp;</span>
                <Popup
                  basic
                  className="pop-seller"
                  trigger={<i className="far fa-question-circle" />}
                  content={
                    <p>
                      Amazon Seller ID: <br />
                      This is given by Amazon in your Amazon seller central
                    </p>
                  }
                />
                <br />
              </>
            }
            placeholder="This will look like A2BTUHOG3JAVRS"
            value={amazonMWSLocal.amazon_seller_id}
            type={amazonMWSLocal.saved === showCredentials.amazonSellerID ? 'text' : 'password'}
            name="amazon_seller_id"
            onChange={(e, { value }) => handleAmazonMWSLocalChange({ amazon_seller_id: value })}
            readOnly={amazonMWSLocal.saved}
            icon={
              <Icon
                link
                name={amazonMWSLocal.saved === showCredentials.amazonSellerID ? 'eye' : 'eye slash'}
                onClick={() =>
                  handleShowCredentialsLocalChange({
                    amazonSellerID: !showCredentials.amazonSellerID,
                  })
                }
              />
            }
          />
          <Form.Input
            className="token-field"
            label={
              <>
                <span>MWS Auth Token &nbsp;</span>
                <Popup
                  basic
                  className="pop-token"
                  trigger={<i className="far fa-question-circle" />}
                  content={
                    <p>
                      MWS Auth Token: <br />
                      This is an authorization token given by Amazon so we can pull up data for you
                    </p>
                  }
                />
                &nbsp; &nbsp;
                <span
                  className="auth-seller"
                  onClick={() => {
                    setConfirmToken(() => !showConfirmToken);
                    if (isHashMWS()) {
                      window.location.hash = '';
                    }
                  }}
                >
                  Authenticate Your Seller Account
                  {!amazonMWSLocal.token &&
                    isHashMWS() &&
                    isFreeAccountWithoutHistory(sellerSubscription, subscriptionType) && (
                      <div className="free-trial-popup">
                        <Icon name="arrow left" />
                        <p className="title">Start Your Free Trial</p>
                        <p className="content">
                          To finish setting up your account and start your free trial. Please enter
                          your Amazon MWS Authorization. Click on “Authenticate Your Seller Account”
                          for instructions.
                        </p>
                      </div>
                    )}
                </span>
                <br />
              </>
            }
            placeholder="This will look like amzn.mws.9eb48bhd-3e5n-f315-d34d-8dfa825fb711"
            value={amazonMWSLocal.token}
            type={amazonMWSLocal.saved === showCredentials.authToken ? 'text' : 'password'}
            name="token"
            onChange={(e, { value }) => handleAmazonMWSLocalChange({ token: value })}
            readOnly={amazonMWSLocal.saved}
            icon={
              <Icon
                link
                name={amazonMWSLocal.saved === showCredentials.authToken ? 'eye' : 'eye slash'}
                onClick={() =>
                  handleShowCredentialsLocalChange({
                    authToken: !showCredentials.authToken,
                  })
                }
              />
            }
          />
          <Form.Group className="action-container">
            <Form.Button
              className="primary-btn"
              content="Update"
              disabled={amazonMWSLocal.saved}
              onClick={handleAmazonMWSAuthUpdate}
            />
            <Form.Button
              className="error-btn"
              content="Delete"
              disabled={!amazonMWSLocal.saved}
              onClick={() => setDeleteConfirmation(true)}
            />
          </Form.Group>
        </Form>
      </Grid.Column>
      <Confirm
        className="auth-token-confirm"
        open={showConfirmToken}
        confirmButton="OK"
        content={
          <Segment placeholder>
            <Header as="h3" icon>
              How to authenticate your seller account
              <Header.Subheader>
                <List ordered>
                  <List.Item>
                    Click on this link:&nbsp;
                    <span
                      className="auth-amazon"
                      onClick={() => {
                        showMeHow(showMeHowUrl);
                      }}
                    >
                      Authenticate on Amazon
                    </span>
                  </List.Item>
                  <List.Item>Login to your Amazon Seller account.</List.Item>
                  <List.Item>
                    Developer's Name and Account Number will automatically be entered and click on
                    "Next"
                  </List.Item>
                  <List.Item>
                    Check mark "I understand that I take complete responsibility for the acts and
                    omissions of..." and <br />
                    click on "next".
                  </List.Item>
                  <List.Item>Copy the MWS Auth Token into Sellgo and click "Update".</List.Item>
                </List>
              </Header.Subheader>
            </Header>
          </Segment>
        }
        onCancel={() => setConfirmToken(() => !showConfirmToken)}
        onConfirm={() => setConfirmToken(() => !showConfirmToken)}
      />
      <Confirm
        content="Do you want to delete Amazon Seller Central credentials?"
        open={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={() => {
          if (amazonMWSLocal.id && amazonMWSLocal.saved) deleteMWSAuth(amazonMWSLocal.id);
          setDeleteConfirmation(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
});

export default connect(mapStateToProps)(SellerAmazonMWS);
