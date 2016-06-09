import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';

export default class HomeLayout extends React.Component {

  _renderLogin() {
    var userId = Meteor.userId();

    if(userId) {
      if(Roles.userIsInRole(userId, 'admin')) {
        FlowRouter.go("/admin");
      } else {
        Meteor.call('getMyUserEntityId', userId, function(err, res) {
          FlowRouter.go("/" + res);
        });
      }
    } else {
      return <AccountsUIWrapper />
    }
  }

  render() {
    return (
      <div className="main-layout">
        <div className="main-layout-container">
          <div className="four columns offset-by-four">
            <h1>bUcKeTs</h1>
            {this._renderLogin()}
          </div>
        </div>
      </div>
    );
  }
}
ReactMixin(HomeLayout.prototype, TrackerReactMixin);
