import { CONFIG } from '../../../xcore/config';
import { IWSQuery, WSStr } from '../../../xcore/WSQuery';
import { APP_STORAGE } from './AppStorage';
import { toJS } from 'mobx';



/**
 * Класс управления web-сокетом на клиенте
 */
export class WSocket {

    // экземпляр объекта данного класса (один для клиента)
    public static __this:WSocket = null;

    // web-сокет
    socket:WebSocket = null;

    isConnected:boolean = false;

    /**
     * Конструктор
     * для получения экземпляра объекта лучше использовать статический метод get()
     */
    constructor(){
        // создание сокета
        // this.socket = new WebSocket(`ws://${CONFIG.host}:${CONFIG.port}`);

        WSocket.__this = this;

        /*
        // открытие сокета
        this.socket.onopen = function(e){
            WSocket.__this.isConnected = true;
        };

        this.socket.onclose = function(e){
            WSocket.__this.isConnected = false;
        };
        */
    }

    async connect(){
        if(this.isConnected) return;

        this.socket = new WebSocket(`ws://${CONFIG.host}:${CONFIG.port}`);

        // открытие сокета
        this.socket.onopen = function(e){
            WSocket.__this.isConnected = true;
        };

        // при закрытии сокета
        this.socket.onclose = function(e){
            WSocket.__this.isConnected = false;
        };

        var wh = true;
        while(wh){
            await this.__wait();
            wh = !this.isConnected;
        }
    }

    async __wait(){
        await new Promise( (resolve)=>{ setTimeout( ()=>{ resolve(true); }, 500); } );
        return;
    }

    /**
     * Статический метод, который гарантирует, что в приложении будет единственный экземпляр объекта
     * Использовать вместо конструктора.
     * @returns 
     */
    public static async get():Promise<WSocket>{
        var ws = WSocket.__this;
        if(ws === null) ws = new WSocket();
        await ws.connect();
        /*
        if(!ws.isConnected){
            var wh = true;
            while(wh){
                await ws.__wait();
                wh = !ws.isConnected;
            }
        }
        */
        return ws;
    }

    /**
     * Обработчик поступления сообщения
     * @param socket 
     * @param event 
     */
   
    
    /**
     * Отправка сообщения на сервер
     * @param data 
     */
    //send(data: string | ArrayBufferLike | Blob | ArrayBufferView):void{
    async send(data: IWSQuery){
        await this.connect();
        this.socket.send(WSStr(data));
    }

}
