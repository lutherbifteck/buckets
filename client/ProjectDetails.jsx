import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

export default class ProjectDetails extends React.Component {
  render() {
    return (
      <h1>Hello from project</h1>
    )
  }
}
ReactMixin(ProjectDetails.prototype, TrackerReactMixin);
