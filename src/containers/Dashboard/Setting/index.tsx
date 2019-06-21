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
import {
  setBasicInfoSeller,
  updateBasicInfoSeller,
  getBasicInfoSeller,
  setAmazoneMWS,
  updateAmazoneMWS,
  field,
  infoField,
  infoMWS,
} from '../../../Action/SettingActions';
import './setting.css';

interface State {
  isOpen: boolean;
}

interface Props {
  setBasicInfoSeller(data: field): Function;

  setAmazoneMWS(data: field): Function;

  updateBasicInfoSeller(data: infoField): Function;

  updateAmazoneMWS(id: string, data: infoMWS): Function;

  getBasicInfoSeller(): Function;

  sellerData: infoField;
  amazoneData: infoMWS;
}

class Setting extends React.Component<Props, State> {
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

  componentDidMount() {
    this.props.getBasicInfoSeller();
  }

  updateBasicInfoSeller = () => {
    const { name, firstName, lastName, id, email, auth0_user_id } = this.props.sellerData;
    const data = { name: `${firstName} ${lastName}`, id, email, auth0_user_id };
    this.props.updateBasicInfoSeller(data);
    this.handleModel();
  };
  updateAmazoneMWS = () => {
    const { id } = this.props.sellerData;
    const { seller_id, marketplace_id, token } = this.props.amazoneData;
    const data = {
      seller_id: seller_id || id,
      marketplace_id,
      token,
    };
    this.props.updateAmazoneMWS(id, data)
    this.handleModel()
  };
  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  setBasicInfoSeller = (e: any) => {
    const data = {
      key: e.target.name,
      value: e.target.value,
    };
    this.props.setBasicInfoSeller(data);
  };
  setAmazoneMWS = (e: any) => {
    const data = {
      key: e.target.name,
      value: e.target.value,
    };
    this.props.setAmazoneMWS(data);
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
                          <Form.Input
                            label="First Name"
                            placeholder="First Name"
                            name="firstName"
                            onChange={e => this.setBasicInfoSeller(e)}
                          />
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Form.Input
                            label="Last Name"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={e => this.setBasicInfoSeller(e)}
                          />
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Form.Input
                            label="Email"
                            placeholder="Email"
                            name="email"
                            onChange={e => this.setBasicInfoSeller(e)}
                            fluid={true}
                          />
                          <Button
                            primary={true}
                            content="Update Information"
                            onClick={this.updateBasicInfoSeller}
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
                      name="marketplace_id"
                      onChange={(e: any) => this.setAmazoneMWS(e)}
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
                    <Form.Input
                      label="Amazon Seller ID"
                      placeholder="Amazon Seller ID"
                      name="seller_id"
                      onChange={e => this.setAmazoneMWS(e)}
                    />
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Form.Input
                      label="MWS Auth Token"
                      placeholder="MWS Auth Token"
                      name="token"
                      onChange={e => this.setAmazoneMWS(e)}
                    />
                    <Button
                      primary={true}
                      content="Add MWS Toekn"
                      onClick={this.updateAmazoneMWS}
                      style={{ borderRadius: '50px' }}
                    />
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
const mapStateToProps = (state: any) => ({
  sellerData: state.settings.get('profile'),
  amazoneData: state.settings.get('amazoneMWS'),
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateBasicInfoSeller: (info: infoField) => dispatch(updateBasicInfoSeller(info)),
    updateAmazoneMWS: (id: string, info: infoMWS) => dispatch(updateAmazoneMWS(id, info)),
    setBasicInfoSeller: (data: field) => dispatch(setBasicInfoSeller(data)),
    setAmazoneMWS: (data: field) => dispatch(setAmazoneMWS(data)),
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
