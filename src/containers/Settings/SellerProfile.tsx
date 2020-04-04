import React, { useState, useEffect } from 'react';
import { Form, Grid, Header, Image, Segment, TextArea, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { error } from '../../utils/notifications';

import deleteIcon from '../../assets/images/ic_delete.png';

const SellerProfile = (props: any) => {
  const [profileImageLocal, setprofileImageLocal] = useState({
    ...props.profileImage,
    ...{
      imageFile: undefined,
      imageType: undefined,
      imageSelected: false,
      imageUploadProgress: false,
    },
  });
  const [profileLocal, setprofileLocal] = useState(props.profile);

  useEffect(() => {
    setprofileImageLocal(props.profileImage);
    setprofileLocal(props.profile);
  }, [props.profileImage, props.profile]);

  const handleProfileLocalChange = (data: any) => {
    const updatedProfileLocal = { ...profileLocal, ...data };
    setprofileLocal(updatedProfileLocal);
  };
  const handleImageLocalChange = (event: any) => {
    if (event.target.files.length > 0) {
      const updatedProfileImageLocal = {
        imageFile: event.target.files[0],
        imageType: event.target.files[0].type,
        image_url: URL.createObjectURL(event.target.files[0]),
        imageSelected: true,
      };
      setprofileImageLocal(updatedProfileImageLocal);
    }
  };
  const uploadImage = () => {
    const updatedProfileImageLocal = { ...profileImageLocal, ...{ imageUploadProgress: true } };
    if (updatedProfileImageLocal.imageType) {
      if (
        updatedProfileImageLocal.imageType === 'image/jpeg' ||
        updatedProfileImageLocal.imageType === 'image/png'
      ) {
        setprofileImageLocal(updatedProfileImageLocal);
        props.updateProfileImage(profileImageLocal.imageType, profileImageLocal.imageFile);
      } else {
        error('Invalid file type!');
      }
    } else {
      error('No file uploaded');
    }
  };
  const fileInputRef: any = React.createRef();

  const { name = '', email = '', cdate } = profileLocal;
  const memberDate = moment(cdate || moment()).format('MMM DD YYYY');

  return (
    <>
      <Grid.Row className="basic-info">
        <Grid.Column width={4}>
          <Segment>
            <Label attached="top right">
              <i
                onClick={() => {
                  fileInputRef.current.click();
                }}
                className={`fas fa-pencil-alt ${
                  profileImageLocal.imageSelected ? 'hidden-icon' : ''
                }`}
              />
              <Popup
                basic
                className="pop-seller"
                trigger={
                  <i
                    className={`fas fa-check ${
                      profileImageLocal.imageSelected ? '' : 'hidden-icon'
                    }`}
                    onClick={uploadImage}
                  />
                }
                content={
                  <p>
                    Upload Picture: <br />
                    Click on the check icon to upload your picture
                  </p>
                }
              />
              <Popup
                basic
                className="pop-seller"
                trigger={
                  <i
                    className={`fas fa-times ${
                      profileImageLocal.imageSelected ? '' : 'hidden-icon'
                    }`}
                    onClick={() => {
                      setprofileImageLocal({
                        ...props.profileImage,
                        ...{
                          imageFile: undefined,
                          imageType: undefined,
                          imageSelected: false,
                          imageUploadProgress: false,
                        },
                      });
                    }}
                  />
                }
                content={
                  <p>
                    Discard Upload: <br />
                    Click on the cross icon to discard changes
                  </p>
                }
              />
              <Image
                className={`delete-prof-pic ${
                  profileImageLocal.imageSelected ? 'hidden-icon' : ''
                }`}
                src={deleteIcon}
                onClick={() =>
                  props.profileImage.id &&
                  props.deleteProfileImage(props.profileImage.id.toString())
                }
              />
            </Label>
            <Image
              className="user-prof-pic"
              src={
                profileImageLocal && profileImageLocal.image_url
                  ? profileImageLocal.image_url
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
            />
          </Segment>
          <input
            className="hidden-field"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden={true}
            value=""
            onChange={handleImageLocalChange}
          />
          <Grid>
            <Header as="h4">
              <TextArea
                placeholder="Name"
                className="user-name"
                value={name}
                rows="1"
                onBlur={() => {
                  if (props.profile.name !== name.trim()) {
                    props.updateSeller(profileLocal);
                  }
                }}
                onChange={(e, { value }) => handleProfileLocalChange({ name: value })}
              />
              <Header.Subheader>Member since: {memberDate}</Header.Subheader>
            </Header>
            <TextArea placeholder="description" />
          </Grid>
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid.Column>
            <Grid>
              <Header as="h4">
                Primary Email &nbsp;<a href="#email-update">{`(Change Email)`}</a>
                <Header.Subheader>{email}</Header.Subheader>
              </Header>
            </Grid>
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="email-header" id="email-update">
        <Grid.Column width={16}>
          <Header as="h3">Email</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="email-content" id="email-content">
        <Grid.Column width={16}>
          <Form>
            <Form.Group>
              <Form.Input
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e, { value }) => handleProfileLocalChange({ email: value })}
              />
              <Form.Button
                onClick={() => {
                  props.updateSeller(profileLocal);
                }}
                className="primary-btn"
                content="Update"
              />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default SellerProfile;
