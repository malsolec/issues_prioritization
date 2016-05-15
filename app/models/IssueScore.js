var mongoose = require('mongoose');

var IssueScoreSchema = new mongoose.Schema({
  _id     : Number,
  _issueId : { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  scorePosition    : Number
});

module.exports = mongoose.model('IssueScore', IssueScoreSchema);