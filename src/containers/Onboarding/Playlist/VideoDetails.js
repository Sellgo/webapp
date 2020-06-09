import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

const VideoDetail = ({ video }) => {
  return (
    <React.Fragment>
      <Grid>
        <iframe
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          allowFullScreen="allowfullscreen"
          className="VideoDetail__frame"
          allow="autoplay"
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
