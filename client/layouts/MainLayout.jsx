import React from 'react';
import { Meteor } from 'meteor/meteor';

import Nav from '../components/Nav.jsx';

// getMyEntityId() {
//   var currentUser = Meteor.user();
//   if(!currentUser.profile.entity)  { return false;}
//
//   return currentUser.profile.entity;
// }

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="main-layout-container">
      {content}
    </div>
  </div>
);
