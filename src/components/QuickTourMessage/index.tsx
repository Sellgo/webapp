import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Button, Grid, Header, Popup, Image } from 'semantic-ui-react';
import Logo from '../../assets/images/sellgo_logo.svg';
import { notifications } from './Notifications';
import { setNotifyId } from '../../actions/UserOnboarding';
import { notifyIdSelector } from '../../selectors/UserOnboarding';
import './index.scss';

interface Props {
  child: any;
  data: any;
  currentNotifyId: number;
  setNotifyId: Function;
  modalTermsOpen: boolean;
}

function QuickTour({ child, data, currentNotifyId, setNotifyId, modalTermsOpen }: Props) {
  const handleNext = () => {
    const count = notifications.length;
    if (currentNotifyId >= count) {
      setNotifyId(0);
    } else {
      setNotifyId(currentNotifyId + 1);
    }
  };

  const returnChild = (
    <Popup
      open
      position="right center"
      className={`QuickTour__container 
        ${data.notifyId === 5 ? 'expand-icon' : data.notifyId === 1 ? 'pf-icon' : ''}`}
      trigger={child}
      content={
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              {notifications[data.notifyId - 1].title}
              <Header.Subheader>{notifications[data.notifyId - 1].description}</Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Grid.Row className="QuickTour__footer">
              <Grid.Column>
                <Image src={Logo} size="mini" spaced />
              </Grid.Column>
              <Grid.Column>
                <Button onClick={handleNext} content="Next" />
                <p>
                  Seen this before? <Button onClick={() => setNotifyId(0)} content="Skip Tour" />
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      }
    />
  );

  return data.notifyId === currentNotifyId && !modalTermsOpen ? returnChild : child;
}

const mapStateToProps = (state: any) => ({
  modalTermsOpen: get(state, 'modals.userOnboarding.open', false),
  currentNotifyId: notifyIdSelector(state),
});

const mapDispatchToProps = {
  setNotifyId,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickTour);
