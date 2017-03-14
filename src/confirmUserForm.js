import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
} from "amazon-cognito-identity-js";

import appConfig from "./config";

import React from "react";

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

export default class ConfirmUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      verificationCode: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleVerificationCodeChange(e) {
    this.setState({verificationCode: e.target.value});
  }


  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const verificationCode = this.state.verificationCode.trim();

    var userData = {
        Username : email,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
            console.log('Error:', err);
            return;
        }
        console.log('call result: ' + result);
    });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <text>Confirm a user</text><br/>
          <input type="text"
                 value={this.state.email}
                 placeholder="Email"
                 onChange={this.handleEmailChange.bind(this)}/>
          <input type="text"
                value={this.state.verificationCode}
                placeholder="Confirmation Code"
                onChange={this.handleVerificationCodeChange.bind(this)}/>
          <input type="submit"/>
        </form>
    );
  }
}
