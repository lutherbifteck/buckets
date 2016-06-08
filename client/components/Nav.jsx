import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class Nav extends React.Component {
  _logOut() {
    Meteor.logout(function(err){
      if(err) { throw new Meteor.Error('cannot-log-out', err.reason); }
      FlowRouter.go("/");
    });
  }

  //handles which options show up for a certain type of user
  _renderNavControls() {
    if ( Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      return (
        <div className="navbar-inner">
          <a href="/admin" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
            <span className="lnr lnr-home"></span>
          </a>
          <a href="/admin/manage-users" className={FlowRouter.current().path == "/admin/manage-users" ? 'active' : ''}>
            <span className="lnr lnr-users"></span>
          </a>
          <a href="#" onClick={this._logOut.bind(this)}>
            <span className="lnr lnr-cross-circle"></span>
          </a>
        </div>
      );
    } else {
      return (
        <div className="navbar-inner">
          <a href="/" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
            <span className="lnr lnr-home"></span>
          </a>

          <a href="/admin" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
            admin
          </a>

          <a href="#" onClick={this._logOut.bind(this)}>
            <span className="lnr lnr-cross-circle"></span>
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
