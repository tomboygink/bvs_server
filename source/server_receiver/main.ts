console.log("Hello server receiver");
import net from 'net';

//Импорт парсера
import { ServerData } from "./datas"

export class Server_Receiver {

    debug: boolean;
    timeout: number;
    host: string;
    port: number;
    server: net.Server;
    scount: number;

    constructor() {
        this.debug = true;
        this.timeout = 10000;
        this.host = "0.0.0.0";
        this.port = 3041;
        this.server = net.createServer();
        this.scount = 0;
    }

    async startServer() {
        //Количество подключений
        this.server.maxConnections = 200;

        this.server.on('connection', async (socket: net.Socket) => {
            socket.setTimeout(this.timeout);
            socket.on('timeout', () => {
                if (this.debug) { console.log("socket timeout"); }
                if (!socket.connecting) { return; }
                socket.end();
            });


            var s_ind = this.scount;
            this.scount++;
            if (this.scount > 2400000) this.scount = 0;

            //Если произошла ошибка
            socket.on('error', (err) => { console.log(err); });

            //При отключении клиента
            socket.on('close', () => {
                if (this.debug) console.log(s_ind, " - Clent socket closed!");
                if (!socket.connecting) socket.end();
                socket.destroy();
            });

            //При получении данных
            socket.on('data', (data) => {
                //ошибка данных 
                //console.log(Buffer.from(data).toString());

                var data_str = Buffer.from(data).toString().trim();

                console.log("\x1B[37m", data_str);


                if (data_str.length > 500) {
                    data_str = data_str.substr(0, 500);
                    socket.write('505', () => { if (this.debug) console.log(s_ind, " << !505!"); });

                    socket.end();
                } else {
                    if (data_str[1] + data_str[2] + data_str[3] + data_str[4] === 'Time'|| data_str[0] + data_str[1]==='10'|| data_str[1] + data_str[2] + data_str[3] + data_str[4] === 'TEST') {

                        if (data_str.length < 1) { socket.write('25', () => { if (this.debug) console.log(s_ind, " << !25!"); }); return; }
                        if (data_str === "10") { socket.write('30', () => { if (this.debug) console.log(s_ind, " << 10 -> !30!"); }); return; }
                        if (data_str.trim() === 'TEST') { socket.write('TEST - OK', () => { if (this.debug) console.log(s_ind, " << TEST -> !TEST - OK!"); }); return; }
                        socket.write('20', () => { if (this.debug) console.log(s_ind, " << !20!"); });
                    }
                    else{socket.end();}

                }

                //отправляем на парсер
                var srv_datas: ServerData = new ServerData(data_str, s_ind);
                srv_datas.Run();

            });



        });



        this.server.listen(this.port, this.host, () => {
            console.log("Слушаю порт", this.port);
            console.log("Готов к приему данных");
        });

    }
}

var server = new Server_Receiver();
server.startServer();