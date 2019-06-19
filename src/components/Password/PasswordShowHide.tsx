import Icon from '@material-ui/core/Icon';
import * as React from "react";

export interface State {
  hidden: boolean;
  password: string;
}

class PasswordShowHide extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hidden: true,
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e: any) {
    this.setState({password: e.target.value});
  }

  toggleShow() {
    this.setState({hidden: !this.state.hidden});
  }


  render() {
    return (
      <div className="password">
        <input
          className="login-field2"
          type={this.state.hidden ? "password" : "text"}
          value={this.state.password}
          placeholder="Password"
          onChange={this.handlePasswordChange}/>
        <Icon color="disabled" onClick={this.toggleShow} fontSize="large">
          {this.state.hidden ? "visibility_off" : "visibility"}
        </Icon>
      </div>);
  }
}

export default PasswordShowHide;