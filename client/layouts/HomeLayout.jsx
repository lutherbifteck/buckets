import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';

export default class HomeLayout extends React.Component {
  _renderLogin() {
    var userId = Meteor.userId();

    if(userId && Roles.userIsInRole('admin')) {
      FlowRouter.go("/admin");
    } else if (userId && Roles.userIsInRole('entity-member')) {
      //FlowRouter.go("/admin");
      console.log('redirecting Entity member...');
    } else {
      return <AccountsUIWrapper />
    }
  }

  render() {
    return (
      <div className="main-layout">
        <div className="container">
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
