import * as React from "react";
import Icon from '@material-ui/core/Icon';

export interface State { hidden: boolean; password: string; }
class PasswordShowHide extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state = {
      hidden: true,
      password: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e:any) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }


  render() {
    return (
      <div className="password"> 
        <input
        className="login-field2"
          type={this.state.hidden ? "password" : "text"}
          value={this.state.password}
          placeholder="Password"
          onChange={this.handlePasswordChange} />
          <Icon color="disabled" onClick={this.toggleShow} fontSize="large">
          {this.state.hidden ? "visibility_off" : "visibility"}            
          </Icon>
        {/* <button onClick={this.toggleShow}>Show / Hide</button> */}
      </div>);
  }
}

export default PasswordShowHide;