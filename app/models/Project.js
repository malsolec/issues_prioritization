
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var ProjectSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  alias :  String,
  url :  String,
  issues : [{  type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }]
});

ProjectSchema.plugin(autoIncrement.plugin, 'Project');
module.exports = mongoose.model('Project', ProjectSchema);