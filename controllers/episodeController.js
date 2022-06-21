const Episode = require('../models/episode');

const episode_index = (req, res) => {
    Episode.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('../views/episodes/list', { episodes: result, title: 'All episodes' });
        })
        .catch(err => {
            console.log(err);
        });
}

const episode_details = (req, res) => {
    const id = req.params.id;
    Episode.findById(id)
        .then(result => {
            res.render('../views/episodes/details', { episode: result, title: 'Episode Details' });
        })
        .catch(err => {
            console.log(err);
        });
}

const episode_create_get = (req, res) => {
    res.render('../views/episodes/create', { title: 'Create a new episode' });
}

const episode_create_post = (req, res) => {
    const episode = new Episode(req.body);
    episode.save()
        .then(result => {
            res.redirect('/episodes');
        })
        .catch(err => {
            console.log(err);
        });
}

const episode_delete = (req, res) => {
    const id = req.params.id;
    Episode.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/episodes' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    episode_index,
    episode_details,
    episode_create_get,
    episode_create_post,
    episode_delete
}