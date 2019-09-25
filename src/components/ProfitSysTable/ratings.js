import React from 'react';
import { Rating, Image } from 'semantic-ui-react';

const Ratings = ({ starRatings, totalReviews }) => {
  return (
    <div className="rating">
      <Rating icon="star" defaultRating={starRatings} maxRating={5} />
      <span className="review_head">{totalReviews} reviews</span>
    </div>
  );
};

export default Ratings;
