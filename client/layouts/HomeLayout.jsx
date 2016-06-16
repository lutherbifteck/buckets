import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';
import CRMEntryForm from '../components/forms/CRMEntryForm.jsx';

export default class HomeLayout extends React.Component {
   _renderPage() {
    var userId = Meteor.userId();

    if(userId) {
      if(Roles.userIsInRole(userId, 'admin')) {
        FlowRouter.go("/admin");
      } else {
        return <CRMEntryForm userId={userId} />
      }
    } else {
      return <AccountsUIWrapper />
    }
  }

  render() {
    return (
      <div className="six columns offset-by-three">
        {this._renderPage()}
      </div>
    );
  }
}
ReactMixin(HomeLayout.prototype, TrackerReactMixin);
