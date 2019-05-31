import * as React from "react";
import {Sidebar, Segment} from "semantic-ui-react";
import {AdminHeader} from "./AdminHeader";
import {AdminSidebar} from "./AdminSidebar";



interface LayoutProps {
    children?: React.ReactNode
}

export class AdminLayout extends React.Component<LayoutProps> {
    render() {
        const {children} = this.props;

        return <React.Fragment>
            <AdminHeader/>
            <Sidebar.Pushable style={{minHeight: "calc(100vh - 3rem)"}}>
                <AdminSidebar/>
                <Sidebar.Pusher style={{width: "calc(100vw - 260px)"}}>
                    <Segment basic>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </React.Fragment>;
    }
}