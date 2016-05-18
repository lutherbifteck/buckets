// This is the file causing the loading error. fix sub/pub


import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

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
    return Entities.find({_id: this.props.entityID});
  }

  getEntityProjects() {
    return Projects.find({ownerEntity: this.props.entityID});
  }

  render() {
    let entity = this.getEntityInfo();
    let projectList = this.getEntityProjects();

    if(!entity || !projectList) { return (<span>Loading..</span>) }

    console.log(entity)

    const projListing = projectList.length < 1 ? 'No projects yet' : <ul>{projectList.map((proj)=>{return (<li key={proj._id}><a href={this.props.entityID+"/"+proj._id}>{proj.title}</a></li>)})}</ul>;

    return (
      <div>
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
        <div className="row">
          <div className="twelve">
            <p>Type: {entity.bucketType} - Created: {entity.createdAt.toDateString()}</p>
            <h1>{entity.title}</h1>
            {projListing}
          </div>
        </div>
      </div>
    )
  }
}
ReactMixin(EntityDetails.prototype, TrackerReactMixin);
