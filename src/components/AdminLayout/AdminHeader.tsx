import * as React from 'react';
import { Icon, Image, Menu, Dropdown, Checkbox, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserOnboarding } from '../../selectors/UserOnboarding';

import './AdminHeader.scss';

/* Components */
import LogoutConfirm from '../LogoutConfirm';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';

/* Utils */
import { isAistockSubscription, isBetaAccount } from '../../utils/subscriptions';
import { setUserOnboarding } from '../../actions/UserOnboarding';

/* Icons */
import SettingsIcon from '../../assets/images/settingsIcon.svg';
import PlansIcon from '../../assets/images/plansIcon.svg';
import BillingIcon from '../../assets/images/billingIcon.svg';
import ConnectivityIcon from '../../assets/images/connectivityIcon.svg';
import LogoutIcon from '../../assets/images/logoutIcon.svg';
import KeyIcon from '../../assets/images/key-regular.svg';
import PerfectStockIcon from '../../assets/images/perfectStockGrey.svg';

/* Actions */
import { getSellerInfo } from '../../actions/Settings';

interface Props {
  auth: any;
  profile: any;
  sellerSubscription: SellerSubscription;
  setUserOnboarding: (payload: boolean) => void;
  getSellerInfo: () => void;
  userOnboarding: boolean;
}

const AdminHeader = (props: Props) => {
  const userPicture = localStorage.getItem('userPicture');
  const {
    auth,
    profile,
    sellerSubscription,
    setUserOnboarding,
    userOnboarding,
    getSellerInfo,
  } = props;
  const { email, first_name, last_name } = profile;
  const isBeta = isBetaAccount(sellerSubscription);
  const isAiStock = isAistockSubscription(sellerSubscription.subscription_id);
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const open = () => setOpenConfirm(true);

  React.useEffect(() => {
    getSellerInfo();
  }, []);
  return (
    <div className="admin-header">
      <Popup
        className="enableLearningPopup"
        trigger={
          <Checkbox
            toggle
            label="Quick Learning"
            className="userOnboardingToogle"
            checked={userOnboarding}
            onChange={(e: any, data) => {
              setUserOnboarding(Boolean(data.checked));
            }}
          />
        }
        content={<p className="enableLearningTooltipMessage">Toggle to enable learning mode</p>}
      />

      <Menu.Item>
        <Dropdown
          trigger={
            <>
              {userPicture ? (
                <Image src={userPicture} avatar={true} />
              ) : (
                <Icon name="user circle" style={{ fontSize: 18 }} />
              )}
            </>
          }
          pointing="top right"
          basic
          icon={null}
        >
          <Dropdown.Menu className="dropdownMenu">
            <div className="profileBox">
              {userPicture && <img src={userPicture} alt="user circle" className="userIcon" />}
              <div>
                <p className="name">
                  {' '}
                  {first_name} {last_name}
                </p>
                <p className="email"> {email}</p>
              </div>
            </div>
            <Dropdown.Item as={Link} to="/settings/profile" className="dropdownItem">
              <img src={SettingsIcon} alt="settings-icon" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/pricing"
              className="dropdownItem"
              disabled={isBeta || isAiStock}
            >
              <img src={PlansIcon} alt="plans-icon" />
              Plans
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/billing"
              className="dropdownItem"
              disabled={isBeta || isAiStock}
            >
              <img src={BillingIcon} alt="billing-icon" />
              Billing
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/sp-connectivity"
              className="dropdownItem"
              disabled={isBeta}
            >
              <img src={ConnectivityIcon} alt="connectivity-icon" />
              Connectivity
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/api-keys"
              className="dropdownItem"
              disabled={isBeta || isAiStock}
            >
              <img src={KeyIcon} alt="key-icon" />
              API Keys
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/aistock/lead-time"
              className="dropdownItem"
              disabled={!isAiStock}
            >
              <img src={PerfectStockIcon} alt="perfect-stock-icon" />
              Ai Stock
            </Dropdown.Item>
            <div className="line" />
            <Dropdown.Item className="dropdownItem" onClick={open}>
              <img src={LogoutIcon} alt="logout-icon" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <LogoutConfirm
        auth={auth}
        open={openConfirm}
        openFunc={() => {
          setOpenConfirm(!openConfirm);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.settings.profile,
    sellerSubscription: getSellerSubscription(state),
    userOnboarding: getUserOnboarding(state),
  };
};

const mapDispatchToProps = {
  setUserOnboarding: (payload: boolean) => setUserOnboarding(payload),
  getSellerInfo: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
