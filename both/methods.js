import { Meteor } from 'meteor/meteor';

Meteor.methods({
  getUserEntity(userId) {
    var user = Meteor.users.findOne(userId);
    var userEntity = user.profile.entity;

    if(userEntity) {
      console.log(userEntity);
      return userEntity;
    }
  }
});
