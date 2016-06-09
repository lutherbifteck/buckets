var myPostSignUpFunc = function(userId, info) {
  Roles.addUsersToRoles(userId, ['admin']);
}

AccountsTemplates.configure({
    forbidClientAccountCreation: false,
    postSignUpHook: myPostSignUpFunc,
});


Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   return user;
});
