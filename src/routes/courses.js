const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/coursesController.js');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);
router.get('/:slug', coursesController.index);

module.exports = router;
