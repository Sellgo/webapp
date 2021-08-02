import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Styling */
import styles from './index.module.scss';

/* Config */
import { AppConfig } from '../../config';

/* Utils */
import { success, error } from '../../utils/notifications';
import history from '../../history';

/* Actions */
import { fetchSellerSubscription } from '../../actions/Settings/Subscription';
import { getSellerInfo } from '../../actions/Settings';

/* Images */
import leftArrow from '../../assets/images/left-arrow.svg';
import sellgoLogo from '../../assets/images/SellgoNewestLogo.png';
import TofuAndSoybean from '../../assets/images/TofuAndSoybean.png';
import Tofu from '../../assets/images/Tofu.png';

/* Components */
import PageHeader from '../../components/PageHeader';
import ChurnFlowContent from './ChurnFlowContent';

/* Constants */
import { PRE_SURVEY, IN_SURVEY, POST_SURVEY_1, POST_SURVEY_2 } from '../../constants/Churnflow';

interface Props {
  match: any;
  profile: any;
  fetchSellerSubscription: () => void;
  getSeller: () => void;
}

const ChurnFlow = (props: Props) => {
  const { match, profile, fetchSellerSubscription, getSeller } = props;

  const [surveyPhase, setSurveyPhase] = useState(PRE_SURVEY);

  useEffect(() => {
    getSeller();
    fetchSellerSubscription();
  }, []);

  const handleChangeSurveyPhase = (newPhase: string) => {
    setSurveyPhase(newPhase);
  };

  const cancelSubscription = () => {
    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/cancel`)
      .then(() => {
        getSeller();
        fetchSellerSubscription();
        success(`Your subscription has been cancelled`);
        history.push('./settings/pricing');
      })
      .catch(() => {
        error(`There was an error cancelling your subscription`);
      });
  };

  /* Generates churn flow content dependant on phase of survey */
  const generateTypeFormContent = () => {
    switch (surveyPhase) {
      case PRE_SURVEY:
        return (
          <ChurnFlowContent
            onClick={() => handleChangeSurveyPhase(IN_SURVEY)}
            title={`We're sorry to see you go`}
            desc={`In order to process your cancellation,
             we need you to answer 3 quick questions. Your insights can help us improve the product for others.`}
            buttonText="Quick Survey"
            img={sellgoLogo}
          />
        );

      case IN_SURVEY:
        return (
          <Widget
            id={AppConfig.CHURNFLOW_SURVEY_ID}
            className={styles.typeFormBox}
            onSubmit={() => handleChangeSurveyPhase(POST_SURVEY_1)}
          />
        );

      case POST_SURVEY_1:
        return (
          <ChurnFlowContent
            onClick={() => handleChangeSurveyPhase(POST_SURVEY_2)}
            title="Thanks for your help"
            desc="Your opinion is really important to us, one more step to finalize."
            buttonText="Next"
            img={TofuAndSoybean}
            isButtonGrey
          />
        );

      case POST_SURVEY_2:
        return (
          <ChurnFlowContent
            onClick={cancelSubscription}
            title="About Your Subscription"
            desc="We will let you know if we need more information."
            buttonText="Submit Cancellation Request"
            img={Tofu}
            isButtonGrey
          />
        );
    }
  };
  return (
    <main>
      <PageHeader
        title={`Churnflow`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Pricing', to: '/settings/pricing' },
          { content: 'Churn Flow', to: '/churnflow' },
        ]}
        auth={match.params.auth}
      />
      <Link to="/settings/pricing" className={styles.goBackButton}>
        <img src={leftArrow} />
        <p>Cancel and go back to subscription</p>
      </Link>
      {generateTypeFormContent()}
    </main>
  );
};
const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChurnFlow);
