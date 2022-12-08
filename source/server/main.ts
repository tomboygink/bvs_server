import path from 'path';

import express from 'express';

import http from 'http';
import net from 'net';
import WebSocket from 'ws';

import hbs from 'hbs';
import { DBase, endDB, getDB } from '../xcore/dbase/DBase';
import { CONFIG } from '../xcore/config';
import { WSRoute } from './WSRouter';

class AppServer{
    
    app:express.Express = null;
    server:http.Server = null;
    wss:WebSocket.Server = null;

    DB:DBase = null;

    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });

        this.app.set('view engine', 'hbs');

        this.app.set('views', path.normalize(path.join(__dirname, '..', '..', 'views')) ); // путь к шаблонам
        hbs.registerPartials( path.normalize(path.join(__dirname, '..', '..', 'views', 'partials')) ); // путь к частичным представлениям

        this.app.use( '/static', express.static( path.normalize(path.join(__dirname, '..', '..', 'public')) ) ); // статика

        this.DB = getDB();
        this.DB.NOW();
        this.server.on("close", ()=>{ this.onCloseServer(); });
    }

    /**
     * Запуск сервера
     * @returns void
     */
    run(){
        if(this.app === null) return;
        if(this.server === null) return;
        if(this.wss === null) return;

        this.route();

        this.wss.on('connection', (_ws:WebSocket)=>{ 

            // при получении данных от сокета
            _ws.on('message', (message: string) => { try {WSRoute(_ws, JSON.parse(message));}catch{} }); 

        });

        this.server.listen(process.env.PORT || CONFIG.port, () => {
            var addr:net.AddressInfo | string = this.server.address();
            var family = (typeof addr === 'string') ? "IP4" : addr.family;
            var address = (typeof addr === 'string') ? "none" : addr.address;
            var port = (typeof addr === 'string') ? "none" : addr.port;
            var out_res = (typeof addr === 'string') ? 'http://127.0.0.1' : `${family} ${address}${port}`;
            console.log(`Server started on http://127.0.0.1:${port} -- ${out_res})`);
        });
            
    }

    /**
     * Маршрутизация на сервере
     */
    route(){
        this.app.all("/", (req:express.Request, res:express.Response)=>{
            res.render('index.hbs', { title: "---" });
        });

        this.app.all("/confirm_mail", (req:express.Request, res:express.Response)=>{
            res.render('confirm_mail.hbs', {title:"Подтверждение почты"});
        });

        this.app.all("/forgot_pass", (req:express.Request, res:express.Response)=>{
            res.render('forgot_pass.hbs', {title:"Восстановление пароля"});
        });

        this.app.all('/quit', (req:express.Request, res:express.Response)=>{ res.send('QUIT SERVER'); this.server.close(); });
    }
    
   


     

    async onCloseServer(){
        await endDB();
    }

    
}


var app = new AppServer();
app.run();
