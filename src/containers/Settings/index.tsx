import React from 'react';
import { Divider, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FullStoryAPI } from 'react-fullstory';
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
import { Seller, AmazonMWS } from '../../interfaces/Seller';
import PageHeader from '../../components/PageHeader';

interface SettingsProps {
  updateAmazonMWSAuth: (data: AmazonMWS) => void;
  getAmazonMWSAuth: () => void;
  deleteMWSAuth: (mwsAuthID: any) => void;
  getSeller: () => void;
  updateSeller: (data: any) => void;
  setSeller: (data: any) => void;
  getprofileImage: () => void;
  updateProfileImage: (imageType: string, imagePath: any) => void;
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

    const handleUpdateSeller = (updatedProfile: any) => {
      FullStoryAPI('identify', updatedProfile.id, {
        displayName: updatedProfile.name,
        email: updatedProfile.email,
      });

      updateSeller(updatedProfile);
    };

    return (
      <>
        <PageHeader
          title="Settings"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Settings' }]}
        />
        <Segment basic={true} className="settings">
          <Header as="h2">Basic Information</Header>
          <Divider />
          <SellerProfile
            profile={profile}
            profileImage={profileImage}
            updateSeller={handleUpdateSeller}
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
      </>
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
