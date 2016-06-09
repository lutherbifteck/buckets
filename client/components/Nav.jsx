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

  _getEntityId() {
    if ( !Roles.userIsInRole(Meteor.userId(), ['admin']) ) {
      Meteor.call('getMyUserEntityId', Meteor.userId(), (err, res) => {
        if (err) { throw new Meteor.Error('could-not-get-permissions', err.reason); }
        console.log(res)
        Session.set('homeBtnUrl', res);
      });
      return Session.get('homeBtnUrl');
    }
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
          <a href={"/"+ this._getEntityId()}>
            <span className="lnr lnr-home"></span>
          </a>
          <a href="/admin" className={FlowRouter.current().path == "/admin" ? 'active' : ''}>
            test admin route
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
