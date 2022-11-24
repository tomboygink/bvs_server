import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { CONFIG } from '../../xcore/config';


export class SendMail {
    args: any;
    sess_code: string;
    constructor(_args: any, _sess_code: string) {
        this.args = _args;
        this.sess_code = _sess_code;

    }

    async send() {
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'noreplay@bvs45.ru', // generated ethereal user
                pass: 'f2R2Ny8P' // generated ethereal password
            }
        });

        await transporter.sendMail({
            from: 'noreplay@bvs45.ru',
            //Получение email от пользователя 
            to: this.args.email,
            subject: 'Activate mail',
            //Добавить сгенерированный код и ссылка на сайт
            html: 'This message was sent from bvs_server to activate mail. <h1><a href="http://127.0.0.1:3040/confirm_mail">Click this link</a></h1> and paste this code <b>'+ crypto.createHmac('sha256', CONFIG.key_code).update(this.args.login+"_"+this.args.email).digest('hex')+'</b>',
        })

        //console.log(result)

    }
}

