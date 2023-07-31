import { IWSQuery } from '../../../xcore/WSQuery';
/**
 * Класс управления web-сокетом на клиенте
 */
export declare class WSocket {
    static __this: WSocket;
    socket: WebSocket;
    isConnected: boolean;
    /**
     * Конструктор
     * для получения экземпляра объекта лучше использовать статический метод get()
     */
    constructor();
    connect(): Promise<void>;
    __wait(): Promise<void>;
    /**
     * Статический метод, который гарантирует, что в приложении будет единственный экземпляр объекта
     * Использовать вместо конструктора.
     * @returns
     */
    static get(): Promise<WSocket>;
    /**
     * Обработчик поступления сообщения
     * @param socket
     * @param event
     */
    onMessage(socket: WebSocket, event: MessageEvent<any>): void;
    /**
     * Отправка сообщения на сервер
     * @param data
     */
    send(data: IWSQuery): Promise<void>;
}
