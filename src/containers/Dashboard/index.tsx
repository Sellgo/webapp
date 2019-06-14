import * as React from "react";
import {Header, Segment, SemanticSIZES, Image, Button, Container, Step} from "semantic-ui-react";
import {AdminLayout} from "../../components/AdminLayout";
import {Modals} from "../../components/Modals";
import DashBoardTabs from "./Tabs/tabs";
import "./Dashboard.css";

export const Logo: React.SFC<{ size?: SemanticSIZES, centered?: boolean }> = ({size, centered}) => (
  <Image
    ui
    size={size || "tiny" as SemanticSIZES}
    centered={centered || false}
    src="https://user-images.githubusercontent.com/1359333/57185902-c66b3380-6e89-11e9-92ce-c5f0ef137eca.png"
  />
);

export class Dashboard extends React.Component {
  state = {
    isOpen: true,
    currentSteps:1,
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

  render() {
    const {isOpen,currentSteps} = this.state
  
    return (
      <AdminLayout>
        <Header as="h1">Dashboard</Header>
        <Segment>
          <DashBoardTabs></DashBoardTabs>
        </Segment>
        <Modals title='' size='small' open={isOpen} close={this.close}>
          <Container textAlign='center'>
            <Segment textAlign='center' basic>
              <Logo size='medium' centered/>
            </Segment>
            <Segment textAlign='center' basic>
              <Header.Content>With little time investment to follow our training, and with the power of data automation, <br/>
              and tools, you will find profitable products to sell on Amazon instantly.</Header.Content>
            </Segment>

            <Segment textAlign='center' basic>
              <Step.Group size='small' className="round">
                <Step completed={currentSteps > 1} active={currentSteps === 1}>
                  <Step.Content>
                    <Step.Title>1</Step.Title>
                  </Step.Content>
                </Step>        
                <Step completed={currentSteps > 2} active={currentSteps === 2}>
                  <Step.Content>
                    <Step.Title>2</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
              </Segment>
            <Segment textAlign='center' basic>
              <Button primary content="Get started" onClick={this.closeIntroMadal}/>
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
