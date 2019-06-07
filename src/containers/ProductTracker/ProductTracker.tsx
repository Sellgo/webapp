import * as React from "react";
import {Header, Segment} from "semantic-ui-react";
import {Layout} from "../../components/Layout/Layout";

export class ProductTracker extends React.Component {
    render() {
        return <Layout>
            <Header as="h1">Product Tracker</Header>
            <Segment>
                A bunch of tabs and menus and stuff.
            </Segment>
        </Layout>;
    }
}
