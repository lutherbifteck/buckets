import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

  AddEntity(entityData, newUserData) {
    // add more properties to entityData
    entityData.logo = 'http://placehold.it/250';
    entityData.customers = [];
    entityData.createdAt = new Date();

    var newEntityId = Entities.insert(entityData); // returns new Entity's ID.
    var newUserId = Accounts.createUser(newUserData); // Note: Account.createUser returns the new user's ID.

    Meteor.users.update(newUserId, {$set: {profile: {entity: newEntityId} }});
    Roles.addUsersToRoles(newUserId, ['entity-member'] );
  },

  editEntity(entityID) {
    console.log('editing entity: ', entityID)
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

  addNewEntityMember(newMemberName, newMemberEmail, newMemberPassword, entityID) {
    var userDetails = {
        username: newMemberName,
        email: newMemberEmail,
        password: newMemberPassword,
        profile: {
          entity: entityID
        },
    };
    var userId = Accounts.createUser(userDetails); // Account.createUser returns the new user's ID.
    Roles.addUsersToRoles(userId, ['entity-member'] );
  },

});
