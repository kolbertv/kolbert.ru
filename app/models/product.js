const products = [];

module.exports = class Product {
    constructor(title, descript, feature, url, year) {
        this.title = title;
        this.descript = descript;
        this.feature = feature;
        this.url = url;
        this.year = year;
    }

    save() {
        products.push(this)
    }

    static fetchAll() {
        return products

    }

}