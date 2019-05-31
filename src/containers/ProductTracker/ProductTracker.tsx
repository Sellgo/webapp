import * as React from "react";
import {Header, Segment} from "semantic-ui-react";
import {AdminLayout} from "../../components/AdminLayout";

export class ProductTracker extends React.Component {
    render() {
        return <AdminLayout>
            <Header as="h1">Product Tracker</Header>
            <Segment>
                A bunch of tabs and menus and stuff.
            </Segment>
        </AdminLayout>;
    }
}
