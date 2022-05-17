import React from 'react';
import { Loader } from 'semantic-ui-react';
import history from '../../../history';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import chromeDisplay from '../../../assets/images/chromeExample.png';
import TenFactorLogo from '../../../assets/images/TenFactorLogo.png';
import MetkixLogo from '../../../assets/images/MetkixLogo.png';
import LuxeLogo from '../../../assets/images/LuxeLogo.png';
import SkopeLogo from '../../../assets/images/SkopeLogo.png';
import BBLogo from '../../../assets/images/BBLogo.png';
import BFLogo from '../../../assets/images/BFLogo.png';
import sellgoLogo from '../../../assets/images/SellgoNewestLogo.png';

/* Components */
import Auth from '../../../components/Auth/Auth';

interface Props {
  auth: Auth;
  location: any;
}

const ActivationSuccess = (props: Props) => {
  const { auth, location } = props;
  const [progressMessage, setProgressMessage] = React.useState<string>('Preparing your account..');

  /* Email and password should be passed from history.push in Activation component */
  let email: any, password: any;

  if (location.state) {
    email = location.state.email;
    password = location.state.password;
  }
  // password: string, isAiStock: boolean;

  React.useEffect(() => {
    if (!location.state) {
      history.push('/');
      return;
    }
    // email = location.state.email;
    // password = location.state.password;
    // isAiStock = location.state.isAiStock;

    if (!email || !password) {
      history.push('/');
      return;
    }

    setTimeout(() => setProgressMessage('Getting all the pieces together...'), 2500);
    setTimeout(() => setProgressMessage('Personalizing your experience...'), 4500);
    setTimeout(() => setProgressMessage("You're all set!"), 6500);
    setTimeout(redirectAndLogin, 1000000);
  }, []);

  const redirectAndLogin = () => {
    auth.webAuth.login(
      {
        responseType: 'token',
        realm: 'Username-Password-Authentication',
        username: email,
        password: password,
      },
      (err: any) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Success!');
        }
      }
    );
  };
  return (
    <main className={styles.successPage}>
      <section className={styles.displaySection}>
        <img src={chromeDisplay} alt="graph-display" className={styles.graphDisplayImg} />
        <div className={styles.loaderWrapper}>
          <Loader active inline inverted />
          <p className={styles.progressMessage}>{progressMessage}</p>
        </div>
      </section>
      <section className={styles.socialProofSection}>
        <img src={sellgoLogo} alt="sellgo-logo" className={styles.sellgoLogo} />
        <p className={styles.socialProofDesc}>Trusted by the world's best Amazon sellers</p>
        <div className={styles.socialProofIcons}>
          <img className={styles.logo} src={BBLogo} alt="bblogo" />
          <img className={styles.logo} src={TenFactorLogo} alt="TenFactorLogo" />
          <img className={styles.logo} src={MetkixLogo} alt="MetkixLogo" />
          <img className={styles.logo} src={LuxeLogo} alt="LuxeLogo" />
          <img className={styles.logo} src={SkopeLogo} alt="SkopeLogo" />
          <img className={styles.logo} src={BFLogo} alt="BFLogo" />
        </div>
      </section>
    </main>
  );
};

export default ActivationSuccess;
