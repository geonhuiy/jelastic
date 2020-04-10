'use strict';
// connectionTypesRoute
const express = require('express');
const router = express.Router();
const connectionTypesController = require('../controllers/connectionTypesController');

router.get('/', connectionTypesController.connectionTypes_list_get);

router.get('/:id', connectionTypesController.connectionType_get);

router.post('/', connectionTypesController.connectionType_post);

module.exports = router;
