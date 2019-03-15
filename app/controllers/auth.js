const nodemailer = require('nodemailer');
const auth = require('../config/configOAuth');
const transport = nodemailer.createTransport({
    service: auth.dev.service,
    auth: {
        user: auth.dev.id,
        pass: auth.dev.token
    }
});



const crypto = require('crypto');

const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error')
    });

};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                res.redirect('/admin');

            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/admin/portfolio/2018');
                        });
                    }
                    req.flash('error', 'Неправильный логин или пароль');
                    return res.redirect('/admin');
                })
                .catch(err => {
                    res.redirect('/admin');
                });
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
        pageTitle: 'Регистрация пользователя',
        errorMessage: req.flash('error')
    });

};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({
            email: email
        })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Пользователь с данным емвйл уже зарегистрирован');
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/admin');
                    return transport.sendMail({
                        to: email,
                        from: auth.dev.id,
                        subject: 'Регистрация успешная',
                        html: `<h1>Вы успешно зарегистрировались</h1>`
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.getReset = (req, res, next) => {
    res.render('admin/reset', {
        pageTitle: 'Восстановление пароля',
        errorMessage: req.flash('error')
    });

};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    req.flash('error', 'Аккаунта с такой почтой не существует');
                    return res.redirect('/reset');
                }

                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return new User(user).save();
            })
            .then(result => {
                res.redirect('/admin');
                return transport.sendMail({
                    to: req.body.email,
                    from: auth.dev.id,
                    subject: 'Password reset',
                    html: `
                    <p>Вами был инициирован запрос на сброс паролья</p>
                    <p>Нажмите эту <a href="http://localhost:3000/reset/${token}">сылку</a> для установки нового пароля.</p>
                    `
                });

            })
            .catch(err => {
                console.log(err);
            })

    })

};