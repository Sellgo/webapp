import * as React from 'react';
import { VideoDetails, VideoList, VideoSlider } from './Playlist';
import { onboardingVideos } from '../../constants/UserOnboarding';
import { Header, Grid } from 'semantic-ui-react';
import { Videos } from './Interfaces';
import './index.scss';

class Onboarding extends React.Component {
  state = {
    selectedVideo: [],
    screenWidth: 0,
    videos: [],
    category: '',
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
        const mutatedPath = value.path.map(properties => {
          const addProperties = { category: value.category };
          const newProperties = Object.assign(properties, addProperties);
          return newProperties;
        });

        const concatVideos: Videos[] = [];
        return concatVideos.concat(mutatedPath);
      })
      .reduce((current, initial) => [...current, ...initial], []);

    videoList.forEach((value: Videos, index: number) => {
      if (value.id === video.id) excludeVideo = index;
    });
    videoList.splice(0, excludeVideo + 1);

    this.setState({ videos: videoList, selectedVideo: video });
  };

  selectCategory = (category: string) => {
    this.setState({ category: category });
  };

  removeInitial = () => {
    this.setState({ selectedVideo: [] });
  };

  render() {
    const { selectedVideo, videos, category, screenWidth } = this.state;

    const listOfVideos = onboardingVideos.map((list, index) => {
      return (
        <Grid.Row className="Slider__container" key={index}>
          <VideoSlider
            onVideoSelect={this.onVideoSelect}
            screenWidth={screenWidth}
            selectCategory={this.selectCategory}
            data={list.path}
            category={list.category}
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
                {category}
              </Header>
            </Grid.Row>
            <Grid.Row className="Onboarding__player container">
              <Grid.Column className="Onboarding__player">
                <VideoDetails video={selectedVideo} />
              </Grid.Column>
              <Grid.Column className="Onboarding__playlist upnext">
                <Header className="Onboarding__playlist related" as="h1">
                  Up next:
                </Header>
                <VideoList
                  onVideoSelect={this.onVideoSelect}
                  selectCategory={this.selectCategory}
                  videos={videos}
                />
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
