import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityForm extends React.Component {
  constructor() {
    super();
    this.state = {
      entTitle: 'Bob Belcher',
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
    var tel = this.refs.entTel.value.trim();
    var address = this.refs.entAddress.value.trim();
    var web = this.refs.entWeb.value.trim();

    // user vars
    var newMemberName = title;
    var newMemberEmail = this.refs.newMemberEmail.value.trim();
    var newMemberPassword = this.refs.newMemberPassword.value.trim();

    var entityData = {
      title: title,
      bucketType: bucketType,
      desc: desc,
      goal: goal,
      tel: tel,
      address: address,
      web: web,
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
      this.refs.entTel.value ='';
      var address = this.refs.entAddress.value ='';
      var web = this.refs.entWeb.value ='';
    });
  }

  _updateNewEntityTitle() {
    this.setState({entityTitle: this.refs.entityTitle.value})
  }


  _renderFields() {
    if(this.state.bucketType==="startups") {
      return (
        <div className="row">
          <div className="four columns">
            <label>Goal</label>
            <select ref="goal" className="u-full-width">
              <option value="ds">DS Branded Products</option>
              <option value="">Exclusive Distribution</option>
              <option value="">Marketing Play</option>
              <option value="">E-Commerce</option>
              <option value="">Selling Products to New Market</option>
              <option value="">Capability Building</option>
              <option value="">Adapted Technology</option>
              <option value="">Resale</option>
              <option value="">Integration into Offering</option>
              <option value="">In-kind Services</option>
              <option value="">Co-Development</option>
              <option value="">Others (Allows User to Type in)</option>
            </select>
          </div>
          <div className="four columns">
            <label>LOB</label>
            <select ref="lob" className="u-full-width">
              <option value="">TELS</option>
              <option value="">Aptura</option>
              <option value="">DSSI</option>
              <option value="">Products</option>
              <option value="">Technology</option>
              <option value="">DSMI</option>
              <option value="">Marketing</option>
              <option value="">DSI</option>
              <option value="">Others (Allows User to Type in)</option>
            </select>
          </div>
          <div className="four columns">
            <label>Stage</label>
            <select ref="stage" className="u-full-width">
              <option value="">Alpha</option>
              <option value="">Pilot</option>
              <option value="">Exploratory</option>
              <option value="">Commercialization</option>
              <option value="">Ready to be Built</option>
              <option value="">Negotiating</option>
              <option value="">Proof-of-concept</option>
              <option value="">Build-in-progress</option>
              <option value="">Building Model</option>
              <option value="">Paused</option>
              <option value="">Others (Allows user to type in)</option>
            </select>
          </div>
        </div>
      )
    } else if (this.state.bucketType === "universities") {
      return (
        <div className="row">
          <div className="six columns">
            <label>Partnership Type</label>
            <select ref="stage" className="u-full-width">
              <option value="">Alpha</option>
              <option value="">Pilot</option>
              <option value="">Exploratory</option>
              <option value="">Commercialization</option>
              <option value="">Ready to be Built</option>
              <option value="">Negotiating</option>
              <option value="">Proof-of-concept</option>
              <option value="">Build-in-progress</option>
              <option value="">Building Model</option>
              <option value="">Paused</option>
              <option value="">Others (Allows user to type in)</option>
            </select>
          </div>
          <div className="six columns">
            <label>Goal</label>
            <select ref="stage" className="u-full-width">
              <option value="">Alpha</option>
              <option value="">Pilot</option>
              <option value="">Exploratory</option>
              <option value="">Commercialization</option>
              <option value="">Ready to be Built</option>
              <option value="">Negotiating</option>
              <option value="">Proof-of-concept</option>
              <option value="">Build-in-progress</option>
              <option value="">Building Model</option>
              <option value="">Paused</option>
              <option value="">Others (Allows user to type in)</option>
            </select>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="six columns">
            <label>Partnership Type</label>
            <select ref="stage" className="u-full-width">
              <option value="">Alpha</option>
              <option value="">Pilot</option>
              <option value="">Exploratory</option>
              <option value="">Commercialization</option>
              <option value="">Ready to be Built</option>
              <option value="">Negotiating</option>
              <option value="">Proof-of-concept</option>
              <option value="">Build-in-progress</option>
              <option value="">Building Model</option>
              <option value="">Paused</option>
              <option value="">Others (Allows user to type in)</option>
            </select>
          </div>
          <div className="six columns">
            <label>Goal</label>
            <select ref="stage" className="u-full-width">
              <option value="">Alpha</option>
              <option value="">Pilot</option>
              <option value="">Exploratory</option>
              <option value="">Commercialization</option>
              <option value="">Ready to be Built</option>
              <option value="">Negotiating</option>
              <option value="">Proof-of-concept</option>
              <option value="">Build-in-progress</option>
              <option value="">Building Model</option>
              <option value="">Paused</option>
              <option value="">Others (Allows user to type in)</option>
            </select>
          </div>
        </div>
      )
    }
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

               {this._renderFields()}

               <label>Description</label>
               <input className="u-full-width"
                      type="text"
                      ref="entityDesc"
                      placeholder="Description" />

              <label>Phone</label>
              <input type="tel"
                     ref="entTel"
                     className="u-full-width"
                     placeholder="000.000.0000"/>

              <label>Address</label>
              <input type="text"
                       ref="entAddress"
                       placeholder="123 Main St, Somewhere, Planet Earth"
                       className="u-full-width"/>

              <label>Website</label>
              <input type="url"
                     ref="entWeb"
                     className="u-full-width"
                     placeholder="http://bobsburgers.com"/>

            </div>
            <div className="four columns">
              <h4>User Info</h4>
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
