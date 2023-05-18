import WebSocket from 'ws';
import { IWSQuery, IWSResult, WSResult, WSStr } from '../xcore/WSQuery';
import { SessionsTable } from '../xcore/dbase/Sessions';
import { UserTable } from '../xcore/dbase/Users';
import { OrgsTable } from '../xcore/dbase/Orgs';
import { Jobs_titlesTable } from '../xcore/dbase/Jobs_titles';
import { SendMail } from '../xcore/mailer/sendMail';

import crypto from 'crypto';
import { CONFIG } from '../xcore/config'
import { Console } from 'console';
import { Devs_groupsTable } from '../xcore/dbase/Devs_groups';
import { DevsTable } from '../xcore/dbase/Devs';
import { Dev_sessTable } from '../xcore/dbase/Dev_sess';
import { Dev_povsTable } from '../xcore/dbase/Dev_Povs';
import { Control_dev_sessTable } from '../xcore/dbase/Control_Dev_Sess';


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
            //console.log(data);
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

        //------------------------------------------------------------------------РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ АДМИНИСТРАТОРОМ 
        case 'set_ChangeUser': {
            ut = new UserTable(q.args, q.sess_code);
            await ut.updateUserAdmin();
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
            else {
                wsres.code = q.sess_code;
                wsres.data = [],
                    wsres.error = 'Организации отсутвуют'
            }
        }
            break;

        //Добавление новой организации
        case 'set_NewOrg': {
            var orgs = new OrgsTable(q.args, q.sess_code);
            data = await orgs.insertOrgs();
            if (data[0].id == 0 || data == null || data == undefined) {
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
        //Редактирование организации 
        case 'set_ChangeOrg': {
            var orgs = new OrgsTable(q.args, q.sess_code);
            orgs.updateOrgs();
            wsres.error = null;
            wsres.code = q.sess_code;
            wsres.data = [];
        }
            break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ДОЛЖНОСТЕЙ ОПРЕДЕЛЕННОЙ ОРГАНИЗАЦИИ
        //Получение должностей организации 
        case 'get_Jobs': {
            var jobs = new Jobs_titlesTable(q.args, q.sess_code);
            data = await jobs.selectJobs_title();
            if (data.length > 0) {
                wsres.code = q.sess_code;
                wsres.error = null;
                wsres.data = data;
            }
            else {
                wsres.code = q.sess_code;
                wsres.data = [],
                    wsres.error = 'У организации отсутствуют должности'
            }

        } break;
        //Добавление новой должности
        case 'set_NewJobTitle': {
            var jobs = new Jobs_titlesTable(q.args, q.sess_code);
            data = await jobs.insertJobs_title();
            if (data[0].id == 0 || data == null || data == undefined) {
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

        } break;
        //Обновление должности 
        case 'set_ChangeJobs_Titles': {
            var jobs = new Jobs_titlesTable(q.args, q.sess_code);
            jobs.updateJobs_title();
            wsres.error = null;
            wsres.code = q.sess_code;
            wsres.data = [];
        }
            break;


        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕЙ
        //Добавление пользователя
        case 'set_NewUser': {
            var ut = new UserTable(q.args, q.sess_code);
            data = await ut.insertUser();
            if (data[0].id == 0 || data == null || data == undefined) {
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
        //Получение всех пользователей 
        case 'get_AllUser': {
            var ut = new UserTable(q.args, q.sess_code);
            data = await ut.selectAllUsers();
            wsres.code = q.sess_code;
            wsres.data = data;
            wsres.error = '';
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ГРУПП УСТРОЙСТВ 
        //Добавление новой группы устройства
        case 'set_NewDevGroup': {
            var dg = new Devs_groupsTable(q.args, q.sess_code);
            data = await dg.insertDevsGroups();
            if (data[0].id == 0 || data == null || data == undefined) {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления группы"
            }
            else {
                data = await dg.selectDevsGroups();
                wsres.code = q.sess_code;
                //wsres.data = data;
                wsres.error = null;
            }
        } break;
        //Получение групп устроств по id организации или всех для пользователя
        case 'get_DevsGroups': {
            var dg = new Devs_groupsTable(q.args, q.sess_code);
            data = await dg.selectDevsGroups();
            //console.log(data.length);
            wsres.code = q.sess_code;
            wsres.error = null;
            //console.log(data);
            wsres.data = [data];
            /*
            if (data.length > 0) {
                wsres.code = q.sess_code;
                wsres.error = null;
                wsres.data = data;
            }
            else{wsres.code = q.sess_code; 
                wsres.data = [], 
                wsres.error = 'Список групп устройств отсутсвует';
            }
            */
        } break;
        //редактирование группы по id
        case 'set_ChangeDevsGroups': {
            var dg = new Devs_groupsTable(q.args, q.sess_code);
            data = await dg.updateDevsGroups();
            wsres.code = q.sess_code;
            wsres.error = null;
            wsres.data = [];
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ УСТРОЙСТВ ПО ГРУППЕ УСТРОЙСТВА
        //Добавление нового устройства
        case 'set_NewDevs': {
            var dev = new DevsTable(q.args, q.sess_code);
            data = await dev.insertDevs();

            if (data === null || data === undefined || data[0].id === 0) {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления устройства"
            }
            else {
                //data = await dev.selectDevs();
                wsres.code = q.sess_code;
                //wsres.data = data;
                wsres.data = [];
                wsres.error = null;
            }

        } break;
        //Получение устройств по id группы 

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ/ОБНОВЛЕНИЕ/ПОЛУЧЕНИЕ ПОВЕРОЧНОГО ИНТЕРВАЛА 
        //Добавление/Обновление поверочного интервала 
        case 'set_NewDevPovs': {
            var dev_povs = new Dev_povsTable(q.args, q.sess_code);
            data = await dev_povs.insertDev_povs();
            if (data === null || data === undefined || data[0].id === 0) {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления поверочного интервала"
            }
            else {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = null;
            }

        } break;


        //Получение поверочного интервала 
        case 'get_DevPovs': {
            var dev_povs = new Dev_povsTable(q.args, q.sess_code);
            data = await dev_povs.selectDev_povs();
            wsres.code = q.sess_code;
            wsres.error = null;
            wsres.data = data;

        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ КОНТРОЛЬНОЙ СЕСССИИ 
        case 'set_NewControlDevSess': { 
            var control_dev = new Control_dev_sessTable(q.args, q.sess_code);
            data = await control_dev.insertControl_dev_sess();
            if (data === null || data === undefined || data[0].id === 0) {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = "Ошибка добавления контрольной сессии"
            }
            else {
                wsres.code = q.sess_code;
                wsres.data = [];
                wsres.error = null;
            }
        } break;


        //Изменение устройства
        case 'set_ChangeDevs': {
            var dev = new DevsTable(q.args, q.sess_code);
            dev.updateDevs();
            wsres.error = null;
            wsres.code = q.sess_code;
            wsres.data = [];
        }
            break;


        //------------------------------------------------------------------------ПОЛУЧЕНИЕ ПЕРВОЙ И ПОСЛЕДНЕЙ СЕССИИ 
        case 'get_DevFirstLastSessions': {
            var fl_sess = new Dev_sessTable(q.args, q.sess_code);
            data = await fl_sess.selectFirstLastSess();
            wsres.error = null;
            wsres.code = q.sess_code;
            wsres.data = data;

        }
            break;



        //------------------------------------------------------------------------ПОЛУЧЕНИЕ СЕССИЙ ЗА ОПРЕДЕЛЕННЫЙ ПЕРИОД 

        case 'get_DevSessions': {
            var dev_sess = new Dev_sessTable(q.args, q.sess_code);
            data = await dev_sess.selectDevSess();
            wsres.error = null;
            wsres.code = q.sess_code;
            //console.log(data);
            wsres.data = data;
        }
            break;


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
