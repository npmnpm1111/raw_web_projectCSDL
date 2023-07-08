const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/homeController');

router.get('/', homeController.getCRUD);
router.post('/', homeController.postCRUD);

module.exports = router;
