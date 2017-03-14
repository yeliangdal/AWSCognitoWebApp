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


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    var authenticationData = {
        Username : email,
        Password : password,
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username : email,
        Pool : userPool
    };
    //create a CognitoUser user

    var cognitoUser = new CognitoUser(userData);
    console.log('authenticationDetails:',authenticationDetails);
    cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess: (result) => {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('idToken + ' + result.idToken.jwtToken);
            console.log('call result:', result);
        },
        onFailure: (err) => {
            console.log('err',err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });

    console.log('User',cognitoUser);
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <text>Sign in</text> <br/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>

        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}
