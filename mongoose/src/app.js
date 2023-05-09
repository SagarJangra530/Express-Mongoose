const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');

// connecting to mongo db
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/singer',
{
    useNewUrlParser : true,
    useUnifiedTopology : true
}
)
.then(() => console.log("Success connecting to Data Base!"))
.catch((err) => console.log(err));

// // insert some data
// //1. create collection
// const singerSchema = new mongoose.Schema({
//     name : {
//         type: String,
//         require: true
//     },
//     password : String,
//     date: {
//         type: Date,
//         default: Date.now()
//     }
// });


app.get('/', (req, res) => {
    console.log(req.query.name);
    res.send({name : "Sagar", age : 27});
})

app.listen(3000, () => {
    console.log("Server Running at 3000");
})
