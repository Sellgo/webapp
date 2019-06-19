import * as React from "react";
import {Segment, Sidebar} from "semantic-ui-react";
import {AdminHeader} from "./AdminHeader";
import {AdminSidebar} from "./AdminSidebar";
import {PageHeader} from "./PageHeader";


interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export class AdminLayout extends React.Component<LayoutProps> {
  render() {
    const {children, title} = this.props;

    return (
      <React.Fragment>
        <AdminHeader/>
        <Sidebar.Pushable style={{minHeight: "calc(100vh - 3rem)"}}>
          <AdminSidebar/>s
          <Sidebar.Pusher style={{width: "calc(100vw - 50px)"}}>
            <Segment basic>
              <PageHeader title={title}/>
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}
