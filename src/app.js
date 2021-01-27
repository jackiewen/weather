const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getWeather = require('./../utils/getWeather');

const app = express();
const port = process.env.PORT || 3000;
// Define paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup view
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jackie'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.city_id) {
        return res.send({
            error: 'City ID is required'
        });
    }
    getWeather(req.query.city_id, (error, data) => {
        if (error) {
            return res.send(error);
        }
        res.send({data});
    })
    
});


app.get('/help/*', (req, res) => {
    res.send('No help found');
});

app.get('*', (req, res) => {
    res.send('404 Page');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});