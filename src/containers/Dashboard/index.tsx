import * as React from 'react';
import { Button, Container, Header, Image, Segment, SemanticSIZES, Step } from 'semantic-ui-react';
import { Modals } from '../../components/Modals';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import './Dashboard.css';
import DashBoardTabs from './Tabs/tabs';
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';

export const Logo: React.SFC<{ size?: SemanticSIZES; centered?: boolean }> = ({
  size,
  centered,
}) => (
  <Image
    ui={true}
    size={size || ('tiny' as SemanticSIZES)}
    centered={centered || false}
    src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
  />
);

interface State {
  isOpen: boolean;
  currentSteps: number;
}

interface DashboardProps {}

class Dashboard extends React.Component<DashboardProps, State> {
  componentDidMount() {
    const visited = localStorage.getItem('FirstLogin');
    if (!visited) {
      localStorage['FirstLogin'] = true;
      this.setState({ isOpen: true });
    }
  }

  public state = {
    isOpen: false,
    currentSteps: 1,
    totalStep: 4,
  };
  public close = () => {
    this.setState({
      isOpen: false,
    });
  };

  public closeIntroMadal = () => {
    this.setState({
      isOpen: false,
    });
  };

  public onNext = () => {
    if (this.state.currentSteps !== 4) {
      this.setState({
        currentSteps: this.state.currentSteps + 1,
      });
    } else {
      this.closeIntroMadal();
    }
  };

  public onBack = () => {
    if (this.state.currentSteps !== 0) {
      this.setState({
        currentSteps: this.state.currentSteps - 1,
      });
    }
  };

  public render() {
    const { isOpen, currentSteps } = this.state;
    return (
      <>
        <PageHeader title="Dashboard" />
        <Segment basic={true} className="setting">
          <DashBoardTabs />
          <Modals title="" size="small" open={isOpen} close={this.close} bCloseIcon={false}>
            <Container textAlign="center">
              <Segment textAlign="center" basic={true}>
                <Logo size="small" centered={true} />
              </Segment>
              <Segment textAlign="center" basic={true}>
                <Header.Content>
                  With little time investment to follow our training, and with the power of data
                  automation, <br />
                  and tools, you will find profitable products to sell on Amazon instantly.
                </Header.Content>
              </Segment>
              <Segment basic={true}>
                <Step.Group className="round">
                  <Step completed={currentSteps > 1} active={currentSteps === 1}>
                    <Step.Content>
                      <Step.Title>1</Step.Title>
                    </Step.Content>
                    <Step.Description>Welcome and tutorial</Step.Description>
                  </Step>
                  <Step completed={currentSteps > 2} active={currentSteps === 2}>
                    <Step.Content>
                      <Step.Title>2</Step.Title>
                      <Step.Description>Email confirmation</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step completed={currentSteps > 3} active={currentSteps === 3}>
                    <Step.Content>
                      <Step.Title>3</Step.Title>
                      <Step.Description>Billing setup</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step completed={currentSteps > 4} active={currentSteps === 4}>
                    <Step.Content>
                      <Step.Title>4</Step.Title>
                      <Step.Description>Account setup</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
              </Segment>
              <Segment textAlign="center" basic={true}>
                {currentSteps > 1 ? (
                  <Button style={buttonStyle} content="Previous" onClick={this.onBack} />
                ) : null}
                <Button
                  style={buttonStyle}
                  onClick={this.onNext}
                  content={currentSteps > 1 ? 'Next' : 'Get Started'}
                />
              </Segment>
            </Container>
          </Modals>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
