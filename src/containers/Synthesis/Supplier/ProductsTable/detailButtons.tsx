import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import Hotspot from '../../../../assets/images/wifi-icon.svg';
import HotspotBlue from '../../../../assets/images/wifi-icon-blue.svg';
import { formatRating } from '../../../../utils/format';

const DetailButtons = (props: any) => {
  const { score, onTrack, isTracking } = props;
  return (
    <div className="detail-buttons">
      <div>
        <TrackButtonWithRating isTracking={isTracking} onTrack={onTrack} score={score} />
      </div>
      <div />
    </div>
  );
};

function TrackButtonWithRating(props: any) {
  const { isTracking, onTrack, score } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      className={'track-btn with-rating' + (isTracking ? ' is-tracking' : '')}
    >
      <Button icon={true} className="track-wrap" onClick={onTrack}>
        <img src={isTracking ? HotspotBlue : Hotspot} alt="hotspot" />
        <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
      </Button>

      <Label as="a" basic={true} pointing="left" className="btn-lbl">
        <span className="rating-num">{formatRating(score)}</span>
      </Label>
    </Button>
  );
}

export default DetailButtons;
