import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ExtensionDisplay from '../../../assets/images/chromeExample.png';
import ExtensionLogo from '../../../assets/images/chromeLogo.svg';
import ActionButton from '../../../components/ActionButton';
import Lightbulb from '../../../assets/images/lightbulb.svg';

const ExtensionSection = () => {
  /* Quick fix for redirecting to extension */
  const redirectToExtension = () => {
    /* eslint-disable-next-line max-len */
    window
      .open(
        'https://chrome.google.com/webstore/detail/sellgo-extension/gldmigoakdolonchebfnmcfbjihelcec',
        '_blank'
      )
      ?.focus();
  };

  return (
    <>
      <section className={styles.extensionSection}>
        <h2> Supercharge Your Amazon Business</h2>
        <p>
          Find great products on Amazon, and validate their sales estimation directly on your search
          pages.
        </p>
        <ActionButton
          type="purpleGradient"
          variant="primary"
          size="md"
          className={styles.getExtensionCTA}
          onClick={redirectToExtension}
        >
          <img src={ExtensionLogo} alt="extension-logo" className={styles.extensionLogo} />
          Get Sellgo Chrome Extension
        </ActionButton>
        <div className={styles.lightbulbLabel}>
          <img src={Lightbulb} alt="lightbulb" />
          <p>Ideal for users that like to {<br />}research on Amazon.</p>
        </div>
        <img
          src={ExtensionDisplay}
          alt="extension-example"
          className={styles.extensionDisplayPhoto}
        />
      </section>
    </>
  );
};

export default ExtensionSection;
