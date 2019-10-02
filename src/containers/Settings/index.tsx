import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SellerProfile from './SellerProfile';
import SellerAmazonMWS from './SellerAmazonMWS';
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
import './settings.css';
import AdminLayout from '../../components/AdminLayout';
import Auth from '../../components/Auth/Auth';
import { Seller, AmazonMWS } from '../../interfaces/Seller';

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
  componentDidMount() {
    const { getAmazonMWSAuth, getSeller, getprofileImage } = this.props;
    getSeller();
    getprofileImage();
    getAmazonMWSAuth();
  }

  render() {
    const {
      profile,
      profileImage,
      updateSeller,
      updateProfileImage,
      amazonMWSAuth,
      updateAmazonMWSAuth,
      deleteMWSAuth,
    } = this.props;
    return (
      <AdminLayout
        auth={this.props.match.params.auth}
        sellerData={this.props.profile}
        title={'Settings'}
      >
        <Segment basic={true} className="settings">
          <Header as="h2">Basic Information</Header>
          <Divider />
          <SellerProfile
            profile={profile}
            profileImage={profileImage}
            updateSeller={updateSeller}
            updateProfileImage={updateProfileImage}
          />
          <Header as="h2">Amazon Seller Central Credentials</Header>
          <Divider />
          <SellerAmazonMWS
            amazonMWSAuth={amazonMWSAuth}
            updateAmazonMWSAuth={updateAmazonMWSAuth}
            deleteMWSAuth={deleteMWSAuth}
          />
          <Divider />
        </Segment>
      </AdminLayout>
    );
  }
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
