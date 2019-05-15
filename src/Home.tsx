import * as React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { Layout } from "./Layout";

interface MyComponentProps {
  name: string;
}
export class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <Segment>{this.props.name}</Segment>;
  }
}

interface HomeState{
  response: any | null;
  response2: any | null;
}
export class Home extends React.Component<{}, HomeState> {
  state = {
    response: null,
    response2: null
  }

  componentDidMount() {
    console.log("componentDidMount()");

    const p = setTimeout(() => {
      fetch("http://127.0.0.1:8000/api/product/")
        .then(resp => resp.json())
        .then(json => this.setState({ response: json }));
    }, 3000);

    const q = setTimeout(() => {
      fetch("https://httpbin.org/get")
        .then(resp => resp.json())
        .then(json => this.setState({ response2: json }));
    }, 3000);
  }

  render() {
    console.log("render()");
    const response = this.state.response;
    const response2 = this.state.response2;

    return <Layout>
      <Segment>
        <Header as="h1">Welcome, User!</Header>
        <Segment>
          My response: {JSON.stringify(response)}
        </Segment>
        <Segment>
          My response 2: {JSON.stringify(response2)}
        </Segment>
        <MyComponent name="Hello" />
        <Button
          content="Clear"
          onClick={() => { this.setState({ response: null }); }} />
      </Segment>
    </Layout>;
  }
}
