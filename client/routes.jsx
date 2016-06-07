// react stuff
import React from 'react';
import { mount } from 'react-mounter';

//app stuff
import App from '../App.jsx';
import AccountsUIWrapper from './components/accounts/AccountsUIWrapper.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import LoginForm from './components/accounts/LoginForm.jsx';
import { MainLayout } from './layouts/MainLayout.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import RolesTester from './components/RolesTester.jsx'

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Dashboard />)
    })
  }
});

FlowRouter.route('/roles-test', {
  action() {
    mount(MainLayout, {
      content: (<RolesTester />)
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
