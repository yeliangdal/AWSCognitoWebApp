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

Config.region = appConfig.region;

export default class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
        };
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleOldPasswordChange(e) {
        this.setState({oldPassword: e.target.value});
    }

    handleNewPasswordChange(e) {
        this.setState({newPassword: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email.trim();
        const oldPassword = this.state.oldPassword.trim();
        const newPassword = this.state.newPassword.trim();

        var userData = {
            Username : email,
            Pool : userPool
        };

        var authenticationData = {
            Username : email,
            Password : oldPassword,
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);
        //create a CognitoUser user
        var cognitoUser = new CognitoUser(userData);
        //authenticate the user first in order to change password

        cognitoUser.authenticateUser(authenticationDetails,{
            onSuccess: (result) => {
                console.log('User get authenticated. call result:', result);
                cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
                    if (err) {
                        console.log('Error: ' + err);
                        return;
                    }
                    console.log('Password changed! call result: ' + result);
                });
            },
            onFailure: (err) => {
                console.log('err',err);
            },
            mfaRequired: function(codeDeliveryDetails) {
                var verificationCode = prompt('Please input verification code' ,'');
                cognitoUser.sendMFACode(verificationCode, this);
            }
        });
  }



  render() {
    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <text>Change password</text><br/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.oldPassword}
               placeholder="Old password"
               onChange={this.handleOldPasswordChange.bind(this)}/>
        <input type="password"
              value={this.state.newPassword}
              placeholder="New password"
              onChange={this.handleNewPasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}
