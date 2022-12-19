import WebSocket from 'ws';
import { IWSQuery, IWSResult, WSResult, WSStr } from '../xcore/WSQuery';
import { SessionsTable } from '../xcore/dbase/Sessions';
import { UserTable } from '../xcore/dbase/Users';
import { OrgsTable } from '../xcore/dbase/Orgs';
import { Jobs_titlesTable } from '../xcore/dbase/Jobs_titles';
import { SendMail } from '../xcore/mailer/sendMail';

import crypto from 'crypto';
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
            ut = new UserTable(q.args, q.sess_code);
            data = await ut.selectUserLoginEmail();

            //console.log(data);
            var old_pass = crypto.createHmac('sha256', CONFIG.key_code).update(q.args.old_password).digest('hex');
            var pass = crypto.createHmac('sha256', CONFIG.key_code).update(q.args.new_password).digest('hex');

            if (data[0].password === pass) {
                wsres.error = 'Новый пароль не должен повторять старый';
                wsres.data = [];
                wsres.code = q.sess_code;
                break;
            }
            if (q.args.login === q.args.new_password) {
                wsres.error = 'Пароль не должен совпадать с логином';
                wsres.data = [];
                wsres.code = q.sess_code;
                break;
            }
            if (data[0].password !== old_pass) {
                wsres.error = 'Старый пароль не верен';
                wsres.code = q.sess_code;
                wsres.data = [];
                break;

            }
            data = await ut.changePass();
            wsres.data = data;
            wsres.code = q.sess_code;
            wsres.error = null;
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
        //Отправка на почту кода re_pass_code
        case 'set_ForgPass': {
            ut = new UserTable(q.args, q.sess_code);
            sendMail = new SendMail(q.args, q.sess_code);
            data = await ut.selectUserLoginEmail();

            if (data[0] == undefined) {
                wsres.error = 'Такого email не существует, проверте введенные данные или обратитесть к администратору системы';
            }
            else {
                if (data[0].act_mail === true) { sendMail.sendRePassword(); }
                else { wsres.error = 'Данный email не был подтвержден, обращайтесь к администратору системы' }
            }


        } break;
        //Обновление пароля и смена кода re_pass_code
        case 'set_SaveNewPass': {
            ut = new UserTable(q.args, q.sess_code);
            data = await ut.selectUserLoginEmail();
            if (q.args.code !== data[0].re_password_code) {
                wsres.error = 'Код подтверждения неверен, проверте правильность введеного кода'
            }
            else {
                ut = new UserTable(q.args, q.sess_code);
                ut.forgPass();
            }
        } break;
       
        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ОРГАНИЗАЦИЙ
        //Получение всех организаций
        case 'get_Org': {
            var orgs = new OrgsTable(q.args, q.sess_code);
            data = await orgs.selectOrgs();
            if (data.length > 0) {
                wsres.code = q.sess_code;
                wsres.error = null;
                wsres.data = data;
            }
            else{wsres.code = q.sess_code; 
                wsres.data = [], 
                wsres.error = 'Организации отсутвуют'
            }
        } break;

        //Добавление новой организации
        case 'set_NewOrg': {
            var orgs = new OrgsTable(q.args, q.sess_code);
            data = await orgs.insertOrgs();
            if(data[0].id==0|| data==null|| data==undefined)
            {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления организации"
            }
            else {
                data = await orgs.selectOrgs();
                wsres.code = q.sess_code;
                wsres.data = data;
                wsres.error = null;
            }
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ДОЛЖНОСТЕЙ ОПРЕДЕЛЕННОЙ ОРГАНИЗАЦИИ
        //Получение должностей организации 
        case 'get_Jobs':{
            var jobs = new Jobs_titlesTable(q.args, q.sess_code);
            data = await jobs.selectJobs_title();
            if (data.length > 0) {
                wsres.code = q.sess_code;
                wsres.error = null;
                wsres.data = data;
            }
            else{wsres.code = q.sess_code; 
                wsres.data = [], 
                wsres.error = 'У организации отсутствуют должности'
            }
            
        }break;

        case 'set_NewJobTitle':{
            var jobs = new Jobs_titlesTable(q.args, q.sess_code);
            data = await jobs.insertJobs_title();
            if(data[0].id==0|| data==null|| data==undefined)
            {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления должности"
            }
            else {
                data = await jobs.selectJobs_title();
                wsres.code = q.sess_code;
                wsres.data = data;
                wsres.error = null;
            }
            
        }break;


        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕЙ
        case 'set_NewUser': {
            var ut = new UserTable(q.args, q.sess_code);
            data = await ut.insertUser();
            if(data[0].id==0|| data==null|| data==undefined)
            {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления пользователя"
            }
            else {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = null;
            }

        } break;



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



