import React, { useState } from 'react';
import styles from './UserOnboarding.module.css';
import { Grid, Pagination, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeUserOnboardingModal } from '../../Action/modals';
import { userOnboarding as totalViews } from '../../constant/userOnboarding';

interface Props {
  closeModal: typeof closeUserOnboardingModal;
}

export const UserOnboarding = ({ closeModal }: Props) => {
  const [currentView, setCurrentView] = useState(1);
  const viewContent = totalViews[currentView - 1];
  return (
    <React.Fragment>
      <div className={styles.closeIcon}>
        <Icon name="cancel" onClick={closeModal} style={{ cursor: 'pointer' }} />
      </div>
      <div className={styles.container}>
        <Grid divided="vertically" centered>
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
              width="660"
              height="415"
              src={viewContent.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Grid.Row>
          <Grid.Row>
            <p>{viewContent.description}</p>
          </Grid.Row>
          <Grid.Row>
            <Pagination
              firstItem={null}
              lastItem={null}
              pointing
              secondary
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

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  closeModal: closeUserOnboardingModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOnboarding);
