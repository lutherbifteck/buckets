import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

Meteor.startup(function() {
  if(Meteor.isClient) {

    var countdownText =["3!", "2!", "1!", "Firing up Buckets..."];
    for (var i = 0; i < countdownText.length; i++) {
      console.log(countdownText[i]);
    }
  }
});
