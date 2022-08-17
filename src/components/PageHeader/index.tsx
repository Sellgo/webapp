import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

/* Components */
import BreadCrumb from '../BreadCrumb';
import AdminHeader from '../AdminLayout/AdminHeader';
import Auth from '../Auth/Auth';
import AiStockBetaForm from '../AiStockBetaForm';
import ActionButton from '../ActionButton';
import { ReactComponent as MessageSmileIcon } from '../../assets/images/message-smile-solid.svg';
import { ReactComponent as StarReviewIcon } from '../../assets/images/star-sharp-solid.svg';
import { ReactComponent as ReferralIcon } from '../../assets/images/thumbs-up-solid.svg';

/* Styles */
import './index.scss';

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';

/* Constants */
import { NEW_PRODUCT_DESIGN_PATH_NAMES } from '../../constants/AdminLayout';

/* Utils */
import { isMigrationSuccess, isSubscriptionIdFreeTrial } from '../../utils/subscriptions';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

/* Actions */
import { updateSeller } from '../../actions/Settings/Subscription';
import { isAiStockSession, isSellgoSession } from '../../utils/session';
import { AppConfig } from '../../config';
import axios from 'axios';

interface Props {
  title?: string;
  callToAction?: any;
  breadcrumb?: any;
  auth?: Auth;
  sellerSubscription: SellerSubscription;
  updateSeller: (payload: any) => void;
}

const usePrevious = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const PageHeader = (props: Props) => {
  const { title, callToAction, breadcrumb, auth, sellerSubscription, updateSeller } = props;
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = React.useState(false);
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = React.useState(false);
  const [isPromoterFormOpen, setIsPromoterFormOpen] = React.useState(false);
  const isNewProduct = NEW_PRODUCT_DESIGN_PATH_NAMES.includes(window.location.pathname);
  const previousTrialDuration = usePrevious(sellerSubscription.trial_left);
  const trialDurationLeft = sellerSubscription.trial_left || previousTrialDuration;

  const handleSubmitForm = async (payload: any) => {
    const sellerID = localStorage.getItem('userId');

    try {
      const url = AppConfig.BASE_URL_API + `sellers/${sellerID}/drip/fields`;
      await axios.post(url, payload);
    } catch (err) {
      console.log('error: ', err);
    }

    updateSeller({ is_aistock_survey_filled: true });
  };

  const handleSubmitFeedbackForm = () => handleSubmitForm({ is_aistock_feedback_filled: true });

  const handleSubmitTestimonialForm = () =>
    handleSubmitForm({ is_aistock_testimonial_filled: true });

  const handleSubmitPromoterForm = () => handleSubmitForm({ is_aistock_promoter_filled: true });

  const handleUpdateFaviconToAistock = () => {
    const faviconElement = document.getElementById('favicon');
    if (faviconElement && isAiStockSession()) {
      faviconElement.setAttribute('href', `${AppConfig.BASE_URL}/images/aistockFavicon.ico`);
    }
  };

  React.useEffect(() => {
    handleUpdateFaviconToAistock();
  }, []);

  const shouldDisplayTestmonialButton = (numOfDays: number[]) => {
    const isPaidSellerSubscription =
      sellerSubscription?.subscription_id &&
      !isSubscriptionIdFreeTrial(sellerSubscription.subscription_id);

    if (
      sellerSubscription?.is_aistock_testimonial_filled ||
      !numOfDays.length ||
      !sellerSubscription?.paid_start_date ||
      !isPaidSellerSubscription
    )
      return false;

    let shouldDisplay = false;

    numOfDays.forEach(day => {
      const displayOnDate = new Date(sellerSubscription?.paid_start_date);
      displayOnDate.setDate(displayOnDate.getDate() + day);
      if (displayOnDate.toDateString() === new Date().toDateString()) {
        shouldDisplay = true;
      }
    });

    return shouldDisplay;
  };

  const shouldDisplayFeedbackButton = (day: number) => {
    if (
      sellerSubscription?.is_aistock_feedback_filled ||
      !day ||
      sellerSubscription?.paid_start_date ||
      !sellerSubscription?.trial_start_date
    )
      return false;

    let shouldDisplay = false;

    const displayOnDate = new Date(sellerSubscription?.trial_start_date);
    displayOnDate.setDate(displayOnDate.getDate() + day);

    if (displayOnDate.toDateString() === new Date().toDateString()) {
      shouldDisplay = true;
    }

    return shouldDisplay;
  };

  const shouldDisplayPromoterButton = (day: number) => {
    const isPaidSellerSubscription =
      sellerSubscription?.subscription_id &&
      !isSubscriptionIdFreeTrial(sellerSubscription.subscription_id);

    if (sellerSubscription?.is_aistock_promoter_filled || !day || !isPaidSellerSubscription) {
      return false;
    }

    let shouldDisplay = false;

    const displayOnDate = new Date(sellerSubscription?.paid_start_date);
    displayOnDate.setDate(displayOnDate.getDate() + day);

    if (displayOnDate.toDateString() === new Date().toDateString()) {
      shouldDisplay = true;
    }

    return shouldDisplay;
  };

  return (
    <>
      <Helmet>
        <title>
          {isSellgoSession() ? 'Sellgo' : 'Aistock'} - {title}
        </title>
      </Helmet>

      <div
        className={`page-header ${isNewProduct ? 'new-page-header' : ''} ${!isMigrationSuccess(
          sellerSubscription
        ) && 'page-header__hide-breadcrumb'}`}
      >
        {isMigrationSuccess(sellerSubscription) && breadcrumb && breadcrumb.length > 0 && (
          <BreadCrumb sections={breadcrumb} />
        )}
        <div className="page-header__left">
          <Header as="h2">
            <Header.Content>
              {callToAction}
              <p>
                {trialDurationLeft !== null && trialDurationLeft !== undefined && (
                  <>
                    Beta Trial:&nbsp;
                    <span>{trialDurationLeft} Days Left</span>
                  </>
                )}
              </p>
            </Header.Content>
          </Header>
          <AdminHeader auth={auth} />
        </div>
      </div>

      <AiStockBetaForm
        isOpen={isFeedbackFormOpen}
        setModalOpen={setIsFeedbackFormOpen}
        onSubmit={handleSubmitFeedbackForm}
        surveyId={AppConfig.AISTOCK_SURVEY}
      />

      <AiStockBetaForm
        isOpen={isTestimonialFormOpen}
        setModalOpen={setIsTestimonialFormOpen}
        onSubmit={handleSubmitTestimonialForm}
        surveyId={AppConfig.AISTOCK_TESTIMONIAL_SURVEY}
      />

      <AiStockBetaForm
        isOpen={isPromoterFormOpen}
        setModalOpen={setIsPromoterFormOpen}
        onSubmit={handleSubmitPromoterForm}
        surveyId={AppConfig.AISTOCK_PROMOTER_SURVEY}
      />

      {shouldDisplayFeedbackButton(7) && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsFeedbackFormOpen(true)}
          className={'surveyButton'}
        >
          <MessageSmileIcon /> &nbsp;Feedback survey
        </ActionButton>
      )}

      {shouldDisplayTestmonialButton([7, 14, 21, 28]) && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsTestimonialFormOpen(true)}
          className={'surveyButton'}
        >
          <StarReviewIcon /> &nbsp;Leave a review
        </ActionButton>
      )}

      {shouldDisplayPromoterButton(30) && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsPromoterFormOpen(true)}
          className={'surveyButton'}
        >
          <ReferralIcon /> &nbsp;Tell your friend?
        </ActionButton>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    sellerSubscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSeller: (payload: any) => {
      dispatch(updateSeller(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
