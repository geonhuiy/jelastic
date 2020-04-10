'use strict';
// currentTypesRoute
const express = require('express');
const router = express.Router();
const currentTypesController = require('../controllers/currentTypesController');

router.get('/', currentTypesController.currentTypes_list_get);

router.get('/:id', currentTypesController.currentType_get);

router.post('/', currentTypesController.currentType_post);

module.exports = router;
