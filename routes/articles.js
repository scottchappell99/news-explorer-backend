const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateArticleBody,
  validateArticleId,
} = require("../middlewares/validation");

router.get("/", auth, getArticles);
router.post("/", auth, validateArticleBody, saveArticle);
router.delete("/:itemId", auth, validateArticleId, deleteArticle);

module.exports = router;
