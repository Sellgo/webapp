import * as React from "react";
import { Layout, Logo } from "./Layout";
import { Container, Form, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class Login extends React.Component {
  render() {
    return <Layout>
      <Segment clearing style={{ maxWidth: "320px", margin: "0 auto" }}>
        <Logo centered size="small" />
        <br />
        <Form>
          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder="Email" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </Form.Field>
        </Form>
        <p style={{ textAlign: "right" }}>
          <Link to="/forgot-password" style={{ fontSize: "smaller" }}>Forgot your password?</Link>
        </p>
        <Button fluid primary content="Login" />
        <p>
          <Link to="/forgot-password" style={{ fontSize: "smaller" }}>New to Sellgo? Sign up</Link>
        </p>
      </Segment>
    </Layout>;
  }
}