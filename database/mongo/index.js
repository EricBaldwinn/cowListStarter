const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cowList', (err)=>{
  if(err) {
    console.log(err);
    return;
  }
  console.log('connected to mongo')
});

const cowSchema = new mongoose.Schema({
  name: String,
  description: String
})

const Cow = mongoose.model('Cow', cowSchema);

const save = (name, description) => {
  let cows = new Cow({
    name: name,
    description: description
  })
  return cows.save()
}

const get = () => {
  return Cow.find()
}

module.exports.save = save;
module.exports.get = get;


// name = req.body.name;
  // description = req.body.description;
  // const cows = new Cow({
  //   name: name,
  //   description: description
  // })
  // cows.save((err) => {
  //   if (err) {
  //     res.status(404).send(err);
  //   } else {
  //     get()
  //     .then((response) => {
  //       res.send(response)
  //     })
  //   }
  // })