const express = require("express");
const router = express.Router();
const productsController = require("../controllers/content-controller");

router.get("/", productsController.viewContent);
router.get("/json", productsController.viewContentjson);
router.get("/add", productsController.addContent);
router.get('/edit', productsController.editContentForm);
router.post("/edit", productsController.editContent);

module.exports = router;
