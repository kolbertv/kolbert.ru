const express = require('express');
const {
    check,
    body
} = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();
const User = require('../models/user');

router.get("/login", authController.getLogin);

router.post("/login",
    [
        body('email')
        .isEmail()
        .withMessage('Указан неправильный email')
        .normalizeEmail(),
        body('password', 'Введенный пароль не правильный')
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
    "/signup",
    [
        check('email')
        .isEmail()
        .withMessage('Указан неправильный email')
        .custom((value, {
            req
        }) => {
            return User.findOne({
                    email: value
                })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Пользователь с данным емайлом уже зарегистрирован.');
                    }
                });
        })
        .normalizeEmail(),
        body(
            'password',
            'Пароль может состоять только из цифр и букв, не менее 5 знаков'
        )
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim(),
        body('confirmPassword')
        .custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error('Введенные пароли не совпадают');
            }
            return true;
        })
        .trim()
    ],
    authController.postSignup);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPasword);

module.exports = router;