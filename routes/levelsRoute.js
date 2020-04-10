'use strict';
// levelsRoute
const express = require('express');
const router = express.Router();
const levelsController = require('../controllers/levelsController');

router.get('/', levelsController.levels_list_get);

router.get('/:id', levelsController.currentType_get);

router.post('/', levelsController.currentType_post);

module.exports = router;
