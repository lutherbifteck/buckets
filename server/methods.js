import { Meteor } from 'meteor/meteor';

Meteor.methods({
  // Dashboard component
  AddEntity(title, bucketType) {
    Entities.insert({
      title: title,
      logo: 'http://placehold.it/250',
      bucketType: bucketType,
      createdAt: new Date(),
    });
  },
  AddProject(title, entityID) {
    Projects.insert({
      title: title,
      ownerEntity: entityID,
      createdAt: new Date()
    });
  },
  //EntityDetails component

});
