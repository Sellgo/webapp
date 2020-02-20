/* eslint-disable max-len */
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Grid } from 'semantic-ui-react';

function CarousalItem(props: any) {
  // Correct! There is no need to specify the key here:
  return (
    <div>
      <img className="slider-image" alt="" src={props.imageUrl} />
      <h1 className="title">{props.title}</h1>
      <p className="description">{props.description}</p>
    </div>
  );
}

function IntroSlider() {
  const items = [
    {
      id: 1,
      imageUrl: 'images/intro.png',
      title: 'Titile of the  image 1',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      imageUrl: 'images/intro.png',
      title: 'Titile of the  image 2',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      imageUrl: 'images/intro.png',
      title: 'Titile of the  image 3',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];
  const listItems = items.map(item => (
    // Correct! Key should be specified inside the array.
    <CarousalItem
      key={item.id}
      imageUrl={item.imageUrl}
      title={item.title}
      description={item.description}
    />
  ));
  return (
    <Grid verticalAlign="middle" className="signup-box">
      <Grid.Row>
        <Grid.Column className="slider-center" width={7}>
          <Carousel showThumbs={false} showStatus={false} showArrows={false} autoPlay={true}>
            {listItems}
          </Carousel>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default IntroSlider;
