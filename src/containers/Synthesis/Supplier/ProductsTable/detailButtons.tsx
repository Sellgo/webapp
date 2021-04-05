import React from 'react';
import { Button } from 'semantic-ui-react';
import { ReactComponent as FingerPrint } from '../../../../assets/images/white-fingerprint.svg';

const DetailButtons = (props: any) => {
  const { score, onTrack, isTracking, disabled } = props;
  return (
    <div className="detail-buttons">
      <div>
        <TrackButtonWithRating
          isTracking={isTracking}
          onTrack={onTrack}
          score={score}
          disabled={disabled}
        />
      </div>
      <div />
    </div>
  );
};

function TrackButtonWithRating(props: any) {
  const { isTracking, onTrack, disabled } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      className={'track-btn with-rating' + (isTracking ? ' is-tracking' : '')}
      disabled={disabled}
    >
      <Button icon={true} className="track-wrap" onClick={onTrack}>
        <FingerPrint className="fingerprint" width={15} height={15} />
        <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
      </Button>
    </Button>
  );
}

export default DetailButtons;
