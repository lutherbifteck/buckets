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

# ToDo:
### ADMIN (Execs see all the same stuff, except ManageUsers)
* __ONLY ADMINS CAN EDIT THINGS__
* In __Dashboard__, Admins can:
..* view, filter stats
..* Create Entities (An entity member acct is created with Entity)

* In __EntityDetails__, Admins can:
..* C.R.U.D. the entity
..* Add Entity Updates (These are updates for admins/exects to view, about Entity)
..* shows Entity's customers

* Create __ManageUsers__. So admins can C.R.U.D. other Admins, Execs, and Entity-Members

### Entity Members
* Add entries to the CRM List
* Add new customers (in CRM List form)
