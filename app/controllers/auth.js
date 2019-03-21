const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;
const crypto = require('crypto');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const {
    validationResult
} = require('express-validator/check');

const nodemailer = require('nodemailer');
// const auth = require('../config/configOAuth');
const transport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_TOKEN
    }
});

exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
        oldInput: {
            email: '',
            password: ''
        }
    });

};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/index', {
            pageTitle: 'Страница авторизации',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            }
        });
    }

    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(422).render('admin/index', {
                    pageTitle: 'Страница авторизации',
                    errorMessage: 'Пользователь с такой почтой не зарегистрирован',
                    oldInput: {
                        email: email,
                        password: password
                    }
                });

            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            res.redirect('/admin/portfolio/2018');
                        });
                    }
                    return res.status(422).render('admin/index', {
                        pageTitle: 'Страница авторизации',
                        errorMessage: 'Неправильный пароль',
                        oldInput: {
                            email: email,
                            password: password
                        }
                    });
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
        errorMessage: req.flash('error'),
        oldInput: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/signup', {
            pageTitle: 'Регистрация пользователя',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
                confirmPassword: req.body.confirmPassword
            }
        });
    }

    bcrypt
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
                    from: process.env.MAIL_ID,
                    subject: 'Регистрация успешная',
                    html: `<h1>Вы успешно зарегистрировались</h1>`
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
                    from: process.env.MAIL_ID,
                    subject: 'Password reset',
                    html: `
                    <p>Вами был инициирован запрос на сброс паролья</p>
                    <p>Нажмите эту <a href="http://localhost:3000/reset/${token}">сылку</a> для установки нового пароля.</p>
                    `
                });

            })
            .catch(err => {
                console.log(err);
            });

    });

};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;

    User.findOne({
            resetToken: token,
            resetTokenExpiration: {
                $gt: Date.now()
            }
        })
        .then(user => {

            res.render('admin/new-password', {
                pageTitle: 'Форма смены пароля',
                errorMessage: req.flash('error'),
                userId: user._id.toString(),
                passwordToken: token
            });

        })
        .catch(err => console.log(err));

};

exports.postNewPasword = (req, res, next) => {
    const newPassword = req.body.password;
    const confirmNewPassword = req.body.confirmPassword;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    if (newPassword !== confirmNewPassword) {
        req.flash('error', 'Пароли не совпадают');
        return res.redirect(`/reset/${passwordToken}`);
    }

    User.findOne({
            resetToken: passwordToken,
            resetTokenExpiration: {
                $gt: Date.now()
            },
            _id: new ObjectId(userId)
        })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return new User(resetUser).save();
        })
        .then(result => {
            return res.redirect('/admin');
        })
        .catch(err => console.log(err));

};