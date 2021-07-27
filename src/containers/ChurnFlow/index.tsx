import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// @ts-ignore
import { Widget } from '@typeform/embed-react';

/* Styling */
import './index.scss';

/* Config */
import { AppConfig } from '../../config';

/* Utils */
import { success, error } from '../../utils/notifications';

/* Actions */
import {
  fetchSellerSubscription,
  setSellerSubscription,
} from '../../actions/Settings/Subscription';

import leftArrow from '../../assets/images/left-arrow.svg';
import sellgoLogo from '../../assets/images/SellgoNewestLogo.png';
import TofuAndSoybean from '../../assets/images/TofuAndSoybean.png';
import Tofu from '../../assets/images/Tofu.png';

import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ChurnFlowContent from './ChurnFlowContent';
import { PRE_SURVEY, IN_SURVEY, POST_SURVEY_1, POST_SURVEY_2 } from '../../constants/Churnflow';

interface Props {
  match: any;
  profile: any;
  setSellerSubscription: (data: any) => void;
  fetchSellerSubscription: () => void;
}

class ChurnFlow extends React.Component<Props> {
  state = {
    surveyPhase: POST_SURVEY_2,
  };

  handleSurveyStart = () => {
    this.setState({ surveyPhase: IN_SURVEY });
  };

  handleSubmit = () => {
    this.setState({ surveyPhase: POST_SURVEY_1 });
  };

  handleNext = () => {
    this.setState({ surveyPhase: POST_SURVEY_2 });
  };

  cancelSubscription() {
    console.log(this.props);
    const { profile, setSellerSubscription, fetchSellerSubscription } = this.props;
    console.log(this.props);
    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/cancel`)
      .then(() => {
        setSellerSubscription(false);
        fetchSellerSubscription();
        success(`Your subscription has been cancelled`);
      })
      .catch(() => {
        error(`There was an error cancelling your subscription`);
      });
  }

  render() {
    const generateTypeFormContent = () => {
      switch (this.state.surveyPhase) {
        case PRE_SURVEY:
          return (
            <ChurnFlowContent
              onClick={this.handleSurveyStart}
              title={`We're sorry to see you go`}
              desc={`In order to process your cancellation,
               we need you to answer 3 quick questions. Your insights can help us improve the product for others.`}
              buttonText="Quick Survey"
              img={sellgoLogo}
            />
          );

        case IN_SURVEY:
          return <Widget id="Lb8og4j8" className="typeFormBox" onSubmit={this.handleSubmit} />;

        case POST_SURVEY_1:
          return (
            <ChurnFlowContent
              onClick={this.handleNext}
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
              onClick={this.cancelSubscription}
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
            { content: 'Pricing', to: '/pricing' },
            { content: 'Churn Flow', to: '/churnflow' },
          ]}
          auth={this.props.match.params.auth}
        />
        <Link to="/settings/pricing" className="goBackButton">
          <img src={leftArrow} />
          <p>Cancel and go back to subscription</p>
        </Link>
        {generateTypeFormContent()}
      </main>
    );
  }
}
const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  fetchSellerSubscription: () => fetchSellerSubscription(),
  setSellerSubscription: (data: any) => setSellerSubscription(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChurnFlow);
