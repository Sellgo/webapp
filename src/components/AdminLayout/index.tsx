import * as React from 'react';
import { Segment, Sidebar, Sticky } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import PageHeader from './PageHeader';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface State {
  isSidebarExpanded: boolean;
  width: any;
}

export class AdminLayout extends React.Component<any, State> {
  state = {
    isSidebarExpanded: false,
    width: 100,
  };
  handleExpand = (isExpanded: boolean) => {
    setTimeout(() => {
      this.setState(
        {
          isSidebarExpanded: isExpanded,
          width: isExpanded ? 95 : 100,
        },
        () => {
          setTimeout(() => {
            for (const chart of Highcharts.charts) {
              console.log(chart);
              if (chart) {

                chart.reflow();
                chart.redraw();
                chart.update({}, true, false, true);
              }
            }
          }, 2000);

        },
      );
    }, 150);
  };

  public render() {
    const {children, title, auth, sellerData} = this.props;

    return (
      <React.Fragment>
        <AdminHeader sellerData={sellerData}/>
        <Sidebar.Pushable style={{minHeight: 'calc(100vh)'}}>
          <AdminSidebar auth={auth} handleExpand={this.handleExpand}/>
          <Sidebar.Pusher style={{width: `calc(${this.state.width}vw - 55px)`, textAlign: 'center'}}>
            <Segment basic={true}>
              <PageHeader title={title}/>
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </React.Fragment>
    );
  }
}
