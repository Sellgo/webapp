import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import BreadCrumb from '../BreadCrumb';
import AdminHeader from '../AdminLayout/AdminHeader';
import Auth from '../Auth/Auth';
import AiStockBetaForm from '../AiStockBetaForm';
import './index.scss';

import { NEW_PRODUCT_DESIGN_PATH_NAMES } from '../../constants/AdminLayout';
import { connect } from 'react-redux';
import { getSellerSubscription } from '../../selectors/Subscription';
import { SellerSubscription } from '../../interfaces/Seller';
import { updateSeller } from '../../actions/Settings/Subscription';
import ActionButton from '../ActionButton';
import { ReactComponent as PartyHornIcon } from '../../assets/images/party-horn-solid.svg';

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
  const [isBetaFormOpen, setIsBetaFormOpen] = React.useState(false);
  const isNewProduct = NEW_PRODUCT_DESIGN_PATH_NAMES.includes(window.location.pathname);
  const previousTrialDuration = usePrevious(sellerSubscription.trial_left);
  const trialDurationLeft = sellerSubscription.trial_left || previousTrialDuration;
  const handleSubmitBetaForm = () => {
    updateSeller({ is_aistock_survey_filled: true });
  };
  return (
    <>
      <Helmet>
        <title>Sellgo - {title}</title>
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
        isOpen={isBetaFormOpen}
        setModalOpen={setIsBetaFormOpen}
        onSubmit={handleSubmitBetaForm}
      />
      {sellerSubscription.is_aistock && !sellerSubscription.is_aistock_survey_filled && (
        <ActionButton
          variant="primary"
          type="black"
          size="md"
          onClick={() => setIsBetaFormOpen(true)}
          className={'surveyButton'}
        >
          <PartyHornIcon /> &nbsp;Win 1-year FREE
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
