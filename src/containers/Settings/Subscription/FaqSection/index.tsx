import React from 'react';

/* Components */
import FAQAccordion from '../../../../components/FAQAccordion';
import { FAQData } from '../../../../interfaces/FaqDetail';

import styles from './index.module.scss';
interface Props {
  faqData: FAQData[];
}

const FAQSection: React.FC<Props> = props => {
  const { faqData } = props;

  return (
    <section className={`big-page-container ${styles.faqSection}`}>
      <h2 className="secondary-heading">Frequently Asked Questions</h2>
      <FAQAccordion data={faqData} horizontalFocus />
    </section>
  );
};

export default FAQSection;
