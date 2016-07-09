import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import AddEntityForm from './components/forms/AddEntityForm.jsx';
var DoughnutChart = require("react-chartjs").Doughnut;

var TestDonutChart = React.createClass({
  render: function() {

  function rand(min, max, num) {
     var rtn = [];
     while (rtn.length < num) {
       rtn.push((Math.random() * (max - min)) + min);
     }
     return rtn;
   }

    var chartData = [
    {
        value: rand(25, 300, 1)[0],
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: rand(25, 300, 1)[0],
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: rand(25, 300, 1)[0],
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: rand(25, 300, 1)[0],
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: rand(25, 300, 1)[0],
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }
    ];
    var chartOptions = {
        animation: true,
        responsive: true
    };
    return (
      <div>
        <DoughnutChart data={chartData} options={chartOptions}/>
        <select>
          <option value="goal">Goal</option>
          <option value="partnershipType">Partnership Type</option>
        </select>
      </div>
    )
  }
});

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

    return (
      <div>
        <div className="row doughnutchart-row">
          <div className="one-third column">
            <h5>Startups <small>({this.countStartups()})</small></h5>
            <TestDonutChart chartData="test" />
          </div>
          <div className="one-third column">
            <h5>Universities <small>({this.countUniversities()})</small></h5>
            <TestDonutChart chartData="test" />
          </div>
          <div className="one-third column">
            <h5>Providers <small>({this.countProviders()})</small></h5>
            <TestDonutChart chartData={proData} />
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

                    <h3 className={ ent.bucketType+"-color" }>{ent.title}</h3>

                    <span className={"bucket-type " + ent.bucketType + "-color-inverse" }>{ent.bucketType}</span>
                </li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
}
ReactMixin(Dashboard.prototype, TrackerReactMixin);
