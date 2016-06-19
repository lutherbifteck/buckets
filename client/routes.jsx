import React from 'react';
import { mount, withOptions } from 'react-mounter';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './components/accounts/AccountsUIWrapper.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';
import IncubatorCRM from './components/IncubatorCRM.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import PastInteractions from './components/PastInteractions.jsx'
import ProjectDetails from './ProjectDetails.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<HomeLayout />)
    })
  }
});

FlowRouter.route('/past-interactions', {
  action() {
    mount(MainLayout, {
      content: (<PastInteractions />)
    })
  }
})

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [function(context, redirect) {
    if ( !Roles.userIsInRole(Meteor.userId(), ['admin']) ) {
      FlowRouter.go("/");
    }
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
adminRoutes.route('/manage-users', {
  action() {
    mount(MainLayout, {
      content: (
        <div>
          <h1>Manage Users</h1><p>Working on this next...</p>
        </div>
      )
    })
  }
});

// Entity routes (admins can see this too)
FlowRouter.route('/:entityID', {
  action(params) {
    mount(MainLayout, {
      content: (<EntityDetails entityID={params.entityID} />)
    })
  }
});

FlowRouter.route('/:entityID/:projID', {
  action(params) {
    mount(MainLayout, {
      content: (<ProjectDetails entityID={params.entityID} projectID={params.projID} />)
    })
  }
});

FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<h1>Not Found</h1>)
    })
  }
};
