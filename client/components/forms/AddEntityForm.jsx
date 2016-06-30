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
    // var goal = this.refs.goal.value.trim();
    var goal = "The goal"
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
    var keyCount;
    if(this.state.bucketType==="startups") {
      keyCount = 0;
      let startupCategories = {
        "Goal": [
          "DS Branded Products",
          "Exclusive Distribution",
          "Marketing Play",
          "E-Commerce",
          "Selling Products to New Market",
          "Capability Building",
          "Adapted Technology",
          "Resale",
          "Integration into Offering",
          "In-kind Services",
          "Co-Development"
        ],
        "LOB": [
          "TELS",
          "Aptura",
          "DSSI",
          "Products",
          "Technology",
          "DSMI",
          "Marketing",
          "DSI"
        ],
        "Stage": [
          "Alpha",
          "Pilot",
          "Exploratory",
          "Commercialization",
          "Ready to be Built",
          "Negotiating",
          "Proof-of-concept",
          "Build-in-progress",
          "Building Model",
          "Paused"
        ]
      }

      return (
        <div key="startCats" className="row">
          {Object.keys(startupCategories).map((key)=> {
            return (
              <div className="four columns">
                <label>{key}</label>
                <select ref="interaction{key}" className="u-full-width">
                {startupCategories[key].map((ent) => {
                  return <option key={"startOptions"+ent+keyCount++} value="{ent}">{ent}</option>
                })}
                </select>
              </div>
            )
          })}
        </div>
      )
    } else if (this.state.bucketType === "universities") {
      keyCount = 0;
      let universityCategories = {
        "Partnership Type": [
          "Co-Develop",
          "Test Solutions",
          "In-Kind Services",
          "Exploratory",
          "Paused"
        ],
        "Goal": [
          "Recruitment",
          "DS Branded Products",
          "Exclusive Distribution",
          "Marketing Play",
          "E-Commerce",
          "Selling Products to New Market",
          "Capability Building",
          "Adapted Technology",
          "Resale",
          "Integration into Offering",
          "In-kind Services",
          "Co-Development"
        ]
      };

      return (
        <div key="uniCats" className="row">
          {Object.keys(universityCategories).map((key)=> {
            keyCount = 0;
            return (
              <div className="six columns">
                <label>{key}</label>
                <select ref="interaction{key}" className="u-full-width">
                {universityCategories[key].map((ent) => {
                  let keyCount = 0;
                  return <option key={"uniOptions" + ent + keyCount++} value="{ent}">{ent}</option>
                })}
                </select>
              </div>
            )
          })}
        </div>
      )
    } else {
      let providerCategories = {
        "Partnership Type": [
          "Co-Develop",
          "Test Solutions",
          "In-Kind Services",
          "Exploratory",
          "Paused"
        ],
        "Goal": [
          "DS Branded Products",
          "Exclusive Distribution",
          "Marketing Play",
          "E-Commerce",
          "Selling Products to New Market",
          "Capability Building",
          "Adapted Technology",
          "Resale",
          "Integration into Offering",
          "In-kind Services",
          "Co-Development"
        ]
      };

      return (
        <div key="proCats" className="row">
          {Object.keys(providerCategories).map((key)=> {
            return (
              <div className="six columns">
                <label>{key}</label>
                <select ref="interaction{key}" className="u-full-width">
                {providerCategories[key].map((ent) => {
                  return <option key={"proOptions" + ent + keyCount++} value="{ent}" >{ent}</option>
                })}
                </select>
              </div>
            )
          })}
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
