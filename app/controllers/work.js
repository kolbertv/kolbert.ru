const Work = require('../models/work')

exports.getWorks = (req, res, next) => {
    Work.fetchAll(works => {
        res.render('portfolio', {
            title: '- перечень выполненных работ',
            path: '/portfolio',
            yearId: req.params.id,
            prod: works,
            hasProducts: works.length > 0
        });
    });
}