import WebSocket from 'ws';
import { IWSQuery, IWSResult, WSResult, WSStr } from '../xcore/WSQuery';

//import { ProjectsTable } from '../xcore/dbase/ProjectsTable';
import { SessionsTable } from '../xcore/dbase/Sessions';
import { UserTable } from '../xcore/dbase/Users';

export async function WSRoute(_ws: WebSocket, q: IWSQuery) {
    // начало - создание ответа
    var wsres: IWSResult = new WSResult(q.cmd);


    console.log(q);

    var sess_code;
    var data;


    // обработка данных
    switch (q.cmd) {
        // Авторизация по коду сессии
        // Возвращает пользователя и код сессии
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
        // Создается код сессии записывается в бд 
        // Возвращает пользователя и код сессии
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

        case 'set_CUserData': {
            ut = new UserTable(q.args, q.sess_code);
            data = await ut.updateUser();
            if (data[0] === undefined) { wsres.error = "Пользователя не существует"; }
            else { wsres.data = data; wsres.code = q.sess_code }
        } break;


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
                wsres.data = await ut.changePass();
                wsres.code = q.sess_code;
            }     

        } break;

        case 'deleteCookie': {
            st = new SessionsTable(q.args);
            st.deleteSess();
            wsres.code = '';
            wsres.data = [];
        } break;

        //другие коды которые не описаны 
        default: {
            wsres.error = `Команда "${q.cmd}" не распознана`;
        } break;

    }

    // финал - отправка ответа
    _ws.send(WSStr(wsres));
}



