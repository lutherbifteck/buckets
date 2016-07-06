// import { Accounts } from 'meteor/accounts-base';
import React from 'react';
// import ReactMixin from 'react-mixin';
// import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class AddAdminExecForm extends React.Component {
  addNewEntityMember(event) {
    event.preventDefault();
    let name = this.refs.name.value.trim();
    let accountType = this.refs.accountType.value;
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    let newUserData = {
      username: name,
      email: email,
      password: password,
      profile: {
        createdBy: Meteor.userId()
      },
    }

    Meteor.call('addAdminOrExec', newUserData, accountType, (err) => {
        if (err) throw new Meteor.Error('cannot-add-member', err.reason);

        Bert.alert({
          title: `${name} added!`,
          message: 'Don\'t forget to tell them their password is ' + password,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-thumbs-up'
        });

        //clear the form
        this.refs.name.value = '';
        this.refs.accountType.value ='exec';
        this.refs.email.value ='';
        this.refs.password.value ='';
      }
    );
  }

  render() {
    return (
      <div>
        <h5>Add New User</h5>

        <form id="newMemberForm" onSubmit={this.addNewEntityMember.bind(this)} >
          <label>Username</label>
          <input ref="name"
                 className="u-full-width"
                 type="text"
                 placeholder="Username" />

         <label>Account Type</label>
         <select ref="accountType"
                 className="u-full-width" >
           <option value="exec">Exec</option>
           <option value="admin">Admin</option>
         </select>

         <label>Email</label>
         <input ref="email"
                 type="email"
                 placeholder="Email"
                 className="u-full-width" />

         <label>Password</label>
         <input ref="password"
                 type="password"
                 placeholder="Password"
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
