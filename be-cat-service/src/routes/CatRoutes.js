const CatRouter = require("express").Router();
const catController = require("../controllers/CatController");


CatRouter.post("/create", catController.createCat);
CatRouter.get("/read", catController.readCat);
CatRouter.put("/update/:id", catController.updateCat);
CatRouter.delete("/delete/:id", catController.deleteCat);
CatRouter.get("/sort", catController.sortCats);
CatRouter.get("/search", catController.findCatsByKeyword);

module.exports = CatRouter;