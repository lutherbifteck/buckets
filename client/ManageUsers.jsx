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
        adminAndExecUsers: Meteor.subscribe('adminAndExecUsers'),
      }
    }
    console.log("Admin: ", Roles.userIsInRole(Meteor.userId(), ['admin']))
  }

  componentWillUnmount(){
    this.state.subscription.adminAndExecUsers.stop();
  }

  _getadminAndExecUsers() {
    return Meteor.users.find({});
  }

  _editUser() {
    console.log("Editing user...")
  }

  _deleteUser(userData) {
    let confirmation = confirm("Are you sure you want to delete " + userData.username + "?");

    if(confirmation) {
      Meteor.call('DeleteUser', userData.id, (err, res)=>{
        if(err) throw new Meteor.Error("Error Deleting User", err);
        Bert.alert({
          title: userData.username + ' Deleted!',
          type: 'success',
          style: 'growl-top-right'
        });
      });
    }
  }

  render() {
    let adminAndExecUsers = this._getadminAndExecUsers();

    let userList = adminAndExecUsers.map((user)=>{
      return (
        <div key={user._id} className="row">
          <div className="nine columns">
            <h3>{user.username}</h3>

            {user.roles.map((role) => { return role; })}

            {user.emails[0].address}
          </div>
          <div className="three columns">
            <button onClick={this._editUser}>
              <span className="lnr lnr-pencil"></span>
            </button>
            <button onClick={this._deleteUser.bind(this, {id: user._id, username: user.username})}
                    className="button-danger-o">
              <span className="lnr lnr-cross"></span>
            </button>
          </div>
        </div>
      )
    });

    return (
      <div className="manage-users">
        <h1>Manage Users</h1>
        <div className="row">
            <div className="eight columns">
              <div className="userlist">
                { userList }
              </div>
            </div>
            <div className="four columns">
              <AddAdminExecForm />
              <p># of users: {adminAndExecUsers.count()}</p>
            </div>
        </div>
      </div>
    )
  }
} ReactMixin(ManageUsers.prototype, TrackerReactMixin);
