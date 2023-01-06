// import axios from 'axios';
import React, { useState } from 'react';
import { faqs } from '../faq';
/* Components */
import FAQAccordion from '../../../../../components/FAQAccordion';

import styles from './index.module.scss';

const FAQSection = () => {
  const [faqData, setFaqData] = useState(faqs);
  console.log(setFaqData);
  // useEffect(() => {
  //   axios
  //     .get(`http://sellgo-website-dev.s3.amazonaws.com/faqDetails/webappPricing.json`)
  //     .then(resp => {
  //       console.log('Res', resp);
  //       setFaqData(resp.data.data);
  //     })
  //     .catch(() => setFaqData([]));
  // }, []);
  return (
    <>
      {faqData && faqData.length > 0 ? (
        <section className={`big-page-container ${styles.faqSection}`}>
          <h2 className="secondary-heading">Frequently Asked Questions</h2>
          <FAQAccordion data={faqData} isBgWhite />
        </section>
      ) : null}
    </>
  );
};

export default FAQSection;
