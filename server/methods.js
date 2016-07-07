import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({

  // TODO
  // Entity-members can edit their own account info


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

   console.log(interactionDetails)

  Interactions.insert(interactionDetails);
  Entities.update( { _id: myEntID }, { $addToSet: {customers: customer} } ); // add the new customer to Entity's customer array
 },
});
