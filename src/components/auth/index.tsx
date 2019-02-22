import * as React from "react";
import { Button } from "reactstrap";
import { AppState } from "../../state";
import authAction from "../../state/auth/actions";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Props, State } from "./types";
import { Payload } from "../../state/auth/types";
const { auth } = authAction;

class AuthPage extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loader: this.props.auth.loader,
      auth: this.props.auth.auth
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    // this is just a sample payload. send whatever you need to and write appropriate interfaces.
    const payload: Payload = {
      loader: false,
      auth: "authentication"
    };
    this.props.authenticate(payload);
  }
  static getDerivedStateFromProps(nextProps: Props, prevState: Props) {
    return {
      loader: nextProps.auth.loader,
      auth: nextProps.auth.auth
    };
  }
  render() {
      const {auth, loader} = this.state;
    return (
      <div>
        <Button color="primary" onClick={this.handleSubmit}>
          Authenticate me
        </Button>
        {auth.length > 0 && (<div>{auth}</div>)}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {
    authenticate: bindActionCreators(auth, dispatch)
  };
};
const mapStateToProps = (state: AppState): any => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
