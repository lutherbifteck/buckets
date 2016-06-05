import { Meteor } from 'meteor/meteor';

Entities = new Mongo.Collection('entities');
Projects = new Mongo.Collection('projects');

// ENTITIES
Meteor.publish("startupEntities", function() {
  return Entities.find({bucketType: "startups"});
});

Meteor.publish("universityEntities", function() {
  return Entities.find({bucketType: "universities"});
});

Meteor.publish("providerEntities", function() {
  return Entities.find({bucketType: "providers"});
});

Meteor.publish("getSingleEntityInfo", function(entityID) {
  return Entities.find({_id: entityID});
});


// PROJECTS
Meteor.publish("AllProjects", function() {
  return Projects.find();
});

Meteor.publish("singleEntityProjList", function(entityID) {
  return Projects.find({ownerEntity: entityID});
})
