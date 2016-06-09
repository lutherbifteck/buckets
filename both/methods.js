import { Meteor } from 'meteor/meteor';

Meteor.methods({
  logMeOut() {
    console.log('logging out...');
  },
  getMyUserEntityId(userId) {
    var user = Meteor.users.findOne(userId);
    try {
      var userEntity = user.profile.entity;
      if(userEntity) {
        return userEntity;
      } else {
        return "admin";
      }
    }
    catch (error) {
      console.log('Error from "GetUserEntity" Method: ', error);
    }
  }
});
