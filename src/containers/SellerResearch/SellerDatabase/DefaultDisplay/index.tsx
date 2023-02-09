import React from 'react';
import { Image } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

import DefaultImage from '../../../../assets/images/defaultImage.svg';

const DefaultDisplay = () => {
  return (
    <section className={styles.defaultDisplay}>
      <Image src={DefaultImage} alt="default image" />
      <p className={styles.label}>Let’s start searching!</p>
      <p className={styles.description}>
        Get started by putting a name, marketplace, or location above, or for a more refined search,
        use the filters of marketplace metrics!
      </p>
      {/* <p className={styles.linkText}>Learn how to get started with some examples</p> */}
    </section>
  );
};

export default DefaultDisplay;
