import * as React from 'react';
import { Grid, Image, Segment, Label, Header, TextArea } from 'semantic-ui-react';

export default class BasicInfo extends React.Component {
  render() {
    return (
      <>
        <Grid.Column width={4}>
          <Segment>
            <Label attached="top right">
              <i className="fas fa-pencil-alt" />
              <i className="fas fa-calendar-times" />
            </Label>
            <Image
              src={
                'https://cdn5.f-cdn.com/contestentries/658574/8695141/57978430a3134_thumb900.jpg'
              }
            />
          </Segment>
          <Grid>
            <Header as="h4">
              Kristy
              <Header.Subheader>Member since: {`March 8, 2020`}</Header.Subheader>
            </Header>
            <TextArea placeholder="description" />
          </Grid>
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid.Column>
            <Grid>
              <Header as="h4">
                Account Type
                <Header.Subheader>Account type</Header.Subheader>
              </Header>
            </Grid>
            <Grid>
              <Header as="h4">
                Phone Number &nbsp;<a href="/#">{`(Confirm phone)`}</a>
                <Header.Subheader>232-232-2322</Header.Subheader>
              </Header>
            </Grid>
            <Grid>
              <Header as="h4">
                Primary Email &nbsp;<a href="/#">{`(Change Email)`}</a>
                <Header.Subheader>email@domain</Header.Subheader>
              </Header>
            </Grid>
            <Grid>
              <Header as="h4">
                Payment Method &nbsp;<a href="/#">{`(Change)`}</a>
                <Header.Subheader>
                  <i className="fab fa-cc-visa" />
                  &nbsp; Visa ending in {`xxxx`}
                </Header.Subheader>
                <Header.Subheader>Billing date: {`Aug 3, 2019`}</Header.Subheader>
              </Header>
            </Grid>
            <Grid>
              <Header as="h4">
                Password &nbsp;<a href="/#">{`(Reset/Change password)`}</a>
                <Header.Subheader>{`***********`}</Header.Subheader>
              </Header>
            </Grid>
          </Grid.Column>
        </Grid.Column>
      </>
    );
  }
}
