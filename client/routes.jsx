import React from 'react';
import { mount, withOptions } from 'react-mounter';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './components/accounts/AccountsUIWrapper.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import HomeLayout from './layouts/HomeLayout.jsx';
import IncubatorCRM from './components/IncubatorCRM.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import PastInteractions from './components/PastInteractions.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


let HomeLayoutDataWrap = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const currentUser = Meteor.user();
  const subscription = Meteor.subscribe("myEntityData");
  const loadingEntityData = !subscription.ready();

  return {currentUser, subscription, loadingEntityData};
}, HomeLayout);


FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<HomeLayoutDataWrap />)
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
