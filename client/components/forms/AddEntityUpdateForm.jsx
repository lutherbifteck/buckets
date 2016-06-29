import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityUpdateForm extends React.Component {
  addNewProject(event) {
    event.preventDefault();
    var title = this.refs.updateTitle.value.trim();
    var desc = this.refs.updateDesc.value.trim();

    Meteor.call('AddEntityUpdate',
      title,
      desc,
      this.props.entityID,
      (err) => {
        if (err) { throw new Meteor.Error('could-not-add-project', err.reason); }
        this.refs.updateTitle.value = '';
        this.refs.updateDesc.value = '';
        Bert.alert({
          title: 'Update Added!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-thumbs-up'
        });
    });
  }

  render() {
    return (
      <form onSubmit={this.addNewProject.bind(this)}>
        <div className="row">
          <div className="twelve columns">
            <label>Title</label>
            <input ref="updateTitle"
                   className="u-full-width"
                   type="text"
                   placeholder="Add Update" />
            <label>Description</label>
            <textarea ref="updateDesc"
                      className="u-full-width"
                      placeholder="Description" />
            <input type="submit" className="button-success" value="Submit" />
          </div>
        </div>
      </form>
    );
  }
}
