const Work = require('../models/work')


exports.getAddWork = (req, res, next) => {
    res.render('add-work', {
        pageTitle: 'Добавить новую работу в базу данных',
        path: '/admin/add-work',
    })
}


exports.postAddWork = (req, res, next) => {
    const work = new Work(
        null,
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year
    )
    work.save();
    res.redirect(`/admin/portfolio/${req.body.year}`);
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

exports.indexAddWork = (req, res, next) => {
    res.redirect("/admin/portfolio/exampl")
}

exports.editWork = (req, res, next) => {
    Work.findById(req.params.id, work => {
        res.render('admin/edit-work', {
            work: work,
            edit: true
        })

    })
}

exports.postEditWork = (req, res, next) => {
    const work = new Work(
        req.body.id,
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year
    )
    work.save();
    res.redirect(`/admin/portfolio/${req.body.year}`);

}


exports.deleteWork = (req, res, next) => {
    Work.deleteById(req.body.workId)
    res.redirect(`/admin/portfolio/${req.body.year}`);
}