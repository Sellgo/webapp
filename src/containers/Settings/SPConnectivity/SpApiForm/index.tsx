import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Confirm, Loader, Dimmer, Modal, TextArea, Header } from 'semantic-ui-react';
import axios from 'axios';
import get from 'lodash/get';
import { fetchTOS, fetchPP } from '../../../../actions/UserOnboarding';

/* Styles */
import styles from './index.module.scss';

/* Utils */
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { error, success } from '../../../../utils/notifications';

/* Components */
import BoxHeader from '../../../../components/BoxHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ActionButton from '../../../../components/ActionButton';

const defaultShowCredentials = {
  amazonSellerID: false,
  authToken: false,
  refreshToken: false,
};

const SpApiForm = (props: any) => {
  const { setIsSpApiAuthenticated, termsOfService, privacyPolicy, fetchPP, fetchTOS } = props;

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [showCredentials, setShowCredentials] = useState(defaultShowCredentials);
  const [spApiId, setSpApiId] = useState<number>(-1);
  const [amazonSellerId, setAmazonSellerId] = useState<string>('');
  const [amazonAuthToken, setAmazonAuthToken] = useState<string>('');
  const [amazonRefreshToken, setAmazonRefreshToken] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [fetchSpApiKeysInterval, setFetchSpApiKeysInterval] = useState<any>(null);
  const [openTOS, setOpenTOS] = useState(false);
  const [openPP, setOpenPP] = useState(false);

  const fetchSpApiKeys = async () => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/sp-api-auth`;
      const res = await axios.get(url);
      const { data } = res;
      if (data.selling_partner_id && data.refresh_token) {
        setSpApiId(data.id);
        setAmazonSellerId(data.selling_partner_id);
        setAmazonAuthToken(data.mws_auth_token);
        setAmazonRefreshToken(data.refresh_token);
        setIsAuthenticating(false);

        setIsSpApiAuthenticated && setIsSpApiAuthenticated(true);
      }
    } catch (error) {
      setIsSpApiAuthenticated && setIsSpApiAuthenticated(false);
      console.error(error);
    }
  };

  const handleDeleteSpApi = async () => {
    try {
      const payload = {
        sp_api_auth_id: spApiId,
        status: 'inactive',
      };
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/sp-api-auth/${spApiId}`;
      const res = await axios.patch(url, payload);
      if (res.status === 200) {
        success('Successfully removed API credentials');
        setAmazonSellerId('');
        setAmazonAuthToken('');
        setSpApiId(-1);
        setIsAuthenticating(false);
        setShowCredentials(defaultShowCredentials);
        setIsSpApiAuthenticated && setIsSpApiAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
      error('Failed to remove API credentials');
    }
  };

  const redirectToAuthorize = () => {
    /* Generate random encrypted string */
    const randomString =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    /* open google.com in new tab */
    const url =
      `https://sellercentral.amazon.com/apps/authorize/consent?` +
      `application_id=amzn1.sp.solution.c327c81c-4762-4457-9066-fc41e0d5cc6c` +
      `&state=${randomString}` +
      `&redirect_uri=${AppConfig.BASE_URL}/settings/sp-api-listener`;
    window.open(url, '_blank');
    setIsAuthenticating(true);
  };

  /* Fetch existing api keys on first load */
  useEffect(() => {
    fetchSpApiKeys();
  }, []);

  /* Check for updates to authentication api details every 2 seconds */
  useEffect(() => {
    if (isAuthenticating) {
      const fetchSpApiKeysInterval = setInterval(fetchSpApiKeys, 2000);
      setFetchSpApiKeysInterval(fetchSpApiKeysInterval);
    } else {
      if (fetchSpApiKeysInterval) {
        clearInterval(fetchSpApiKeysInterval);
      }
    }
  }, [isAuthenticating]);

  useEffect(() => {
    fetchTOS();
    fetchPP();
  }, [fetchTOS, fetchPP]);

  const onClose = () => {
    setOpenTOS(false);
    setOpenPP(false);
  };

  const TOS = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Terms of Service</Header>
        <Form>
          <TextArea rows="20" value={termsOfService} />
        </Form>
      </div>
    );
  };

  const PP = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <Header as="h4">Our Privacy Policy</Header>
        <Form>
          <TextArea rows="20" value={privacyPolicy} />
        </Form>
      </div>
    );
  };
  const newUserExperiencePopup = () => {
    return (
      <Modal onClose={() => onClose()} size={'small'} open={openTOS || openPP}>
        <Modal.Content>
          {openTOS && <TOS />}
          {openPP && <PP />}
        </Modal.Content>
      </Modal>
    );
  };

  return (
    <section className={styles.mwsFormWrapper}>
      <BoxHeader>Connect to Amazon Seller Central</BoxHeader>
      <BoxContainer>
        <Dimmer active={isAuthenticating} inverted className={styles.dimmer}>
          <Loader inline className={styles.loader} />
          <p>
            Authenticating...
            <br />
            Please do not exit this page while authenticating.
          </p>
          <button onClick={() => setIsAuthenticating(false)}>Cancel</button>
        </Dimmer>
        <p className={styles.mwsFormTitle}>
          {' '}
          Please grant Amazon Seller Central access for each marketplace.{' '}
        </p>
        {amazonSellerId ? (
          <div className={styles.mwsFormGrid}>
            <Icon
              name="trash alternate"
              className={`${styles.deleteIcon} ${false && styles.deleteIcon__disabled}`}
              disabled={false}
              onClick={() => setDeleteConfirmation(true)}
            />
            <Form.Input
              className={styles.formInput}
              label={
                <div className={styles.formLabel}>
                  <span>Amazon Seller ID &nbsp;</span>
                </div>
              }
              placeholder="Looks like A2BTUHOG3JAVRS"
              value={amazonSellerId}
              type={showCredentials.amazonSellerID ? 'text' : 'password'}
              name="amazon_seller_id"
              readOnly={true}
              icon={
                <Icon
                  link
                  name={showCredentials.amazonSellerID ? 'eye' : 'eye slash'}
                  onClick={() =>
                    setShowCredentials({
                      ...showCredentials,
                      amazonSellerID: !showCredentials.amazonSellerID,
                    })
                  }
                />
              }
            />
            {amazonAuthToken && (
              <Form.Input
                className={styles.formInput}
                label={
                  <div className={styles.formLabel}>
                    <span>MWS Auth Token &nbsp;</span>
                  </div>
                }
                placeholder="Looks like amzn.mws.9eb48bhd-3e5n-f315-d34d-8dfa825fb711"
                value={amazonAuthToken}
                type={showCredentials.authToken ? 'text' : 'password'}
                name="token"
                readOnly={true}
                icon={
                  <Icon
                    link
                    name={showCredentials.authToken ? 'eye' : 'eye slash'}
                    onClick={() =>
                      setShowCredentials({
                        ...showCredentials,
                        authToken: !showCredentials.authToken,
                      })
                    }
                  />
                }
              />
            )}
            <Form.Input
              className={styles.formInput}
              label={
                <div className={styles.formLabel}>
                  <span>Refresh Token &nbsp;</span>
                </div>
              }
              placeholder="Looks like amzn.mws.9eb48bhd-3e5n-f315-d34d-8dfa825fb711"
              value={amazonRefreshToken}
              type={showCredentials.refreshToken ? 'text' : 'password'}
              name="token"
              readOnly={true}
              icon={
                <Icon
                  link
                  name={showCredentials.refreshToken ? 'eye' : 'eye slash'}
                  onClick={() =>
                    setShowCredentials({
                      ...showCredentials,
                      refreshToken: !showCredentials.refreshToken,
                    })
                  }
                />
              }
            />
          </div>
        ) : (
          <div className={styles.mwsFormGrid}>
            <p className={styles.regionTitle}>
              North America region{' '}
              <span
                className={`${styles.authorizeButton} ${styles.elevioButton}`}
                onClick={() => window._elev.openArticle('17')}
              >
                How to authorize?
              </span>
            </p>
            <ActionButton
              type="purpleGradient"
              variant="primary"
              size="md"
              onClick={redirectToAuthorize}
              className={styles.authorizeButton}
            >
              Authorize access here
            </ActionButton>
          </div>
        )}

        <div className={styles.privacyInformation}>
          <Icon name="lock" color="black" size="big" />
          <span>
            AiStock is committed to maintaining the highest standard for security in order that your
            valuable data can be kept safe and secure at channel and at storage. We promise that we
            will never share your data with others. You can read more on our{' '}
            <span className={styles.popupButton} onClick={() => setOpenTOS(true)}>
              Terms of Service
            </span>{' '}
            and{' '}
            <span className={styles.popupButton} onClick={() => setOpenPP(true)}>
              Privacy Policy
            </span>
            .
          </span>
        </div>

        {newUserExperiencePopup()}
      </BoxContainer>

      <Confirm
        content="Do you want to delete Amazon Seller Central credentials?"
        open={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={() => {
          handleDeleteSpApi();
          setDeleteConfirmation(false);
        }}
      />
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  termsOfService: get(state, 'userOnboarding.termsOfService'),
  privacyPolicy: get(state, 'userOnboarding.privacyPolicy'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTOS: () => dispatch(fetchTOS()),
    fetchPP: () => dispatch(fetchPP()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpApiForm);
