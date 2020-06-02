import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const VideoItem = ({ video, onVideoSelect, selectArea }) => {
  const thumbnailSrc = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  return (
    <Card
      onClick={() => {
        onVideoSelect(video);
        selectArea(video.area);
      }}
    >
      <Image src={thumbnailSrc} wrapped ui={false} />
      <i className="fab fa-youtube" />
      <Card.Content>
        <Card.Header className="VideoItem__title">{video.title}</Card.Header>
        <Card.Description className="VideoItem__description">{video.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default VideoItem;
