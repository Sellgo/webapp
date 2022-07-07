import React, { useEffect, useState } from 'react';

/* Components */
import FAQAccordion from '../../../../../components/FAQAccordion';
import pricingData from '../../../../../assets/faq/pricing.json';

import styles from './index.module.scss';

const FAQSection = () => {
  const [faqData, setFaqData]: any = useState([]);

  useEffect(() => {
    setFaqData([...pricingData.products[0].data]);
  }, []);

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
