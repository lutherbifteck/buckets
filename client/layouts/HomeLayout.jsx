import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

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
        Meteor.call("getMyUserEntityId", Meteor.userId(), (err, res) => {
          if(err) throw new Meteor.Error("could-not-get-entityId", err);
          Session.set("userEntityId", res);
        });
        return <CRMEntryForm userId={userId} userEntityId={Session.get("userEntityId")} />
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
