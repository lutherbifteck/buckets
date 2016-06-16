import React from 'react';
import { Meteor } from 'meteor/meteor';
import Nav from '../components/Nav.jsx';

Entities = new Mongo.Collection('entities');
Projects = new Mongo.Collection('projects');
Interactions = new Mongo.Collection('interactions');

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="main-layout-container">
      {content}
    </div>
  </div>
);
