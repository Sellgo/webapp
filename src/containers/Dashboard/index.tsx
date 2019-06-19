import * as React from "react";
import {Button, Container, Header, Image, Segment, SemanticSIZES, Step} from "semantic-ui-react";
import {AdminLayout} from "../../components/AdminLayout";
import {Modals} from "../../components/Modals";
import buttonStyle from "../../components/StyleComponent/StyleComponent";
import "./Dashboard.css";
import DashBoardTabs from "./Tabs/tabs";

export const Logo: React.SFC<{ size?: SemanticSIZES, centered?: boolean }> = ({size, centered}) => (
  <Image
    ui
    size={size || "tiny" as SemanticSIZES}
    centered={centered || false}
    src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
  />
);

interface state {
  isOpen: boolean,
  currentSteps: number,
}

export class Dashboard extends React.Component<{}, state> {
  state = {
    isOpen: true,
    currentSteps: 1,
    totalStep: 4
  };
  close = () => {
    this.setState({
      isOpen: false
    })
  };

  closeIntroMadal = () => {
    this.setState({
      isOpen: false
    })
  };

  onNext = () => {
    if (this.state.currentSteps !== 4) {
      this.setState({
        currentSteps: this.state.currentSteps + 1,
      })
    }
    else {
      this.closeIntroMadal();
    }
  };

  onBack = () => {
    if (this.state.currentSteps !== 0) {
      this.setState({
        currentSteps: this.state.currentSteps - 1,
      })
    }
  };


  render() {
    const {isOpen, currentSteps} = this.state;
    return (
      <AdminLayout>
        <Header as="h1">Dashboard</Header>
        <Segment>
          <DashBoardTabs/>
        </Segment>
        <Modals title='' size='small' open={isOpen} close={this.close}>
          <Container textAlign='center'>
            <Segment textAlign='center' basic>
              <Logo size='small' centered/>
            </Segment>
            <Segment textAlign='center' basic>
              <Header.Content>With little time investment to follow our training, and with the power of data automation, <br/>
              and tools, you will find profitable products to sell on Amazon instantly.</Header.Content>
            </Segment>
            <Segment basic>
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
            <Segment textAlign='center' basic>
              {currentSteps > 1 ? <Button style={buttonStyle} content="Previous" onClick={this.onBack}/> : null}
              <Button style={buttonStyle}
                      onClick={this.onNext}
                      content={currentSteps > 1 ? "Next" : "Get Started"}/>
            </Segment>
          </Container>
        </Modals>
        {/* <Modals title='' size='small' open={isSettingModalsOpen} close={this.closeSettingModal}>
          <Container textAlign='center'>
            <Segment textAlign='center' size='massive' basic>
              Setting Up Your Bridge
            </Segment>
            <Segment textAlign='center' basic>
              The first thing a new member should do is set up your Amazon MWS keys
            </Segment>
            <Segment textAlign='center' basic>
              so the software will search effectively for you.
            </Segment>
            <Segment textAlign='center' basic>
              You should have an Amazon Professional Seller account for this.
            </Segment>
            <Segment textAlign='center' basic>
              <Button primary content="Let's do this" onClick={this.closeSettingModal}/>
              <Button primary content="Maybe later" onClick={this.closeSettingModal}/>
            </Segment>
          </Container>
        </Modals> */}
      </AdminLayout>
    );
  }
}
