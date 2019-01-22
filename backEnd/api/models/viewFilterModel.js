const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const viewFilterSchema = new Schema({
  _id: Number,
  title:String,
  createdBy: String,
  changeDates: [{date:String, changedBy:String}],
  projectList: Array,
  isActive:	Boolean
},{ collection: 'viewFilters' });

viewFilterSchema.plugin(autoIncrement.plugin, {
    model: 'ViewFilter',
    field: '_id',
    startAt: 200  
});
module.exports = mongoose.model('ViewFilter', viewFilterSchema);






