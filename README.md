# buckets
3 buckets project reporting/tracker

##To install and run:

#### clone
<code>
$ git clone __url__
</code>

#### npm install dependencies
<code>
$ npm install
</code>

#### build && run app
<code>
$ meteor
</code>

---

# ToDo:

### GENERAL
* fully integrate Cloudinary (Save IDs of uploaded images in collection, we need to find out what the final hosting situation will be.)
* Implement checks(https://docs.meteor.com/api/check.html) and Roles permissions in Meteor.methods (server)
* Add Honeypot to sign in form
* improve page layouts

### Entities
* fix customers

### Dashboard
* populate DoughnutChart with Startup, Uni, and Provider data (chart.js)
* create filters

### ManageUsers
* Admins can C.R.U.D. other Admins, Execs, and Entity-Members. Can change account types

## ToDos for a later date
* page transitions https://leveluptutorials.com/tutorials/meteor-react-for-everyone/page-transitions
* make a line chart (using chartjs) that tracks # of interactions over time
* Figure out how to do Android/iOS builds and how to distribute
* Push Notifications
* Paginate data
* show notification of Unread Entries in Nav
* ability to archive interactions
