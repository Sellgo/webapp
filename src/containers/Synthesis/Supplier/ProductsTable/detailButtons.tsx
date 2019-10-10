import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import Hotspot from '../../../../assets/images/wifi-icon.svg';

const DetailButtons = (props: any) => {
  const { score, onViewDetails, onTrack, isTracking } = props;
  return (
    <div className="detailButtons">
      <div>
        <TrackButtonWithRating isTracking={isTracking} onTrack={onTrack} score={score} />
      </div>
      <div>
        <Button primary className="view_detail_btn" onClick={onViewDetails}>
          <span>View Details</span>
        </Button>
      </div>
    </div>
  );
};

function TrackButtonWithRating(props: any) {
  const { isTracking, onTrack, score } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      className={'track_btn with-rating' + (isTracking ? ' is-tracking' : '')}
    >
      <Button icon className="track_wrap" onClick={onTrack}>
        <img src={Hotspot} alt="hotspot" />
        <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
      </Button>

      <Label as="a" basic pointing="left" className="btn_lbl">
        <span className="rating_name">Rating</span>
        <span className="rating_num">{score}</span>
      </Label>
    </Button>
  );
}

// Not using but leaving in case we want to remove rating in future
function TrackButton(props: any) {
  const { isTracking, onTrack } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      className={'track_btn' + (isTracking ? ' is-tracking' : '')}
    >
      <Button icon className="track_wrap" onClick={onTrack}>
        <img src={Hotspot} alt="hotspot" />
        <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
      </Button>
    </Button>
  );
}

export default DetailButtons;
