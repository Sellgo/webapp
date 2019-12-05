import React from 'react';
import { Rating, Image } from 'semantic-ui-react';

const Ratings = (props: any) => {
  const { starRatings, totalReviews } = props;
  return (
    <div className="rating">
      <Rating icon="star" defaultRating={starRatings} maxRating={5} />
      <span className="review-head">{totalReviews} reviews</span>
    </div>
  );
};

export default Ratings;
