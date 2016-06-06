import React from 'react';

export default class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    // eventually do this code on the server
    // Meteor.call();

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="row">
          <div class="six columns">
            <label htmlFor="LoginEmailInput">Your email</label>
            <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="LoginEmailInput" />
          </div>
          <div class="six columns">
            <label htmlFor="exampleRecipientInput">Reason for contacting</label>
            <select class="u-full-width" id="exampleRecipientInput">
              <option value="Option 1">Questions</option>
              <option value="Option 2">Admiration</option>
              <option value="Option 3">Can I get your number?</option>
            </select>
          </div>
        </div>
        <label htmlFor="exampleMessage">Message</label>
        <textarea class="u-full-width" placeholder="Hi Dave …" id="exampleMessage"></textarea>
        <label class="example-send-yourself-copy">
          <input type="checkbox" />
          <span class="label-body">Send a copy to yourself</span>
        </label>
        <input class="button-primary" type="submit" value="Submit" />
      </form>
    );
  }
}
