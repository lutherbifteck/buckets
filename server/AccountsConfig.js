import { Meteor } from 'meteor/meteor';

const SEED_USERS = Meteor.settings.private.SEED_USERS;

// seed the app with users
if(Meteor.users.find({}).count() < 1) {
  for (var i = 0; i < SEED_USERS.length; i++) {
    var seedUserID = Accounts.createUser(SEED_USERS[i]); // Account.createUser returns the new user's ID.
    Roles.addUsersToRoles(seedUserID, ['admin']);
  }

  // let firstUserData = {
  //   username: '8ctopotamus',
  //   email: '8ctopotamus@gmail.com',
  //   password: 'secret',
  //   profile: {}
  // }
  // var firstUserId = Accounts.createUser(firstUserData); // Account.createUser returns the new user's ID.
  // Roles.addUsersToRoles(firstUserId, ['admin']);
}

var myPostSignUpFunc = function(userId, info) {
  Roles.addUsersToRoles(userId, ['admin']);
  FlowRouter.go("admin")
}

AccountsTemplates.configure({
    forbidClientAccountCreation: false,
    postSignUpHook: myPostSignUpFunc,
});

Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   return user;
});
