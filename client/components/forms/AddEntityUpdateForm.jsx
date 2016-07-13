import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityUpdateForm extends React.Component {
  addNewProject(event) {
    event.preventDefault();
    var title = this.refs.updateTitle.value.trim();
    var desc = this.refs.updateDesc.value.trim();
    var files = this.refs.attachment.files;
    var self = this;

    var updateData = {
      title: title,
      desc: desc,
      ownerEntity: this.props.entityID
    }

    function makeTheCall() {
      Meteor.call('AddEntityUpdate', updateData,
        (err) => {
          if (err) { throw new Meteor.Error('could-not-add-project', err.reason); }
          self.refs.updateTitle.value = '';
          self.refs.updateDesc.value = '';
          Bert.alert({
            title: 'Update Added!',
            type: 'success',
            style: 'growl-top-right',
            icon: 'fa-thumbs-up'
          });
      });
    }

    if( this.refs.attachment.files.length > 0 ) {
      Cloudinary.upload(files, {folder: 'attachments'}, (err, res) => {
        if (err) Meteor.Error("could-not-upload-files", err.reason);
        updateData.attachment = res.public_id;
        makeTheCall();
      });
    } else {
      updateData.attachment = '';
      makeTheCall();
    }
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

            <div className="row">
              <div className="six columns">
                <label>Add Attachment</label>
                <input type="file" ref="attachment" />
              </div>
              <div className="six columns">
                <input type="submit" className="button-success u-full-width" value="Submit" />
              </div>
            </div>
          </div>
        </div>
        <hr />
      </form>
    );
  }
}
