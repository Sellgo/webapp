import React, { useState } from 'react';
import styles from './UserOnboarding.module.css';
import { Button, Grid, Pagination, Icon, Form, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeUserOnboardingModal } from '../../actions/Modals';
import { userOnboarding as totalViews } from '../../constants/UserOnboarding';

interface Props {
  closeModal: typeof closeUserOnboardingModal;
}

const buttonStyle = {
  borderRadius: 20,
};

export const UserOnboarding = (props: any) => {
  const { closeModal, auth } = props;

  const [acceptedTos, setAcceptedTos] = useState(() =>
    localStorage.getItem('acceptedTos') ? true : false
  );

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
        <TOS closeModal={closeModal} accept={handleAccept} deny={handleDeny} />
      ) : (
        <Intro closeModal={closeModal} />
      )}
    </div>
  );
};

const TOS = (props: any) => {
  const { accept, deny } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Our Terms of Service</h4>
      <Form>
        <TextArea
          rows="20"
          value={`Sellgo Terms of Service

1. Terms

By accessing the website at https://app.sellgo.com/, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.

2. Use License

Permission is granted to temporarily download one copy of the materials (information or software) on Sellgo's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

modify or copy the materials;

use the materials for any commercial purpose, or for any public display (commercial or non-commercial);

attempt to decompile or reverse engineer any software contained on Sellgo's website;

remove any copyright or other proprietary notations from the materials; or

transfer the materials to another person or "mirror" the materials on any other server.

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Sellgo at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.

3. Disclaimer

The materials on Sellgo's website are provided on an 'as is' basis. Sellgo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Sellgo does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.

4. Limitations

In no event shall Sellgo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sellgo's website, even if Sellgo or a Sellgo authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

5. Accuracy of materials

The materials appearing on Sellgo's website could include technical, typographical, or photographic errors. Sellgo does not warrant that any of the materials on its website are accurate, complete or current. Sellgo may make changes to the materials contained on its website at any time without notice. However Sellgo does not make any commitment to update the materials.

6. Links

Sellgo has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Sellgo of the site. Use of any such linked website is at the user's own risk.

7. Modifications

Sellgo may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.

8. Governing Law

These terms and conditions are governed by and construed in accordance with the laws of OR and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`}
        />
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
              title="User Onboarding"
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
