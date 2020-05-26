import React from 'react';
import { Grid } from 'semantic-ui-react';
import VdieoItem from './VideoItem';

const VideoList = ({ videos, onVideoSelect }) => {
  const listOfVideos = videos.map((video, id) => (
    <VdieoItem onVideoSelect={onVideoSelect} key={id} video={video} />
  ));

  return <Grid className="VideoList__container">{listOfVideos}</Grid>;
};
export default VideoList;
