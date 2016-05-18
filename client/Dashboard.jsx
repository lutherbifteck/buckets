import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

Entities = new Mongo.Collection('entities');
Projects = new Mongo.Collection('projects');

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      subscription: {
        startups: Meteor.subscribe("startupEntities"),
        universities: Meteor.subscribe("universityEntities"),
        providers: Meteor.subscribe("providerEntities")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.startups.stop();
    this.state.subscription.universities.stop();
    this.state.subscription.providers.stop();
  }

  addEntity(event) {
    event.preventDefault();
    var title = this.refs.entityTitle.value.trim();
    var bucketType = this.refs.entBucketType.value;

    Meteor.call('AddEntity', title, bucketType, () => {
      this.refs.entityTitle.value = '';
    });
  }

  getStartups() {
    return Entities.find({bucketType: "startups"}).fetch();
  }
  getUniversities() {
    return Entities.find({bucketType: "universities"}).fetch();
  }
  getProviders() {
    return Entities.find({bucketType: "providers"}).fetch();
  }

  render() {
    let startupList = this.getStartups();
    let universityList = this.getUniversities();
    let providersList = this.getProviders();

    return (
      <div>


      <form className="form-inline"
            onSubmit={this.addEntity.bind(this)} >
        <div className="row">
          <div className="eight columns">
              <div className="form-group">
                <input type="text"
                       ref="entityTitle"
                       className="u-full-width"
                       placeholder="Add new entity..." />
              </div>
          </div>
          <div className="four columns">
              <select className="u-full-width"
                      ref="entBucketType">
                <option value="startups">startups</option>
                <option value="universities">universities</option>
                <option value="providers">providers</option>
              </select>
            </div>
          </div>
        </form>
        <div class="row">
          <div className="one-third column">
            <h2>Startups</h2>
            {startupList.map((ent) => {
              return (
                <li key={ent._id}>
                  <a href={ent._id}>
                    {ent.title}
                    <span className="badge pull-right">{'Count of Projects'}</span>
                  </a>
                </li>
              )
            })}
          </div>
          <div className="one-third column">
            <h2>Universities</h2>
            <ul>
              {universityList.map((ent) => {
                return (
                  <li key={ent._id}>
                    <a href={ent._id}>
                      {ent.title}

                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="one-third column">
            <h2>Providers</h2>
            <ul>
              {providersList.map((ent) => {
                return (
                  <li key={ent._id}>
                    <a href={ent._id}>
                      {ent.title}

                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
ReactMixin(Dashboard.prototype, TrackerReactMixin);
