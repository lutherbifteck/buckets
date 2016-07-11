import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class EditEntityForm extends React.Component {
  constructor() {
    super();
    this.state = {
      bucketType: 'startups'
    }
  }

  _handleTitleChange(event) {
    this.setState({entTitle: event.target.value});
  }

  _handleBucketTypeChange(event) {
    this.setState({bucketType: event.target.value});
  }

  _editEntity(event) {
    event.preventDefault();
    var newData = {};

    var entityID = this.props.entityInfo._id;

    var title = this.refs.entityTitle.value.trim();
    var bucketType = this.refs.entBucketType.value;
    var desc = this.refs.entityDesc.value.trim();
    var tel = this.refs.entTel.value.trim();
    var address = this.refs.entAddress.value.trim();
    var web = this.refs.entWeb.value.trim();
    var goal = this.refs.goal.value.trim();
    
    newData = {
      title: title,
      bucketType: bucketType,
      desc: desc,
      goal: goal,
      phone: tel,
      address: address,
      web: web
    }
    // add the dynamic values to newData
    if (this.refs.lob) {
      newData.lob = this.refs.lob.value
    }
    if (this.refs.stage) {
      newData.stage = this.refs.stage.value;
    }
    if (this.refs.partnershiptype) {
      newData.partnershiptype = this.refs.partnershiptype.value;
    }

    Meteor.call('EditEntity',
                entityID,
                newData,
                (err) => {
      if (err) throw new Meteor.Error('cannot-edit-entity', err.reason);

      Bert.alert({
        title: title + " edited!",
        type: 'success',
        style: 'growl-top-right',
        icon: 'fa-thumbs-up'
      });

      this.refs.entityTitle.value = '';
      this.refs.entityDesc.value = '';
      this.refs.entTel.value ='';
      this.refs.entAddress.value ='';
      this.refs.entWeb.value ='';
    });
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
        onSubmit={this._editEntity.bind(this)} >

          <div className="row">
            <div className="eight columns">
              <h4>Entity Info</h4>
              <label>Title</label>
              <input type="text"
                     ref="entityTitle"
                     defaultValue={this.props.entityInfo.title}
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
                      defaultValue={this.props.entityInfo.desc} />

              <label>Phone</label>
              <input type="tel"
                     ref="entTel"
                     className="u-full-width"
                     defaultValue={this.props.entityInfo.phone} />

              <label>Address</label>
              <input type="text"
                       ref="entAddress"
                       defaultValue={this.props.entityInfo.address}
                       className="u-full-width"/>

              <label>Website</label>
              <input type="url"
                     ref="entWeb"
                     className="u-full-width"
                     defaultValue={this.props.entityInfo.web}/>

            </div>
            <input type="submit" className="button-success u-full-width" value="Edit Entity" />
          </div>
        </form>
        <hr />
      </div>
    )
  }
}