import WebSocket from 'ws';
import { IWSQuery, IWSResult, WSResult, WSStr } from '../xcore/WSQuery';
import { SessionsTable } from '../xcore/dbase/Sessions';
import { UserTable } from '../xcore/dbase/Users';
import { SendMail } from '../xcore/mailer/sendMail';

import crypto from 'crypto';
//import { CONFIG } from '../../xcore/config';
import { CONFIG } from '../xcore/config'


export async function WSRoute(_ws: WebSocket, q: IWSQuery) {
    // начало - создание ответа
    var wsres: IWSResult = new WSResult(q.cmd);

    console.log(q);
    var sess_code;
    var data;


    // обработка данных
    switch (q.cmd) {

        //------------------------------------------------------------------------АВТОРИЗАЦИЯ
        // Авторизация по коду сессии
        case 'get_UserBySessionCode': {
            var st = new SessionsTable(q.args);
            var ut = new UserTable(q.args, q.sess_code);
            var code = await st.selectSessCode();
            data = await ut.selectUserBySessCode();

            if (code[0] == undefined) {
                wsres.error = "Данного кода сессии не существует";
            }
            else {
                sess_code = code[0].sess_code;
                wsres.code = sess_code;
                wsres.data = data;
            }
        } break;
        // Авторизация по логину и паролю 
        case 'get_UserByAuth': {
            var ut = new UserTable(q.args, q.sess_code);
            var st = new SessionsTable(q.args);
            // Авторизация по логину и паролю
            sess_code = await st.insertSess();
           
            //Генерация кода сессии, запись в бд
            data = await ut.selectUser();
            if (sess_code === '' && data[0] === undefined) { wsres.error = "Пользователя не существует или введены не верные данные"; }
            else {
                wsres.code = sess_code;
                wsres.data = data;
            }

        } break;

        //------------------------------------------------------------------------ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЕМ
        //Смена данных пользователя
        case 'set_CUserData': {
            ut = new UserTable(q.args, q.sess_code);
            data = await ut.updateUser();
            if (data[0] === undefined) { wsres.error = "Пользователя не существует"; }
            else { wsres.data = data; wsres.code = q.sess_code }
        } break;
        //Смена пароля пользователя
        case 'set_ChangePass': {
            if (q.args.new_password === q.args.old_password) {
                wsres.error = 'Новый пароль не должен повторять старый';
                wsres.data = [];
                wsres.code = q.sess_code;
            }
            else if (q.args.login === q.args.new_password) {
                wsres.error = 'Пароль не должен совпадать с логином';
                wsres.data = [];
                wsres.code = q.sess_code;
            }
            else {
                ut = new UserTable(q.args, q.sess_code);
                data = await ut.changePass();
                if (data[0] === undefined) {
                    wsres.error = 'Старый пароль не верен';
                    wsres.code = q.sess_code;
                    wsres.data = []
                }
                else {
                    wsres.data = data;
                    wsres.code = q.sess_code;
                    wsres.error = '';
                }
            }

        } break;
        //------------------------------------------------------------------------АКТИВАЦИЯ ПОЧТЫ
        //отправка сообщения на почту с кодом
        case 'set_ActMail': {
            if (q.args.email !== '') {
                var sendMail = new SendMail(q.args, q.sess_code);
                sendMail.sendConfirmMail();
            } else { wsres.error = "Введите email"; }
        } break;
        //Обновление данных пользователя о email
        case 'set_MailCode': {
            ut = new UserTable(q.args, q.sess_code);
            data = await ut.updateMail();
            //Получаем пользователя
            if (data[0] === undefined) { wsres.error = "Введен неверный код" }
            else {
                wsres.data = await ut.updateMail();
                wsres.code = q.sess_code;
            }
        } break;
        //------------------------------------------------------------------------ЗАБЫЛИ ПАРОЛЬ
        //обновление пароля и кода для именения пароля
        case 'set_ForgPass': {
            ut = new UserTable(q.args, q.sess_code);
            sendMail = new SendMail(q.args, q.sess_code);
            data = await ut.SelectUserLoginEmail();
                        
            if(data[0] == undefined)
            {
                wsres.error = 'Данные введены неверно или пользователя с такими данными не существует, обращайтесь к администратору системы';
            }
            else{
                if(data[0].act_mail === true){sendMail.sendRePassword();}
                else {wsres.error = 'Данный email не был подтвержден, обращайтесь к администратору системы'}
            }

        } break;

        case 'set_SaveNewPass':{
            let a = crypto.createHmac('sha256', CONFIG.key_code).update(q.args.login+"_"+q.args.new_password).digest('hex');
            if(q.args.code!==a)
            {
                wsres.error = 'Код подтверждения неверен, проверте правильность введеного кода'
            }
            else{
                ut = new UserTable(q.args, q.sess_code);
                ut.forgPass();
            }
        }break;


        //------------------------------------------------------------------------УДАЛЕНИЕ КУКОВ ПОСЛЕ ВЫХОДА
        case 'deleteCookie': {
            st = new SessionsTable(q.args);
            st.deleteSess();
            wsres.code = '';
            wsres.data = [];
        } break;

        //------------------------------------------------------------------------ДРУГИЕ КОДЫ КОТОРЫЕ НЕ ПРОПИСАННЫ
        default: {
            wsres.error = `Команда "${q.cmd}" не распознана`;
        } break;
    }

    // финал - отправка ответа
    _ws.send(WSStr(wsres));
}



