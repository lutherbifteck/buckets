import React from 'react';
import { mount, withOptions } from 'react-mounter';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './components/accounts/AccountsUIWrapper.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';
import IncubatorCRM from './components/IncubatorCRM.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import ProjectDetails from './ProjectDetails.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<HomeLayout />)
    })
  }
});

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    // Redirect if NOT admin
    // if ( !Roles.userIsInRole(Meteor.userId(), ['admin']) ) {
    //   Meteor.call('getMyUserEntityId', Meteor.userId(), function(err, res) {
    //     if (err) { throw new Meteor.Error('could-not-get-permissions', err.reason); }
    //     FlowRouter.go("/"+ res);
    //   });
    // }
  }]
});

adminRoutes.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Dashboard />)
    })
  },
  triggersEnter: [function(context, redirect) {

  }]
});
adminRoutes.route('/incubator', {
  action() {
    mount(MainLayout, {
      content: (<IncubatorCRM />)
    })
  }
});

// // Entity routes (admins can see this too)
// FlowRouter.route('/:entityID', {
//   action(params) {
//     mount(MainLayout, {
//       content: (<EntityDetails entityID={params.entityID} />)
//     })
//   }
// });
//
// FlowRouter.route('/:entityID/:projID', {
//   action(params) {
//     mount(MainLayout, {
//       content: (<ProjectDetails entityID={params.entityID} projectID={params.projID} />)
//     })
//   }
// });


FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<h1>Not Found</h1>)
    })
  }
};
