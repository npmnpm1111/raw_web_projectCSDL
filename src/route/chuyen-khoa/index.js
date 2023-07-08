const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/homeController');

router.get('/', homeController.getChuyenKhoaPage); // Change this line

module.exports = router;
