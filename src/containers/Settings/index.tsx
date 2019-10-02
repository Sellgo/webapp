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
  Icon,
  Select,
  Modal,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  updateSellerInfo,
  updateSellerAmazonMWSAuth,
  getSellerInfo,
  getSellerAmazonMWSAuth,
  deleteSellerAmazonMWSAuth,
  updateSellerProfileImage,
  getSellerprofileImage,
  setSellerInfo,
} from '../../actions/Settings';
import './setting.css';
import { defaultMarketPlaces } from '../../constants/Settings';
import AdminLayout from '../../components/AdminLayout';
import Auth from '../../components/Auth/Auth';
import { Seller, AmazonMWS } from '../../interfaces/Seller';
import { error } from '../../utils/notifications';

interface SettingsProps {
  updateAmazonMWSAuth: (data: AmazonMWS) => void;
  getAmazonMWSAuth: () => void;
  deleteMWSAuth: (mwsAuthID: any) => void;
  getSeller: () => void;
  updateSeller: (data: any) => void;
  setSeller: (data: any) => void;
  getprofileImage: () => void;
  updateProfileImage: (imageType: string, imagePath: any) => void;
  match: { params: { auth: Auth } };
  profile: Seller;
  amazonMWSAuth: AmazonMWS[];
  profileImage: any;
}

class Settings extends React.Component<SettingsProps> {
  state = {
    isOpen: false,
    isAmazonMWSAuthInfoOpen: false,
    isDeleteModalOpen: false,
    isImageSelected: false,
    isImageUploadUnderProgress: false,
    imageFile: {
      type: '',
    },
    imageView: '',
  };

  fileInputRef: any = React.createRef();

  componentDidMount() {
    const { getAmazonMWSAuth, getSeller, getprofileImage } = this.props;
    getSeller();
    getprofileImage();
    getAmazonMWSAuth();
  }

  fileChange = (event: any): void => {
    if (event.target.files.length > 0) {
      this.setState({
        imageFile: event.target.files[0],
        imageView: URL.createObjectURL(event.target.files[0]),
        isImageSelected: true,
      });
    }
  };

  render() {
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.profile}
        title={'Settings'}
      >
        <Segment basic={true} className="setting">
          <Header as="h2">Basic Information</Header>
          <Divider />
          <this.SellerInformation />
          <Divider />
          <Header as="h2">Amazon MWS Authorization</Header>
          <Divider />
        </Segment>
      </AdminLayout>
    );
  }

  /* private SegmentAmazonMWS() {
    const marketPlaceoptions = defaultMarketPlaces.map((opt, key) => {
      return { key, text: opt.name, value: opt.id };
    });
    const { marketplace_id } = this.props.amazonMWSAuth;
    const marketplaceDATA = this.getmarketplaceDATA(marketplace_id);

    let amazonMWSAuth: AmazonMWS | null = null;
    if (marketplace_id.length > 0) {
      for (const amazonmwsobj of this.props.amazonMWSFromServer) {
        if (amazonmwsobj.marketplace_id === marketplace_id && amazonmwsobj.status !== 'inactive') {
          amazonMWSAuth = amazonmwsobj;
        }
      }
    }
    let marketPlaceNameFromServer = '';
    let marketPlaceIDFromServer = '';
    if (amazonMWSAuth != null) {
      const marketplaceFromServer: MarketplaceFields = this.getmarketplaceDATA(
        amazonMWSAuth.marketplace_id
      );
      if (marketplaceFromServer !== undefined) {
        marketPlaceNameFromServer = marketplaceFromServer.name;
        marketPlaceIDFromServer = marketplaceFromServer.id;
      }
    }
    let howUrl = '';
    if (marketplaceDATA) {
      howUrl = `https://sellercentral.${
        marketplaceDATA.link
      }/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=Denverton-${
        marketplaceDATA.code
      }&devMWSAccountId=${'4294-2444-1812'}`;
    }
    return (
      <Segment basic={true} id="amazon-mws">
        <Container style={{ width: '80%' }}>
          <span className="autho-sub-hear">
            Please grant Amazon MWS and Amazon Seller Central access for each market.
          </span>
          <Form className="autho-form">
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column width={7}>
                  <Grid.Row columns={2}>
                    <Grid.Column width={5}>
                      <Form.Select
                        control={Select}
                        label="Marketplace"
                        options={marketPlaceoptions}
                        value={this.props.amazonData.marketplace_id}
                        placeholder="select"
                        name="marketplace_id"
                        onChange={this.setAmazonMWSPlace}
                      />
                    </Grid.Column>
                    <Grid.Column width={5} verticalAlign="bottom" floated={'right'}>
                      <div
                        onClick={() => {
                          this.showMeHow(howUrl);
                        }}
                        style={{
                          cursor: 'pointer',
                          float: 'right',
                        }}
                      >
                        <p style={{ color: '#267DD4' }}> {'Show me how?'}</p>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={6} />
                    <Grid.Column width={10}>
                      <Form.Input
                        label="Amazon Seller ID"
                        placeholder="Amazon Seller ID"
                        value={this.props.amazonData.amazon_seller_id}
                        name="amazon_seller_id"
                        onChange={e => this.setAmazonMWS(e)}
                      />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Input
                        label="MWS Auth Token"
                        placeholder="MWS Auth Token"
                        value={this.props.amazonData.token}
                        name="token"
                        onChange={e => this.setAmazonMWS(e)}
                      />
                      <Button
                        primary={true}
                        disabled={amazonMWSAuth != null}
                        content="Add MWS Token"
                        onClick={this.updateAmazonMWS}
                        style={{ borderRadius: '50px' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                {amazonMWSAuth != null ? (
                  <Grid.Column
                    width={1}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      onClick={() => {
                        this.setState({
                          isAmazonMWSAuthInfoOpen: !this.state.isAmazonMWSAuthInfoOpen,
                        });
                      }}
                    >
                      <Icon
                        size={'big'}
                        color={'blue'}
                        name={
                          this.state.isAmazonMWSAuthInfoOpen
                            ? 'chevron circle left'
                            : 'chevron circle right'
                        }
                        style={{ color: 'black', display: 'inline-block' }}
                      />
                      <p style={{ color: '#267DD4' }}>{'info'}</p>
                    </div>
                  </Grid.Column>
                ) : null}
                {amazonMWSAuth != null ? (
                  <Grid.Column
                    width={8}
                    style={{
                      transition: 'visibility 1s ,opacity 1s',
                      visibility: this.state.isAmazonMWSAuthInfoOpen ? 'visible' : 'hidden',
                      opacity: this.state.isAmazonMWSAuthInfoOpen ? 1 : 0,
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        height: 150,
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          float: 'right',
                        }}
                      >
                        <div
                          onClick={() => {
                            this.setState({ isDeleteModalOpen: true });
                            // this.props.deleteMWSAuth(this.props.amazonData.id);
                          }}
                          style={{
                            borderRadius: '5px',
                            color: '#ffffff',
                            backgroundColor: '#ff0300',
                            width: 34,
                            height: 34,
                            display: 'flex',
                            paddingLeft: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon name={'trash'} size={'large'} style={{ textAlign: 'center' }} />
                        </div>
                      </div>
                      <div
                        style={{
                          overflow: 'hidden',
                          marginRight: 70,
                          backgroundColor: '#f0f0f0',
                          marginBottom: 5,
                          padding: 7,
                        }}
                      >
                        <h4 style={{ float: 'left', marginBottom: 0 }}>{'Amazon Seller ID:'}</h4>
                        <p
                          style={{
                            marginBottom: 0,
                            marginLeft: 15,
                            float: 'left',
                          }}
                        >
                          {amazonMWSAuth.amazon_seller_id}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: 'hidden',
                          marginRight: 70,
                          backgroundColor: '#f0f0f0',
                          marginBottom: 5,
                          padding: 5,
                        }}
                      >
                        <h4 style={{ float: 'left', marginBottom: 0 }}>{'MWS Auth Token:'}</h4>
                        <p
                          style={{
                            marginBottom: 0,
                            marginLeft: 15,
                            float: 'left',
                          }}
                        >
                          {amazonMWSAuth.token}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: 'hidden',
                          marginRight: 70,
                          backgroundColor: '#f0f0f0',
                          marginBottom: 5,
                          padding: 5,
                        }}
                      >
                        <h4 style={{ float: 'left', marginBottom: 0 }}>{'Marketplace ID:'}</h4>
                        <p
                          style={{
                            marginBottom: 0,
                            marginLeft: 5,
                            float: 'left',
                          }}
                        >
                          {marketPlaceIDFromServer}
                        </p>
                      </div>
                      <div
                        style={{
                          overflow: 'hidden',
                          marginRight: 70,
                          backgroundColor: '#f0f0f0',
                          marginBottom: 5,
                          padding: 5,
                        }}
                      >
                        <h4 style={{ float: 'left', marginBottom: 0 }}>{'Marketplace Name:'}</h4>
                        <p
                          style={{
                            marginBottom: 0,
                            marginLeft: 5,
                            float: 'left',
                          }}
                        >
                          {marketPlaceNameFromServer}
                        </p>
                      </div>
                    </div>
                  </Grid.Column>
                ) : null}
              </Grid.Row>
            </Grid>
          </Form>
        </Container>
      </Segment>
    );
  }*/

  AmazonMWSAuthDeleteModal() {
    const { marketplace_id } = this.props.amazonMWSAuth[0];
    let amazonMWSAuth: AmazonMWS | null = null;

    if (marketplace_id.length > 0) {
      for (const amazonmwsobj of this.props.amazonMWSAuth) {
        if (amazonmwsobj.marketplace_id === marketplace_id) {
          amazonMWSAuth = amazonmwsobj;
        }
      }
    }
    return (
      <Modal
        closeIcon={true}
        open={this.state.isDeleteModalOpen}
        onClose={() => {
          this.setState({ isDeleteModalOpen: false });
        }}
      >
        <Modal.Content>
          <Modal.Header>
            <h3>Deleting MWS Auth Info</h3>
          </Modal.Header>
          <p>Are you sure you want to delete MWS Auth Info?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => {
              this.setState({ isDeleteModalOpen: false });
            }}
          >
            No
          </Button>
          <Button
            positive={true}
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={() => {
              this.props.deleteMWSAuth(amazonMWSAuth != null ? amazonMWSAuth.id : '1');
              this.setState({ isDeleteModalOpen: false });
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  uploadImage = () => {
    this.setState({ isImageUploadUnderProgress: true }, () => {
      if (this.state.isImageSelected) {
        this.props.updateProfileImage(this.state.imageFile.type, this.state.imageFile);
      }
    });
  };
  SellerInformation = () => {
    const { profile, profileImage } = this.props;
    const { name, email, cdate } = profile;
    console.log(profile, profileImage);
    let firstName = '';
    let lastName = '';
    if (name) [firstName, lastName] = name.split(' ').splice(0, 2);
    console.log(name, firstName, lastName);
    const memberDate = moment(cdate || moment()).format('MMM DD YYYY');
    return (
      <Segment basic={true} padded="very">
        <Container style={{ width: '80%' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column
                width={3}
                textAlign="center"
                className="upload-photo"
                style={{ display: 'block', margin: 'auto' }}
              >
                <Image
                  src={
                    profileImage.image_url
                      ? profileImage.image_url
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                  }
                  size={'small'}
                  style={{
                    marginBottom: 10,
                    alignSelf: 'center',
                    padding: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
                <Button
                  basic={true}
                  content={'Select Photo'}
                  style={{ borderRadius: '50px', margin: '0 auto', display: 'block' }}
                  size="small"
                  onClick={() => this.fileInputRef.current.click()}
                />
                {this.state.isImageSelected ? (
                  <Button
                    loading={!this.props.profileImage}
                    content={'Upload Photo'}
                    style={{ borderRadius: '50px', margin: '0 auto', marginTop: 10 }}
                    size="tiny"
                    onClick={() => this.uploadImage()}
                  />
                ) : null}
                <input
                  ref={this.fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden={true}
                  onChange={this.fileChange}
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
                          onChange={(e, { value }) =>
                            this.props.setSeller({ name: value.trim() + ' ' + lastName })
                          }
                        />
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <Form.Input
                          label="Last Name"
                          placeholder="Last Name"
                          name="lastName"
                          value={lastName}
                          onChange={(e, { value }) =>
                            this.props.setSeller({ name: firstName + ' ' + value.trim() })
                          }
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Form.Input
                          label="Email"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={(e, { value }) => this.props.setSeller({ email: value.trim() })}
                          fluid={true}
                        />
                        <Button
                          primary={true}
                          content="Update Information"
                          onClick={() => this.props.updateSeller(this.props.profile)}
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
    );
  };
}

const mapStateToProps = (state: any) => {
  return {
    profile: state.settings.profile,
    amazonMWSAuth: state.settings.amazonMWSAuth,
    profileImage: state.settings.profileImage,
  };
};

const mapDispatchToProps = {
  updateAmazonMWSAuth: (data: AmazonMWS) => updateSellerAmazonMWSAuth(data),
  getAmazonMWSAuth: () => getSellerAmazonMWSAuth(),
  deleteMWSAuth: (mwsAuthID: any) => deleteSellerAmazonMWSAuth(mwsAuthID),
  getSeller: () => getSellerInfo(),
  updateSeller: (data: any) => updateSellerInfo(data),
  setSeller: (data: any) => setSellerInfo(data),
  getprofileImage: () => getSellerprofileImage(),
  updateProfileImage: (imageType: string, imagePath: any) =>
    updateSellerProfileImage(imageType, imagePath),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
