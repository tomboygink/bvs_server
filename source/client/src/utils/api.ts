import { WSQuery } from "../../../xcore/WSQuery";
import { APP_STORAGE } from "../storage/AppStorage";

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
  fetch(data: WSQuery) {
    return fetch(`${this._baseUrl}/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .then((dt) => APP_STORAGE.onWSData(dt));
  }
}

export const api = new Api("http://localhost:3041");
