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
import moment from 'moment';
import MesssageComponent from '../../../components/MessageComponent';
import { Modals } from '../../../components/Modals';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import {
  setBasicInfoSeller,
  updateBasicInfoSeller,
  getBasicInfoSeller,
  setAmazonMWS,
  updateAmazonMWS,
  Field,
  SellField,
  MWSinfo,
} from '../../../Action/SettingActions';
import './setting.css';
import { marketPlace } from '../../../constant/constant';
import RecoverPass from '../../RecoverPass';
import { AdminLayout } from '../../../components/AdminLayout';

interface State {
  isOpen: boolean;
}

interface MarketPlaceType {
  name?: string;
  id?: string;
  code?: string;
  link?: string;
}

interface Props {
  setBasicInfoSeller(data: Field): () => void;

  setAmazonMWS(data: Field): () => void;

  updateBasicInfoSeller(data: SellField): () => void;

  updateAmazonMWS(id: string, data: MWSinfo): () => void;

  getBasicInfoSeller(): () => void;

  sellerData: SellField;
  amazonData: MWSinfo;
  isUpdate: boolean;
  match: { params: { auth: null } };

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
    this.message.title = 'Information Updated';
    this.message.message = 'Thank you for Updating';
    this.message.description = 'You have successfully updated new information.';
    const { name, firstName, lastName, id, email, auth0_user_id } = this.props.sellerData;
    const data = { name: `${firstName} ${lastName}`, id, email, auth0_user_id };
    this.props.updateBasicInfoSeller(data);
  };

  componentWillReceiveProps(props: any) {
    if (props.isUpdate) {
      this.handleModel();
    }
  }

  updateAmazonMWS = () => {
    const { id } = this.props.sellerData;
    const { seller_id, marketplace_id, token } = this.props.amazonData;
    const data = {
      seller_id,
      marketplace_id,
      token,
    };
    if (seller_id === '' || marketplace_id === '' || token === '') {
      this.message.title = 'Failed';
      this.message.message = 'Update Failed!';
      this.message.description = 'All fields must be filled';
      this.handleModel();
    } else {
      this.message.title = 'Information Updated';
      this.message.message = 'Thank you for Updating';
      this.message.description = 'You have successfully updated new information.';
      this.props.updateAmazonMWS(id, data);
    }
  };

  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };
  isSuccessReset = (data: any) => {
    this.message.title = 'Reset Password';
    this.message.message = data.isFailed ? 'Password Reset Failed!' : 'Password Reset Successful!';
    this.message.description = data.isFailed
      ? data.errorMsg
      : 'Please Check Your Email For Further Instruction.';
    this.handleModel();
  };
  setBasicInfoSeller = (e: any) => {
    const data = {
      key: e.target.name,
      value: e.target.value,
    };
    this.props.setBasicInfoSeller(data);
  };
  setAmazonMWS = (e: any) => {
    const data = {
      key: e.target.name,
      value: e.target.value,
    };
    this.props.setAmazonMWS(data);
  };

  setAmazonMWSPlace = (e: any, field: any) => {
    const data = {
      key: field.name,
      value: field.value,
    };
    this.props.setAmazonMWS(data);
  };
  getmarketplaceDATA = (id: string) => {
    const data = marketPlace.filter(data => data.id === id);
    return data && data[0];
  };

  showMeHow = (howUrl: string) => {
    if (howUrl !== '') {
      window.open(howUrl);
    } else {
      this.message.title = 'Failed';
      this.message.message = 'Marketplace Failed';
      this.message.description = 'Please choose a Marketplace.';
      this.handleModel();
    }
  };

  render() {
    const { cdate } = this.props.sellerData;

    const memberDate = moment(cdate || moment()).format('MMM DD YYYY');
    const { isOpen } = this.state;
    const marketPlaceoptions = new Array();
    marketPlace.map((opt, key) => {
      marketPlaceoptions.push({ key, text: opt.name, value: opt.id });
    });
    const { marketplace_id } = this.props.amazonData;
    const marketplaceDATA = this.getmarketplaceDATA(marketplace_id);
    const { firstName, lastName, email } = this.props.sellerData;

    let howUrl = '';
    if (marketplaceDATA) {
      howUrl = `https://sellercentral.${
        marketplaceDATA.link
        }/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=Denverton-${
        marketplaceDATA.code
        }&devMWSAccountId=${'4294-2444-1812'}`;
    }

    return (
      <AdminLayout auth={this.props.match.params.auth} sellerData={this.props.sellerData} title={"Setting"}>
        <Segment basic={true} className="setting">
          <Header as="h2">Basic Information</Header>
          <Divider/>
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
                      Member since: {memberDate}
                    </Header>
                    <Form>
                      <Grid className="basic-info-update">
                        <Grid.Row columns={2}>
                          <Grid.Column width={5}>
                            <Form.Input
                              label="First Name"
                              placeholder="First Name"
                              name="firstName"
                              value={firstName}
                              onChange={e => this.setBasicInfoSeller(e)}
                            />
                          </Grid.Column>
                          <Grid.Column width={5}>
                            <Form.Input
                              label="Last Name"
                              placeholder="Last Name"
                              name="lastName"
                              value={lastName}
                              onChange={e => this.setBasicInfoSeller(e)}
                            />
                          </Grid.Column>
                          <Grid.Column width={10}>
                            <Form.Input
                              label="Email"
                              placeholder="Email"
                              name="email"
                              value={email}
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
          <Divider/>
          <Segment basic={true} padded="very">
            <Container>
              <Form>
                <Grid>
                  <Grid.Row columns={1}>
                    <Grid.Column width={12}>
                      <RecoverPass onlyEmail={true} isSuccessReset={this.isSuccessReset}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Container>
          </Segment>
          <Header as="h2">Amazon MWS Authorization</Header>
          <Divider/>
          <Segment basic={true}>
            <Container>
            <span className="autho-sub-hear">
              Please grant Amazon MWS and Amazon Seller Central access for each market.
            </span>
              <Form className="autho-form">
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={5}>
                      <Form.Select
                        control={Select}
                        label="Marketplace"
                        options={marketPlaceoptions}
                        placeholder="select"
                        name="marketplace_id"
                        onChange={this.setAmazonMWSPlace}
                      />
                    </Grid.Column>
                    <Grid.Column width={5} verticalAlign="bottom">
                      <Button
                        primary={true}
                        content="Show me how >>"
                        style={{ borderRadius: '50px' }}
                        onClick={() => this.showMeHow(howUrl)}
                      />
                    </Grid.Column>
                    <Grid.Column width={6}/>
                    <Grid.Column width={9}>
                      <Form.Input
                        label="Amazon Seller ID"
                        placeholder="Amazon Seller ID"
                        name="seller_id"
                        onChange={e => this.setAmazonMWS(e)}
                      />
                    </Grid.Column>
                    <Grid.Column width={9}>
                      <Form.Input
                        label="MWS Auth Token"
                        placeholder="MWS Auth Token"
                        name="token"
                        onChange={e => this.setAmazonMWS(e)}
                      />
                      <Button
                        primary={true}
                        content="Add MWS Token"
                        onClick={this.updateAmazonMWS}
                        style={{ borderRadius: '50px' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Container>
            <Modals title="" size="small" open={isOpen} close={this.handleModel}>
              <Container textAlign="center">
                <MesssageComponent message={this.message} isModal={true}/>
                <Segment textAlign="center" basic={true}>
                  <Button style={buttonStyle} content="Ok" onClick={this.handleModel}/>
                </Segment>
              </Container>
            </Modals>
          </Segment>
        </Segment>
      </AdminLayout>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerData: state.settings.get('profile'),
  amazonData: state.settings.get('amazonMWS'),
  isUpdate: state.settings.get('success'),

});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateBasicInfoSeller: (info: SellField) => dispatch(updateBasicInfoSeller(info)),
    updateAmazonMWS: (id: string, info: MWSinfo) => dispatch(updateAmazonMWS(id, info)),
    setBasicInfoSeller: (data: Field) => dispatch(setBasicInfoSeller(data)),
    setAmazonMWS: (data: Field) => dispatch(setAmazonMWS(data)),
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
