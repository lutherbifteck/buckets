import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  deleteEntity(entityID) {
    Entities.remove({_id: entityID});
    Interactions.remove({entityId: entityID});
    Meteor.users.remove({"profile.entity" : entityID});
    EntityUpdates.remove({ownerEntity: entityID});
  }
});
