const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', hbs);

//LOG THE REQUEST BEING MADE TO BOTH A FILE AND THE CONSOLE
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server log', log);
  next();
});

//CHECK IF IN MAINTENANCE MODE (THERE IS NO NEXT() TO MOVE ON IF IN MAINTENANCE MODE)
//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to some website'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'there was an error that occurred'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
