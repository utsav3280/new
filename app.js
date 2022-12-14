const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb+srv://root:10xacademy@cluster0.tmos3gg.mongodb.net/?retryWrites=true&w=majority", () => { console.log("connected to database") });

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors("*"))

const Schema = mongoose.Schema;
const formSchema = new Schema({
    name: String,
    age: Number,
    company: String
})

const User = mongoose.model("instaUser", formSchema);

app.post("/register", async (req, res) => {
    console.log(req.body);
    await User.create(req.body);
    let data = await User.find();
    res.json(data);
})

app.get("/users", async (req, res) => {
    let data = await User.find();
    data = data.reverse()
    res.json(data);
})

app.listen(5000, () => { console.log("Server is up and running"); }) 