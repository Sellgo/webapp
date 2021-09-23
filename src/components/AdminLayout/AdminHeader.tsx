import * as React from 'react';
import { Icon, Image, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Styles */

import './AdminHeader.scss';

/* Components */
import LogoutConfirm from '../LogoutConfirm';

/* Types */
import { SellerSubscription } from '../../interfaces/Seller';

/* Selectors */
import { getSellerSubscription } from '../../selectors/Subscription';

/* Utils */
import { isBetaAccount } from '../../utils/subscriptions';

/* Icons */
import SettingsIcon from '../../assets/images/settingsIcon.svg';
import PlansIcon from '../../assets/images/plansIcon.svg';
import BillingIcon from '../../assets/images/billingIcon.svg';
import ConnectivityIcon from '../../assets/images/connectivityIcon.svg';
import LogoutIcon from '../../assets/images/logoutIcon.svg';

interface Props {
  auth: any;
  profile: any;
  sellerSubscription: SellerSubscription;
}

const AdminHeader = (props: Props) => {
  const { auth, profile, sellerSubscription } = props;
  const { email, first_name, last_name } = profile;
  const isBeta = isBetaAccount(sellerSubscription);
  const userPicture = localStorage.getItem('userPicture');
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);

  const open = () => setOpenConfirm(true);

  return (
    <div className="admin-header">
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
              Settings
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/pricing"
              className="dropdownItem"
              disabled={isBeta}
            >
              <img src={PlansIcon} alt="plans-icon" />
              Plans
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/billing"
              className="dropdownItem"
              disabled={isBeta}
            >
              <img src={BillingIcon} alt="billing-icon" />
              Billing
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/settings/connectivity"
              className="dropdownItem"
              disabled={isBeta}
            >
              <img src={ConnectivityIcon} alt="connectivity-icon" />
              Connectivity
            </Dropdown.Item>
            <div className="line" />
            <Dropdown.Item className="dropdownItem" onClick={open}>
              <img src={LogoutIcon} alt="logout-icon" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <LogoutConfirm auth={auth} open={openConfirm} openFunc={setOpenConfirm} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.settings.profile,
    sellerSubscription: getSellerSubscription(state),
  };
};

export default connect(mapStateToProps)(AdminHeader);
