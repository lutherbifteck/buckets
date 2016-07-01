var myPostSignUpFunc = function(userId, info) {
    console.log("myPostSignUpFunc logging...", userId, info)
  Roles.addUsersToRoles(userId, ['admin']);
  FlowRouter.go("admin")
}

AccountsTemplates.configure({
    forbidClientAccountCreation: false,
    postSignUpHook: myPostSignUpFunc,
});

Accounts.onCreateUser(function(options, user) {
  console.log("on create user log...", options, user)
   user.profile = options.profile || {};
   return user;
});
