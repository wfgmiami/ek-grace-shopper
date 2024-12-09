const express = require('express');
const path = require('path');


const app = express();

module.exports = app;

let config = process.env; 
try {
  config = require('./config.json');
}
catch(ex){
  
};
console.log(config)

app.set('view engine', 'ejs');

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.render('index', { GOOGLE_PLACES_KEY: config.GOOGLE_PLACES_KEY }));

app.use('/api', require('./routes'));
