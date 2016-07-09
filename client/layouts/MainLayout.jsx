import React from 'react';
import { Meteor } from 'meteor/meteor';
import Nav from '../components/Nav.jsx';

Entities = new Mongo.Collection('entities');
Interactions = new Mongo.Collection('interactions');
EntityUpdates = new Mongo.Collection('entityUpdates');


export const MainLayout = ({content}) => (
  <div className="main-layout">
    <Nav />
    <div className="banner">
      <h5><span className="lnr lnr-book" /> Captain McGiblet's Book of Nautical Secrets</h5>
    </div>
    <div className="main-layout-container">
      {content}
    </div>
  </div>
);
