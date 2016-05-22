var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var ProjectSchema = new Schema({
  alias :  String,
  url :  String,
 issues : [{type:  Schema.Types.ObjectId, ref: 'Issue' }]
});

ProjectSchema.plugin(autoIncrement.plugin, {model:'Project', field:'id'});
module.exports = mongoose.model('Project', ProjectSchema);