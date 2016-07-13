import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  // TODO:

  //  edit user
  EditUser(userID, data, accountType) {
    let currentRole = Meteor.users.findOne(userID).roles[0];

    Meteor.users.update(userID, {$set: data});

    if (accountType === 'default' || currentRole === accountType) {
      return true;
    }

    if(accountType === "admin") {
      Roles.removeUsersFromRoles(userID, ['exec']);
      Roles.addUsersToRoles(userID, ['admin']);
//      Meteor.users.update(userID, {$set: {roles: 'admin'}})
      }

    if(accountType === "exec") {
      Roles.removeUsersFromRoles(userID, ['admin']);
      Roles.addUsersToRoles(userID, ['exec']);
      //      Meteor.users.update(userID, {$set: {roles: 'exec'}})
    }

    return true;
  },

  RoleTitle(userId) {
    if(Roles.userIsInRole(userId, 'admin'))
      return 'Admin'
    else if(Roles.userIsInRole(userId, 'exec'))
      return 'Exec'
    else if(Roles.userIsInRole(userId, 'entity-member'))
      return 'Entity Member'
    else
      return 'No Roles'
  },

  //  delete user
  DeleteUser(userId) {
    Meteor.users.remove({_id: userId});
  },

  AddEntity(entityData, newUserData) {
    // add more properties to entityData
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

  AddEntityUpdate(updateData) {
    updateData.createdAt = new Date()
    updateData.createdBy = this.userId;
    EntityUpdates.insert(updateData);
  },

  addAdminOrExec(newUserData, accountType) {
    var userId = Accounts.createUser(newUserData); // Account.createUser returns the new user's ID.
    if (accountType === "admin") Roles.addUsersToRoles(userId, ['admin']);

    Roles.addUsersToRoles(userId, ['exec']);
  },

});
