import React from 'react';
import { Button } from 'semantic-ui-react';
import FingerprintBlue from '../../../assets/images/fingerprint-1.svg';
import Fingerprint from '../../../assets/images/fingerprint.svg';

const DetailButtons = (props: any) => {
  const { score, onTrack, isTracking } = props;
  return (
    <div className="detail-buttons lt-tracking">
      <div>
        <TrackButtonWithRating isTracking={isTracking} onTrack={onTrack} score={score} />
      </div>
      <div />
    </div>
  );
};

function TrackButtonWithRating(props: any) {
  const { isTracking, onTrack } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      className={'track-btn with-rating' + (isTracking ? ' is-tracking' : '')}
    >
      <Button icon={true} className="track-wrap" onClick={onTrack}>
        <img src={isTracking ? FingerprintBlue : Fingerprint} alt="fingerprint" />
        <span>{isTracking ? 'Tracking' : 'Track'}</span>
      </Button>

      {/*<span className="rating-num">{formatRating(score)}</span>*/}
    </Button>
  );
}

export default DetailButtons;
