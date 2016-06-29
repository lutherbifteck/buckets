import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';
import CRMEntryForm from '../components/forms/CRMEntryForm.jsx';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
// import TrackerReact from "meteor/ultimatejs:tracker-react";

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUpdatesForm: false,
    }
  }

  componentWillReceiveProps() {
    if(this.props.loadingEntityData && this.props.currentUser && this.props.currentUser.profile && this.props.currentUser.profile.entity) {
      if(Roles.userIsInRole(Meteor.userId(), 'entity-member')) {
        let ble = this._getEntData();
        if (ble[0].customers) this.setState({entityCustomers: ble[0].customers});
      }
    }
  }

  _getEntData() {
    return Entities.find({_id: this.props.currentUser.profile.entity}).fetch();
  }

   _renderPageContent() {
    const userId = Meteor.userId();
    const user = Meteor.user();


    if(userId && user) {
      if(Roles.userIsInRole(userId, 'admin') || Roles.userIsInRole(userId, 'exec')  ) {
        FlowRouter.go("/admin");
      } else {
        if ( !this.state.entityCustomers ) return "Loading customers...";
        return <CRMEntryForm userData={user} customers={this.state.entityCustomers} />
      }
    } else {
      return <AccountsUIWrapper />
    }
  }

  render() {
    return (
      <div className="six columns offset-by-three">

        {this._renderPageContent()}
      </div>
    );
  }
}
ReactMixin(HomeLayout.prototype, TrackerReactMixin);
