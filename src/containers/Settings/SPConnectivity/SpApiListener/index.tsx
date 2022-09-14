import axios from 'axios';
import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { AppConfig } from '../../../../config';
import { sellerIDSelector } from '../../../../selectors/Seller';
import { success, error } from '../../../../utils/notifications';
import styles from './index.module.scss';

const SpApiConnector = () => {
  const postSpApi = async (selling_partner_id: any, mws_auth_token: any, spapi_oauth_code: any) => {
    try {
      const url = `${AppConfig.BASE_URL_API}sellers/${sellerIDSelector()}/sp-api-auth`;
      const res = await axios.post(url, {
        selling_partner_id,
        mws_auth_token,
        spapi_oauth_code,
      });

      if (res.status === 201) {
        window.close();
        success('Connected to Amazon Seller Central successfully!');
      } else {
        error('Something went wrong!');
      }
    } catch (err) {
      error(err?.response?.data?.message);
      // window.close();
    }
  };

  React.useEffect(() => {
    /* Get query params from url */
    const queryParams = new URLSearchParams(window.location.search);
    const amazonAuthToken = queryParams.get('mws_auth_token');
    const amazonOauthCode = queryParams.get('spapi_oauth_code');
    const amazonSellingPartnerId = queryParams.get('selling_partner_id');
    postSpApi(amazonSellingPartnerId, amazonAuthToken, amazonOauthCode);
  }, []);

  return (
    <Dimmer active className={styles.dimmer} inverted>
      <Loader inline />
      <p>
        Authenticating with Amazon Seller Central...
        <br />
        Please do not close this window
      </p>
    </Dimmer>
  );
};

export default SpApiConnector;
