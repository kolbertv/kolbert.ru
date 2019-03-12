exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });

};

exports.postLogin = (req, res, next) => {

    req.session.isLoggedIn = true;
    res.redirect('admin/portfolio/2018');

};

exports.postLogout = (req, res, next) => {

    req.session.destroy(()=> {
        res.redirect('/admin');
    })


};