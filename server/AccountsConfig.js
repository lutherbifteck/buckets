Accounts.onCreateUser(function(options, user) {
    Meteor.setTimeout(function () {
        Roles.addUsersToRoles(user._id, ['admin']);
    }, 0);

   FlowRouter.go("/admin/dashboard")

   return user;
});
