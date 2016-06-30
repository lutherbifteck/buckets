import { Meteor } from 'meteor/meteor';

Entities = new Mongo.Collection('entities');
Interactions = new Mongo.Collection('interactions');
EntityUpdates = new Mongo.Collection('entityUpdates');


//For editing My Account
Meteor.publish('MyUserData', function () {
  if( !this._id ) { return this.ready(); }
  return Meteor.users.findOne(this._id);
});

// used in HomeLayoutDataWrap
Meteor.publish('myEntityData', function() {
  if(this.userId) {
    var user = Meteor.users.findOne(this.userId);
    try {
      var entity = Entities.find({_id: user.profile.entity});
      if(!entity) { return this.ready(); }
      return Entities.find({_id: user.profile.entity});
    }
    catch(e) {
      console.log("No entity found", e);
    }
  }
});


Meteor.publish("getSingleEntityInfo", function(entityID) {
  return Entities.find({_id: entityID});
});

Meteor.publish('entityUpdates', function(entityID) {
  return EntityUpdates.find({ownerEntity: entityID});
});

//Interactions
Meteor.publish('interactions', function() {
  return Interactions.find({});
});

Meteor.publish('myPastInteractions', function() {
  return Interactions.find({createdBy: this.userId});
});


// ROLES
Meteor.publish(null, function (){
  return Meteor.roles.find({});
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
