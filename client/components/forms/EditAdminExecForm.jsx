// import { Accounts } from 'meteor/accounts-base';
import React from 'react';
// import ReactMixin from 'react-mixin';
// import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class EditAdminExecForm extends React.Component {
  _editUser(event) {
    event.preventDefault();
    let name = this.refs.name.value.trim();
    let accountType = this.refs.accountType.value;
    let email = this.refs.email.value.trim();

    let userData = {
      username: name,
      emails: [
        {address: email}],
    };

    Meteor.call('EditUser', this.props.userId, userData, accountType, (err) => {
        if (err) throw new Meteor.Error('cannot-add-member', err.reason);

        Bert.alert({
          title: `${name} edited!`,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-thumbs-up'
        });

        //clear the form
        /*this.refs.name.value = '';
        this.refs.accountType.value ='';
        this.refs.email.value ='';
        this.refs.password.value ='';*/
      }
    );

    this.props.closeEdit();
  }

  render() {
    console.log(this.props.userId);
    return (
      <div>
        <h5>Edit User</h5>

        <form id="newMemberForm" onSubmit={this._editUser.bind(this)} >
          <label>Username</label>
          <input ref="name"
                 className="u-full-width"
                 type="text"
                 defaultValue={this.props.userData.username} />

         <label>Account Type</label>
         <select ref="accountType"
                 className="u-full-width" >
           <option value="default">Change account type?</option>
           <option value="exec">Exec</option>
           <option value="admin">Admin</option>
         </select>

         <label>Email</label>
         <input ref="email"
                 type="email"
                 defaultValue={this.props.userData.email}
                 className="u-full-width" />

          <input type="submit"
                 className="u-full-width button-success"
                 value="submit" />
        </form>
      </div>
    );
  }
}
// ReactMixin(AddAdminExecForm.prototype, TrackerReactMixin);
