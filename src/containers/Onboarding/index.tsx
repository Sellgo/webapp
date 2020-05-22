import * as React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Header, Grid } from 'semantic-ui-react';
import { onboardingVideos } from '../../constants/UserOnboarding';
import { VideoDetails, VideoList } from './Playlist';
import './index.scss';

interface Videos {
  description: string;
  title: string;
  url: string;
  id: string;
}

interface Props {
  selectPlaylist: Function;
  onVideoSelect: Function;
  selectArea: Function;
  screenWidth: number;
  data: Videos[];
  index: number;
  area: string;
}

function Slider({
  area,
  data,
  selectPlaylist,
  index,
  onVideoSelect,
  selectArea,
  screenWidth,
}: Props) {
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
        showThumbs={false}
        centerMode={mode}
        showStatus={false}
        showArrows={showArrow}
        showIndicators={showIndicator}
      >
        {data.map((video: Videos) => {
          return (
            <div
              key={video.id}
              onClick={() => {
                selectPlaylist(onboardingVideos[index].path);
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
    screenWidth: 0,
    area: '',
    videos: [],
    selectedVideo: [],
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

  onVideoSelect = (video: any) => {
    this.setState({ selectedVideo: video });
  };

  selectPlaylist = (video: any) => {
    this.setState({ videos: video });
  };

  selectArea = (area: any) => {
    this.setState({ area: area });
  };

  removeInitial = () => {
    this.setState({ videos: [] });
  };

  render() {
    const { selectedVideo, videos, area, screenWidth } = this.state;
    const listOfVideos = onboardingVideos.map((list, index) => {
      return (
        <Grid.Row className="Slider__container" key={index}>
          <Slider
            selectPlaylist={this.selectPlaylist}
            onVideoSelect={this.onVideoSelect}
            selectArea={this.selectArea}
            screenWidth={screenWidth}
            data={list.path}
            index={index}
            area={list.area}
          />
        </Grid.Row>
      );
    });

    if (this.state.videos.length) {
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
              <Grid.Column>
                <Header className="Onboarding__playlist related" as="h1">
                  Up next:
                </Header>
                <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
              </Grid.Column>
            </Grid.Row>
          </Grid.Row>
        </Grid>
      );
    } else {
      return (
        <Grid className="onboarding-page">
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
