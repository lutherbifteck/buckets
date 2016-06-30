import { Meteor } from 'meteor/meteor';
import { mount, withOptions } from 'react-mounter';
import React from 'react';
import { Session } from 'meteor/session';

import AccountsUIWrapper from './components/accounts/AccountsUIWrapper.jsx';
import CRMEntryForm from './components/forms/CRMEntryForm.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import CRMEntryDataContainer from './containers/CRMEntryDataContainer.jsx';
import IncubatorCRM from './components/IncubatorCRM.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import PastInteractions from './components/PastInteractions.jsx';

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) { FlowRouter.go('home'); }
}]);

Accounts.onLogin(function() {
  console.log("I just logged in.");
  if(Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'exec')) {
    FlowRouter.go('dashboard');
  } else {
    FlowRouter.go('crmEntry');
  }
});

Accounts.onLogout(function() {
  FlowRouter.go('home')
});

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: (<AccountsUIWrapper />)
    })
  }
});

FlowRouter.route('/crm-entry', {
  name: 'crmEntry',
  action() {
    mount(MainLayout, {
      content: (<CRMEntryDataContainer />)
    });
  }
});

FlowRouter.route('/past-interactions', {
  name: 'past-interactions',
  action() {
    mount(MainLayout, {
      content: (<PastInteractions />)
    })
  }
});

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [function(context, redirect) {
    if ( !Roles.userIsInRole(Meteor.userId(), ['admin']) ) {
      FlowRouter.go("/");
    }
  }]
});
adminRoutes.route('/', {
  name: 'dashboard',
  action() {
    mount(MainLayout, {
      content: (<Dashboard />)
    })
  },
  triggersEnter: [function(context, redirect) {

  }]
});
adminRoutes.route('/crm', {
  name: 'crm',
  action() {
    mount(MainLayout, {
      content: (<IncubatorCRM />)
    })
  }
});
adminRoutes.route('/manage-users', {
  name: 'manage-users',
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

FlowRouter.route('/:entityID', {
  action(params) {
    mount(MainLayout, {
      content: (<EntityDetails entityID={params.entityID} />)
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
