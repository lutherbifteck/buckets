import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddEntityForm from './components/forms/AddEntityForm.jsx';
import Spinner from './components/Spinner.jsx';
import getCategories from '../both/getCategories.js';

import DonutChart from './components/DonutChart';

var DoughnutChart = require("react-chartjs").Doughnut;

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      filterEntityList: 'all',
      showEntityForm: false,
      subscription: {
        allEntities: Meteor.subscribe('allEntities'),
        startups: Meteor.subscribe("startupEntities"),
        universities: Meteor.subscribe("universityEntities"),
        providers: Meteor.subscribe("providerEntities")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.allEntities.stop();
    this.state.subscription.startups.stop();
    this.state.subscription.universities.stop();
    this.state.subscription.providers.stop();
  }

  _getAllEntities() {
    return Entities.find({}).fetch()
  }
  _getStartups() {
    return Entities.find({bucketType: "startups"}).fetch();
  }
  _getUniversities() {
    return Entities.find({bucketType: "universities"}).fetch();
  }
  _getProviders() {
    return Entities.find({bucketType: "providers"}).fetch();
  }

  countStartups() {
    return Entities.find({bucketType: "startups"}).count();
  }
  countUniversities() {
    return Entities.find({bucketType: "universities"}).count();
  }
  countProviders() {
    return Entities.find({bucketType: "providers"}).count();
  }

  _renderAdminCntrls() {
    if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return (
        <button onClick={this.formDisplay.bind(this)}
                className="button pull-right"
                type="button">
            {this.state.showEntityForm ? 'Hide form' : '+ Add Entity'}
        </button>
      );
    }
  }

  formDisplay() {
    this.setState({showEntityForm: !this.state.showEntityForm});
  }

  _changeListState() {
    this.setState({filterEntityList: this.refs.filterEntityList.value})
  }

  _renderEntLogo(entLogo) {
    if (entLogo !== '') {
      return Cloudinary._helpers.url(entLogo, {});
    } else {
      return "/images/default-logo.jpg";
    }
  }

  render() {
    let allEntities = this._getAllEntities();
    let startupData = this._getStartups();
    let uniData = this._getUniversities();
    let proData = this._getProviders();
    let filterResult;

    switch(this.state.filterEntityList) {
        case "all":
            filterResult = allEntities;
            break;
        case "startups":
            filterResult = startupData;
            break;
        case "universities":
            filterResult = uniData;
            break;
        case "providers":
            filterResult = proData;
            break;
        default:
            filterResult = allEntities;
    }

  //  if (allEntities.length < 1) return <Spinner/>;

    return (
      <ReactCSSTransitionGroup transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={300} >

      <div key="dashAnimationKey">
        <div className="row doughnutchart-row">
          <div className="one-third column">
            <h5>Startups <small>({this.countStartups()})</small></h5>
            <DonutChart bucket="startup" ents={startupData}/>
          </div>
          <div className="one-third column">
            <h5>Universities <small>({this.countUniversities()})</small></h5>
            <DonutChart bucket="university" ents={uniData}/>
          </div>
          <div className="one-third column">
            <h5>Providers <small>({this.countProviders()})</small></h5>
            <DonutChart bucket="provider" ents={proData}/>
          </div>
        </div>

        <div className="entity-list">
          <hr />

          { this._renderAdminCntrls() }
          <h2>Entities</h2>

          {this.state.showEntityForm ? <AddEntityForm /> : null}

          <select ref="filterEntityList"
                  onChange={this._changeListState.bind(this)} >
            <option value="showall">All</option>
            <option value="startups">Startups</option>
            <option value="universities">Universities</option>
            <option value="providers">Providers</option>
          </select>

          <ul>
              {filterResult.map((ent) => {
                return (
                  <a key={ent._id} href={ent._id}>
                    <li>
                      <img src={this._renderEntLogo(ent.logo)} className="u-max-full-width" />

                      <h5 className={ ent.bucketType+"-color" }>{ent.title}</h5>

                      <span className={"bucket-type " + ent.bucketType + "-color-inverse" }>{ent.bucketType}</span>
                  </li>
                  </a>
                );
              })}
          </ul>
        </div>
      </div>
    </ ReactCSSTransitionGroup>
    )
  }
}
ReactMixin(Dashboard.prototype, TrackerReactMixin);
