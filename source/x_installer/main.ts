
import { DBase, endDB, getDB } from '../xcore/dbase/DBase';
import { dateTimeToStr } from '../xcore/dbase/DateStr';

//Таблицы пользователя
import { users_table, insert_admin } from './sql/users';
import {orgs_table, org_insert_admin} from './sql/orgs';
import {jobs_titles_table, insert_jt_admin} from './sql/jobs_titles';
import {users_roles_table, insert_role} from './sql/users_roles';
import {sessions_table} from './sql/sessions';

//Таблицы сессий
import {dev_sess_table} from './sql/dev_sess';
import {devs_groups_table} from './sql/devs_groups';
import {devs_table} from './sql/devs';
import {info_log_table} from './sql/info_log';
import { dev_povs_table } from './sql/dev_povs';
import { control_dev_sess_table } from './sql/control_dev_sess';


async function run(){
    var db:DBase = getDB();

    var dt = await db.NOW();
    console.log("START INSTALLER", dateTimeToStr(dt));

   
    //Создание таблиц пользователя
    console.log("ADDING TABLE \"orgs\"");
    await db.query(orgs_table.sql);
    console.log("TABLE \"orgs\" ADD");

    console.log("ADDING TABLE \"jobs_titles\"");
    await db.query(jobs_titles_table.sql);
    console.log("TABLE \"jobs_titles\" ADD");

    console.log("ADDING TABLE \"users_roles\"");
    await db.query(users_roles_table.sql);
    console.log("TABLE \"users_roles\" ADD");

    console.log("ADDING TABLE \"sessions\"");
    await db.query(sessions_table.sql);
    console.log("TABLE \"sessions\" ADD");

    console.log("ADDING TABLE \"users\"");
    await db.query(users_table.sql, users_table.args);
    console.log("TABLE \"users\" ADD");

    console.log("ADDING TABLE \"dev_povs\"");
    await db.query(dev_povs_table.sql, users_table.args);
    console.log("TABLE \"dev_povs\" ADD");

    console.log("ADDING TABLE \"control_dev_sess\"");
    await db.query(control_dev_sess_table.sql, control_dev_sess_table.args)
    console.log("TABLE \"control_dev_sess\" ADD");



    //Создание пользователя
    console.log("CREATE ROLE");
    await db.query(insert_role.sql, insert_role.args);
    
    console.log("CREATE ORG");
    await db.query(org_insert_admin.sql, org_insert_admin.args);
    
    console.log("CREATE JOB_TITLE");
    await db.query(insert_jt_admin.sql, insert_jt_admin.args);

    console.log("CREATE USER");
    await db.query(insert_admin.sql, insert_admin.args);

    
    //Создание таблиц устройств и сессий
    console.log("ADDING TABLE \"dev_sess\"");
    await db.query(dev_sess_table.sql, dev_sess_table.args);
    console.log("TABLE \"dev_sess\" ADD");

    console.log("ADDING TABLE \"devs_groups\"");
    await db.query(devs_groups_table.sql, devs_groups_table.args);
    console.log("TABLE \"devs_groups\" ADD");

    console.log("ADDING TABLE \"devs\"");
    await db.query(devs_table.sql, devs_table.args);
    console.log("TABLE \"devs\" ADD");

    console.log("ADDING TABLE \"info_log\"");
    await db.query(info_log_table.sql, info_log_table.args);
    console.log("TABLE \"info_log\" ADD");

    endDB();
    console.log("END INSTALLER");
}

run();
