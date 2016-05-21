var mongoose = require('mongoose');
var    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var IssueSchema = new mongoose.Schema( {
  number    : Number,
  title   : String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  scores : [{ type: mongoose.Schema.Types.ObjectId, ref: 'IssueScore' }]
});

IssueSchema.plugin(autoIncrement.plugin, 'Issue');
module.exports = mongoose.model('Issue',IssueSchema);

