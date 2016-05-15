var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id     : Number,
  userName    : String,
  userEmail : String,
  projects : [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
  issueScores : [{  type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});

module.exports = mongoose.model('User',UserSchema);