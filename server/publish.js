import { Meteor } from 'meteor/meteor';

Entities = new Mongo.Collection('entities');
Projects = new Mongo.Collection('projects');
Interactions = new Mongo.Collection('interactions');

//Interactions
Meteor.publish('interactions', function() {
  return Interactions.find({});
});

Meteor.publish('myPastInteractions', function() {
  return Interactions.find({createdBy: this.userId});
});


//For editing My Account
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
