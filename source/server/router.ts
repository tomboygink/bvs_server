import crypto from 'crypto'
import { CONFIG } from '../xcore/config'
import { UserTable } from '../xcore/dbase/Users';
import { SessionsTable } from '../xcore/dbase/Sessions';
import { OrgsTable } from '../xcore/dbase/Orgs'
import { Jobs_titlesTable } from '../xcore/dbase/Jobs_titles'
import { Devs_groupsTable } from '../xcore/dbase/Devs_groups'
import { DevsTable } from '../xcore/dbase/Devs';
import { Dev_povsTable } from '../xcore/dbase/Dev_Povs';
import { Control_dev_sessTable } from '../xcore/dbase/Control_dev_sess';
import { Dev_sessTable } from '../xcore/dbase/Dev_sess';
import { SchemeSvgTable } from '../xcore/dbase/SchemeSvg';
import { SendMail } from '../xcore/mailer/sendMail'
import { SchemeThermoStreamerSvgTable } from '../xcore/dbase/Scheme_Thermostreamer_Svg';


var res: any = {
    cmd: '',
    error: '',
    data: [],
    code: '',
};

export async function router(body: any) {




    var sess_code = null;
    var data = null;
    switch (body.cmd) {
        //------------------------------------------------------------------------АВТОРИЗАЦИЯ
        // Авторизация по логину и паролю 
        case 'get_UserByAuth': {
            var ut = new UserTable(body.args, body.sess_code);
            var st = new SessionsTable(body.args);
            // Авторизация по логину и паролю
            sess_code = await st.insertSess();
            //Генерация кода сессии, запись в бд
            data = await ut.selectUser();



            if (sess_code === '' && data[0] === undefined) {
                res.cmd = body.cmd;
                res.code = null;
                res.data = null;
                res.error = "Пользователя не существует или введены не верные данные;";
            }
            else {
                res.cmd = body.cmd;
                res.code = sess_code;
                res.error = null;
                res.data = data;
            }




        } break;
        //Авторизация по коду сессии
        case 'get_UserBySessionCode': {
            var st = new SessionsTable(body.args);
            var ut = new UserTable(body.args, body.sess_code);
            var code = await st.selectSessCode();
            data = await ut.selectUserBySessCode();

            if (code[0] == undefined) {
                res.cmd = body.cmd;
                res.code = null;
                res.data = null;
                res.error = "Данного кода сессии не существует";
            }
            else {

                res.cmd = body.cmd;
                res.code = code[0].sess_code;
                res.error = null;
                res.data = data;
            }
        } break;
        //------------------------------------------------------------------------ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЕМ
        //Смена данных пользователя
        case 'set_CUserData': {
            ut = new UserTable(body.args, body.sess_code);
            data = await ut.updateUser();
            if (data[0] === undefined) {
                res.cmd = body.cmd;
                res.code = null;
                res.data = null;
                res.error = "Пользователя не существует";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = data;
                res.error = null;
            }
        } break;
        //Смена пароля пользователя
        case 'set_ChangePass': {
            ut = new UserTable(body.args, body.sess_code);
            data = await ut.selectUserLoginEmail();

            //console.log(data);
            var old_pass = crypto.createHmac('sha256', CONFIG.key_code).update(body.args.old_password).digest('hex');
            var pass = crypto.createHmac('sha256', CONFIG.key_code).update(body.args.new_password).digest('hex');

            if (data[0].password === pass) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Новый пароль не должен повторять старый";
                break;
            }
            if (body.args.login === body.args.new_password) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Пароль не должен совпадать с логином";
                break;
            }
            if (data[0].password !== old_pass) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Старый пароль не верен";
                break;
            }
            data = await ut.changePass();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data;
            res.error = null;
        } break;
        //------------------------------------------------------------------------АКТИВАЦИЯ ПОЧТЫ
        //отправка сообщения на почту с кодом
        case 'set_ActMail': {
            if (body.args.email !== '') {
                var sendMail = new SendMail(body.args, body.sess_code);
                sendMail.sendConfirmMail();
            } else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Введите email";
            }
        } break;
        //Обновление данных пользователя о email
        case 'set_MailCode': {
            ut = new UserTable(body.args, body.sess_code);
            data = await ut.updateMail();
            //Получаем пользователя
            if (data[0] === undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Введен неверный код";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = await ut.updateMail();
                res.error = null;
            }
        } break;
        //------------------------------------------------------------------------ЗАБЫЛИ ПАРОЛЬ
        //Отправка на почту кода re_pass_code
        case 'set_ForgPass': {
            ut = new UserTable(body.args, body.sess_code);
            sendMail = new SendMail(body.args, body.sess_code);
            data = await ut.selectUserLoginEmail();

            if (data[0] == undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Такого email не существует, проверте введенные данные или обратитесть к администратору системы";
            }
            else {
                if (data[0].act_mail === true) { sendMail.sendRePassword(); }
                else {
                    res.cmd = body.cmd;
                    res.code = body.sess_code;
                    res.data = null;
                    res.error = "Данный email не был подтвержден, обращайтесь к администратору системы";
                }
            }
        } break;
        //Обновление пароля и смена кода re_pass_code
        case 'set_SaveNewPass': {
            ut = new UserTable(body.args, body.sess_code);
            data = await ut.selectUserLoginEmail();
            if (body.args.code !== data[0].re_password_code) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Код подтверждения неверен, проверте правильность введеного кода";
            }
            else {
                ut = new UserTable(body.args, body.sess_code);
                ut.forgPass();
            }
        } break;


        //------------------------------------------------------------------------РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ АДМИНИСТРАТОРОМ 
        case 'set_ChangeUser': {
            ut = new UserTable(body.args, body.sess_code);
            await ut.updateUserAdmin();
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ОРГАНИЗАЦИЙ
        //Получение всех организаций
        case 'get_Org': {
            var orgs = new OrgsTable(body.args, body.sess_code);
            data = await orgs.selectOrgs();
            if (data.length > 0) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = data;
                res.error = null;
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Организации отсутвуют";
            }
        }
            break;

        //Добавление новой организации
        case 'set_NewOrg': {
            var orgs = new OrgsTable(body.args, body.sess_code);
            data = await orgs.insertOrgs();
            if (data[0].id == 0 || data == null || data == undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления организации";
            }
            else {
                data = await orgs.selectOrgs();
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = data;
                res.error = null;
            }
        } break;
        //Редактирование организации 
        case 'set_ChangeOrg': {
            var orgs = new OrgsTable(body.args, body.sess_code);
            orgs.updateOrgs();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null;
            res.error = null;
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ДОЛЖНОСТЕЙ ОПРЕДЕЛЕННОЙ ОРГАНИЗАЦИИ
        //Получение должностей организации 
        case 'get_Jobs': {
            var jobs = new Jobs_titlesTable(body.args, body.sess_code);
            data = await jobs.selectJobs_title();
            if (data.length > 0) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = data;
                res.error = null;
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "У организации отсутствуют должности";
            }

        } break;
        //Добавление новой должности
        case 'set_NewJobTitle': {
            var jobs = new Jobs_titlesTable(body.args, body.sess_code);
            data = await jobs.insertJobs_title();
            if (data[0].id == 0 || data == null || data == undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления должности";
            }
            else {
                data = await jobs.selectJobs_title();
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = data;
                res.error = null;
            }

        } break;
        //Обновление должности 
        case 'set_ChangeJobs_Titles': {
            var jobs = new Jobs_titlesTable(body.args, body.sess_code);
            jobs.updateJobs_title();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null;
            res.error = null;
        } break;


        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЕЙ
        //Добавление пользователя
        case 'set_NewUser': {
            var ut = new UserTable(body.args, body.sess_code);
            data = await ut.insertUser();
            if (data[0].id == 0 || data == null || data == undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления пользователя";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }

        } break;
        //Получение всех пользователей 
        case 'get_AllUser': {
            var ut = new UserTable(body.args, body.sess_code);
            data = await ut.selectAllUsers();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data;
            res.error = null;
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ ГРУПП УСТРОЙСТВ 
        //Добавление новой группы устройства
        case 'set_NewDevGroup': {
            var dg = new Devs_groupsTable(body.args, body.sess_code);
            data = await dg.insertDevsGroups();

            if (data[0].id == 0 || data == null || data == undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления группы";
            }
            else {
                data = await dg.selectDevsGroups();
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }
        } break;
        //Получение групп устроств по id организации или всех для пользователя
        case 'get_DevsGroups': {
            var dg = new Devs_groupsTable(body.args, body.sess_code);
            data = await dg.selectDevsGroups();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data; // возможно [data]
            res.error = null;

        } break;
        //редактирование группы по id
        case 'set_ChangeDevsGroups': {
            var dg = new Devs_groupsTable(body.args, body.sess_code);
            data = await dg.updateDevsGroups();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null; // возможно [data]
            res.error = null;
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ И ПОЛУЧЕНИЕ УСТРОЙСТВ ПО ГРУППЕ УСТРОЙСТВА
        //Добавление нового устройства
        case 'set_NewDevs': {
            var dev = new DevsTable(body.args, body.sess_code);
            data = await dev.insertDevs();
            await dev.delete_duplicate();
            if (data === null || data[0] === undefined) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления устройства";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }

        } break;
        //Получение устройств по id группы 

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ/ОБНОВЛЕНИЕ/ПОЛУЧЕНИЕ ПОВЕРОЧНОГО ИНТЕРВАЛА 
        //Добавление/Обновление поверочного интервала 
        case 'set_NewDevPovs': {
            var dev_povs = new Dev_povsTable(body.args, body.sess_code);
            data = await dev_povs.insertDev_povs();
            if (data === null || data === undefined || data[0].id === 0) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления поверочного интервала";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }

        } break;


        //Получение поверочного интервала 
        case 'get_DevPovs': {
            var dev_povs = new Dev_povsTable(body.args, body.sess_code);
            data = await dev_povs.selectDev_povs();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data;
            res.error = null;
        } break;

        //------------------------------------------------------------------------ДОБАВЛЕНИЕ КОНТРОЛЬНОЙ СЕСССИИ 
        case 'set_NewControlDevSess': {
            var control_dev = new Control_dev_sessTable(body.args, body.sess_code);
            data = await control_dev.insertControl_dev_sess();
            if (data === null || data === undefined || data[0].id === 0) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Ошибка добавления контрольной сессии";
            }
            else {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = body.args.dev_sess_id;
                res.error = null;
            }
        } break;

        //------------------------------------------------------------------------УДАЛЕНИЕ КОНТРОЛЬНОЙ СЕСССИИ 
        case 'deleteControlDevSess': {
            var deleteControlDevSess = new Control_dev_sessTable(body.args, body.sess_code);
            deleteControlDevSess.deleteControl_dev_sess();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null;
            res.error = null;
        } break;


        //Изменение устройства
        case 'set_ChangeDevs': {
            var dev = new DevsTable(body.args, body.sess_code);
            data = await dev.updateDevs();

            if (data === true) {
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = null;
            }
            else{
                res.cmd = body.cmd;
                res.code = body.sess_code;
                res.data = null;
                res.error = "Произошла ошибка редактирования"
            }

        } break;


        //------------------------------------------------------------------------ПОЛУЧЕНИЕ ПЕРВОЙ И ПОСЛЕДНЕЙ СЕССИИ 
        case 'get_DevFirstLastSessions': {
            var fl_sess = new Dev_sessTable(body.args, body.sess_code);
            data = await fl_sess.selectFirstLastSess();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data;
            res.error = null;
        } break;



        //------------------------------------------------------------------------ПОЛУЧЕНИЕ СЕССИЙ ЗА ОПРЕДЕЛЕННЫЙ ПЕРИОД 

        case 'get_DevSessions': {
            var dev_sess = new Dev_sessTable(body.args, body.sess_code);
            data = await dev_sess.selectDevSess();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = data;
            res.error = null;
        } break;


        //------------------------------------------------------------------------ДОБАВЛЕНИЕ СХЕМЫ ПРОЕКТА 
        case 'set_SchemeSvg': {
            var schemeSvg = new SchemeSvgTable(body.args);
            await schemeSvg.insertSchemeSVG();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null;
            res.error = null;
        } break;

        
        //------------------------------------------------------------------------ДОБАВЛЕНИЕ СХЕМЫ ТЕРМОКОСЫ 
        case 'set_ThermoStreamer_Svg': {
            var schemeThermoStreamerSvg = new SchemeThermoStreamerSvgTable(body.args);
            await schemeThermoStreamerSvg.insertSchemeThermoStreamerSVG();
            res.cmd = body.cmd;
            res.code = body.sess_code;
            res.data = null;
            res.error = null;
        } break;

        


        //------------------------------------------------------------------------УДАЛЕНИЕ КУКОВ ПОСЛЕ ВЫХОДА
        case 'deleteCookie': {
            st = new SessionsTable(body.args);
            st.deleteSess();

            res.cmd = body.cmd;
            res.code = '';
            res.data = null;
            res.error = null;
        } break;





        //------------------------------------------------------------------------ДРУГИЕ КОДЫ КОТОРЫЕ НЕ ПРОПИСАННЫ
        default: {
            res.cmd = body.cmd;
            res.code = null;
            res.data = null;
            res.error = `Команда "${body.cmd}" не распознана`;
        } break;

    }
    return JSON.stringify(res)
}
