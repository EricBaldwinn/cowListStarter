const express = require('express');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
const {save, get} = require('../database/mongo/index.js');
let db;
let dbChoice;

const path = require('path');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/cows', (req, res) => {
  if (dbChoice === 'mongo') {
    get()
    .then((response) => {
      res.send(response)
    })
  } else {
    let sqlString = 'select * from cowList';
    db.query(sqlString, (err, results) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.send(results)
      }
    })
  }
})

app.post('/api/cows', (req, res) => {
  if (dbChoice === 'mongo') {
    save(req.body.name, req.body.description)
    .then(() => {
      return get()
    })
    .then((response) => {
      res.send(response)
    })
  } else {
   let sqlString = 'insert into cowList (name, description) values (?, ?)'
   db.query(sqlString, [req.body.name, req.body.description], (err) => {
     if (err) {
       res.status(404).send(err)
     } else {
       db.query('select * from cowList', (err, results) => {
         if (err) {
           res.status(404).send(err)
         } else {
           res.send(results)
         }
       })
     }
   })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${3000}!`);
    readline.question(`Choose your db: (mongo or mysql)\n>>>>>`, choice=>{
      if(choice==='mongo') {
        dbChoice = 'mongo';
        console.log('Your db is Mongo');
        db = require('../database/mongo');
      } else if(choice === 'mysql') {
        dbChoice='mysql';
        console.log('Your db is mysql');
        db = require('../database/mysql');
      } else {
        console.log('Stope node, restart and try again, valid options are mysql and mongo')
      }
    })

});
