const express = require('express');
const episodeController = require('../controllers/episodeController');

const router = express.Router();

router.get('/create', episodeController.episode_create_get);
router.get('/', episodeController.episode_index); //note episode is already infront of this
router.post('/', episodeController.episode_create_post);
router.get('/:id', episodeController.episode_details);
router.delete('/:id', episodeController.episode_delete);

module.exports = router;