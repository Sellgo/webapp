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
import MesssageComponent from '../../../components/MessageComponent';
import { Modals } from '../../../components/Modals';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import {
  setBasicInfoSeller,
  updateBasicInfoSeller,
  postSellerImage,
  getSellerImage,
  getBasicInfoSeller,
  setAmazonMWS,
  getMWSAuth,
  deleteMWSAuth,
  updateAmazonMWS,
  Field,
  SellField,
  MWSinfo,
} from '../../../Action/SettingActions';
import './setting.css';
import { marketPlace } from '../../../constant/constant';
import RecoverPass from '../../RecoverPass';
import AdminLayout from '../../../components/AdminLayout';
import Auth from '../../../components/Auth/Auth';
import { MarketplaceFields } from '../../../interfaces/MarketplaceFields';

interface State {
  isOpen: boolean;
  imageFile: any;
  imageView: string;
  isImageSelected: boolean;
  isImageUploadUnderProgress: boolean;
  isAmazonMWSAuthInfoOpen: boolean;
  isDeleteModalOpen: boolean;
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

  getMWSAuth(): () => void;

  updateBasicInfoSeller(data: SellField): () => void;

  updateAmazonMWS(id: string, data: MWSinfo): () => void;

  getBasicInfoSeller(): () => void;

  getSellerImage(): () => void;

  deleteMWSAuth(mws_auth_id: any): () => void;

  postSellerImage(imageType: string, imagePath: any): () => void;

  sellerData: SellField;
  amazonData: MWSinfo;
  amazonMWSFromServer: MWSinfo[];
  isUpdate: boolean;
  match: { params: { auth: Auth } };
  updatedImage: {};
}

class Setting extends React.Component<Props, State> {
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

  message = {
    id: 1,
    title: 'Information Updated',
    message: 'Thank you for Updating',
    description: 'You have successfully updated new information.',
    description2: '',
    to: '/dashboard/setting',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#0E6FCF',
  };
  fileInputRef: any = React.createRef();

  componentDidMount() {
    this.props.getMWSAuth();
    this.props.getBasicInfoSeller();
    this.props.getSellerImage();
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

  updateBasicInfoSeller = () => {
    this.message.title = 'Information Updated';
    this.message.message = 'Thank you for Updating';
    this.message.description = 'You have successfully updated new information.';
    const { name, firstName, lastName, id, email, auth0_user_id } = this.props.sellerData;
    const data = { name: `${firstName} ${lastName}`, id, email, auth0_user_id };
    this.props.updateBasicInfoSeller(data);
  };

  componentWillReceiveProps(props: any) {
    if (props.updatedImage.id != undefined) {
      this.setState({
        imageView: props.updatedImage.image_url,
        isImageUploadUnderProgress: false,
        isImageSelected: false,
      });
    }

    if (this.props.isUpdate!==props.isUpdate&&props.isUpdate) {
      this.handleModel();
    }
  }

  updateAmazonMWS = () => {
    const sellerID = localStorage.getItem('userId');
    const { id } = this.props.sellerData;
    const { seller_id, marketplace_id, token, amazon_seller_id } = this.props.amazonData;
    const data = {
      seller_id,
      marketplace_id,
      amazon_seller_id,
      token,
      status: 'active',
      id: 0,
    };
    if (amazon_seller_id === '' || marketplace_id === '' || token === '') {
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
    const { isOpen } = this.state;
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.sellerData}
        title={'Setting'}
      >
        <Segment basic={true} className="setting">
          <Header as="h2">Basic Information</Header>
          <Divider />
          {this.SegmentUserInfo()}
          <Header as="h2">Password</Header>
          <Divider />
          {this.SegmentResetPassword()}
          <Header as="h2">Amazon MWS Authorization</Header>
          <Divider />
          {this.SegmentAmazonMWS()}
          <Modals title="" size="large" open={isOpen} close={this.handleModel} bCloseIcon={true}>
            <Container textAlign="center">
              <MesssageComponent message={this.message} isModal={true} />
              <Segment textAlign="center" basic={true}>
                <Button style={buttonStyle} content="Ok" onClick={this.handleModel} />
              </Segment>
            </Container>
          </Modals>
          {this.ModalDeleteMWSAuth()}
        </Segment>
      </AdminLayout>
    );
  }

  private SegmentAmazonMWS() {
    const marketPlaceoptions = new Array();
    marketPlace.map((opt, key) => {
      marketPlaceoptions.push({ key, text: opt.name, value: opt.id });
    });
    const { marketplace_id } = this.props.amazonData;
    const marketplaceDATA = this.getmarketplaceDATA(marketplace_id);

    let selectedAmazonMWSFromServer: MWSinfo | null = null;
    if (marketplace_id.length > 0) {
      for (const amazonmwsobj of this.props.amazonMWSFromServer) {
        if (amazonmwsobj.marketplace_id == marketplace_id && amazonmwsobj.status != 'inactive') {
          selectedAmazonMWSFromServer = amazonmwsobj;
        }
      }
    }
    let marketPlaceNameFromServer = '';
    let marketPlaceIDFromServer = '';
    if (selectedAmazonMWSFromServer != null) {
      console.log(selectedAmazonMWSFromServer);
      const marketplaceFromServer: MarketplaceFields = this.getmarketplaceDATA(
        selectedAmazonMWSFromServer.marketplace_id
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
      <Segment basic={true}>
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
                        disabled={selectedAmazonMWSFromServer != null}
                        content="Add MWS Token"
                        onClick={this.updateAmazonMWS}
                        style={{ borderRadius: '50px' }}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                {selectedAmazonMWSFromServer != null ? (
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
                {selectedAmazonMWSFromServer != null ? (
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
                          {selectedAmazonMWSFromServer.amazon_seller_id}
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
                          {selectedAmazonMWSFromServer.token}
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
  }

  private ModalDeleteMWSAuth() {
    const { marketplace_id } = this.props.amazonData;
    let selectedAmazonMWSFromServer: MWSinfo | null = null;

    if (marketplace_id.length > 0) {
      for (const amazonmwsobj of this.props.amazonMWSFromServer) {
        if (amazonmwsobj.marketplace_id == marketplace_id) {
          selectedAmazonMWSFromServer = amazonmwsobj;
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
              this.props.deleteMWSAuth(
                selectedAmazonMWSFromServer != null ? selectedAmazonMWSFromServer.id : '1'
              );
              this.setState({ isDeleteModalOpen: false });
            }}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  private SegmentResetPassword = () => {
    return (
      <Segment basic={true} padded="very">
        <Container style={{ width: '80%' }}>
          <Form>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column width={12}>
                  <RecoverPass onlyEmail={true} isSuccessReset={this.isSuccessReset} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Container>
      </Segment>
    );
  };
  private SegmentUserInfo = () => {
    const { firstName, lastName, email, cdate } = this.props.sellerData;
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
                    this.state.imageView.length > 0
                      ? this.state.imageView
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
                {!this.state.isImageSelected ? (
                  <Button
                    loading={this.state.isImageUploadUnderProgress}
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
    );
  };

  private uploadImage = () => {
    this.setState({ isImageUploadUnderProgress: true }, () => {
      if (this.state.isImageSelected) {
        this.props.postSellerImage(this.state.imageFile.type, this.state.imageFile);
      }
    });
  };
}

const mapStateToProps = (state: any) => {
  return {
    sellerData: state.settings.profile,
    amazonData: state.settings.amazonMWS,
    amazonMWSFromServer: state.settings.amazonMWSFromServer,
    isUpdate: state.settings.success,
    updatedImage: state.settings.updatedImage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateBasicInfoSeller: (info: SellField) => dispatch(updateBasicInfoSeller(info)),
    updateAmazonMWS: (id: string, info: MWSinfo) => dispatch(updateAmazonMWS(id, info)),
    setBasicInfoSeller: (data: Field) => dispatch(setBasicInfoSeller(data)),
    setAmazonMWS: (data: Field) => dispatch(setAmazonMWS(data)),
    getMWSAuth: () => dispatch(getMWSAuth()),
    deleteMWSAuth: (mws_auth_id: any) => dispatch(deleteMWSAuth(mws_auth_id)),
    getBasicInfoSeller: () => dispatch(getBasicInfoSeller()),
    getSellerImage: () => dispatch(getSellerImage()),
    postSellerImage: (imageType: string, imagePath: any) =>
      dispatch(postSellerImage(imageType, imagePath)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
