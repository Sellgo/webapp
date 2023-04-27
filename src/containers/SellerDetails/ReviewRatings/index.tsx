import React from 'react';
import ReactStars from 'react-stars';

/* Styling */
import styles from './index.module.scss';

import { rating_response } from './temp';
import { RATING_HASH_MAP } from '../../../constants/SellerInsights';

export const calculteDisplayStarsValue = (rating: number) => {
  const currentIntValue = Math.trunc(rating);
  if (rating < currentIntValue + 0.25) return currentIntValue;
  if (rating >= currentIntValue + 0.75) return currentIntValue + 1;
  return currentIntValue + 0.5;
};

const ReviewRatings = () => {
  const data = rating_response;
  return (
    <div className={styles.reviewRatingsBox}>
      <h3 className={styles.label}>SUMMARY</h3>
      <div className={styles.reviewRatingsWrapper}>
        <div className={styles.reviewRatingsWrapper__container}>
          <div className={styles.reviewRatingsWrapper__ratingBox}>
            <div className={styles.reviewRatingsWrapper__rating}>
              <ReactStars
                count={5}
                value={calculteDisplayStarsValue(Number(data.current_rating))}
                size={50}
                color2={'#ffd700'}
                edit={false}
              />
              <p>{data.current_rating} / 5</p>
            </div>
            <p className={styles.reviewRatingsWrapper__label}>Current Rating</p>
            <div className={styles.reviewRatingsWrapper__totalReviewBox}>
              <p className={styles.reviewRatingsWrapper__totalReviewCount}>{data.total_reviews}</p>
              <p className={styles.reviewRatingsWrapper__totalReviewLabel}>Total review count</p>
            </div>
          </div>
        </div>
        <div className={styles.reviewRatingsWrapper__container}>
          <div className={styles.reviewRatingsWrapper__percentageRatingBox}>
            <p className={styles.reviewRatingsWrapper__percentageRatingLabel}>
              Review count by stars{' '}
            </p>
            <div className={styles.reviewRatingsWrapper__percentageRatingContainer}>
              {data?.current_reviews_percentages?.map(reviewPercentage => {
                const { label, percentage_value } = reviewPercentage;
                const currentStarValue = RATING_HASH_MAP[label];
                return (
                  <div key={label} className={styles.reviewRatingsWrapper__percentageRating}>
                    <p>{currentStarValue} star</p>
                    <ReactStars
                      count={5}
                      value={currentStarValue}
                      size={50}
                      color2={'#ffd700'}
                      edit={false}
                    />
                    <p>{percentage_value} %</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewRatings;
