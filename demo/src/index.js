const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const alias = require('module-alias');

alias.addAlias('~', __dirname)

const app = express();
mongoose.connect('mongodb://dbmongo:27017/demo-database', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(db => console.log('DB connected'))
  .catch(err => console.log('DB ERROR ', err))

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
// app.get('/', (req, res) => res.render('index.html'))
app.use('/api/tasks', require('~/routes/tasks'));

// static files
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
