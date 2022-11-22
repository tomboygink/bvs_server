import nodemailer from 'nodemailer';


export class SendMail {
    constructor() { }


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

        var result = await transporter.sendMail({
            from: 'noreplay@bvs45.ru',
            //Получение email от пользователя 
            to: 'letovaltseva@bvs45.ru',
            subject: 'Activate mail',
            //Добавить сгенерированный код и ссылка на сайт
            text: 'This message was sent from bvs_server to activate mail.',
        })

        //console.log(result)

    }
}

