const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

// Use the plugin on the schema (fix: should be userSchema, not User)
userSchema.plugin(passportLocalMongoose);

// Fix export line: correct schema reference and consistent naming
module.exports = mongoose.model('User', userSchema);
