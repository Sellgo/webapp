import React, { useState, useEffect } from 'react';
import { Form, Segment, Icon, Confirm, List, Header } from 'semantic-ui-react';
import { defaultMarketplaces } from '../../../../constants/Settings';
import { error } from '../../../../utils/notifications';
import { connect } from 'react-redux';
import { AppConfig } from '../../../../config';
import { isSubscriptionFree } from '../../../../utils/subscriptions';
import {
  updateSellerAmazonMWSAuth,
  getSellerInfo,
  getSellerAmazonMWSAuth,
  deleteSellerAmazonMWSAuth,
} from '../../../../actions/Settings';
import { AmazonMWS } from '../../../../interfaces/Seller';

import styles from './index.module.scss';
import ProfileBoxHeader from '../../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../../components/ProfileBoxContainer';
import OrangeButton from '../../../../components/OrangeButton';

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

interface Props {
  amazonMWSAuth: any;
  updateAmazonMWSAuth: (data: any) => void;
  deleteMWSAuth: (mwsId: any) => void;
  subscriptionType: any;
  getSeller: () => void;
  getAmazonMWSAuth: () => void;
}

const Connectivity = (props: Props) => {
  const {
    amazonMWSAuth,
    updateAmazonMWSAuth,
    deleteMWSAuth,
    subscriptionType,
    getSeller,
    getAmazonMWSAuth,
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
    getSeller();
    getAmazonMWSAuth();
  });
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
    <section>
      <ProfileBoxHeader>Amazon MWS Authorization</ProfileBoxHeader>
      <ProfileBoxContainer>
        <p className={styles.mwsFormTitle}>
          {' '}
          Please grant Amazon MWS and Amazon Seller Central access for each market.{' '}
        </p>
        <Form className={styles.mwsFormGrid}>
          <Icon
            name="trash alternate"
            className={`${styles.deleteIcon} ${!amazonMWSLocal.saved &&
              styles.deleteIcon__disabled}`}
            disabled={!amazonMWSLocal.saved}
            onClick={() => setDeleteConfirmation(true)}
          />
          <div className={`${styles.formInput} ${styles.formInput__marketplace}`}>
            <div className={styles.formLabel}>Marketplace</div>
            <Form.Select
              options={marketplaceOptions}
              placeholder="Marketplace"
              defaultValue={'ATVPDKIKX0DER'}
              name="marketplace_id"
              onChange={(e: any, field: any) => handleMarketPlaceLocalChange(field.value)}
            />
          </div>
          <Form.Input
            className={styles.formInput}
            label={
              <div className={styles.formLabel}>
                <span>Amazon Seller ID &nbsp;</span>
              </div>
            }
            placeholder="Looks like A2BTUHOG3JAVRS"
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
          <div className={styles.formInput}>
            <div
              className={styles.authenticateInstructions}
              onClick={() => {
                setConfirmToken(() => !showConfirmToken);
                if (isHashMWS()) {
                  window.location.hash = '';
                }
              }}
            >
              How to authenticate your Seller Account
            </div>
          </div>
          <Form.Input
            className={styles.formInput}
            label={
              <div className={styles.formLabel}>
                <span>MWS Auth Token &nbsp;</span>
              </div>
            }
            placeholder="Looks like amzn.mws.9eb48bhd-3e5n-f315-d34d-8dfa825fb711"
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
        </Form>
        <div className={styles.buttonsRow}>
          <OrangeButton
            type="blue"
            size="small"
            onClick={handleAmazonMWSAuthUpdate}
            className={styles.updateButton}
          >
            {' '}
            Update
          </OrangeButton>
        </div>
      </ProfileBoxContainer>
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
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
  amazonMWSAuth: state.settings.amazonMWSAuth,
});

const mapDispatchToProps = {
  getAmazonMWSAuth: () => getSellerAmazonMWSAuth(),
  updateAmazonMWSAuth: (data: AmazonMWS) => updateSellerAmazonMWSAuth(data),
  deleteMWSAuth: (mwsAuthID: any) => deleteSellerAmazonMWSAuth(mwsAuthID),
  getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Connectivity);
