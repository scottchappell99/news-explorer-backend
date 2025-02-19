const Article = require("../models/article");
const { BadRequestError } = require("../utils/errors/BadRequestError");
const { ForbiddenError } = require("../utils/errors/ForbiddenError");
const { NotFoundError } = require("../utils/errors/NotFoundError");

// GET articles
const getArticles = (req, res, next) => {
  const user = req.user._id;

  Article.find({ owner: user })
    .then((articles) => res.send(articles))
    .catch((err) => {
      next(err);
    });
};

// POST new saved article
const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "Validation Error") {
        next(new BadRequestError("Invalid Data."));
      } else {
        next(err);
      }
    });
};

// DELETE an article by id
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You are not authorized to unlike this article.")
        );
      }
      return article
        .deleteOne()
        .then(() => res.send({ message: "Article unliked." }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid Data."));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item Not Found."));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getArticles,
  saveArticle,
  deleteArticle,
};
