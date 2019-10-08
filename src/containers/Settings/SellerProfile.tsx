import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import moment from 'moment';

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
  const uploadImage = (event: any) => {
    const updatedProfileImageLocal = { ...profileImageLocal, ...{ imageUploadProgress: true } };
    setprofileImageLocal(updatedProfileImageLocal);
    props.updateProfileImage(profileImageLocal.imageType, profileImageLocal.imageFile);
  };
  const fileInputRef: any = React.createRef();

  const { name = '', email = '', cdate } = profileLocal;
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
                  profileImageLocal
                    ? profileImageLocal.image_url
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
                onClick={() => fileInputRef.current.click()}
              />
              {profileImageLocal.imageSelected ? (
                <Button
                  loading={profileImageLocal.imageUploadProgress}
                  content={'Upload Photo'}
                  style={{ borderRadius: '50px', margin: '0 auto', marginTop: 10 }}
                  size="tiny"
                  onClick={uploadImage}
                />
              ) : null}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden={true}
                onChange={handleImageLocalChange}
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Header as="h6" size="small">
                Member since: {memberDate}
              </Header>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Full name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e, { value }) => handleProfileLocalChange({ name: value })}
                  />
                  <Form.Input
                    fluid
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e, { value }) => handleProfileLocalChange({ email: value })}
                  />
                </Form.Group>
                <Form.Button primary onClick={() => props.updateSeller(profileLocal)}>
                  Update
                </Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default SellerProfile;
