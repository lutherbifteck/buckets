// This is the file causing the loading error. fix sub/pub

import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';


// test chart
var LineChart = require("react-chartjs").Line;

var TestChart = React.createClass({
  render: function() {
    var chartData =  {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]

        }]
    };
    var chartOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
  }
});


export default class EntityDetails extends React.Component {
  componentWillMount() {
    this.setState({
      subscription: {
        singleEntityInfo: Meteor.subscribe("getSingleEntityInfo", this.props.entityID),
        entityProjects: Meteor.subscribe("singleEntityProjList", this.props.entityID)
      }
    })
  }

  componentWillUnmount() {
    this.state.subscription.singleEntityInfo.stop();
    this.state.subscription.entityProjects.stop();
  }

  addNewProject(event) {
    event.preventDefault();
    var title = this.refs.projTitle.value.trim();
    Meteor.call('AddProject', title, this.props.entityID, () => {
      this.refs.projTitle.value = '';
    });
  }

  getEntityInfo() {
    return Entities.findOne(this.props.entityID);
  }

  getEntityProjects() {
    return Projects.find({ownerEntity: this.props.entityID});
  }

  render() {
    let entity = this.getEntityInfo();
    let projectList = this.getEntityProjects();

    if(!entity || !projectList) { return (<span>Loading...</span>) }

    const projListing = projectList.length < 1 ? 'No projects yet' : <ul>{projectList.map((proj)=>{return (<li key={proj._id}><a href={this.props.entityID+"/"+proj._id}>{proj.title}</a></li>)})}</ul>;

    return (
      <div>
        <div className="row">
          <div className="twelve">
            <h1>{entity.title} - <small>Created: {entity.createdAt.toDateString()}</small></h1>

            <TestChart/>

            <form onSubmit={this.addNewProject.bind(this)}>
              <div className="row">
                <div className="twelve columns">
                  <input ref="projTitle"
                    className="u-full-width"
                    type="text"
                    placeholder="Add a project..." />
                </div>
              </div>
            </form>

            <strong>This template needs to show:</strong>
            <ul>
              <li>What this entity does</li>
              <li>How long they have been working with Direct Supply</li>
              <li>Goal of the relationship</li>
              <li>Customer Interactions (ppl/companies they have worked with)</li>
              <li>Form for adding user to this specific entity</li>
            </ul>

            {projListing}
          </div>
        </div>
      </div>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
