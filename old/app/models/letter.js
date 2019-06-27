const nodemailer = require('nodemailer');
// const auth = require('../config/configOAuth');


const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'letter.json'
);

const getLettersFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};


module.exports = class Letter {
    constructor(name, phone, email, message) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.message = message;
    }

    save() {

        // console.log(`this from save ${this.name}`)

        getLettersFromFile(letters => {
            if (!letters.length) {
                this.id = 0;
            } else {
                this.id = letters.length;
            }
            letters.push(this);
            fs.writeFile(p, JSON.stringify(letters), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });

    }

    send() {

        // console.log(`this from send ${this.name}`)

        let transport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_TOKEN
            }
        });
        const message = {
            from: this.name + ' ' + this.email,
            to: process.env.MAIL_USER,
            envelope: {
                from: process.env.MAIL_ID,
                to: process.env.MAIL_USER
            },
            subject: `Письмо с сайта kolbert.ru от ${this.name} номер письма:${this.id}`,
            text: this.message
        };
        transport.sendMail(message).catch(err => console.log(err));

    }
};