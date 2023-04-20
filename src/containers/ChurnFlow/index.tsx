import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../config';

/* Utils */
import history from '../../history';
import { isSellgoSession } from '../../utils/session';

/* Actions */
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';
import { getSellerInfo } from '../../actions/Settings';

/* Images */
import leftArrow from '../../assets/images/left-arrow.svg';
import sellgoLogo from '../../assets/images/sellgo_gradation_logo_2_2x.png';
import aistockLogo from '../../assets/images/aistockLogo.png';
import TofuAndSoybean from '../../assets/images/TofuAndSoybean.png';
// import Tofu from '../../assets/images/Tofu.png';

/* Components */
// import PageHeader from '../../components/PageHeader';
import ChurnFlowContent from './ChurnFlowContent';

/* Constants */
import { PRE_SURVEY, IN_SURVEY, POST_SURVEY_1 } from '../../constants/Churnflow';
import axios from 'axios';
import { sellerIDSelector } from '../../selectors/Seller';
import { error, success } from '../../utils/notifications';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';
import { isSubscriptionIdFreeAccount } from '../../utils/subscriptions';
import { prettyPrintDate } from '../../utils/format';

interface Props {
  match: any;
  sellerSubscription: SellerSubscription;
  fetchSellerSubscription: () => void;
  getSeller: () => void;
}

const ChurnFlow = (props: Props) => {
  const { sellerSubscription, fetchSellerSubscription, getSeller } = props;
  const [isCancelled, setIsCancelled] = useState(false);
  const [surveyPhase, setSurveyPhase] = useState(PRE_SURVEY);

  useEffect(() => {
    getSeller();
    fetchSellerSubscription();
  }, []);

  useEffect(() => {
    if (sellerSubscription && sellerSubscription.status === 'pending' && !isCancelled) {
      history.push('/');
    }
  }, [sellerSubscription]);

  const handleChangeSurveyPhase = (newPhase: string) => {
    setSurveyPhase(newPhase);
  };

  const redirectToHome = () => {
    history.push('/');
  };
  const cancelSubscription = () => {
    axios
      .post(AppConfig.BASE_URL_API + `sellers/${sellerIDSelector()}/subscription/cancel`)
      .then(() => {
        setIsCancelled(true);
        fetchSellerSubscription();
        success(`Your subscription has been cancelled`);
        handleChangeSurveyPhase(POST_SURVEY_1);
        // history.push('/churnflow');
      })
      .catch(() => {
        error(`There was an error cancelling your subscription`);
      });
  };

  /* Generates churn flow content dependant on phase of survey */
  const generateTypeFormContent = () => {
    switch (surveyPhase) {
      case PRE_SURVEY:
        if (isSellgoSession()) {
          return (
            <ChurnFlowContent
              onClick={() => handleChangeSurveyPhase(IN_SURVEY)}
              title={`We're sorry to see you go`}
              desc={`In order to improve our services,
             we need you to answer a few quick questions. Your insights can help us improve the product for others.`}
              buttonText="Cancel my subscription"
              img={sellgoLogo}
            />
          );
        } else {
          return (
            <ChurnFlowContent
              onClick={() => handleChangeSurveyPhase(IN_SURVEY)}
              title={`We're sorry to see you go`}
              desc={`In order to improve our services,
             we need you to answer a few quick questions. Your insights can help us improve the product for others.`}
              buttonText="Cancel my subscription"
              img={aistockLogo}
            />
          );
        }

      case IN_SURVEY:
        if (isSellgoSession()) {
          return (
            <Widget
              id={AppConfig.CHURNFLOW_SURVEY_ID}
              className={styles.typeFormBox}
              onSubmit={() => cancelSubscription()}
            />
          );
        }
        return (
          <Widget
            id={AppConfig.CHURNFLOW_SURVEY_ID}
            className={styles.typeFormBox}
            onSubmit={() => handleChangeSurveyPhase(POST_SURVEY_1)}
          />
        );

      case POST_SURVEY_1:
        if (isSellgoSession()) {
          return (
            <ChurnFlowContent
              onClick={() => redirectToHome()}
              title="Thank you for being our valued customer."
              desc={`Your subscription is already scheduled for cancellation by end of the current billing period, ${
                isSubscriptionIdFreeAccount(sellerSubscription.subscription_id)
                  ? 'immediately'
                  : `${prettyPrintDate(new Date(sellerSubscription.next_billing_cycle_date ?? ''))}`
              }`}
              buttonText="Done"
              img={sellgoLogo}
              isButtonGrey
            />
          );
        }
        return (
          <ChurnFlowContent
            onClick={() => redirectToHome()}
            title="Thank you for being our valued customer."
            desc="Your opinion is really important to us."
            buttonText="Next"
            img={TofuAndSoybean}
            isButtonGrey
          />
        );

      // case POST_SURVEY_2:
      //   return (
      //     <ChurnFlowContent
      //       onClick={redirectToHome}
      //       title="About Your Subscription"
      //       desc="We will let you know if we need more information."
      //       buttonText="Complete"
      //       img={Tofu}
      //       isButtonGrey
      //     />
      //   );
    }
  };
  return (
    <main>
      {/* <PageHeader
        title={`Churnflow`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Pricing', to: '/settings/pricing' },
          { content: 'Churn Flow', to: '/cancel' },
        ]}
        auth={match.params.auth}
      /> */}
      {surveyPhase !== POST_SURVEY_1 && (
        <Link to="/settings/billing" className={styles.goBackButton}>
          <img src={leftArrow} />
          <p>Back</p>
        </Link>
      )}
      {generateTypeFormContent()}
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChurnFlow);
