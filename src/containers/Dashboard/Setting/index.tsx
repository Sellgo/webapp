import "./setting.css";
import * as React from "react";
import {Segment, Form, Header, Grid, Divider, Container, Image, Icon, Button, Select} from "semantic-ui-react";
import MesssageComponent from "../../../components/MessageComponent";

interface State { isSuccess: boolean, };


export class Setting extends React.Component<{}, State> {

  render() {
    const custNAme = " MY Name/ customer'";
    const memberDate = `May 5 2018`;

    return (
      <Segment basic className="setting">
        <Header as='h2'>
          Basic Information
        </Header>
        <Divider/>

        <Segment basic padded='very'>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3} textAlign='center' className='upload-photo'>
                  <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                         size='small' floated='left'/>
                  <Button basic content="Upload Photo" style={{borderRadius: "50px",}} size='small'/>

                </Grid.Column>
                <Grid.Column width={13}>
                  <Header as='h6' size='small'>member since: {memberDate}</Header>
                  <Form>
                    <Grid className="basic-info-update">
                      <Grid.Row columns={2}>
                        <Grid.Column width={5}>
                          <Form.Input label='First Name' placeholder='First Name'/>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Form.Input label='Last Name' placeholder='Last Name'/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Form.Input label='Email' placeholder='Email' fluid/>
                          <Button primary content="Update Information" style={{borderRadius: "50px",}}/>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Header as='h2'>
          Password
        </Header>
        <Divider/>
        <Segment basic padded='very'>
          <Container>
            <Form>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    <Form.Input type='password' label='Old Password' placeholder='Old'/>
                  </Grid.Column>
                  <Grid.Column width={11}/>
                  <Grid.Column width={5}>
                    <Form.Input type='password' label='New Password' placeholder='New Password'/>
                    <Button primary content="Update Password" style={{borderRadius: "50px",}}/>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form.Input label='Retype New Password' placeholder='Retype New Password'/>
                  </Grid.Column>
                  <Grid.Column width={6}/>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
        </Segment>
        <Header as='h2'>
          Amazon MWS Authorization
        </Header>
        <Divider/>
        <Segment basic>

          <Container>
            <span className="autho-sub-hear">Please grant Amazon MWS and Amazon Seller Central access for each market.</span>
            <Form className="autho-form">
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={5}>
                    {/*<Form.Input type='select' label='Marketplace' placeholder='Marketplace' />*/}
                    <Form.Field
                      control={Select}
                      label='Marketplace'
                      options={[{key: 'n', text: 'None', value: 'none'}]}
                      placeholder='select'/>
                  </Grid.Column>
                  <Grid.Column width={5} verticalAlign='bottom'>
                    <Button primary content="Show me how >>" style={{borderRadius: "50px",}}/>
                  </Grid.Column>
                  <Grid.Column width={6}/>
                  <Grid.Column width={9}>
                    <Form.Input label='Amazon Seller ID' placeholder='Amazon Seller ID'/>
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Form.Input label='MWS Auth Token' placeholder='MWS Auth Token'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
        </Segment>
      </Segment>
    )
  }
}
