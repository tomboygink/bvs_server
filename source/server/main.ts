import path from "path";
import express from "express";
import http from "http";
import hbs from "hbs";
import bodyParser from "body-parser";
import cors from "cors";

import { CONFIG } from "../xcore/config";
import { router } from "./router";

class AppServer {
  app: express.Express = null;
  server: http.Server = null;
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.app.set("view engine", "hbs");

    console.log(path.normalize(path.join(__dirname, "..", "..", "views")));

    this.app.set(
      "views",
      path.normalize(path.join(__dirname, "..", "..", "views"))
    ); // путь к шаблонам
    hbs.registerPartials(
      path.normalize(path.join(__dirname, "..", "..", "views", "partials"))
    ); // путь к частичным представлениям

    this.app.use(
      "/static",
      express.static(path.normalize(path.join(__dirname, "..", "..", "public")))
    ); // статика
  }

  run() {
    if (this.app === null) return;
    if (this.server === null) return;

    this.route();
    this.server.listen(CONFIG.port, () => {
      console.log(`Слушаю порт ${CONFIG.port}`);
    });
  }
  route() {
    //Отрисовка шаблонизатора
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.render("index.hbs", { title: "Система визуализации СДС" });
    });

    this.app.get(
      "/confirm_mail",
      (req: express.Request, res: express.Response) => {
        res.render("confirm_mail.hbs", {
          title: "Подтверждение электронной почты",
        });
      }
    );

    this.app.get(
      "/forgot_pass",
      (req: express.Request, res: express.Response) => {
        res.render("forgot_pass.hbs", {
          title: "Восстановление пароля",
        });
      }
    );

    this.app.get("/show-map", (req: express.Request, res: express.Response) => {
      res.render("show-map.hbs", {
        title: "Устройство на карте",
      });
    });

    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.app.post(
      "/api",
      cors(),
      async (req: express.Request, res: express.Response) => {
        console.log("req.metod ", req.method);
        console.log("req.body", req.body);
        res.send(await router(req.body));
      }
    );
  }
}

var app = new AppServer();
app.run();
