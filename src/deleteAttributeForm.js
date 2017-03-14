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

export default class DeleteAttributeForm extends React.Component {
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
                var attributeList = [];
                var attributeName = prompt('Please input attribute name' ,'');

                attributeList.push(attributeName);

                cognitoUser.deleteAttributes(attributeList, (err,result) => {
                    if(err) {
                        console.log("Error",err);
                        return;
                    }
                    console.log("attribute Deleted!",result);
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
        <text>Delete user attribute </text><br/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.oldPassword}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}
