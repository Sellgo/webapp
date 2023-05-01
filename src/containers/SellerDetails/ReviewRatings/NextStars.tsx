import React, { useState } from 'react';
import ReactStars from 'react-stars';
import ReactSlider from 'react-slider';
/* Styling */
import styles from './index.module.scss';

import { rating_next_stars } from './temp';

export const calculteDisplayStarsValue = (rating: number) => {
  const currentIntValue = Math.trunc(rating);
  if (rating < currentIntValue + 0.25) return currentIntValue;
  if (rating >= currentIntValue + 0.75) return currentIntValue + 1;
  return currentIntValue + 0.5;
};

const NextStars = () => {
  const data = rating_next_stars;
  const [decreaseSliderValue, setDecreaseSliderValue] = useState<number>(1.0);
  const [increaseSliderValue, setIncreaseSliderValue] = useState<number>(5.0);

  const getStars = (type: 'decrease' | 'increase', currentStarValue: number) => {
    if (type === 'decrease') {
      const decreaseSimulation = data.decrease_simulation;
      const requiredStars = decreaseSimulation.find(
        decreaseSimulationStars =>
          Number(decreaseSimulationStars.targeted_rating) === decreaseSliderValue
      );
      if (requiredStars) {
        return requiredStars?.stars_required?.find(
          requiredStar => requiredStar.rating_star === currentStarValue
        );
      }
      return {
        required_stars: '',
        rating_star: 0,
      };
    }
    if (type === 'increase') {
      const increaseSimulation = data.increase_simulation;
      const requiredStars = increaseSimulation.find(
        increaseSimulationStars =>
          Number(increaseSimulationStars.targeted_rating) === increaseSliderValue
      );
      if (requiredStars) {
        return requiredStars?.stars_required?.find(
          requiredStar => requiredStar.rating_star === currentStarValue
        );
      }
      return {
        required_stars: '',
        rating_star: 0,
      };
    }
  };
  return (
    <>
      <div className={styles.reviewRatingsBox}>
        <h3 className={styles.label}>Next Stars</h3>
        <div className={styles.reviewRatingsWrapper}>
          <div className={styles.reviewRatingsWrapper__container}>
            <p className={styles.informationHeading}>Decrease Rating</p>
            <div>
              <ReactSlider
                className={styles.horizontalSlider}
                marks
                markClassName="example-mark"
                min={1}
                max={Number(data?.max_decrease_rating)}
                step={0.1}
                value={decreaseSliderValue}
                thumbClassName={styles.sliderThumb}
                trackClassName={styles.sliderTrack}
                onAfterChange={(val, index) => {
                  setDecreaseSliderValue(Number(val));
                  console.log('Thumb index', index);
                }}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              />
            </div>
            <p className={styles.decreasingStarsLabel}>
              To <strong>DECREASE</strong> to <strong>{decreaseSliderValue}</strong> rating
            </p>
            <div className={styles.reviewRatingsWrapper__percentageRatingContainer}>
              {[3, 2, 1].map(starValue => {
                const currentStarValue = getStars('decrease', starValue);
                console.log(currentStarValue);
                return (
                  <div key={starValue} className={styles.reviewRatingsWrapper__percentageRating}>
                    <ReactStars
                      count={5}
                      value={starValue}
                      size={50}
                      color2={'#ffd700'}
                      edit={false}
                    />
                    <p>
                      {currentStarValue?.required_stars ?? '-'} {starValue} star review is needed
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.reviewRatingsWrapper__container}>
            <p className={styles.informationHeading}>Increase Rating</p>
            <div>
              <ReactSlider
                className={styles.horizontalSlider}
                marks
                markClassName="example-mark"
                min={Number(data.current_rating)}
                max={5}
                step={0.1}
                value={increaseSliderValue}
                thumbClassName={`${styles.sliderThumb} ${styles.sliderThumbIncrease}`}
                trackClassName={`${styles.sliderTrack} ${styles.sliderTrackIncrease}`}
                onAfterChange={(val, index) => {
                  setIncreaseSliderValue(Number(val));
                  console.log('Thumb index', index);
                }}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              />
            </div>
            <p className={styles.increasingStarsLabel}>
              To <strong>INCREASE</strong> to <strong>{increaseSliderValue}</strong> rating
            </p>
            <div className={styles.reviewRatingsWrapper__percentageRatingContainer}>
              {[5, 4, 3].map(starValue => {
                const currentStarValue = getStars('increase', starValue);
                console.log(currentStarValue);
                return (
                  <div key={starValue} className={styles.reviewRatingsWrapper__percentageRating}>
                    <ReactStars
                      count={5}
                      value={starValue}
                      size={50}
                      color2={'#ffd700'}
                      edit={false}
                    />
                    <p>
                      {currentStarValue?.required_stars ?? '-'} {starValue} star review is needed
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextStars;
