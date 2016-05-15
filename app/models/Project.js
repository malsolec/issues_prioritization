
var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  _id     : Number,
  _issueId : {  type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  scorePosition    : Number
});

module.exports = mongoose.model('Project', ProjectSchema);