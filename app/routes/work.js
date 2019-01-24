const express = require('express')

const workController = require('../controllers/work');

const router = express.Router();

router.get("/", workController.getIndexPage);

router.get("/resume", workController.getResumePage);

router.get("/portfolio/:id", workController.getPortfolioPage);

router.get("/blog", workController.getBlogPage);

router.get("/contact", workController.getContactPage);

router.post('/contact', workController.postContactPage);

module.exports = router;