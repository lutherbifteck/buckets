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

#### build && run app (You'll need settings.json)
<code>
$ meteor --settings settings.json
</code>

---

# ToDo:

### GENERAL
* __REMOVE FRONT END REGISTRATION__
* make "Cats" into Collection
* make "Cats" editable (Add/Edit/Delete)
* fix donut chart bug (providers)
* make one donut chart showing at a time, show color key and descriptions of terms
* make CRM responsive
* Implement checks(https://docs.meteor.com/api/check.html) and Roles permissions in Meteor.methods (server)
* Ability to edit entity member data on ENtityDetails.jsx
* Reactable bug in CRM list


## Cats

Startups:

Category: Goals, LOB, Stage

Goals:
DS Branded Products – New products for DS Brands
Exclusive Distribution – Some form of exclusive distribution for SL
Marketing Play – Bolster innovation image with our customers
New Market – Gives us access to sell  into new markets
Capability Building – Gives us access to a new capability
Adapted Technology – Adapting tech from other industry for SL
Resale – Resell their products to our customers
Integration into Offering – Use their offerings or capabilities as part of solutions
In-kind Services – Get services/capability in return for our help
Co-Development – Develop a new product or solution together
Other (Allows User to Type in)

LOB/SSG:
TELS
Aptura
DSSI
Products
Technology
DSMI
Marketing
DSI
Others (Allows User to Type in)

Stage:
Alpha – Test the product for its efficacy and improve its performance
Pilot – Test a final product in a field test to determine its commercial value
Exploratory – Exploring the value of the offerings for our customers or for DS
Commercialization – Commercializing the technology or product within our industry
Deployed – A solution or capability not meant to be commercialized externally is being used within DSI
Ready to Be Built – The concept is ready to be built into a product
Negotiating – Negotiating the terms of engagement
Proof-of-Concept – Building a test case of the solution
Build-in-progress – The product is being built
Developing Business Model – The concept is being built into a business model
Paused – This venture/partnership has been halted
Abandoned – The venture/partnership has been discontinued
Others (Allows user to type in)



University:

Category: Partnership Type, Goal

Partnership Type:
Co-Develop
Test Solutions
In-Kind Services
Exploratory
Paused
Abandoned
Others

Goal:
Recruitment
DS Branded Products
Exclusive Distribution
Marketing Play
New Market
Capability Building
Adapted Technology
Resale
Integration into Offering
In-kind Services
Co-Development
Other (Allows User to Type in)

Customer:

Categories: Partnership Type, Goal

Partnership Type:
Co-Develop
Test Solutions
In-Kind Services
Exploratory
Paused
Abandoned
Others

Goal:
DS Branded Products
Exclusive Distribution
Marketing Play
New Market
Capability Building
Adapted Technology
Resale
Integration into Offering
In-kind Services
Co-Development
Others (Allows User to Type in)


## ToDos for a later date
* When Entity is deleted, Delete image from Cloudinary
* Paginate data
* show notification of Unread Entries in Nav
* ability to archive interactions
* Add Honeypot to sign in form
* Figure out how to do Android/iOS builds and how to distribute
* Push Notifications
