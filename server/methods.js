import { Meteor } from 'meteor/meteor';

Meteor.methods({
  // Dashboard
  AddEntity(title, bucketType, desc, goal) {
    Entities.insert({
      title: title,
      createdAt: new Date(),
      bucketType: bucketType,
      goal: goal,
      desc: desc,
      logo: 'http://placehold.it/250'
    });
  },

  // EntityDetails
  AddProject(title, entityID) {
    Projects.insert({
      title: title,
      ownerEntity: entityID,
      createdAt: new Date()
    });
  }
});
