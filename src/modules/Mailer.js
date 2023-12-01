import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import mailConfig from "../config/mail.js";

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: mailConfig.auth,
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialDir: "./src/resources/mail",
      layoutDir: "./src/resources/mail",
      defaultLayout: null,
    },
    viewPath: path.resolve("./src/resources/mail"),
    extName: ".html",
  })
);

export default transport;
