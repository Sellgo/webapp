import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import FingerprintBlue from '../../../../assets/images/fingerprint-1.svg';
import Fingerprint from '../../../../assets/images/fingerprint.svg';
import { formatRating } from '../../../../utils/format';

const DetailButtons = (props: any) => {
  const { score, onTrack, isTracking, disableTrack } = props;
  return (
    <div className="detail-buttons">
      <div>
        <TrackButtonWithRating
          isTracking={isTracking}
          onTrack={onTrack}
          score={score}
          disableTrack={disableTrack}
        />
      </div>
      <div />
    </div>
  );
};

function TrackButtonWithRating(props: any) {
  const { isTracking, onTrack, score, disableTrack } = props;
  return (
    <Button
      disabled={disableTrack}
      as="div"
      labelPosition="right"
      className={'track-btn with-rating' + (isTracking ? ' is-tracking' : '')}
    >
      <Button icon={true} className="track-wrap" onClick={onTrack}>
        <img src={isTracking ? FingerprintBlue : Fingerprint} alt="fingerprint" />
        <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
      </Button>

      <Label as="a" basic={true} pointing="left" className="btn-lbl">
        <span className="rating-num">{formatRating(score)}</span>
      </Label>
    </Button>
  );
}

export default DetailButtons;
