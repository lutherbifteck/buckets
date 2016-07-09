import { Meteor } from 'meteor/meteor';
import { mount, withOptions } from 'react-mounter';
import React from 'react';
import { Session } from 'meteor/session';

import AccountsUIWrapper from './components/forms/AccountsUIWrapper.jsx';
import CRMEntryForm from './components/forms/CRMEntryForm.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import FourOFour from './components/FourOFour.jsx';
import CRMEntryDataContainer from './containers/CRMEntryDataContainer.jsx';
import IncubatorCRM from './IncubatorCRM.jsx';
import ManageUsers from './ManageUsers.jsx'
import { MainLayout } from './layouts/MainLayout.jsx';
import PastInteractions from './components/PastInteractions.jsx';

FlowRouter.triggers.enter([function(context, redirect){
  if (!Meteor.userId()) { FlowRouter.go('home'); }
}]);

Accounts.onLogin(function() {
  if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin', 'exec'])) {
    FlowRouter.go('dashboard');
  } else {
    FlowRouter.go('crmEntry');
  }
});

Accounts.onLogout(function() {
  FlowRouter.go('home');
});

FlowRouter.route('/', {
  name: 'home',
  action() {

    Meteor.setTimeout(function(){
      if(Roles.userIsInRole(Meteor.userId(), ["admin", "exec"])) {
        FlowRouter.go('dashboard');
      }
      if (Roles.userIsInRole(Meteor.userId(), ["entity-member"])) {
        FlowRouter.go('crmEntry');
      }
    }, 500);

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
    if ( !Roles.userIsInRole(Meteor.userId(), ['admin', 'exec']) ) {
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
  triggersEnter: [function(context, redirect) {

  }],
  action() {
    mount(MainLayout, {
      content: (<ManageUsers />)
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
      content: (<FourOFour />)
    })
  }
};
