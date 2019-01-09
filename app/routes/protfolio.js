const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.get("/portfolio/:id", (req, res, next) => {

    let yearId = req.params.id === 'exampl' ? 'Примеры выполненных работ' : `Работы выполненные за ${req.params.id} год`;

    res.render('portfolio', {
        title: '- перечень выполненных работ',
        path: '/portfolio',
        yearId: yearId,
        work: [{
            title: 'Страница находится в разработке'
        }]
    });
});

module.exports = router