const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
const db = mongojs('CustomerControlApp', ['customers']);
var ObjectId = mongojs.ObjectId;
const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/customer/add', function(req, res) {
  var newCustomer = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    note: req.body.note
  }
  db.customers.insert(newCustomer, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log('new customer inserted');
      res.redirect('/');
  });
});

app.get('/admin', function(req, res) {
  db.customers.find(function (err, docs) {
  res.render('admin',{customers: docs});
  });
});

app.delete('/customer/delete/:id',function(req,res){
  var id = req.params.id;
    console.log('customer with id: ' + id + ' deleted');
  db.customers.remove({_id: ObjectId(id)}, function(err,result){
    if (err) {
console.log(err);
    }
    res.redirect('/admin')
  });
});


app.listen(3000, function() {
  console.log('server started on port 3000...');
});
