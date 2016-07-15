import { Meteor } from 'meteor/meteor';

const C_CLOUD_NAME = Meteor.settings.public.CLOUDINARY_CLOUD_NAME;
const C_API_KEY = Meteor.settings.private.CLOUDINARY_API_KEY;
const C_API_SECRET = Meteor.settings.private.CLOUDINARY_API_SECRET;

Meteor.startup(() => {
  Cloudinary.config({
   cloud_name: C_CLOUD_NAME,
   api_key: C_API_KEY,
   api_secret: C_API_SECRET
  });

  Cloudinary.rules["delete"] = function() {
    this.userId === "my_user_id";
    return this.public_id;
  };
});
