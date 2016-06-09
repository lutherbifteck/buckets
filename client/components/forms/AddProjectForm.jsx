import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddProjectForm extends React.Component {
  addNewProject(event) {
    event.preventDefault();
    var title = this.refs.projTitle.value.trim();
    Meteor.call('AddProject', title, this.props.entityID, (err) => {
      if (err) { throw new Meteor.Error('could-not-add-project', err.reason); }
      this.refs.projTitle.value = '';
    });
  }

  render() {
    return (
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
    );
  }
}
