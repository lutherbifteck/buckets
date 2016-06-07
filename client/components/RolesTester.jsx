import React from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';


export default class RolesTester extends React.Component {
  render() {
    return (
      <div>
        <h1>Roles Testing Page</h1>
      </div>
    )
  }
}
ReactMixin(RolesTester.prototype, TrackerReactMixin);
