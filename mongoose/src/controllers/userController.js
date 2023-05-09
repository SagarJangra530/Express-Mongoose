const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createUser, checkUser} = require('../model/user')



const signup = async (req, res) => {
    const {username, email, password} = req.body;
    console.log(username, email, password);
    try{
        const isUserExists = await checkUser(username);
        if(isUserExists){
            return res.status(400).json({message : "Already Exists Please Sign in"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = createUser([{username : username, email : email, password : hashedPassword}]);

        result.then(data => {
        const token = jwt.sign({email : email}, "SECRET_KEY");
        console.log(data[0]._id);
        res.status(201).json({token : token, email : email});
        })
        .catch(err => console.log(err));

    } catch (err){
        console.log(err);
        res.status(500).json({message : "Something Went Wrong"});
    }
}

const signin = async (req, res) => {
    const {username, email, password} = req.body;
    console.log(username, email, password);

    try{
        const isUserExists = await checkUser(username);
        console.log(isUserExists);
        if(!isUserExists){
            return res.status(400).json({message : "Not Exists Please SignUp"});
        }
        res.send("Sign in").status(200);
    } catch (err){
        console.log(err);
        res.status(500).json({message : "Something Went Wrong"});
    }

}
module.exports = {signin, signup};