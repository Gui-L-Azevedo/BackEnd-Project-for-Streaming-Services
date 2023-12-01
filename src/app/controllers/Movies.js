import { Router } from "express";
import movies from "../schemas/Movies.js";
import AuthMiddleware from "../middlewares/Auth.js";
import isAdmin from "../middlewares/Admin.js";
import Multer from "../middlewares/Multer.js";

const router = new Router();

//POST Arquivo
router.post("/", [AuthMiddleware, isAdmin], (req, res) => {
  const {
    title,
    directors,
    cast,
    dateAddedtoPlatform,
    releaseYear,
    duration,
    rating,
    genres,
  } = req.body;

  movies
    .create({
      title,
      directors,
      cast,
      dateAddedtoPlatform,
      releaseYear,
      duration,
      rating,
      genres,
    })
    .then((movies) => {
      res.status(200).send(movies);
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
  "/featured-image/:moviesId",
  [AuthMiddleware, Multer.single("featuredImage"), isAdmin],
  (req, res) => {
    const { file } = req;
    if (file) {
      movies
        .findByIdAndUpdate(
          req.params.moviesId,
          {
            $set: {
              featuredImage: file.path,
            },
          },
          { new: true }
        )
        .then((movies) => {
          res.send({ movies });
        })
        .catch((error) => {
          console.error("Erro ao associar imagem ao projeto", erro);
          res.status(500).send({ error: "Ocorreu um erro tente novamente" });
        });
    } else {
      res.status(400).send({ error: "Nenhuma imagem enviada" });
    }
  }
);

//GET Arquivo usando title
router.get("/", AuthMiddleware, (req, res) => {
  movies
    .findOne({ title: req.body.title })
    .then((movies) => {
      res.send(movies);
    })
    .catch((error) => {
      console.error("Erro ao procurar dados", error);
      res.status(400).sendl({
        error: "Não foi possível obter os dados do projeto, tente novamente",
      });
    });
});

//PUT Arquivo usando Id
router.put("/:moviesId", [AuthMiddleware, isAdmin], (req, res) => {
  const {
    title,
    directors,
    cast,
    dateAddedtoPlatform,
    releaseYear,
    duration,
    rating,
    genres,
  } = req.body;

  movies
    .findByIdAndUpdate(
      req.params.moviesId,
      {
        title,
        directors,
        cast,
        dateAddedtoPlatform,
        releaseYear,
        duration,
        rating,
        genres,
      },
      { new: true }
    )
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => {
      console.error("Error trying to save project to DB", error);
      res.status(400).send({
        error:
          "It wasnt possible to save your data, please check everything and try again",
      });
    });
});

//DELETE Arquivo
router.delete("/:moviesId", [AuthMiddleware, isAdmin], (req, res) => {
  movies
    .findOneAndDelete({ _id: req.params.moviesId })
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
