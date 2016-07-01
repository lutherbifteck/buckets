import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      subscription: {
        allUsers: Meteor.subscribe('allUsers'),
      }
    }
    console.log("Admin: ", Roles.userIsInRole(Meteor.userId(), ['admin']))
  }

  componentWillUnmount(){
    this.state.subscription.allUsers.stop();
  }

  _getAllUsers() {
    return Meteor.users.find({});
  }

  render() {
    let allUsers = this._getAllUsers();

    let userList = allUsers.map((user)=>{
      return (
        <div key={user._id}>
          <h3>{user.username}</h3>
          {user.emails[0].address}
        </div>
      )
    });

    return (
      <div className="manage-users">
        <h1>Manage Users</h1>
        <p># of users: {allUsers.length}</p>
        { userList }
      </div>
    )
  }
} ReactMixin(ManageUsers.prototype, TrackerReactMixin);
