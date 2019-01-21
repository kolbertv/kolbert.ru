const express = require('express')

const workController = require('../controllers/work');

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).render('index', {
        title: '',
        path: '/'
    });
});

router.get("/resume", (req, res, next) => {
    res.render('resume', {
        title: '- резюме',
        path: '/resume'
    });
});


router.get("/portfolio/:id", workController.getWorks);

router.get("/blog", (req, res, next) => {
    res.send("Страница блога находица в разработке");
});


router.get("/contact", (req, res, next) => {

    let sendButton = '';
    let sendButtonText = 'Отправить сообщение'

    if (req.session.sendButtonDisabled) {
        sendButton = 'disabled';
        sendButtonText = 'Сообщение отправлено';
    }
    req.session.sendButtonDisabled = false;

    res.render('contact', {
        title: ' - контактные данные',
        path: '/contact',
        sendButton: sendButton,
        sendButtonText: sendButtonText
    });
});

router.post('/contact', workController.postLetter);


module.exports = router;