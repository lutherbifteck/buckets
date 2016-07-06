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

    //check if they are an admin
    if ( Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin', 'exec']) ) {
      let mngUsersBtn = <a href="/admin/manage-users" className={FlowRouter.current().path == "/admin/manage-users" ? 'active' : ''}>
        <span className="lnr lnr-users"></span>
        <span className="nav-label">Manage <br /> Users</span>
      </a>

      return (
        <div className="navbar-inner">
          <a href="/admin" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
            <span className="lnr lnr-pie-chart"></span>
            <span className="nav-label">Dashboard</span>
          </a>
          <a href="/admin/crm" className={FlowRouter.current().path == "/admin/crm" ? 'active' : ''}>
            <span className="lnr lnr-list"></span>
            <span className="nav-label">CRM</span>
          </a>

          { Roles.userIsInRole(Meteor.userId(), ['admin']) ? mngUsersBtn : null }

          <a href="#" onClick={this._logOut.bind(this)}>
            <span className="lnr lnr-exit"></span>
            <span className="nav-label">Log Out</span>
          </a>
        </div>
      );
    } else if( Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['entity-member'])) {
      return (
        <div className="navbar-inner">
          <a href={"/crm-entry"} className={FlowRouter.current().path == "/crm-entry" ? 'active' : ''}>
            <span className="lnr lnr-plus-circle"></span>
            <span className="nav-label">Add Interaction</span>
          </a>
          <a href={"/past-interactions"} className={FlowRouter.current().path == "/past-interactions" ? 'active' : ''}>
            <span className="lnr lnr-book"></span>
            <span className="nav-label">Past Interactions</span>
          </a>
          <a href="#" onClick={this._logOut.bind(this)}>
            <span className="lnr lnr-exit"></span> <br />
            <span className="nav-label">Log Out</span>
          </a>
        </div>
      );
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
