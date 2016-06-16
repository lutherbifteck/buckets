import { Meteor } from 'meteor/meteor';

Meteor.methods({
  logMeOut() {
    console.log('logging out...');
  },
  getMyUserEntityId(userId) {
    var user = Meteor.users.findOne(userId);

    try {
      if(user && user.profile && user.profile.entity) {
        return user.profile.entity;
      } else {
        return "admin";
      }
    }
    catch (error) {
      console.log('Error from "GetUserEntity" Method: ', error);
    }
  }
});
