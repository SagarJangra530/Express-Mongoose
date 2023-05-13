const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	email: String,
	password: String,
	date: {
		type: Date,
		default: Date.now(),
	},
});

const user = new mongoose.model('user', userSchema);

const createUser = async (arrData) => {
	try {
		const result = await user.insertMany(arrData);
		console.log('Successfully inserted data');
		return result;
	} catch (err) {
		console.error('Error : ', err);
	}
};

const checkUser = async (username) => {
	return await user
		.find({ username: username })
		.then((data) => {
			return data.length ? true : false;
		})
		.catch((err) => console.log(err));

	return false;
};

module.exports = { user, createUser, checkUser };
