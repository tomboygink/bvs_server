
import { DBase, endDB, getDB } from '../xcore/dbase/DBase';
import { dateTimeToStr } from '../xcore/dbase/DateStr';

import { users_table, insert_admin } from './sql/users';
import {orgs_table, org_insert_admin} from './sql/orgs';
import {jobs_titles_table, insert_jt_admin} from './sql/jobs_titles';
import {users_roles_table, insert_role} from './sql/users_roles';

import {sessions_table} from './sql/sessions';

async function run(){
    var db:DBase = getDB();

    var dt = await db.NOW();
    console.log("START INSTALLER", dateTimeToStr(dt));

    /////
    /*
    
    await db.query(insert_admin.sql, insert_admin.args);
    */

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


    
    console.log("CREATE ROLE");
    await db.query(insert_role.sql, insert_role.args);
    
    console.log("CREATE ORG");
    await db.query(org_insert_admin.sql, org_insert_admin.args);
    
    console.log("CREATE JOB_TITLE");
    await db.query(insert_jt_admin.sql, insert_jt_admin.args);

    console.log("CREATE USER");
    await db.query(insert_admin.sql, insert_admin.args);



    endDB();
    console.log("END INSTALLER");
}

run();
