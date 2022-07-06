import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  testimonialTitle: string;
  testimonial: string;
  authorName: string;
  authorTitle: string;
}

const Testimonial = (props: Props) => {
  const { testimonialTitle, testimonial, authorName, authorTitle } = props;

  return (
    <section className={styles.reviewsSection}>
      <h2>{testimonialTitle}</h2>
      <p>{testimonial}</p>

      <div className={styles.reviewerRow}>
        {/*<img src={authorImg} alt="profile picture" />*/}
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
