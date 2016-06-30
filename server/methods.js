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
   Entities.update( { _id: myEntID }, { $addToSet: {customers: customer} } ); // add the new customer to Entity's customer array
 },
});
