import React from 'react';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from '../components/accounts/AccountsUIWrapper';
import LoginForm from '../components/accounts/LoginForm.jsx';
import Nav from '../components/Nav.jsx';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="main-layout-container">

      <AccountsUIWrapper />

      {content}
    </div>
  </div>
);
