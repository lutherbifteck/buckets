import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  var countdownText =["3!", "2!", "1!", "Firing up Buckets..."];

  for (var i = 0; i < countdownText.length; i++) {
    console.log(countdownText[i]);
  }
});
