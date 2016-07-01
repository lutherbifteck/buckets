// seed the app with an admin acct
if(Meteor.users.find({}).count() < 1) {
  let firstUserData = {
    username: 'Super Admin',
    email: '8ctopotamus@gmail.com',
    password: 'secret',
    profile: {}
  }
  var firstUserId = Accounts.createUser(firstUserData); // Account.createUser returns the new user's ID.
  Roles.addUsersToRoles(firstUserId, ['admin']);
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
