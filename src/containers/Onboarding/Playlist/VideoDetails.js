import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

const VideoDetail = ({ video }) => {
  return (
    <React.Fragment>
      <Grid>
        <iframe
          allow="autoplay"
          className="VideoDetail__frame"
          allowFullScreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          webkitallowfullscreen="webkitallowfullscreen"
          src={video.url}
        />
      </Grid>
      <Grid>
        <Header as="h1">
          {video.title}
          <Header.Subheader>
            Video Description: <br />
            {video.description}
          </Header.Subheader>
        </Header>
      </Grid>
    </React.Fragment>
  );
};

export default VideoDetail;
