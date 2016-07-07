import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  // TODO:
  //  edit user

  //  delete user
  DeleteUser(userId) {
    Meteor.users.remove({_id: userId});
  },

  AddEntity(entityData, newUserData) {
    // add more properties to entityData
    entityData.logo = 'http://placehold.it/250';
    entityData.customers = [];
    entityData.createdAt = new Date();

    var newEntityId = Entities.insert(entityData); // returns new Entity's ID.
    var newUserId = Accounts.createUser(newUserData); // Note: Account.createUser returns the new user's ID.

    // associate the entity with a user
    Entities.update(newEntityId, {$set: {entityUser: newUserId}});
    // associate the new user with its entity
    Meteor.users.update(newUserId, {$set: {profile: {entity: newEntityId} }});
    Roles.addUsersToRoles(newUserId, ['entity-member'] );
  },

  EditEntity(entityID, newData) {
    Entities.update(entityID, {$set: newData})
  },

  deleteEntity(entityID) {
    Entities.remove({_id: entityID});
    Interactions.remove({entityId: entityID});
    Meteor.users.remove({"profile.entity" : entityID});
    EntityUpdates.remove({ownerEntity: entityID});
  },

  AddEntityUpdate(title, desc, entityID) {
    EntityUpdates.insert({
      title: title,
      desc: desc,
      ownerEntity: entityID,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },

  addAdminOrExec(newUserData, accountType) {
    var userId = Accounts.createUser(newUserData); // Account.createUser returns the new user's ID.
    if (accountType === "admin") Roles.addUsersToRoles(userId, ['admin']);

    Roles.addUsersToRoles(userId, ['exec']);
  },

});
