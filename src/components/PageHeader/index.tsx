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

/* Styles */
import './index.scss';

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';

/* Constants */
import { NEW_PRODUCT_DESIGN_PATH_NAMES } from '../../constants/AdminLayout';

/* Utils */
import { isSubscriptionIdFreeTrial } from '../../utils/subscriptions';

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

  const handleSubmitFeedbackForm = async () =>
    handleSubmitForm({ is_aistock_feedback_filled: true });

  const handleSubmitTestimonialForm = async () =>
    handleSubmitForm({ is_aistock_testimonial_filled: true });

  const handleUpdateFaviconToAistock = () => {
    const faviconElement = document.getElementById('favicon');
    if (faviconElement && isAiStockSession()) {
      faviconElement.setAttribute('href', `${AppConfig.BASE_URL}/images/aistockFavicon.ico`);
    }
  };

  React.useEffect(() => {
    handleUpdateFaviconToAistock();
  }, []);

  const shouldDisplayFormButton = (formType: string, trials: number[], paid: number[]) => {
    const isPaidSellerSubscription =
      sellerSubscription?.subscription_id &&
      !isSubscriptionIdFreeTrial(sellerSubscription.subscription_id);

    const startDate =
      sellerSubscription?.paid_start_date || sellerSubscription?.trial_start_date || null;

    const numOfDays = sellerSubscription?.paid_start_date
      ? paid
      : sellerSubscription?.trial_start_date
      ? trials
      : null;

    const isFormFilled =
      formType === 'feedback'
        ? sellerSubscription?.is_aistock_feedback_filled
        : sellerSubscription?.is_aistock_testimonial_filled;

    if (
      !startDate ||
      !numOfDays ||
      isFormFilled ||
      (!trials?.length && !paid?.length) ||
      (formType === 'testimonial' && !isPaidSellerSubscription)
    )
      return false;

    let shouldDisplay = false;

    numOfDays.forEach(day => {
      const displayOnDate = new Date(startDate);
      displayOnDate.setDate(displayOnDate.getDate() + day);
      if (displayOnDate.toDateString() === new Date().toDateString()) {
        shouldDisplay = true;
      }
    });

    return shouldDisplay;
  };

  return (
    <>
      <Helmet>
        <title>
          {isSellgoSession() ? 'Sellgo' : 'Aistock'} - {title}
        </title>
      </Helmet>

      <div className={`page-header ${isNewProduct ? 'new-page-header' : ''}`}>
        {breadcrumb && breadcrumb.length > 0 && <BreadCrumb sections={breadcrumb} />}
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

      {shouldDisplayFormButton('feedback', [7], [7, 14, 21, 28]) && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsFeedbackFormOpen(true)}
          className={`surveyButton ${shouldDisplayFormButton('testimonial', [], [7, 14, 21, 28]) &&
            'feedbackButton'}`}
        >
          <MessageSmileIcon /> &nbsp;Feedback survey
        </ActionButton>
      )}

      {shouldDisplayFormButton('testimonial', [], [7, 14, 21, 28]) && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsTestimonialFormOpen(true)}
          className="surveyButton testimonialButton"
        >
          <MessageSmileIcon /> &nbsp;Testimonial survey
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
