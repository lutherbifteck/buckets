Accounts.onCreateUser(function(options, user) {
    Meteor.setTimeout(function () {
        Roles.addUsersToRoles(user._id, ['admin']);
    },0);

    console.log(Roles.getUsersInRole('admin'));

   return user;
});
