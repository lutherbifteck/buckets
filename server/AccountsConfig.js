var myPostSignUpFunc = function(userId, info) {
  Roles.addUsersToRoles(userId, ['admin']);
  FlowRouter.go("/admin/incubator")
}

AccountsTemplates.configure({
    forbidClientAccountCreation: true,
    postSignUpHook: myPostSignUpFunc,
});

Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   return user;
});
