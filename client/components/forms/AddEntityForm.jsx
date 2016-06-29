import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityForm extends React.Component {
  constructor() {
    super();
    this.state = {
      entTitle: 'Ron Ronson',
      bucketType: 'startups'
    }
  }

  _handleTitleChange(event) {
    this.setState({entTitle: event.target.value});
  }

  _handleBucketTypeChange(event) {
    this.setState({bucketType: event.target.value});
  }

  _addEntity(event) {
    event.preventDefault();
    // entity vars
    var title = this.refs.entityTitle.value.trim();
    var bucketType = this.refs.entBucketType.value;
    var desc = this.refs.entityDesc.value.trim();
    var goal = this.refs.goal.value.trim();

    // user vars
    var newMemberName = title;
    var newMemberEmail = this.refs.newMemberEmail.value.trim();
    var newMemberPassword = this.refs.newMemberPassword.value.trim();

    var entityData = {
      title: title,
      bucketType: bucketType,
      desc: desc,
      goal: goal,
      createdBy: Meteor.userId()
    },
    newUserData = {
        username: newMemberName,
        email: newMemberEmail,
        password: newMemberPassword,
    };

    Meteor.call('AddEntity',
                entityData,
                newUserData,
                (err) => {
      if (err) throw new Meteor.Error('cannot-add-entity', err.reason);

      Bert.alert({
        title: 'Entity Added to ' + bucketType + "!",
        type: 'success',
        style: 'growl-top-right',
        icon: 'fa-thumbs-up'
      });

      this.refs.entityTitle.value = '';
      this.refs.entityDesc.value = '';
      this.refs.goal.value = '';
      this.refs.newMemberEmail.value = '';
      this.refs.newMemberPassword.value ='';
    });
  }

  _updateNewEntityTitle() {
    this.setState({entityTitle: this.refs.entityTitle.value})
  }

  render() {
    return (
      <div>
        <form className="form-inline"
        onSubmit={this._addEntity.bind(this)} >

          <div className="row">
            <div className="eight columns">
              <h4>Entity Info</h4>
              <label>Title</label>
              <input type="text"
                     ref="entityTitle"
                     value={this.state.message}
                     onChange={this._handleTitleChange.bind(this)}
                     className="u-full-width"
                     placeholder="Add new entity..." />
               <label>Bucket Type</label>
               <select className="u-full-width"
                       ref="entBucketType"
                       onChange={this._handleBucketTypeChange.bind(this)} >
                 <option value="startups">startups</option>
                 <option value="universities">universities</option>
                 <option value="providers">providers</option>
               </select>
               <label>Goal</label>
               <input className="u-full-width"
                      type="text"
                      ref="goal"
                      placeholder="Goal" />
               <label>Description</label>
               <input className="u-full-width"
                      type="text"
                      ref="entityDesc"
                      placeholder="Description" />



        <h3>Add fields for</h3>
            <ul>
              <li>Phone</li>
                <li>Address</li>
                <li>name</li>
                <li>email</li>
                <li>password</li>
              </ul>



            </div>
            <div className="four columns">
              <h4>New User Account Info</h4>
              <label>Username</label>
              <h5>{this.state.entTitle}</h5>

              <label>Bucket Type</label>
              <h5>{this.state.bucketType}</h5>

              <label>Email</label>
              <input ref="newMemberEmail"
                     type="email"
                     className="u-full-width"
                     placeholder="Email" />

              <label>Password</label>
              <input ref="newMemberPassword"
                     type="password"
                     className="u-full-width"
                     placeholder="Password" />
            </div>
            <input type="submit" className="button-success u-full-width" value="Create Entity + User Account" />
          </div>
        </form>
        <hr />
      </div>
    )
  }
}
