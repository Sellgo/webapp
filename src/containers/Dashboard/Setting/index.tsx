import * as React from 'react';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Select,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import MesssageComponent from '../../../components/MessageComponent';
import { Modals } from '../../../components/Modals';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import './setting.css';

interface State {
  isOpen: boolean;
}

export class Setting extends React.Component<{}, State> {
  state = {
    isOpen: false,
  };
  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
  };

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const memberDate = `May 5 2018`;
    const { isOpen } = this.state;

    return (
      <Segment basic={true} className="setting">
        <Header as="h2">Basic Information</Header>
        <Divider />
        <Segment basic={true} padded="very">
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3} textAlign="center" className="upload-photo">
                  <Image
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    size="small"
                    floated="left"
                  />
                  <Button
                    basic={true}
                    content="Upload Photo"
                    style={{ borderRadius: '50px' }}
                    size="small"
                  />
                </Grid.Column>
                <Grid.Column width={13}>
                  <Header as="h6" size="small">
                    member since: {memberDate}
                  </Header>
                  <Form>
                    <Grid className="basic-info-update">
                      <Grid.Row columns={2}>
                        <Grid.Column width={5}>
                          <Form.Input label="First Name" placeholder="First Name" />
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Form.Input label="Last Name" placeholder="Last Name" />
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Form.Input label="Email" placeholder="Email" fluid={true} />
                          <Button
                            primary={true}
                            content="Update Information"
                            onClick={this.handleModel}
                            style={{ borderRadius: '50px' }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Header as="h2">Password</Header>
        <Divider />
        <Segment basic={true} padded="very">
          <Container>
            <Form>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Form.Input type="password" label="Old Password" placeholder="Old" />
                  </Grid.Column>
                  <Grid.Column width={11} />
                  <Grid.Column width={5}>
                    <Form.Input type="password" label="New Password" placeholder="New Password" />
                    <Button
                      primary={true}
                      content="Update Password"
                      style={{ borderRadius: '50px' }}
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form.Input label="Retype New Password" placeholder="Retype New Password" />
                  </Grid.Column>
                  <Grid.Column width={6} />
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
        </Segment>
        <Header as="h2">Amazon MWS Authorization</Header>
        <Divider />
        <Segment basic={true}>
          <Container>
            <span className="autho-sub-hear">
              Please grant Amazon MWS and Amazon Seller Central access for each market.
            </span>
            <Form className="autho-form">
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Form.Field
                      control={Select}
                      label="Marketplace"
                      options={[{ key: 'n', text: 'None', value: 'none' }]}
                      placeholder="select"
                    />
                  </Grid.Column>
                  <Grid.Column width={5} verticalAlign="bottom">
                    <Button
                      primary={true}
                      content="Show me how >>"
                      style={{ borderRadius: '50px' }}
                    />
                  </Grid.Column>
                  <Grid.Column width={6} />
                  <Grid.Column width={9}>
                    <Form.Input label="Amazon Seller ID" placeholder="Amazon Seller ID" />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Form.Input label="MWS Auth Token" placeholder="MWS Auth Token" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
          <Modals title="" size="small" open={isOpen} close={this.handleModel}>
            <Container textAlign="center">
              <MesssageComponent message={this.message} isModal={true} />
              <Segment textAlign="center" basic={true}>
                <Button style={buttonStyle} content="Ok" onClick={this.handleModel} />
              </Segment>
            </Container>
          </Modals>
        </Segment>
      </Segment>
    );
  }
}
const mapStateToProps = (state :any) => ({
  data: state,
});

 const mapDispatchToProps = (dispatch :any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
