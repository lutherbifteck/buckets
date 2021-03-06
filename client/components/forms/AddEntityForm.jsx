import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityForm extends React.Component {
  constructor() {
    super();
    this.state = {
      entTitle: '',
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
    var self = this;
    var entityData = {},
        newUserData = {};
    var title = this.refs.entityTitle.value.trim();
    var bucketType = this.refs.entBucketType.value;
    var desc = this.refs.entityDesc.value.trim();
    var tel = this.refs.entTel.value.trim();
    var address = this.refs.entAddress.value.trim();
    var web = this.refs.entWeb.value.trim();
    var goal = this.refs.goal.value.trim();
    var newMemberName = title;
    var newMemberEmail = this.refs.newMemberEmail.value.trim();
    var newMemberPassword = this.refs.newMemberPassword.value.trim();
    var files = this.refs.logo.files;

    entityData = {
      title: title,
      bucketType: bucketType,
      desc: desc,
      goal: goal,
      phone: tel,
      address: address,
      web: web,
      email: newMemberEmail,
      createdBy: Meteor.userId(),
    }

    if (this.refs.lob) {
      entityData.lob = this.refs.lob.value
    }
    if (this.refs.stage) {
      entityData.stage = this.refs.stage.value;
    }
    if (this.refs.partnershiptype) {
      entityData.partnershiptype = this.refs.partnershiptype.value;
    }

    newUserData = {
        username: newMemberName,
        email: newMemberEmail,
        password: newMemberPassword,
    };

    // needed to wrap AddEntity Method call in function so it could be called after getting a result from Cloudinary or not
    function makeTheCall() {
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

        self.refs.entityTitle.value = '';
        self.refs.entityDesc.value = '';
        self.refs.newMemberEmail.value = '';
        self.refs.newMemberPassword.value ='';
        self.refs.entTel.value ='';
        self.refs.entAddress.value ='';
        self.refs.entWeb.value ='';
        self.refs.logo.value = '';
      });
    }

    if( this.refs.logo.files.length > 0) {
      Cloudinary.upload(files, {}, (err, res) => {
        if (err) throw new Meteor.Error("could-not-upload-logo", err.reason);
        entityData.logo = res.public_id;
        makeTheCall();
      });
    } else {
      entityData.logo = '';
      makeTheCall();
    }

  }

  _updateNewEntityTitle() {
    this.setState({entityTitle: this.refs.entityTitle.value})
  }

  _renderFields() {
    let formatRef = function(key) {
      let lowerCaseKey = key.toLowerCase();
      if( /\s/g.test(lowerCaseKey) ) {
        return lowerCaseKey.replace(/\s/g, '');
      }
      return lowerCaseKey;
    }

    if(this.state.bucketType==="startups") {
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
              <div key={key + "SelectboxContainer"} className="four columns">
                <label>{key}</label>
                <select ref={formatRef(key)} className="u-full-width">
                {startupCategories[key].map((value) => {
                  return <option key={"startOptions" + value} value={value}>{value}</option>
                })}
                </select>
              </div>
            )
          })}
        </div>
      )
    } else if (this.state.bucketType === "universities") {
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
            return (
              <div key={key + "SelectboxContainer"} className="six columns">
                <label>{key}</label>
                <select ref={formatRef(key)} className="u-full-width">
                {universityCategories[key].map((value) => {
                  return <option key={"uniOptions" + value} value={value}>{value}</option>
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
              <div key={key + "SelectboxContainer"} className="six columns">
                <label>{key}</label>
                <select ref={formatRef(key)} className="u-full-width">
                {providerCategories[key].map((value) => {
                  return <option key={"proOptions" + value} value={value}>{value}</option>
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
                     className="u-full-width" />

              <label>Logo</label>
              <input ref="logo"
                     type="file" />

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
