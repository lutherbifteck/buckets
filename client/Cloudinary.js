import { Meteor } from 'meteor/meteor';

const C_CLOUD_NAME = Meteor.settings.public.CLOUDINARY_CLOUD_NAME;

$.cloudinary.config({
  cloud_name: C_CLOUD_NAME
});
