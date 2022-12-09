const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const taskSchema = new mongoose.Schema({
    //id: Number,
    trainer: String,
    type: String,
    poke1: String,
    poke2: String,
    poke3: String,
    poke4: String
});

taskSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
taskSchema.set('toJSON', {
  virtuals: true
});

const Leader = mongoose.model('Task', taskSchema);

//let gymLeader = [];
//let days = [];
//let id = 0;

//Get Tasks

app.get('/pkm/leader', async (req, res) => {
  console.log("Help");
  try {
    let gymLeader = await Leader.find();
    res.send({gymLeader: gymLeader});
  } catch (error) {
    console.log("I have the high ground");
    console.log(error);
    res.sendStatus(500);
  }
});

// app.get('/api/tasks', (req, res) => {
//   console.log("In get");
//   console.log(tasks);
//   res.send(tasks);
// });

//Make Tasks

app.post('/pkm/leader', async (req, res) => {
    console.log("In post");
    //id = parseInt(id + 1);
    const gymLeader = new Leader({
    //id: id,
    trainer: req.body.trainer,
    type: req.body.type,
    poke1: req.body.poke1,
    poke2: req.body.poke2,
    poke3: req.body.poke3,
    poke4: req.body.poke4
  });
  try {
    await gymLeader.save();
    res.send({gymLeader:gymLeader});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/pkm/leader/:id', async (req, res) => {
  console.log("In delete");
  try {
    //console.log(req);
    console.log("Help 2");
    await Leader.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));
