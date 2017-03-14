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

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phoneNumber: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handlePhoneNumberChange(e) {
    this.setState({phoneNumber: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const phoneNumber = this.state.phoneNumber.trim();

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : phoneNumber
    };
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);


    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('cognitoUser: ',result.user);
      console.log('user name is ', result.user.getUsername());
      console.log('call result:', result);
    });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <text>Sign up</text><br/>
        <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="text"
              value={this.state.phoneNumber}
              placeholder="Phone number"
              onChange={this.handlePhoneNumberChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }
}
