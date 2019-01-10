const Product = require('../models/product')


exports.getAddProduct = (req, res, next) => {
    res.render('add-work', {
        pageTitle: 'Добавить новую работу в базу данных',
        path: '/admin/add-work',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.descript,
        req.body.feature,
        req.body.url,
        req.body.year
    )
    product.save();
    res.redirect("/admin/add-work");
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('portfolio', {
            title: '- перечень выполненных работ',
            path: '/portfolio',
            yearId: req.params.id,
            prod: products,
            hasProducts: products.length > 0
        });
    });

}