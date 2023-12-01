import { Router } from "express";
import shows from "../schemas/Shows.js";
import AuthMiddleware from "../middlewares/Auth.js";
import isAdmin from "../middlewares/Admin.js";
import Multer from "../middlewares/Multer.js";

const router = new Router();

//POST Arquivo
router.post("/", [AuthMiddleware, isAdmin], (req, res) => {
  const {
    title,
    cast,
    country,
    dateAddedtoPlatform,
    releaseYear,
    seasons,
    rating,
    genres,
  } = req.body;

  shows
    .create({
      title,
      cast,
      country,
      dateAddedtoPlatform,
      releaseYear,
      seasons,
      rating,
      genres,
    })
    .then((shows) => {
      res.status(200).send(shows);
    })
    .catch((error) => {
      console.error("Error trying to save project", error);
      res.status(400).send({
        error:
          "It wasnt possible to save your data, please check everything and try again",
      });
    });
});

//POST IMAGEM usando Id
router.post(
  "/featured-image/:showsId",
  [AuthMiddleware, Multer.single("featuredImage"), isAdmin],
  (req, res) => {
    const { file } = req;
    if (file) {
      shows
        .findByIdAndUpdate(
          req.params.showsId,
          {
            $set: {
              featuredImage: file.path,
            },
          },
          { new: true }
        )
        .then((shows) => {
          res.send({ shows });
        })
        .catch((error) => {
          console.error("Erro ao associar imagem ao projeto", error);
          res.status(500).send({ error: "Ocorreu um erro tente novamente" });
        });
    } else {
      res.status(400).send({ error: "Nenhuma imagem enviada" });
    }
  }
);

//GET Arquivo usando title
router.get("/", AuthMiddleware, (req, res) => {
  shows
    .findOne({ title: req.body.title })
    .then((shows) => {
      res.send(shows);
    })
    .catch((error) => {
      console.error("Erro ao procurar dados", error);
      res.status(400).sendl({
        error: "Não foi possível obter os dados do projeto, tente novamente",
      });
    });
});

//PUT Arquivo usando Id - arrumar isAdmin
router.put("/:showsId", [AuthMiddleware, isAdmin], (req, res) => {
  const {
    title,
    cast,
    country,
    dateAddedtoPlatform,
    releaseYear,
    rating,
    genres,
    seasons,
  } = req.body;

  shows
    .findByIdAndUpdate(
      req.params.showsId,
      {
        title,
        cast,
        country,
        dateAddedtoPlatform,
        releaseYear,
        rating,
        genres,
        seasons,
      },
      { new: true }
    )
    .then((shows) => {
      res.status(200).send(shows);
    })
    .catch((error) => {
      console.error("Error trying to save project to DB", error);
      res.status(400).send({
        error:
          "It wasnt possible to save your data, please check everything and try again",
      });
    });
});

//DELETE Arquivo - arrumar isAdmin
router.delete("/:showsId", [AuthMiddleware, isAdmin], (req, res) => {
  shows
    .findOneAndDelete({ _id: req.params.showsId })
    .then(() => {
      res.send({ message: "Projeto removido com sucesso" });
    })
    .catch((error) => {
      console.error("Erro ao remover projeto do banco de dados", error);
      res
        .status(400)
        .send({ message: "Erro ao remover projeto, tente novamente" });
    });
});

export default router;
