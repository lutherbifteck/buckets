import React from 'react';
import { mount } from 'react-mounter';
import { MainLayout } from './layouts/MainLayout.jsx';

import App from '../App.jsx';
import Dashboard from './Dashboard.jsx';
import EntityDetails from './EntityDetails.jsx';
import ProjectDetails from './ProjectDetails.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Dashboard />)
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
      content: (<ProjectDetails projectID={params.projID} />)
    })
  }
});
