import React from 'react';
import { Meteor } from 'meteor/meteor';
import Nav from '../components/Nav.jsx';

Entities = new Mongo.Collection('entities');
Interactions = new Mongo.Collection('interactions');
EntityUpdates = new Mongo.Collection('entityUpdates');


export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="main-layout-container">
      <div className="banner">
        <span className="lnr lnr-book" /> Captain McGiblet's Book of Nautical Secrets
      </div>
      {content}
    </div>
  </div>
);
