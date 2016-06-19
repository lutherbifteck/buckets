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

  // EntityDetails Component
  AddProject(title, entityID) {
    Projects.insert({
      title: title,
      ownerEntity: entityID,
      createdAt: new Date()
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
    var userId = Accounts.createUser(userDetails);
    Roles.addUsersToRoles(userId, ['entity-member'] );
  }
});
