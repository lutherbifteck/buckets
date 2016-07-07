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

##### Note: How to use cloudinary in react
`<img src={Cloudinary._helpers.url(public_id, {}) } />`

---

# ToDo:

### GENERAL
* fully integrate Cloudinary (Save IDs of uploaded images in collection, we need to find out what the final hosting situation will be.)
* Implement checks(https://docs.meteor.com/api/check.html) and Roles permissions in Meteor.methods (server)
* improve page layouts

### EntityDetails
* Edit entity user

### crmEntry not working correctly (Form does not show newly added customer after submission)

### Dashboard
* populate DoughnutChart with Startup, Uni, and Provider data (chart.js)
* create filters

### ManageUsers
* Admins can C.R.U.D. other Admins, Execs. Can change Roles too

## ToDos for a later date
* page transitions https://leveluptutorials.com/tutorials/meteor-react-for-everyone/page-transitions
* make a line chart (using chartjs) that tracks # of interactions over time
* Figure out how to do Android/iOS builds and how to distribute
* Push Notifications
* Paginate data
* show notification of Unread Entries in Nav
* ability to archive interactions
* Add Honeypot to sign in form
