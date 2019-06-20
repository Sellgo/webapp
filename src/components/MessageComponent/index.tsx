import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import buttonStyle from '../../components/StyleComponent/StyleComponent';
import './MessageComponent.css';

function MesssageComponent(props: any) {
  const items = props.message;
  const isModal = props.isModal;

  return (
    <Segment className="message-box" basic={true} clearing={true}>
      <Grid className={!isModal ? 'pop-up' : ''}>
        <Grid.Row>
          <Grid.Column textAlign="center" style={{ padding: 10 }} width={16}>
            <div className="heading-h1">{items.title}</div>
          </Grid.Column>
          <Grid.Column textAlign="center" width={16} className="header-msg">
            <Icon name="check circle" size="big" style={{ color: '#0E6FCF' }} />
            <Header as="h3">{items.message}</Header>
          </Grid.Column>
          <Grid.Column textAlign="center" width={16}>
            <Header.Content>{items.description}</Header.Content>
            <Header.Content>{items.description2}</Header.Content>
          </Grid.Column>
          {!isModal ? (
            <Grid.Column textAlign="center" width={16}>
              <Grid.Row>
                <Button as={Link} style={buttonStyle} onClick={props.handleMessage} content={items.button_text} />
              </Grid.Row>
            </Grid.Column>
          ) : (
            <Grid.Column textAlign="center" width={16} />
          )}
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default MesssageComponent;
