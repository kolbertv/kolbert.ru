const User = require('../models/user');

exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });

};

exports.postLogin = (req, res, next) => {
    User.findById('5c52eb0878682e68f08244a9')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('admin/portfolio/2018');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/admin');
    });
};


exports.getSignup = (req, res, next) => {
    res.render('admin/signup', {
        pageTitle: 'Регистрация пользователя'
    });

};

exports.postSignup = (req, res, next) => {};