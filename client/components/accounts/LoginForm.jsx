import React from 'react';

export default class LoginForm extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value.trim();
    var confirmPassword = this.refs.confirmPassword.value.trim();

    var accountInfo = {
			email: email,
			password: password
		};

    Meteor.call('MySignupTest', accountInfo);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input class="u-full-width" type="email" placeholder="email" ref="email" />
        <input class="u-full-width" type="password" ref="password" />
        <input class="u-full-width" type="password" ref="confirmPassword" />
        <input class="button-primary" type="submit" value="Submit" />
      </form>
    );
  }
}
