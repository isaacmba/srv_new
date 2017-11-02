var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	info:Array,
	investments: Array,
	founded_companies: Array
});

var User = mongoose.model('User',userSchema);
module.exports = User;
var mark = new User({info:[1,2,3,4,5533,3434], investments: [4343,34,3,3434,344334], founded_companies:[4343353]});
console.log(mark);
mark.save();