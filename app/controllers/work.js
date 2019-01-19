const Work = require('../models/work')
const Letter = require('../models/letter')
const url = require('url')

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

exports.postLetter = (req, res, next)=> {

    const letter = new Letter(
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.message,
    )

    letter.save();
    letter.send();

    req.session.sendButtonDisabled = true;
    res.redirect("/contact");
}