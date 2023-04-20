import React from 'react';
import { Image } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

import DefaultImage from '../../../../assets/images/defaultImage.svg';

const DefaultDisplay = () => {
  return (
    <section className={styles.defaultDisplay}>
      <Image src={DefaultImage} alt="default image" />
      <p className={styles.label}>Let’s discover new leads!</p>
      <p className={styles.description}>
        Start your search by entering a name, or location in the left filter.
        <br />
        For a more targeted search, refine your results using our marketplace metrics filters.
      </p>
      {/* <p className={styles.linkText}>Learn how to get started with some examples</p> */}
    </section>
  );
};

export default DefaultDisplay;
