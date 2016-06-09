import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class AddNewEntityMemberForm extends React.Component {
  addNewEntityMember(event) {
    event.preventDefault();
    var newMemberName = this.refs.newMemberName.value.trim();
    var newMemberEmail = this.refs.newMemberEmail.value.trim();
    var newMemberPassword = this.refs.newMemberPassword.value.trim();
    var entityID = this.props.entityID;

    Meteor.call('addNewEntityMember',
      newMemberName,
      newMemberEmail,
      newMemberPassword,
      entityID,
      function(err) {
        if (err) throw new Meteor.Error('cannot-add-member', err.reason);
      }
    );

    //clear the form
    this.refs.newMemberName.value = '';
    this.refs.newMemberEmail.value ='';
    this.refs.newMemberPassword.value ='';
  }

  render() {
    return (
      <div>
        <h5>Add New Member</h5>
        <form id="newMemberForm" onSubmit={this.addNewEntityMember.bind(this)} >
          <input ref="newMemberName"
                 className="u-full-width"
                 type="text"
                 placeholder="Name" />
          <input ref="newMemberEmail"
                 type="email"
                 placeholder="Email" />
          <input ref="newMemberPassword"
                 type="password"
                 placeholder="Password" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
ReactMixin(AddNewEntityMemberForm.prototype, TrackerReactMixin);
