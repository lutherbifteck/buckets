import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper.jsx';
import CRMEntryForm from '../components/forms/CRMEntryForm.jsx';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddUpdatesForm: false,
    }
  }


  componentWillReceiveProps() {
    // let isEntMember = Meteor.userId() && this.props.loadingEntityData && this.props.currentUser && this.props.currentUser.profile && this.props.currentUser.profile.entity;
    //
    // console.log(isEntMember);
    if( Meteor.userId() && Roles.userIsInRole(Meteor.userId(), 'entity-member') && this.props.loadingEntityData && this.props.currentUser && this.props.currentUser.profile && this.props.currentUser.profile.entity ) {
        let data = this._getEntData();
        if (data[0].customers && data[0].customers.length > 0) {
          this.setState({entityCustomers: data[0].customers})
        } else {
          this.setState({entityCustomers: "no customers yet"})
        };
    }
  }


  _getEntData() {
    return Entities.find({_id: this.props.currentUser.profile.entity}).fetch();
  }

  _renderPageContent() {
    const userId = Meteor.userId();
    const user = Meteor.user();

    if(userId && user) {
      if( Roles.userIsInRole(userId, 'admin') || Roles.userIsInRole(userId, 'exec') ) {
        FlowRouter.go("/admin");
      } else {
        if ( this.state.entityCustomers ) return <CRMEntryForm userData={user} customers={this.state.entityCustomers} />
        // return <CRMEntryForm userData={user} customers={this.state.entityCustomers} />
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
