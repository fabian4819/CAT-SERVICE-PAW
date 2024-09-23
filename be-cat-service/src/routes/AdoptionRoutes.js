const AdoptionRouter = require("express").Router();
const adoptionController = require("../controllers/AdoptionController");

AdoptionRouter.post("/create", adoptionController.createAdoption);
AdoptionRouter.get("/read", adoptionController.readAdoption);
AdoptionRouter.put("/update/:id", adoptionController.updateAdoption);
AdoptionRouter.delete("/delete/:id", adoptionController.deleteAdoption);
AdoptionRouter.get("/sort", adoptionController.sortAdoptions);
AdoptionRouter.get("/search", adoptionController.findAdoptionsByKeyword);

module.exports = AdoptionRouter;
