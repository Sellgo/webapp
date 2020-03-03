import React, { useState, useEffect } from 'react';
import styles from './UserOnboarding.module.css';
import { Button, Grid, Pagination, Icon, Form, TextArea, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeUserOnboardingModal } from '../../actions/Modals';
import { userOnboarding as totalViews } from '../../constants/UserOnboarding';
import get from 'lodash/get';
import { fetchTOS } from '../../actions/UserOnboarding';

interface Props {
  closeModal: typeof closeUserOnboardingModal;
}

const buttonStyle = {
  borderRadius: 20,
};

export const UserOnboarding = (props: any) => {
  const { closeModal, auth, termsOfService, fetchTOS } = props;

  const [acceptedTos, setAcceptedTos] = useState(() =>
    localStorage.getItem('acceptedTos') ? true : false
  );

  useEffect(() => {
    fetchTOS();
  }, [fetchTOS]);

  const handleAccept = () => {
    localStorage.setItem('acceptedTos', 'true');
    localStorage.setItem('firstLogin', 'true');
    setAcceptedTos(true);
  };

  const handleDeny = () => {
    auth.logout();
  };

  return (
    <div className="user-onboarding">
      {!acceptedTos ? (
        <TOS
          closeModal={closeModal}
          accept={handleAccept}
          deny={handleDeny}
          text={termsOfService}
        />
      ) : (
        <Intro closeModal={closeModal} />
      )}
    </div>
  );
};

const TOS = (props: any) => {
  const { accept, deny, text } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <Header as="h4">Our Terms of Service</Header>
      <Form>
        <TextArea rows="20" value={text} />
      </Form>
      <div style={{ marginTop: '2rem' }}>
        <Button style={buttonStyle} onClick={deny} content="Deny" />
        <Button
          style={{ ...buttonStyle, marginLeft: '1rem' }}
          onClick={accept}
          content="Accept"
          primary={true}
        />
      </div>
    </div>
  );
};

const Intro = ({ closeModal }: Props) => {
  const [currentView, setCurrentView] = useState(1);
  const viewContent = totalViews[currentView - 1];
  return (
    <React.Fragment>
      <div className={styles['close-icon']}>
        <Icon name="cancel" onClick={closeModal} style={{ cursor: 'pointer' }} />
      </div>
      <div className={styles.container}>
        <Grid divided="vertically" centered={true}>
          <Grid.Row as="h4">{viewContent.title}</Grid.Row>
          <Grid.Row>
            {/*  <video height="480" controls={true}>
              <source
                // change with real video
                src={viewContent.url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
            <iframe
              title="User Onboarding"
              width="660"
              height="415"
              src={viewContent.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </Grid.Row>
          <Grid.Row>
            <p>{viewContent.description}</p>
          </Grid.Row>
          <Grid.Row>
            <Pagination
              firstItem={null}
              lastItem={null}
              pointing={true}
              secondary={true}
              totalPages={totalViews.length}
              activePage={currentView}
              onPageChange={(event, data) => setCurrentView(Number(data.activePage))}
            />
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  termsOfService: get(state, 'userOnboarding.termsOfService'),
});

const mapDispatchToProps = {
  closeModal: closeUserOnboardingModal,
  fetchTOS: () => fetchTOS(),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOnboarding);
