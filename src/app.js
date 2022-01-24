const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up handlebars
app.set('view engine', 'hbs'); 
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

// Setup static directory to use
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'My Website',
        name: 'Saksham Goel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Saksham Goel'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Saksham Goel'
    });
})


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const location = req.query.address;

    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError) {
                return res.send({
                    error: forecastError
                });
            }
            const message = forecastData.weather_descriptions[0] + '. It is currently '
                + forecastData.temperature + ' degrees outside.';
            res.send({
                forecast: message,
                location,
                temperature: forecastData.temperature
            })
            console.log(message);
        })
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Error 404',
        error: 'Help article not Found',
        name: 'Saksham Goel'
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Error 404',
        error: 'Page not Found',
        name: 'Saksham Goel'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running at port 3000');
});