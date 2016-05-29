var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var IssueSchema = new Schema( {
  number    : Number,
  title   : String,
  priority: String
});

IssueSchema.plugin(autoIncrement.plugin, {model:'Issue', field:'id'});
module.exports = mongoose.model('Issue',IssueSchema);

