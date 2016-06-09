import { Meteor } from 'meteor/meteor';

Entities = new Mongo.Collection('entities');
Projects = new Mongo.Collection('projects');


Meteor.publish('MyUserData', function () {
  if(!this._id) { return; }
  return Meteor.users.find({_id: this._id});
});


// ROLES
Meteor.publish(null, function (){
  return Meteor.roles.find({})
});

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
