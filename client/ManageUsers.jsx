import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AddAdminExecForm from './components/forms/AddAdminExecForm.jsx';

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

  _editUser() {
    console.log("Editing user...")
  }


  _deleteUser() {
    console.log("Deleting user...")
  }

  render() {
    let allUsers = this._getAllUsers();

    let userList = allUsers.map((user)=>{
      return (
        <div key={user._id} className="row">
          <div className="nine columns">
            <h3>{user.username}</h3>
            {user.emails[0].address}
          </div>
          <div className="three columns">
            <button onClick={this._editUser}>
              <span className="lnr lnr-pencil"></span>
            </button>
            <button onClick={this._deleteUser}
                    className="button-danger-o">
              <span className="lnr lnr-cross"></span>
            </button>
          </div>
        </div>
      )
    });

    return (
      <div className="manage-users">
        <AddAdminExecForm />
        <h1>Manage Users</h1>
        <p># of users: {allUsers.length}</p>
        { userList }
      </div>
    )
  }
} ReactMixin(ManageUsers.prototype, TrackerReactMixin);
