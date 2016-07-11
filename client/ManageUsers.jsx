import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AddAdminExecForm from './components/forms/AddAdminExecForm.jsx';
import EditAdminExecForm from './components/forms/EditAdminExecForm.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      subscription: {
        adminAndExecUsers: Meteor.subscribe('adminAndExecUsers')
      },
      isEdit: false,
      editId: ''
    };
    console.log("Admin: ", Roles.userIsInRole(Meteor.userId(), ['admin']))
  }

  componentWillUnmount(){
    this.state.subscription.adminAndExecUsers.stop();
  }

  _getadminAndExecUsers() {
    return Meteor.users.find({'roles': {$ne: 'entity-member'} }); // find all users that are not entity-member
    // return Meteor.users.find({});
  }

  _getRoleTitle(id) {
    Meteor.call('RoleTitle', id, (err, res)=>{
        if(err) throw new Meteor.Error("Error Getting Role Title", err);
      });
  }

  _dataFromId(id) {
    let user = Meteor.users.findOne({_id: id});
    console.log(user);
    console.log(user.emails[0].address);
    let data = {
      username: user.username,
      email: user.emails[0].address
    };
    console.log(data);
    return data;
  }

  _editUser(id) {
    this.setState({isEdit: true, editId: id});
  }

  _closeEdit() {
    this.setState({isEdit: false, editId: ''})
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
            <p>
              {user.roles[0]}<br />
              {user.emails[0].address}
            </p>
            {/*Meteor.call('RoleTitle', user)*/}
          </div>
          <div className="three columns">
            <button onClick={this._editUser.bind(this, user._id)}>
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
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={300} >

        <div className="manage-users" key="MngUsersAnimationKey">
          <h1>Manage Users</h1>
          <div className="row">
              <div className="eight columns">
                <p># of users: {adminAndExecUsers.count()}</p>
                <div className="userlist">
                  { userList }
                </div>
              </div>
              <div className="four columns">
                {
                  this.state.isEdit ? <EditAdminExecForm userId={this.state.editId} userData={this._dataFromId(this.state.editId)} closeEdit={this._closeEdit.bind(this)}/> : <AddAdminExecForm />
                }
              </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
} ReactMixin(ManageUsers.prototype, TrackerReactMixin);
