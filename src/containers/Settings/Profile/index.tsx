import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Form, Icon, Loader } from 'semantic-ui-react';
import axios from 'axios';

/* Actions */
import { getSellerInfo } from '../../../actions/Settings';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../../components/PageHeader';
import ProfileBoxHeader from '../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../components/ProfileBoxContainer';
import OrangeButton from '../../../components/OrangeButton';
import StepsInfo from '../../../components/StepsInfo';
import HelpingHandsIcon from '../../../assets/images/hands-helping-solid.svg';

/* Constants */
import {
  strong,
  lowerUpper,
  alphanumeric,
  specialCharacters,
  Length,
  passwordPolicy,
} from '../../../constants/Validators';

/* Hooks */
import { useInput } from '../../../hooks/useInput';

/* Utils */
import { success } from '../../../utils/notifications';
import { AppConfig } from '../../../config';
import ProfileBoxFooter from '../../../components/ProfileBoxFooter';

interface Props {
  getSeller: () => void;
  match: any;
  profile: any;
}

const Profile = (props: Props) => {
  const { match, getSeller, profile } = props;

  // Password states
  const [isFocusPW, setFocusPassword] = useState<boolean>(false);
  const { value: currentPassword, bind: bindPassword, reset: resetPassword } = useInput('');
  const [isShowingCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const { value: newPassword, bind: bindNewPassword, reset: resetNewPassword } = useInput('');
  const [isShowingNewPassword2, setShowNewPassword2] = useState<boolean>(false);
  const { value: newPassword2, bind: bindNewPassword2, reset: resetNewPassword2 } = useInput('');

  // Is editing states
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);

  // Error states
  const [error, setError] = useState<string>('');

  // Class names
  const passwordClassName = isEditingPassword ? '' : styles.formInput__disabled;

  const [loading, setLoading] = useState<boolean>(false);

  const { email, first_name, last_name, id } = profile;
  const creationDate = profile.cdate ? profile.cdate.substring(0, 10) : '-';
  const pic = localStorage.getItem('userPicture') || '';

  const stepsInfo = [
    {
      id: 1,
      stepShow: strong.validate(newPassword) ? true : false,
      stepClass: 'title-success',
      stepTitle: 'Password Strength',
      stepDescription: `strong`,
      stepIcon: 'check',
    },
    {
      id: 2,
      stepShow: true,
      stepClass: lowerUpper.validate(newPassword) ? 'title-success' : 'title-error',
      stepTitle: 'Lowercase and Uppercase',
      stepDescription: 'Contains a capital letter and a non capital letter',
      stepIcon: lowerUpper.validate(newPassword) ? 'check' : 'times',
    },
    {
      id: 3,
      stepShow: true,
      stepClass: alphanumeric.validate(newPassword) ? 'title-success' : 'title-error',
      stepTitle: 'Alphanumeric',
      stepDescription: 'Contains a number and letter',
      stepIcon: alphanumeric.validate(newPassword) ? 'check' : 'times',
    },
    {
      id: 4,
      stepShow: true,
      stepClass: specialCharacters.validate(newPassword) ? 'title-success' : 'title-error',
      stepTitle: 'Special Characters',
      stepDescription: 'Contains at least one special character (e.g. !@#$%^&*,.)',
      stepIcon: specialCharacters.validate(newPassword) ? 'check' : 'times',
    },
    {
      id: 5,
      stepShow: true,
      stepClass: Length.validate(newPassword) ? 'title-success' : 'title-error',
      stepTitle: 'Length',
      stepDescription: 'At least 8 characters',
      stepIcon: Length.validate(newPassword) ? 'check' : 'times',
    },
  ];

  React.useEffect(() => {
    getSeller();
  }, []);

  function onPasswordBlur() {
    setFocusPassword(false);
  }

  function onPasswordFocus() {
    setFocusPassword(true);
  }

  const handleSubmit = async () => {
    console.log(profile);
    let payload = {};
    setError('');

    if (isEditingPassword) {
      if (!passwordPolicy.validate(newPassword)) {
        setFocusPassword(true);
        setError('New password does not meet the requirements.');
        return;
      } else if (newPassword !== newPassword2) {
        setError('Passwords do not match.');
        return;
      } else {
        payload = {
          ...payload,
          current_email: email,
          current_password: currentPassword,
          new_password: newPassword,
        };
      }
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${AppConfig.BASE_URL_API}sellers/${id}/profile/password`,
        payload
      );
      getSeller();
      if (res.status === 200) {
        setIsEditingPassword(false);
        success('Successfully updated profile.');
        resetPassword();
        resetNewPassword();
        resetNewPassword2();
        setLoading(false);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        setError(e.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <PageHeader
        title={'Profile'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Profile' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.profilePageWrapper}>
        <ProfileBoxHeader className={styles.profileBox}>Profile</ProfileBoxHeader>
        <ProfileBoxContainer className={styles.profileBox}>
          <div className={styles.profileInformationRow}>
            <img src={pic} className={styles.profilePic} />
            <div>
              <p className={styles.name}>
                {first_name} {last_name}
              </p>
              <p>Member since: {creationDate}</p>
            </div>
          </div>

          <Form className={styles.updateSettingsForm} onSubmit={handleSubmit}>
            <div className={styles.innerGrid}>
              <label className={styles.formLabel}>Password</label>
              <span className={styles.formActionRow}>
                <Form.Input
                  className={styles.formInput}
                  autoComplete="new-password"
                  type={isShowingCurrentPassword ? 'text' : 'password'}
                  placeholder="********"
                  {...bindPassword}
                  readOnly={!isEditingPassword}
                  icon={
                    <Icon
                      name={isShowingCurrentPassword ? 'eye' : 'eye slash'}
                      link
                      onClick={() => setShowCurrentPassword(!isShowingCurrentPassword)}
                    />
                  }
                />

                <div
                  className={styles.changeButton}
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                >
                  (<span>{isEditingPassword ? 'Cancel' : 'Change'}</span>)
                </div>
              </span>

              <label className={`${styles.formLabel} ${passwordClassName}`}>New Password</label>
              <StepsInfo
                className={`${styles.formInput} ${passwordClassName}`}
                isFocusPW={isFocusPW}
                focusInput={onPasswordFocus}
                blurInput={onPasswordBlur}
                stepsData={stepsInfo}
                disabled={!isEditingPassword}
                showOnRight
                {...bindNewPassword}
              />

              <label className={`${styles.formLabel} ${passwordClassName}`}>
                Confirm New Password
              </label>
              <Form.Input
                className={`${styles.formInput} ${passwordClassName}`}
                type={isShowingNewPassword2 ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Password"
                {...bindNewPassword2}
                disabled={!isEditingPassword}
                icon={
                  <Icon
                    name={isShowingNewPassword2 ? 'eye' : 'eye slash'}
                    link
                    onClick={() => setShowNewPassword2(!isShowingNewPassword2)}
                  />
                }
              />
            </div>
          </Form>

          <div className={styles.formFooter}>
            {error && <div className={styles.paymentErrorMessage}>{error}</div>}
            <OrangeButton
              className={`${styles.updateButton} ${!isEditingPassword &&
                styles.updateButton__disabled}`}
              type="blue"
              size="small"
              onClick={() => {
                !loading && isEditingPassword && handleSubmit();
              }}
            >
              Update
              {loading && (
                <Dimmer active inverted>
                  <Loader active size="tiny" />
                </Dimmer>
              )}
            </OrangeButton>
          </div>
        </ProfileBoxContainer>
        <ProfileBoxFooter className={styles.profileBox}>
          <div>
            <img src={HelpingHandsIcon} alt="helping-hands-icon" />
            &nbsp;&nbsp; If you have trouble with the account, you can contact us at&nbsp;
            <a href="mailto: support@sellgo.com" className={styles.mailLink}>
              support@sellgo.com
            </a>
            . We Can Help.
          </div>
        </ProfileBoxFooter>
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
