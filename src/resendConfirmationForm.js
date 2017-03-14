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


export default class ResendConfirmationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email.trim();

        var userData = {
            Username : email,
            Pool : userPool
        };
        //create a CognitoUser user
        var cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode((err, result) => {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

  render() {
    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <text>Resend confirmation code</text> <br/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}
