import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class Nav extends React.Component {

  _logOut() {
    Meteor.logout();
  }

  //handles which options show up for a certain type of user
  _renderNavControls() {
    // check if user is logged in
    if(Meteor.userId()) {
      //check if they are an admin
      if ( Roles.userIsInRole(Meteor.userId(), ['admin', 'exec'])) {
        return (
          <div className="navbar-inner">
            <a href="/admin" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
              <span className="lnr lnr-pie-chart"></span> <br />Dashboard
            </a>
            <a href="/admin/crm" className={FlowRouter.current().path == "/admin/crm" ? 'active' : ''}>
              <span className="lnr lnr-list"></span>
              <br /> Incubator CRM
            </a>
            
            <a href="/admin/manage-users" className={FlowRouter.current().path == "/admin/manage-users" ? 'active' : ''}>
              <span className="lnr lnr-users"></span>
              <br /> Manage <br /> Users
            </a>
            <a href="#" onClick={this._logOut.bind(this)}>
              <span className="lnr lnr-exit"></span>
              <br /> Log Out
            </a>
          </div>
        );
      } else {
        return (
          <div className="navbar-inner">
            <a href={"/crm-entry"} className={FlowRouter.current().path == "/crm-entry" ? 'active' : ''}>
              <span className="lnr lnr-plus-circle"></span>
              <br /> Add Interaction
            </a>
            <a href={"/past-interactions"} className={FlowRouter.current().path == "/past-interactions" ? 'active' : ''}>
              <span className="lnr lnr-book"></span>
              <br /> Past Interactions
            </a>
            <a href="#" onClick={this._logOut.bind(this)}>
              <span className="lnr lnr-exit"></span> <br />
              <br /> Log Out
            </a>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <nav className="navbar">
        {this._renderNavControls()}
      </nav>
    )
  }
}
ReactMixin(Nav.prototype, TrackerReactMixin);
