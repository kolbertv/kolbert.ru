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