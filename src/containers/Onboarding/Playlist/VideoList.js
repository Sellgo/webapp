import React from 'react';
import { Grid } from 'semantic-ui-react';
import VdieoItem from './VideoItem';

const VideoList = ({ videos, onVideoSelect, selectCategory }) => {
  const listOfVideos = videos.map((video, id) => (
    <VdieoItem
      onVideoSelect={onVideoSelect}
      selectCategory={selectCategory}
      key={id}
      video={video}
    />
  ));

  return <Grid className="VideoList__container">{listOfVideos}</Grid>;
};
export default VideoList;
