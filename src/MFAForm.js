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

export default class MFAForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            mfaEnabled: false
        };
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleMFAChange(e) {
        if(e.target.name === "MFA enable"){
            this.setState({mfaEnabled: true});
        }
        if(e.target.name === "MFA disable"){
            this.setState({mfaEnabled: false});
        }
    }


handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const mfaEnabled = this.state.mfaEnabled;

    var userData = {
        Username : email,
        Pool : userPool
    };

    var authenticationData = {
        Username : email,
        Password : password,
    };

    var authenticationDetails = new AuthenticationDetails(authenticationData);
    //create a CognitoUser user
    var cognitoUser = new CognitoUser(userData);

    //authenticate the user first in order to change password
    cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess: (result) => {
            console.log('User get authenticated. call result:', result);

            if(!!mfaEnabled){
                cognitoUser.enableMFA((err, result) => {
                    if (err) {
                        alert(err);
                        return;
                    }
                    console.log('call result: ' + result);
                });
            }
            else {
                cognitoUser.disableMFA((err, result)=> {
                    if (err) {
                        alert(err);
                        return;
                    }
                console.log('call result: ' + result);
                });
            }

        },
        onFailure: (err) => {
            console.log('err',err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });

    /*

    */

}

  render() {
    return (
        <form onSubmit={this.handleSubmit.bind(this)}>
            <text>Enable/disable multi factor authentication</text><br/>
            <input type="text"
                   value={this.state.email}
                   placeholder="Email"
                   onChange={this.handleEmailChange.bind(this)}/>
            <input type="password"
                   value={this.state.oldPassword}
                   placeholder="Password"
                   onChange={this.handlePasswordChange.bind(this)}/>
            <br/>
            <input type="radio" name="MFA enable"
                    value={this.state.mfaEnabled}
                    checked={this.state.mfaEnabled}
                    onChange={this.handleMFAChange.bind(this)} /> Enable MFA
            <input type="radio" name="MFA disable"
                    value={!this.state.mfaEnabled}
                    checked={!this.state.mfaEnabled}
                    onChange={this.handleMFAChange.bind(this)} /> Disable MFA
            <input type="submit"/>
        </form>
    );
  }
}
