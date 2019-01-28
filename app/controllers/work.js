const Work = require('../models/work')
const Letter = require('../models/letter')

exports.getIndexPage = (req, res, next) => {
    Work.fetchByCount(4)
        .then(works => {
            res.status(200).render('index', {
                title: '',
                path: '/',
                works: works
            });
        });
};

exports.getResumePage = (req, res, next) => {
    res.render('resume', {
        title: '- резюме',
        path: '/resume'
    });
};


exports.getPortfolioPage = (req, res, next) => {
    Work.fetchAll()
        .then(works => {
            res.render('portfolio', {
                title: '- перечень выполненных работ',
                path: '/portfolio',
                yearId: req.params.id,
                prod: works,
                hasProducts: works.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postContactPage = (req, res, next) => {

    const letter = new Letter(
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.message
    );

    letter.save();
    letter.send();

    // req.session.sendButtonDisabled = true;
    res.redirect("/contact");
};

exports.getContactPage = (req, res, next) => {

    // let sendButton = '';
    // let sendButtonText = 'Отправить сообщение'

    // if (req.session.sendButtonDisabled) {
    //     sendButton = 'disabled';
    //     sendButtonText = 'Сообщение отправлено';
    // }

    // req.session.sendButtonDisabled = false;

    res.render('contact', {
        title: ' - контактные данные',
        path: '/contact'
        // sendButton: sendButton,
        // sendButtonText: sendButtonText
    });
};


exports.getBlogPage = (req, res, next) => {
    res.render('blog', {
        title: ' - страница блога',
        path: '/blog'
    });
};