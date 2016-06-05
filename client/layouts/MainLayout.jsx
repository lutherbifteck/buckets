import React from 'react';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './../AccountsUIWrapper.jsx';
import Nav from '../components/Nav.jsx';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="main-layout-container">

      <div className="row top-nav-row">
        <AccountsUIWrapper />
      </div>

      {content}
    </div>
  </div>
);
