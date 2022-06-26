const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Episode = require('./models/episode');
const episodeRoutes = require('./routes/episodeRoutes')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://testUser:test1234@nodetuts.msvhb.mongodb.net/nodetuts?retryWrites=true&w=majority" //place name of db after .net
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })  //async task
    .then((result) => app.listen(process.env.PORT || 3000, function () {
        console.log("SERVER STARTED PORT 3000")
    }))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

const episode_index_home = (req, res) => {
    Episode.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('home.ejs', { latest_episode: result[0], title: 'Home' });
        })
        .catch(err => {
            console.log(err);
        });
}

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

app.get('/home', episode_index_home);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// episode routes
app.use('/episodes', episodeRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
