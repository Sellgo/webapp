import * as React from 'react';
import { VideoDetails, VideoList } from './Playlist';
import { Props, Videos } from './Interfaces';
import { onboardingVideos } from '../../constants/UserOnboarding';
import { Header, Grid } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.scss';

function Slider({ onVideoSelect, screenWidth, selectArea, data, area }: Props) {
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
        <Header.Content>{area}</Header.Content>
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
                selectArea(area);
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

class Onboarding extends React.Component {
  state = {
    selectedVideo: [],
    screenWidth: 0,
    videos: [],
    area: '',
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };

  onVideoSelect = (video: Videos) => {
    let excludeVideo = 0;
    const videoList = onboardingVideos
      .map(value => {
        const concatVideos: Videos[] = [];
        return concatVideos.concat(value.path);
      })
      .reduce((current, initial) => [...current, ...initial], []);

    videoList.forEach((value: Videos, index: number) => {
      if (value.id === video.id) {
        excludeVideo = index;
      }
    });
    videoList.splice(0, excludeVideo + 1);

    this.setState({ videos: videoList, selectedVideo: video });
  };

  selectArea = (area: string) => {
    this.setState({ area: area });
  };

  removeInitial = () => {
    this.setState({ selectedVideo: [] });
  };

  render() {
    const { selectedVideo, videos, area, screenWidth } = this.state;
    const hasUpNext = `${!Object.keys(videos).length ? 'Onboarding__playlist upnext' : ''}`;

    const listOfVideos = onboardingVideos.map((list, index) => {
      return (
        <Grid.Row className="Slider__container" key={index}>
          <Slider
            onVideoSelect={this.onVideoSelect}
            screenWidth={screenWidth}
            selectArea={this.selectArea}
            data={list.path}
            area={list.area}
          />
        </Grid.Row>
      );
    });

    if (Object.keys(selectedVideo).length) {
      return (
        <Grid className="Onboarding__container">
          <Header
            onClick={() => this.removeInitial()}
            className="Onboarding__playlist back"
            as="h1"
          >
            <i className="fas fa-chevron-left" /> Back to Tutorial Videos
          </Header>
          <Grid.Row columns={2}>
            <Grid.Row>
              <Header className="Onboarding__playlist title" as="h1">
                {area}
              </Header>
            </Grid.Row>
            <Grid.Row className="Onboarding__player container">
              <Grid.Column className="Onboarding__player">
                <VideoDetails video={selectedVideo} />
              </Grid.Column>
              <Grid.Column className={hasUpNext}>
                <Header className="Onboarding__playlist related" as="h1">
                  Up next:
                </Header>
                <VideoList onVideoSelect={this.onVideoSelect} videos={videos} />
              </Grid.Column>
            </Grid.Row>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid className="Onboarding__page">
          <Header className="Onboarding__tutorial" as="h1">
            Tutorial Videos
          </Header>
          {listOfVideos}
        </Grid>
      );
    }
  }
}

export default Onboarding;
