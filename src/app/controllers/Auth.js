import { Router } from "express";
import bcrypt from "bcryptjs";
import authConfig from "../../config/Auth.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Mailer from "../../modules/Mailer.js";
import User from "../schemas/User.js";

const router = new Router();

const generateToken = (params) => {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
};

router.post("/register", (req, res) => {
  //registro de usuario
  const { email, name, password } = req.body;

  User.findOne({ email })
    .then((userData) => {
      //cai no then mesmo se nao tiver o email no BD, o then cai se a operacao for bem sucedida
      if (userData) {
        return res.status(400).send({ error: "User already exists" });
      } else {
        User.create({ name, email, password })
          .then((user) => {
            user.password = undefined;
            return res.send({ user });
          })
          .catch((error) => {
            console.error("Erro ao salvar usuario", error);
            return res.status(400).send({ error: "Registration  failed" });
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao consultar usuario no banco de dados", err);
      return res.status(500).send({ error: "Registration Failed" });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              const token = generateToken({
                uid: user.id,
                administrador: user.administrador,
              });
              return res.send({ token: token, tokenExpiration: "1d" });
            } else {
              return res.status(400).send({ error: "Invalid Password" });
            }
          })
          .catch((error) => {
            console.error("Erro ao verificar senha", error);
            return res.status(500).send({ error: "Internal server error" });
          });
      } else {
        return res.status(404).send({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Erro ao logar", error);
      return res.status(500).send({ error: "Internal server error" });
    });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const token = crypto.randomBytes(20).toString("hex");
        const expiration = new Date();
        expiration.setHours(new Date().getHours() + 1); //diz que o usuario tem 1 hora para utilizar o token

        User.findByIdAndUpdate(user.id, {
          $set: {
            passwordResetToken: token,
            passwordResetTokenExpiration: expiration,
          },
        })
          .then(() => {
            Mailer.sendMail(
              {
                to: email,
                from: "webmaster@testeexpress.com",
                template: "auth/forgot-password",
                context: { token },
              },
              (error) => {
                if (error) {
                  console.error("Erro ao enviar o email", error);
                  return res
                    .status(400)
                    .send({ error: "Error sending the recovery email" });
                } else {
                  return res.send();
                }
              }
            );
          })
          .catch((error) => {
            console.error(
              "Erro ao salvar o token de recuperacao de senha",
              error
            );
            return res.status(500).send({ error: "Internal server error" });
          });
      } else {
        return res.status(404).send({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Erro ao esquecer a senha (??)", error);
      return res.status(500).send({ error: "Internal server error" });
    });
});

router.post("/reset-password", (req, res) => {
  const { email, token, newPassword } = req.body;

  User.findOne({ email })
    .select("+passwordResetToken passwordResetTokenExpiration")
    .then((user) => {
      if (user) {
        if (
          token != user.passwordResetToken ||
          new Date().now > user.passwordResetTokenExpiration
        ) {
          return res.status(400).send({ error: "Invalid Token" });
        } else {
          user.passwordResetToken = undefined;
          user.passwordResetTokenExpiration = undefined;
          user.password = newPassword;

          user
            .save()
            .then(() => {
              res.send({ message: "Senha trocada com sucesso" });
            })
            .catch((error) => {
              console.error("Erro ao salvar nova senha", error);
              return res.status(500).send({ error: "Internal Server Error" });
            });
        }
      } else {
        return res.status(404).send({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Erro ao esquecer a senha (??)", error);
      return res.status(500).send({ error: "Internal server error" });
    });
});

export default router;
