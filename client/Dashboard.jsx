import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

import AddEntityForm from './components/forms/AddEntityForm.jsx';

//test chart
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
        animation: true
    };
    return <DoughnutChart data={chartData} options={chartOptions}/>
  }
});

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

  getStartups() {
    return Entities.find({bucketType: "startups"}).fetch();
  }
  getUniversities() {
    return Entities.find({bucketType: "universities"}).fetch();
  }
  getProviders() {
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

  render() {
    let startupList = this.getStartups();
    let universityList = this.getUniversities();
    let providersList = this.getProviders();

    return (
      <div>

      <AddEntityForm />

        <div className="row bucket-list">
          <div className="one-third column">

            <TestDonutChart></TestDonutChart>

            <h2>Startups</h2>
            <p>Entity count: <small>{this.countStartups()}</small></p>
            <ul>
              {startupList.map((ent) => {
                return (
                  <a key={ent._id} href={ent._id}>
                    <li>
                      <div className="row">
                        <div className="three columns">
                          <img src={ent.logo} className="u-max-full-width" />
                        </div>
                        <div className="nine columns">
                          {ent.title}
                        </div>
                      </div>
                    </li>
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="one-third column">

            <TestDonutChart></TestDonutChart>

            <h2>Universities</h2>
            <p>Entity count: <small>{this.countUniversities()}</small></p>
            <ul>
              {universityList.map((ent) => {
                return (
                  <a key={ent._id} href={ent._id}>
                    <li>
                      <div className="row">
                        <div className="three columns">
                          <img src={ent.logo} className="u-max-full-width" />
                        </div>
                        <div className="nine columns">
                          {ent.title}
                        </div>
                      </div>
                    </li>
                  </a>
                )
              })}
            </ul>
          </div>
          <div className="one-third column">

            <TestDonutChart></TestDonutChart>

            <h2>Providers</h2>
            <p>Entity count: <small>{this.countProviders()}</small></p>
            <ul>
              {providersList.map((ent) => {
                return (
                  <a key={ent._id} href={ent._id}>
                    <li>
                      <div className="row">
                        <div className="three columns">
                          <img src={ent.logo} className="u-max-full-width" />
                        </div>
                        <div className="nine columns">
                          {ent.title}
                        </div>
                      </div>
                    </li>
                  </a>
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
