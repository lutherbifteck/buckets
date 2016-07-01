import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class EntityForm extends React.Component {
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

    var files;
    files = this.refs.logo.files;
    return Cloudinary.upload(files,{}, function(err, res) {
      console.log("Upload Error: ", err);
      return console.log("Upload Result: ", res);
    });

    var entityID = this.props.mode == "edit" ? this.props.editID : '';

    entityData = {
      title: title,
      bucketType: bucketType,
      desc: desc,
      goal: goal,
      phone: tel,
      address: address,
      web: web,
      email: newMemberEmail
    }

    if(this.props.mode == "add" && entityData) {
      entityData.createdBy = Meteor.userId();
    }

    // add the dynamic values to entityData
    if (this.refs.lob) {
      entityData.lob = this.refs.lob.value
    }
    if (this.refs.stage) {
      entityData.stage = this.refs.stage.value;
    }
    if (this.refs.partnershiptype) {
      entityData.partnershipType = this.refs.partnershiptype.value;
    }

    newUserData = {
        username: newMemberName,
        email: newMemberEmail,
        password: newMemberPassword,
    };

    if (this.props.mode == "add") {
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
        this.refs.newMemberEmail.value = '';
        this.refs.newMemberPassword.value ='';
        this.refs.entTel.value ='';
        this.refs.entAddress.value ='';
        this.refs.entWeb.value ='';
      });
    }
    else {
      console.log(this.props.entityInfo)
      Meteor.call('EditEntity',
                  entityID,
                  entityData,
                  (err) => {
        if (err) throw new Meteor.Error('cannot-add-entity', err.reason);

        Bert.alert({
          title: 'Entity Edited!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-thumbs-up'
        });
      });
    }
  }



  _updateNewEntityTitle() {
    this.setState({entityTitle: this.refs.entityTitle.value});
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
    var buttonMsg = this.props.mode == "add" ? "Create Entity + User Account" : "Edit Entity";

    return (
      <div>
        <form className="form-inline"
        onSubmit={this._addEntity.bind(this)} >
          <div className="row">
            <div className="eight columns">
              <h4>Entity Info</h4>

              <label>Logo</label>
              <input ref="logo"
                     type="file"
                     className="u-full-width" />

              <label>Title</label>
              <input type="text"
                     ref="entityTitle"
                     defaultValue={this.props.mode == "edit" ? this.props.entityInfo.title : ''}
                     onChange={this._handleTitleChange.bind(this)}
                     className="u-full-width"/>
               <label>Bucket Type</label>
               <select className="u-full-width"
                       ref="entBucketType"
                       onChange={this._handleBucketTypeChange.bind(this)} >
                 <option defaultValue="startups">startups</option>
                 <option defaultValue="universities">universities</option>
                 <option defaultValue="providers">providers</option>
               </select>

               {this._renderFields()}

               <label>Description</label>
               <input className="u-full-width"
                      type="text"
                      ref="entityDesc"
                      defaultValue={this.props.mode == "edit" ? this.props.entityInfo.desc : ''}/>

              <label>Phone</label>
              <input type="tel"
                     ref="entTel"
                     className="u-full-width"
                     defaultValue={this.props.mode == "edit" ? this.props.entityInfo.phone : ''}/>

              <label>Address</label>
              <input type="text"
                       ref="entAddress"
                       defaultValue={this.props.mode == "edit" ? this.props.entityInfo.address : ''}
                       className="u-full-width"/>

              <label>Website</label>
              <input type="url"
                     ref="entWeb"
                     className="u-full-width"
                     defaultValue={this.props.mode == "edit" ? this.props.entityInfo.web : ''}/>

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
                     defaultValue={this.props.mode == "edit" ? this.props.entityInfo.email : ''}/>

              <label>Password</label>
              <input ref="newMemberPassword"
                     type="password"
                     className="u-full-width"/>
            </div>
            <input type="submit" className="button-success u-full-width" defaultValue={buttonMsg}/>
          </div>

        </form>
        <hr />
      </div>
    )
  }
}
