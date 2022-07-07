import axios from 'axios';
import React, { useEffect, useState } from 'react';

/* Components */
import FAQAccordion from '../../../../../components/FAQAccordion';

import styles from './index.module.scss';

const FAQSection = () => {
  const [faqData, setFaqData] = useState([]);

  console.log('inside FAQSection');

  useEffect(() => {
    axios
      .get(`https://aistock-website-dev.s3.amazonaws.com/faqDetails/pricing.json`)
      .then((resp) => {
        setFaqData(resp.data.data);
        console.log('response', resp);
      })
      .catch(() => setFaqData([]));
  }, []);

  console.log(faqData, 'faqData');
  return (
    <>
      {faqData && faqData.length > 0 ? (
        <section className={`big-page-container ${styles.faqSection}`}>
          <h2 className="secondary-heading">Frequently Asked Questions</h2>
          <FAQAccordion data={faqData} horizontalFocus />
        </section>
      ) : null}
    </>
  );
};

export default FAQSection;
