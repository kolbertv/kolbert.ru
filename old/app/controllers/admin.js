const Work = require('../models/work');

exports.getAddWork = (req, res, next) => {
    res.render('add-work', {
        pageTitle: 'Добавить новую работу в базу данных',
        path: '/admin/add-work'

    });
};


exports.postAddWork = (req, res, next) => {
    const work = new Work(
        null,
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year,
        req.session.user._id
    );
    work.save();
    res.redirect(`/admin/portfolio/${req.body.year}`);
};

exports.listAddWork = (req, res, next) => {
    Work.fetchAll()
        .then(works => {
            res.render('admin/portfolio', {
                title: 'Admin - перечень выполненных работ',
                path: 'admin/portfolio',
                yearId: req.params.year,
                prod: works,
                hasProducts: works.length > 0
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.indexAddWork = (req, res, next) => {
    res.render('admin/index', {
        pageTitle: 'Страница авторизации',
        errorMessage: req.flash('error'),
        oldInput: {
            email: '',
            password: ''
        }
        // path: '/admin/index'
    });
};


exports.editWork = (req, res, next) => {
    Work.findById(req.params.id)
        .then(work => {
            res.render('admin/edit-work', {
                work: work,
                edit: true
            });

        });
};

exports.postEditWork = (req, res, next) => {
    const work = new Work(
        req.body.id,
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year,
        req.session.user._id
    );
    work.save()
        .then(result => {
            // console.log('rerod updated');
            res.redirect(`/admin/portfolio/${req.body.year}`);
        })
        .catch(err => console.log(err));

};


exports.postDeleteWork = (req, res, next) => {
    Work.deleteById(req.body.workId);
    res.redirect(`/admin/portfolio/${req.body.year}`);
};

exports.deleteWork = (req, res, next) => {
    Work.deleteById(req.params.workId)
        .then(() => {
            res.status(200).json({
                "message": "Успешно удалено"
            });
        })
        .catch(err => res.status(500).json());


};