import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { AdminHeader } from './AdminHeader';
import Auth from '../Auth/Auth';
import './index.scss';

interface Props {
  auth: Auth;
}

interface MyState {
  ratio: string;
}

class AdminLayout extends React.Component<Props> {
  state: MyState = {
    ratio: '',
  };
  constructor(props: any) {
    super(props);
    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  componentWillUnmount() {
    this.updatePredicate();
    window.removeEventListener('resize', this.updatePredicate);
  }
  updatePredicate() {
    let c = window.screen.width / window.screen.height;
    let newRatio =
      c > 1.6
        ? 'screen-16-9'
        : c <= 1.6 && c > 1.34
        ? 'screen-16-10'
        : c < 1.34 && c >= 1
        ? 'screen-4-3'
        : c < 1
        ? 'mobile'
        : undefined;
    this.setState({ ratio: newRatio }, () => {
      console.log(
        this.state.ratio,
        this.state.ratio == '16:9',
        window.screen.width,
        ' - ',
        window.screen.height
      );
    });
  }

  public render() {
    const { children, auth } = this.props;
    const { ratio } = this.state;
    return (
      <React.Fragment>
        <AdminHeader auth={auth} children={this.props.children} />
        <Segment className={'admin-layout ' + ratio} basic={true}>
          {children}
        </Segment>
      </React.Fragment>
    );
  }
}

export default AdminLayout;
