import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  testimonial: string;
  authorImg: string;
  authorName: string;
  authorTitle: string;
  isMarginRightZero?: boolean;
}

const Testimonial = (props: Props) => {
  const { testimonial, authorImg, authorName, authorTitle, isMarginRightZero = false } = props;

  return (
    <section className={`${styles.reviewsSection} ${isMarginRightZero && styles.marginRightZero}`}>
      <p>{testimonial}</p>

      <div className={styles.reviewerRow}>
        <img src={authorImg} alt="profile picture" />
        <div className={styles.reviewerDetails}>
          {authorName}
          <br />
          <span>{authorTitle}</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
