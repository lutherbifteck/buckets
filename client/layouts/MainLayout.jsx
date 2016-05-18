import { Meteor } from 'meteor/meteor';
import Nav from '../components/Nav.jsx';
import React from 'react';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="container">
      {content}
    </div>
  </div>
)
