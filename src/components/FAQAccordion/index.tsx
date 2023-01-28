import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

interface Props {
  data: any;
  horizontalFocus?: boolean;
  isBgWhite?: boolean;
}

const FAQAccordion: React.FC<Props> = props => {
  const { data, isBgWhite, horizontalFocus = false } = props;

  const accordionClass = horizontalFocus
    ? styles.faqAccordion__HorizontalFocus
    : styles.faqAccordion;

  const accordionItemClass = horizontalFocus
    ? styles.faqAccordionItem__HorizontalFocus
    : styles.faqAccordionItem;

  return (
    <Accordion allowZeroExpanded className={accordionClass}>
      {data.map((faqDetails: any) => {
        return (
          <AccordionItem key={uuid()} className={accordionItemClass}>
            <AccordionItemHeading
              className={`${styles.faqAccordionHeading} ${isBgWhite && styles.whiteBg}`}
            >
              <AccordionItemButton className={styles.faqAccordionButton}>
                <p>
                  <AccordionItemState>
                    {({ expanded }) => {
                      return expanded ? (
                        <span className={`${isBgWhite && styles.noColor}`}>&#62;</span>
                      ) : (
                        <span className={`${isBgWhite && styles.noColor}`}>&#62;</span>
                      );
                    }}
                  </AccordionItemState>
                  {faqDetails.question}
                </p>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel
              className={`${styles.faqAccordionPanel} ${isBgWhite && styles.whiteBg}`}
            >
              <p>{faqDetails.answer}</p>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FAQAccordion;
