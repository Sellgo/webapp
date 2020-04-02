import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
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
import './settings.scss';
import { Seller, AmazonMWS } from '../../interfaces/Seller';
import PageHeader from '../../components/PageHeader';

import PasswordInfo from './Password';

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
    return (
      <>
        <PageHeader
          title="Settings"
          breadcrumb={[{ content: 'Home', to: '/' }, { content: 'Settings' }]}
        />
        <Grid className="settings-container">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3">Basic Information</Header>
            </Grid.Column>
          </Grid.Row>
          <SellerProfile
            profile={profile}
            profileImage={profileImage}
            updateSeller={updateSeller}
            updateProfileImage={updateProfileImage}
          />
          <Grid.Row className="change-pass-header" id="password-update">
            <Grid.Column width={16}>
              <Header as="h3">Change Password</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="password-content">
            <PasswordInfo />
          </Grid.Row>
          <Grid.Row className="amazon-header">
            <Grid.Column width={16}>
              <Header as="h3">Amazon MWS Authorization</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="amazon-content">
            <SellerAmazonMWS
              amazonMWSAuth={amazonMWSAuth}
              updateAmazonMWSAuth={updateAmazonMWSAuth}
              deleteMWSAuth={deleteMWSAuth}
            />
          </Grid.Row>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
