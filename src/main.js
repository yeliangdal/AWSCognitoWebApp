import React from "react";
import ReactDOM from "react-dom";

import SignUpForm from "./signUpForm";
import LoginForm from "./loginForm";
import ConfirmUserForm from "./confirmUserForm";
import ResendConfirmationForm from "./resendConfirmationForm";
import MFAForm from "./MFAForm";
import ChangePasswordForm from "./changePasswordForm";
import ForgotPasswordForm from "./forgotPasswordForm";
import UpdateAttributeForm from "./updateAttributeForm";
import DeleteAttributeForm from "./deleteAttributeForm";
import RetrieveAttributeForm from "./retrieveAttributeForm";


ReactDOM.render(<SignUpForm />, document.getElementById('signUpForm'));
ReactDOM.render(<LoginForm />, document.getElementById('loginForm'));
ReactDOM.render(<ConfirmUserForm />, document.getElementById('confirmUserForm'));
ReactDOM.render(<ResendConfirmationForm />, document.getElementById('resendConfirmation'));
ReactDOM.render(<ChangePasswordForm />, document.getElementById('changePasswordForm'));
ReactDOM.render(<ForgotPasswordForm />, document.getElementById('forgotPasswordForm'));
ReactDOM.render(<UpdateAttributeForm />, document.getElementById('updateAttributeForm'));
ReactDOM.render(<DeleteAttributeForm />, document.getElementById('deleteAttributeForm'));
ReactDOM.render(<RetrieveAttributeForm />, document.getElementById('retrieveAttributeForm'));
ReactDOM.render(<MFAForm />, document.getElementById('mfaForm'));
