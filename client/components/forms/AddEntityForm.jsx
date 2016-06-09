import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddEntityForm extends React.Component {

  addEntity(event) {
    event.preventDefault();
    var title = this.refs.entityTitle.value.trim();
    var bucketType = this.refs.entBucketType.value;
    var desc = this.refs.entityDesc.value.trim();
    var goal = this.refs.goal.value.trim();

    Meteor.call('AddEntity', title, bucketType, desc, goal, () => {
      this.refs.entityTitle.value = '';
      this.refs.entityDesc.value = '';
      this.refs.goal.value = '';
    });
  }

  render() {
    return (
      <form className="form-inline"
      onSubmit={this.addEntity.bind(this)} >
        <div className="row">
          <div className="eight columns">
            <input type="text"
                   ref="entityTitle"
                   className="u-full-width"
                   placeholder="Add new entity..." />
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
        <div className="row">
          <div className="six columns">
            <input className="u-full-width"
                   type="text"
                   ref="entityDesc"
                   placeholder="Description" />
          </div>
          <div className="six columns">
            <input className="u-full-width"
                   type="text"
                   ref="goal"
                   placeholder="Goal" />
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Add Entity" />
        </div>
      </form>
    )
  }
}
