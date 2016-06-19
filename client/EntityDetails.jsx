// This is the file causing the loading error.
// couldn't do sub/pub in class constructor for some reason?
// had to subscribe in componentWillMount()

import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

import AddNewEntityMemberForm from './components/forms/AddNewEntityMemberForm.jsx';
import AddProjectForm from './components/forms/AddProjectForm.jsx';

export default class EntityDetails extends React.Component {
  componentWillMount() {
    this.setState({
      subscription: {
        MyUserData: Meteor.subscribe("MyUserData"),
        singleEntityInfo: Meteor.subscribe("getSingleEntityInfo", this.props.entityID),
        entityProjects: Meteor.subscribe("singleEntityProjList", this.props.entityID)
      }
    })
  }

  componentWillUnmount() {
    this.state.subscription.MyUserData.stop();
    this.state.subscription.singleEntityInfo.stop();
    this.state.subscription.entityProjects.stop();
  }

  addNewProject(event) {
    event.preventDefault();
    var title = this.refs.projTitle.value.trim();

    Meteor.call('AddProject', title, this.props.entityID, (err) => {
      if (err) { throw new Meteor.Error('could-not-add-project', err.reason); }
      this.refs.projTitle.value = '';
    });
  }

  getEntityInfo() {
    return Entities.findOne(this.props.entityID);
  }

  getEntityProjects() {
    return Projects.find({ownerEntity: this.props.entityID});
  }

  getMyUserData() {
    return Meteor.users.find({_id: Meteor.userId()}).fetch();
  }

  render() {
    let entity = this.getEntityInfo();
    let projectList = this.getEntityProjects();

    if (!entity || !projectList) { return (<span>Loading...</span>); }

    //the project listing
    const projListing = projectList.length < 1 ? 'No projects yet' : <ul className="project-listing">{projectList.map((proj)=>{return (<a key={proj._id} href={this.props.entityID+"/"+proj._id}><li>{proj.title}</li></a>)})}</ul>;

    return (
      <div className="entity-details-template">
        <div className="row">
          <div className="three columns">
            <img src={entity.logo} className="u-max-full-width" />
          </div>
          <div className="nine columns">
            <span className="goal">{entity.goal}</span>
            <h1>{entity.title}</h1>
            <p><small>Working with Direct Supply Since: {entity.createdAt.toDateString()}</small><br /> {entity.desc}</p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="three columns entity-members-customers-lists">

            <AddNewEntityMemberForm entityID={this.props.entityID} />

            <ul>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
            </ul>
            <h5>Customer Interactions</h5>
            <ul>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
              <li><img src="http://placekitten.com/150" /></li>
            </ul>
          </div>
          <div className="nine columns">
            <h5>Projects</h5>

            <AddProjectForm />

            {projListing}
          </div>
        </div>

      </div>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
