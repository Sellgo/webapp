import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Slider({ onVideoSelect, screenWidth, selectCategory, data, category }) {
  const mode = data.length <= 1 ? false : screenWidth <= 500 ? false : true;

  const slidePercentage =
    screenWidth >= 1920
      ? 30
      : screenWidth >= 1440
      ? 25
      : screenWidth >= 1024
      ? 40
      : screenWidth >= 768
      ? 60
      : 80;

  const showArrow = data.length > 2 ? true : screenWidth <= 768 ? true : false;

  const showIndicator = data.length === 1 ? false : true;

  const container = (
    <Grid.Column>
      <Header className="Slider__title" as="h1">
        <Header.Content>{category}</Header.Content>
      </Header>
      <Carousel
        centerSlidePercentage={slidePercentage}
        showIndicators={showIndicator}
        showArrows={showArrow}
        showStatus={false}
        showThumbs={false}
        centerMode={mode}
      >
        {data.map(video => {
          return (
            <div
              key={video.id}
              onClick={() => {
                onVideoSelect(video);
                selectCategory(category);
              }}
            >
              <img alt={video.title} src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} />
              <i className="fab fa-youtube" />
              <Header className="Slider__detail" as="h1">
                {video.title}
                <Header.Subheader>{video.description}</Header.Subheader>
              </Header>
            </div>
          );
        })}
      </Carousel>
    </Grid.Column>
  );

  return container;
}

export default Slider;
