import { WSQuery } from "../../../xcore/WSQuery";
import { APP_STORAGE } from "../storage/AppStorage";
import { BASE_URL } from "../../utils/consts";

export { WSQuery, IWSQuery } from "../../../xcore/WSQuery";
class Api {
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  // Обработка ответа сервера
  _checkResponse(res: any) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  // Общий запрос
  async fetch(data: WSQuery) {
    const res = await fetch(`${this._baseUrl}/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dt = await this._checkResponse(res);
    return await APP_STORAGE.onWSData(dt);
  }
  // fetch(data: WSQuery) {
  //   return fetch(`${this._baseUrl}/api`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //     .then(this._checkResponse)
  //     .then((dt) => APP_STORAGE.onWSData(dt));
  // }
}

export const api = new Api(`http://${BASE_URL.host}:${BASE_URL.port}`);
