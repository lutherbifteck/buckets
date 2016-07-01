import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    if(Meteor.userId()) {
      if (Roles.userIsInRole(Meteor.userId(), ['admin', 'exec'])) {
        FlowRouter.go('dashboard');
      } else {
        FlowRouter.go('crmEntry');
      }
    }
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.atForm, ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
