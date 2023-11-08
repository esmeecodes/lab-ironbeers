const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

//
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials'); // hiermee geven we aan waar we de partials vinden van de layout

// Add the route handlers here:
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const allBeers = punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { allBeers: beersFromApi }))
    .catch(error => console.log(error));
});

// app.get('/random-beer', (req, res, next) => {
//   const randomBeer = PunkAPI.getRandom()
//     .then(beer => res.render('random-beer', { randomBeer: beer[0] }))
//     .catch(error => console.log(error));
// });

app.get('/random-beer', (req, res, next) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then(beer => {
      console.log(beer); // Controleer of het bierobject wordt ontvangen
      res.render('random-beer', { randomBeer: beer });
    })
    .catch(error => {
      console.error('Fout bij het ophalen van het willekeurige bier:', error);
      // Voer eventueel extra foutafhandeling uit
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
