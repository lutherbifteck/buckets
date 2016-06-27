import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
 AddInteraction(dateOfInteraction, userEntityId, customer, type, details) {
   var interactionDetails = {
     dateOfInteraction: dateOfInteraction,
     entityId: userEntityId,
     customer: customer,
     type: type,
     details: details,
     createdAt: new Date(),
     createdBy: this.userId
   }
   Interactions.insert(interactionDetails);
 },

  // Dashboard
  AddEntity(entityData, newUserData) {
    // add more properties to entityData
    entityData.logo = 'http://placehold.it/250';
    entityData.createdAt = new Date();
    
    var newEntityId = Entities.insert(entityData); // returns new Entity's ID.
    var newUserId = Accounts.createUser(newUserData); // Note: Account.createUser returns the new user's ID.

    Meteor.users.update(newUserId, {$set: {profile: {myEntity: newEntityId} }});
    Roles.addUsersToRoles(newUserId, ['entity-member'] );
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
  }
});
