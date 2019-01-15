const Work = require('../models/work')


exports.getAddWork = (req, res, next) => {
    res.render('add-work', {
        pageTitle: 'Добавить новую работу в базу данных',
        path: '/admin/add-work',
    })
}


exports.postAddWork = (req, res, next) => {
    const work = new Work(
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year
    )
    work.save();
    res.redirect("/admin/add-work");
}

exports.listAddWork = (req, res, next) => {
    Work.fetchAll(works => {
        res.render('admin/portfolio', {
            title: 'Admin - перечень выполненных работ',
            // path: '/admin/portfolio',
            yearId: req.params.year,
            prod: works,
            hasProducts: works.length > 0
        });
    });
}

exports.editAddWork = (req, res, next) => {
    console.log(req.params.year)
    console.log(req.params.id)
}


exports.indexAddWork = (req, res, next) => {
    res.redirect("/admin/portfolio/exampl")
}