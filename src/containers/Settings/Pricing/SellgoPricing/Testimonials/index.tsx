import React, { memo } from 'react';

import styles from './index.module.scss';
/* Components */

// import ActionButton from '../../../../../components/ActionButton';
import Testimonial from './Testimonial';
import { TestimonialsData } from '../../../../../constants/Pricing/SellgoPricing/testimonials';

const Testimonials = () => {
  return (
    <section className={styles.testimonialSection}>
      <h2>You’ll Be Up And Running In Minutes With Sellgo</h2>
      <div className={styles.testimonialsWrapper}>
        {TestimonialsData.map((testinomailData, i) => {
          const { testimonial, authorImg, authorName, authorTitle } = testinomailData || {};
          return (
            <Testimonial
              key={`${authorName}_${i}`}
              testimonial={testimonial}
              authorImg={authorImg}
              authorName={authorName}
              authorTitle={authorTitle}
              isMarginRightZero={(i + 1) % 3 === 0}
            />
          );
        })}
      </div>
    </section>
  );
};

export default memo(Testimonials);
