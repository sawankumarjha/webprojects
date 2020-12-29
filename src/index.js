const express = require('express');
const app = express();
const hbs = require('hbs');
const requests = require('requests');

const path = require('path');
const { dirname } = require('path');
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');
let dt = new Date();
app.use('/about', express.static(publicPath));
app.use('/', express.static(publicPath));
app.use('/weather', express.static(publicPath));
app.use('/not', express.static(publicPath));

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//Partials
hbs.registerPartials(partialPath);
// Dynamic Content
app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.get('/', (req, res) => {
    res.render('index', { year: `${dt.getFullYear()}` });
});
app.get('/about', (req, res) => {

    res.render('about', { year: `${dt.getFullYear()}` });
});
app.get('/weather', (req, res) => {
    res.render('weather', {
        year: `${dt.getFullYear()}`, day: `${days[dt.getDay()]}`, date: `${dt.getDate()} ${month[dt.getMonth()]}`
    });
});
app.get('about/*', (req, res) => {
    res.render('not');
});
app.get('weather/*', (req, res) => {
    res.render('not');
});
app.get('*', (req, res) => {
    res.render('not');
});
app.listen(8000, (err) => {
    console.log("Listening at port 8000");
})