import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

 AddInteraction(dateOfInteraction, myEntID, customer, type, details) {
   var interactionDetails = {
     dateOfInteraction: dateOfInteraction,
     entityId: myEntID,
     customer: customer,
     type: type,
     details: details,
     createdAt: new Date(),
     createdBy: this.userId
   }
   Interactions.insert(interactionDetails);

   // add the new customer to Entity's customer array
   Entities.update( { _id: myEntID }, { $addToSet: {customers: customer} } );
  //  console.log(Entities.findOne({_id: myEntID}));
 },

  // Dashboard
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

  AddEntityUpdate(title, desc, entityID) {
    EntityUpdates.insert({
      title: title,
      desc: desc,
      ownerEntity: entityID,
      createdAt: new Date(),
      createdBy: this.userId
    });
  },
});
