import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  // To do: Entity-members can edit their own user account info (email/password)

 AddInteraction(dateOfInteraction, myEntID, customer, type, details) {
   var entityName = Entities.findOne(myEntID).title;

   var interactionDetails = {
     dateOfInteraction: dateOfInteraction,
     entityName: entityName,
     entityId: myEntID,
     customer: customer,
     type: type,
     details: details,
     createdAt: new Date(),
     createdBy: this.userId
   }

  Interactions.insert(interactionDetails);
  Entities.update( { _id: myEntID }, { $addToSet: {customers: customer} } ); // add the new customer to Entity's customer array
 },
});
