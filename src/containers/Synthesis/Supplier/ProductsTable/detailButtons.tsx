import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import Hotspot from '../../../../assets/images/wifi-icon.svg';

const DetailButtons = (props: any) => {
  const { ratings, onViewDetails, onTrack, isTracking } = props;
  return (
    <div className="detailButtons">
      <div>
        <Button as="div" labelPosition="right" className="track_btn">
          <Button icon className="track_wrap" onClick={onTrack}>
            <img src={Hotspot} alt="hotspot" />
            <span>{isTracking ? 'Tracking' : 'Track Now'}</span>
          </Button>
          <Label as="a" basic pointing="left" className="btn_lbl">
            <span className="rating_name">Rating</span>
            <span className="rating_num">{ratings}</span>
          </Label>
        </Button>
      </div>
      <div>
        <Button primary className="view_detail_btn" onClick={onViewDetails}>
          <span>View Details</span>
        </Button>
      </div>
    </div>
  );
};

export default DetailButtons;
