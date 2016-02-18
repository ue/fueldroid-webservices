var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fueldroid');

module.exports = {
	'secret': 'ilovescotchyscotch',
};