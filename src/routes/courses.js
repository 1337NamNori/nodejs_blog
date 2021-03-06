const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/coursesController.js');

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.post('/handle-multi-action', coursesController.multiAction);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force-delete', coursesController.forceDelete);
router.get('/:slug', coursesController.index);

module.exports = router;
