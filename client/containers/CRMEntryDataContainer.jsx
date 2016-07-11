import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';

import CRMEntryForm from '../components/forms/CRMEntryForm.jsx';
import Spinner from '../components/Spinner.jsx';


export default CRMEntryDataContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const currentUser = Meteor.user(); // we need the user to be available before component loads
  const subscription = Meteor.subscribe("myEntityData");
  const loadingEntityData = !subscription.ready();

  return {currentUser, subscription, loadingEntityData};
}, CRMEntryForm);
