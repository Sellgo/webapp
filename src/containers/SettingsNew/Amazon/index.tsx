import React, { Component } from 'react';
import { Grid, Form, Header, Popup, Confirm, Segment, List } from 'semantic-ui-react';

const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
];

class Amazon extends Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <>
        <Grid.Column width={16}>
          <Form>
            <Header.Subheader>
              Please grant Amazon MWS and Amazon Seller Central access for each market.
            </Header.Subheader>
            <Form.Group className="marketplace-field" unstackable widths={2}>
              <label className="field-title">
                <span>Marketplace &nbsp;</span>
                <Popup
                  basic
                  className="pop-market"
                  trigger={<i className="far fa-question-circle" />}
                  content={
                    <p>
                      Marketplace: <br />
                      Which Amazon region do you sell at
                    </p>
                  }
                />
              </label>
              <Form.Select options={countryOptions} placeholder="Marketplace" />
            </Form.Group>
            <Form.Group className="seller-field" widths={2}>
              <Form.Field>
                <label>
                  Amazon Seller ID &nbsp;
                  <Popup
                    basic
                    className="pop-seller"
                    trigger={<i className="far fa-question-circle" />}
                    content={
                      <p>
                        Amazon Seller ID: <br />
                        This is given by Amazon in your Amazon seller central
                      </p>
                    }
                  />
                </label>
                <input placeholder="This will look like A2BTUHOG3JAVRS" />
              </Form.Field>
            </Form.Group>
            <Form.Group className="token-field" widths={2}>
              <Form.Field>
                <label>
                  MWS Auth Token &nbsp;
                  <Popup
                    basic
                    className="pop-token"
                    trigger={<i className="far fa-question-circle" />}
                    content={
                      <p>
                        MWS Auth Token: <br />
                        This is an authorization token given by Amazon so we can pull up data for
                        you
                      </p>
                    }
                  />
                  &nbsp; &nbsp;
                  <a href="#" onClick={this.open}>
                    Authenticate Your Seller Account
                  </a>
                </label>
                <input placeholder="This will look like amzn.mws.9eb48bhd-3e5n-f315-d34d-8dfa825fb711" />
              </Form.Field>
            </Form.Group>
            <Form.Group className="action-container">
              <Form.Button className="primary-btn" content="Update" />
              <Form.Button className="error-btn" content="Delete" />
            </Form.Group>
          </Form>
        </Grid.Column>

        <Confirm
          className="auth-token-confirm"
          open={this.state.open}
          confirmButton="OK"
          content={
            <Segment placeholder>
              <Header as="h3" icon>
                How to authenticate your seller account
                <Header.Subheader>
                  <List ordered>
                    <List.Item>
                      Click on this link: <a href="#">Authenticate on Amazon</a>
                    </List.Item>
                    <List.Item>Login to your Amazon Seller account.</List.Item>
                    <List.Item>
                      Developer's Name and Account Number will automatically be entered and click on
                      "Next"
                    </List.Item>
                    <List.Item>
                      Check mark "I understand that I take complete responsibility for the acts and
                      omissions of..." and <br />
                      click on "next".
                    </List.Item>
                    <List.Item>Copy the MWS Auth Token into Sellgo and click "Update".</List.Item>
                  </List>
                </Header.Subheader>
              </Header>
            </Segment>
          }
          onCancel={this.close}
          onConfirm={this.close}
        />
      </>
    );
  }
}

export default Amazon;
